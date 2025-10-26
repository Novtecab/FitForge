
import React, { useState, useMemo } from 'react';
import ServiceCard from '../components/ServiceCard';
import { SERVICES } from '../constants';
import { ServiceCategory, Service } from '../types';

const relevantServices = SERVICES.filter(s => 
    s.category === ServiceCategory.CLASSES || s.category === ServiceCategory.PT
);

const categories = [
    ServiceCategory.CLASSES, 
    ServiceCategory.PT, 
];

const Sessions: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'All') {
      return [...relevantServices].sort((a, b) => a.category.localeCompare(b.category));
    }
    return relevantServices.filter(service => service.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-6xl">
          Classes & Training
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Join our expert-led classes or book a personalized training session to achieve your goals.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-4">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${selectedCategory === 'All' ? 'bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base ${selectedCategory === category ? 'bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Sessions;