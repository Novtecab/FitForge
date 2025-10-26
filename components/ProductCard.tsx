
import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg dark:shadow-none border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm flex-grow mb-4">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-black text-cyan-500 dark:text-cyan-400">{product.price.toFixed(2)} SEK</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;