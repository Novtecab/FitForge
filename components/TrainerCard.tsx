
import React from 'react';
import { Trainer } from '../types';
import { IconUserCheck } from '../constants';

interface TrainerCardProps {
  trainer: Trainer;
  onBook: (trainer: Trainer) => void;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, onBook }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg dark:shadow-none border border-gray-200 dark:border-gray-700 flex flex-col transform hover:-translate-y-1 transition-all duration-300">
      <img src={trainer.imageUrl} alt={trainer.name} className="w-full h-64 object-cover object-top" />
      <div className="p-6 text-center flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{trainer.name}</h3>
        <div className="flex items-center justify-center gap-2 text-cyan-500 dark:text-cyan-400">
          <IconUserCheck className="w-5 h-5" />
          <p className="font-semibold">{trainer.specialty}</p>
        </div>
        <div className="mt-4 flex-grow">
          <p className="text-3xl font-black text-gray-800 dark:text-white">{trainer.rate}<span className="text-base font-medium text-gray-500 dark:text-gray-400"> SEK/hr</span></p>
        </div>
        <div className="mt-auto pt-4">
          <button
            onClick={() => onBook(trainer)}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            View Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;