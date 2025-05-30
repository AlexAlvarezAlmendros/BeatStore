
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import { Product, Genre } from './types';
import { generateAiProduct } from './services/geminiService';
import { INITIAL_PRODUCTS_COUNT, MOCK_PRODUCER_NAME } from './constants';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isGeneratingAiProduct, setIsGeneratingAiProduct] = useState(false);

  const fetchInitialProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    // Simulate API call for initial products
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    const initialProducts: Product[] = Array.from({ length: INITIAL_PRODUCTS_COUNT }).map((_, index) => ({
      id: `mock-${index}-${Date.now()}`,
      title: `Beat Title ${index + 1}`,
      producer: `Producer ${String.fromCharCode(65 + (index % 5))}`, // Producer A, B, C...
      description: `This is a cool beat #${index + 1}. Perfect for your next project. It features a unique blend of sounds and rhythms.`,
      price: parseFloat((Math.random() * 20 + 10).toFixed(2)), // Random price between $10 and $30
      genre: Object.values(Genre)[index % Object.values(Genre).length],
      tags: ['instrumental', `mood${index+1}`, Object.values(Genre)[index % Object.values(Genre).length].toString().toLowerCase()],
      coverImageUrl: `https://picsum.photos/seed/${index + Date.now()}/400/400`,
      audioFileUrl: `audio_mock_${index+1}.mp3`,
      bpm: 90 + (index * 5),
      key: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'][index % 7]
    }));
    setProducts(initialProducts);
    setIsLoadingProducts(false);
  }, []);

  useEffect(() => {
    fetchInitialProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // fetchInitialProducts is memoized, safe to run once.

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    alert(`${newProduct.title} has been added! You can find it at the top of the 'Browse Beats' page.`);
    // Consider navigation to home after adding product using useNavigate from react-router-dom if not using alerts
  };

  const handleGenerateAiProduct = useCallback(async () => {
    setIsGeneratingAiProduct(true);
    try {
      const keywords = ["modern", "trap", "dark", "energetic", "synth", "808", "lofi", "chill", "upbeat", "cinematic"];
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const aiProductDetails = await generateAiProduct(`A ${randomKeyword} beat`);
      
      const newAiProduct: Product = {
        id: `ai-${Date.now()}`,
        title: aiProductDetails.title || "AI Generated Beat",
        producer: aiProductDetails.producer || MOCK_PRODUCER_NAME,
        description: aiProductDetails.description || "An awesome beat generated by AI.",
        price: aiProductDetails.price || parseFloat((Math.random() * 15 + 15).toFixed(2)),
        genre: aiProductDetails.genre || Genre.EDM, // Fallback genre
        tags: aiProductDetails.tags || ["ai", "generated", "unique"],
        coverImageUrl: aiProductDetails.coverImageUrl || `https://picsum.photos/seed/ai-${Date.now()}/400/400`,
        audioFileUrl: aiProductDetails.audioFileUrl || "ai_mock_audio.mp3",
        bpm: aiProductDetails.bpm || (100 + Math.floor(Math.random() * 60)),
        key: aiProductDetails.key || ['Am', 'Cmaj', 'Gm'][Math.floor(Math.random()*3)],
      };
      handleAddProduct(newAiProduct);

    } catch (error) {
      console.error("Failed to generate AI product:", error);
      alert("Sorry, couldn't generate an AI product at this time.");
    } finally {
      setIsGeneratingAiProduct(false);
    }
  }, []);


  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-900 text-slate-50">
        <Header onGenerateAiProduct={handleGenerateAiProduct} isGenerating={isGeneratingAiProduct} />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ProductList products={products} isLoading={isLoadingProducts} />} />
            <Route path="/add-product" element={<AddProductForm onAddProduct={handleAddProduct} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
