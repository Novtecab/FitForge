import React, { useState, useMemo } from 'react';
import TrainerCard from '../components/TrainerCard';
import TrainerBookingModal from '../components/TrainerBookingModal';
import { TRAINERS, SERVICES } from '../constants';
import { ServiceCategory, Trainer } from '../types';

const Trainers: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  // Find the generic "Personal Training" service to pass to the booking modal.
  const ptService = useMemo(() => SERVICES.find(s => s.category === ServiceCategory.PT), []);

  const specialties = useMemo(() => {
    const uniqueSpecialties = new Set(TRAINERS.map(trainer => trainer.specialty));
    return ['All', ...Array.from(uniqueSpecialties)];
  }, []);

  const filteredTrainers = useMemo(() => {
    if (selectedSpecialty === 'All') {
        return TRAINERS;
    }
    return TRAINERS.filter(trainer => trainer.specialty === selectedSpecialty);
  }, [selectedSpecialty]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-6xl">
            Meet Our Personal Trainers
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Our certified experts are here to guide you on your fitness journey. Book a session with them today.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-4">
          {specialties.map(specialty => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base ${selectedSpecialty === specialty ? 'bg-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              {specialty}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrainers.map(trainer => (
            <TrainerCard key={trainer.id} trainer={trainer} onBook={() => setSelectedTrainer(trainer)} />
          ))}
        </div>
      </div>
      {selectedTrainer && ptService && (
        <TrainerBookingModal
          isOpen={!!selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
          trainer={selectedTrainer}
          service={ptService}
        />
      )}
    </>
  );
};

export default Trainers;