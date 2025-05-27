
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import Spinner from './common/Spinner';
import PlusCircleIcon from './icons/PlusCircleIcon';
import MusicNoteIcon from './icons/MusicNoteIcon'; // Fixed: Added import for MusicNoteIcon
import { Link } from 'react-router-dom';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" color="text-indigo-400" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <MusicNoteIcon className="w-24 h-24 text-slate-700 mx-auto mb-6" />
        <h2 className="text-3xl font-semibold text-slate-50 mb-3">No Beats Found</h2>
        <p className="text-slate-400 mb-6">
          It looks like there are no beats available right now.
          <br />
          Why not be the first to add one?
        </p>
        <Link
          to="/add-product"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
        >
          <PlusCircleIcon className="-ml-1 mr-3 h-5 w-5" />
          Add Your Beat
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 p-4 md:p-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
