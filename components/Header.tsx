
import React from 'react';
import { Link } from 'react-router-dom';
import MusicNoteIcon from './icons/MusicNoteIcon';
import { APP_NAME } from '../constants';

interface HeaderProps {
  onGenerateAiProduct: () => void;
  isGenerating: boolean;
}

const Header: React.FC<HeaderProps> = ({ onGenerateAiProduct, isGenerating }) => {
  return (
    <header className="bg-slate-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors">
            <MusicNoteIcon className="w-8 h-8" />
            <span className="text-2xl font-bold ">{APP_NAME}</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-slate-400 hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Browse Beats
            </Link>
            <Link 
              to="/add-product" 
              className="text-slate-400 hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Add Product
            </Link>
            <button
              onClick={onGenerateAiProduct}
              disabled={isGenerating}
              className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                  <path d="M9.401 2.658a.75.75 0 0 1 .599-.156c.348.066.632.33.742.663l.268 1.043a.75.75 0 0 0 1.45-.373l-.268-1.043a2.25 2.25 0 0 0-2.182-1.988C9.569 1.79 8.901 2.294 8.816 3.002l-.268 1.043a.75.75 0 0 0 1.45.373l.268-1.043.003-.002.003-.014ZM14.5 6.75a.75.75 0 0 0-1.444.405l.207.726a.75.75 0 0 0 1.443-.405l-.206-.726ZM11.25 5.25a.75.75 0 0 0-1.5 0v.092l-.332.278a.75.75 0 0 0 .998 1.193l.72-.603a.75.75 0 0 0 .406-.847V5.25Z" />
                  <path fillRule="evenodd" d="M7.554 8.747C6.18 8.384 5.25 7.158 5.25 5.75c0-1.933 1.567-3.5 3.5-3.5s3.5 1.567 3.5 3.5c0 1.408-.93 2.634-2.304 3.001a.75.75 0 0 0-.492 0H7.554ZM12.75 6.5a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0v-2.5Z" clipRule="evenodd" />
                  <path d="M3.696 9.982a.75.75 0 0 1 1.04-.218l1.916 1.009a.75.75 0 0 0 .83-.05l1.654-1.24a.75.75 0 0 1 .932-.076l1.916 1.009a.75.75 0 0 0 .83-.05l1.654-1.24a.75.75 0 0 1 .932-.076l1.917 1.009a.75.75 0 1 1-.822 1.566l-1.916-1.009a.75.75 0 0 0-.83.05l-1.654 1.24a.75.75 0 0 1-.932.076L8.64 11.77a.75.75 0 0 0-.83.05L6.156 13.06a.75.75 0 0 1-.932.076l-1.916-1.009a.75.75 0 0 1-.218-1.04Z" />
                  <path fillRule="evenodd" d="M5.992 12.738a.75.75 0 0 1 .623.498l.214.748a.75.75 0 0 0 1.44-.412l-.214-.748a2.25 2.25 0 0 0-4.324-1.237l-.214-.748a.75.75 0 0 0-1.44.412l.214.748c.16.557.676.948 1.237 1.01l.748.214a.75.75 0 0 0 .412-1.44l-.748-.214a.75.75 0 0 1-.498-.623Z" clipRule="evenodd" />
                </svg>
              )}
              AI Beat
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
