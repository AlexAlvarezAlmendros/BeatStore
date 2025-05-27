
import React from 'react';
import { Product } from '../types';
import PlayIcon from './icons/PlayIcon';
import MusicNoteIcon from './icons/MusicNoteIcon';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 ease-out flex flex-col h-full group">
      <div className="relative">
        <img 
            src={product.coverImageUrl || `https://picsum.photos/seed/${product.id}/400/300`} 
            alt={product.title} 
            className="w-full h-56 object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-100 group-hover:opacity-75 transition-opacity duration-300"></div>
        <button 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500/80 hover:bg-indigo-500 text-white p-3 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 opacity-0 group-hover:opacity-100"
            aria-label={`Play ${product.title}`}
            onClick={() => alert(`Playing ${product.title} (simulation)`)}
        >
            <PlayIcon className="w-6 h-6" />
        </button>
        <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            ${product.price.toFixed(2)}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-slate-50 mb-1 truncate" title={product.title}>
            {product.title}
        </h3>
        <p className="text-sm text-slate-400 mb-2 flex items-center">
            <MusicNoteIcon className="w-4 h-4 mr-1.5 text-indigo-400"/>
            {product.producer}
        </p>
        
        <p className="text-xs text-slate-400 mb-3 line-clamp-2 flex-grow">
            {product.description}
        </p>

        <div className="mb-3">
            <span className="inline-block bg-indigo-500/20 text-indigo-400 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                {product.genre}
            </span>
        </div>

        {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                #{tag}
                </span>
            ))}
            </div>
        )}
        
        {(product.bpm || product.key || product.durationMinutes) && (
          <div className="text-xs text-slate-500 border-t border-slate-700 pt-2 mt-auto">
            {product.bpm && <span className="mr-2">BPM: {product.bpm}</span>}
            {product.key && <span className="mr-2">Key: {product.key}</span>}
            {product.durationMinutes && <span>Dur: {product.durationMinutes}m</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
