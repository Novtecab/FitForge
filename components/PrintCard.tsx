
import React from 'react';
import { Print } from '../types';
import { useCart } from '../context/CartContext';

interface PrintCardProps {
  print: Print;
}

const PrintCard: React.FC<PrintCardProps> = ({ print }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg dark:shadow-none border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      <div className="overflow-hidden">
        <img src={print.imageUrl} alt={print.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{print.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm flex-grow mb-4">{print.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-black text-cyan-500 dark:text-cyan-400">{print.price.toFixed(2)} SEK</span>
          <button
            onClick={() => addToCart(print)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintCard;