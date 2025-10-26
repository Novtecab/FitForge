
import React from 'react';
import PrintCard from '../components/PrintCard';
import { PRINTS } from '../constants';

const Prints: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-6xl">
          Art Prints
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Capture the energy and emotion of fitness with our collection of high-quality photographic prints.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRINTS.map(print => (
          <PrintCard key={print.id} print={print} />
        ))}
      </div>
    </div>
  );
};

export default Prints;