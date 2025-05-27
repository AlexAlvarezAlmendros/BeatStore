
import React, { useState, useCallback } from 'react';
import { Product, Genre } from '../types';
import { getAiSuggestions } from '../services/geminiService';
import { GENRE_OPTIONS } from '../constants';
import Input from './common/Input';
import Textarea from './common/Textarea';
import Select from './common/Select';
import Button from './common/Button';
import SparklesIcon from './icons/SparklesIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';

interface AddProductFormProps {
  onAddProduct: (product: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [genre, setGenre] = useState<Genre | ''>(Genre.HIPHOP);
  const [tags, setTags] = useState(''); // Comma-separated
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [audioFileUrl, setAudioFileUrl] = useState('');
  const [producer, setProducer] = useState('Your Producer Name'); 

  const [bpm, setBpm] = useState<number | ''>('');
  const [keySignature, setKeySignature] = useState('');


  const [isLoadingTitle, setIsLoadingTitle] = useState(false);
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);

  const handleSuggestTitle = useCallback(async () => {
    setIsLoadingTitle(true);
    setSuggestedTitles([]);
    const keywordsForTitle = `${genre} ${tags}`;
    try {
      const suggestions = await getAiSuggestions({
        type: 'title',
        productInfo: { genre: genre || undefined },
        keywords: keywordsForTitle.trim() || 'modern beat',
      });
      if (Array.isArray(suggestions)) {
        setSuggestedTitles(suggestions);
      } else if (typeof suggestions === 'string') {
         setSuggestedTitles([suggestions]); 
      }
    } catch (error) {
      console.error("Error fetching title suggestions:", error);
      setSuggestedTitles(["Error fetching titles."]);
    } finally {
      setIsLoadingTitle(false);
    }
  }, [genre, tags]);

  const handleGenerateDescription = useCallback(async () => {
    if (!title) {
      alert("Please enter a title first to generate a relevant description.");
      return;
    }
    setIsLoadingDescription(true);
    const keywordsForDescription = tags;
    try {
      const suggestion = await getAiSuggestions({
        type: 'description',
        productInfo: { title, genre: genre || undefined },
        keywords: keywordsForDescription.trim(),
      });
      if (typeof suggestion === 'string') {
        setDescription(suggestion);
      }
    } catch (error) {
      console.error("Error fetching description suggestion:", error);
      setDescription("Error fetching description.");
    } finally {
      setIsLoadingDescription(false);
    }
  }, [title, genre, tags]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !genre || !producer) {
        alert("Please fill in all required fields: Title, Price, Genre, and Producer.");
        return;
    }
    const newProduct: Product = {
      id: Date.now().toString(),
      title,
      producer,
      description,
      price: Number(price),
      genre: genre as Genre,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      coverImageUrl: coverImageUrl || `https://picsum.photos/seed/${title.replace(/\s/g, '-') || 'beat'}/400/400`,
      audioFileUrl,
      bpm: bpm === '' ? undefined : Number(bpm),
      key: keySignature || undefined,
    };
    onAddProduct(newProduct);
    // Reset form
    setTitle('');
    setDescription('');
    setPrice('');
    setGenre(Genre.HIPHOP);
    setTags('');
    setCoverImageUrl('');
    setAudioFileUrl('');
    setProducer('Your Producer Name');
    setBpm('');
    setKeySignature('');
    setSuggestedTitles([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-slate-800 shadow-xl rounded-lg my-10">
      <h2 className="text-3xl font-bold text-indigo-400 mb-8 text-center">Add New Beat</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <Input
            label="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Midnight Groove, Lofi Chill Hop"
            required
          />
          {suggestedTitles.length > 0 && (
            <div className="mt-2 space-x-2 flex flex-wrap gap-2">
              <span className="text-xs text-slate-400 self-center">Suggestions:</span>
              {suggestedTitles.map((st, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setTitle(st)}
                  className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded hover:bg-indigo-500/30 transition-colors"
                >
                  {st}
                </button>
              ))}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSuggestTitle}
            isLoading={isLoadingTitle}
            leftIcon={<SparklesIcon className="w-4 h-4" />}
            className="mt-2 text-sm" 
          >
            Suggest Title with AI
          </Button>
        </div>

        <div>
          <Textarea
            label="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your beat, its mood, instruments used, etc."
            rows={3}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGenerateDescription}
            isLoading={isLoadingDescription}
            leftIcon={<SparklesIcon className="w-4 h-4" />}
            className="mt-2 text-sm"
            disabled={!title}
          >
            Generate Description with AI
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
                label="Producer Name"
                id="producer"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
                placeholder="Your artist name"
                required
            />
            <Input
                label="Price ($)"
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="e.g., 29.99"
                min="0"
                step="0.01"
                required
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
                label="Genre"
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value as Genre)}
                options={GENRE_OPTIONS}
                required
                placeholder="Select a genre"
            />
            <Input
                label="Tags (comma-separated)"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., chill, lofi, study, trap"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
                label="BPM (Optional)"
                id="bpm"
                type="number"
                value={bpm}
                onChange={(e) => setBpm(e.target.value === '' ? '' : parseInt(e.target.value))}
                placeholder="e.g., 120"
            />
            <Input
                label="Key (Optional)"
                id="key"
                value={keySignature}
                onChange={(e) => setKeySignature(e.target.value)}
                placeholder="e.g., Cmin, G#maj"
            />
        </div>
        
        <Input
          label="Cover Image URL (Optional)"
          id="coverImageUrl"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          placeholder="https://example.com/cover.jpg (or blank for default)"
        />
        <Input
          label="Audio File URL (Optional, for simulation)"
          id="audioFileUrl"
          value={audioFileUrl}
          onChange={(e) => setAudioFileUrl(e.target.value)}
          placeholder="https://example.com/beat.mp3"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          leftIcon={<PlusCircleIcon className="w-5 h-5"/>}
        >
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProductForm;
