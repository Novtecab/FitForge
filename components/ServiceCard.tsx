import React, { useState } from 'react';
import { Service } from '../types';
import { useCart } from '../context/CartContext';
import BookingModal from './BookingModal';

interface ServiceCardProps {
  service: Service;
}

const parsePrice = (priceStr: string): number | null => {
  const match = priceStr.match(/\$(\d+(\.\d+)?)/);
  if (match) {
    return parseFloat(match[1]);
  }
  return null;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { addToCart } = useCart();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const numericPrice = parsePrice(service.price);
  const isBookable = numericPrice !== null;

  const handleBook = (details: { displayDate: string; isoDate: string; time: string }) => {
    // FIX: The details object should be passed inside a `bookingDetails` property to match the addToCart function signature.
    addToCart(service, { bookingDetails: details });
    setIsBookingModalOpen(false);
  };

  return (
    <>
      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group">
        <img src={service.imageUrl} alt={service.name} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col p-6">
          <div className="mt-auto">
            <span className="text-sm font-semibold bg-cyan-500 text-white py-1 px-3 rounded-full">{service.category}</span>
            <h3 className="text-2xl font-extrabold text-white mt-3">{service.name}</h3>
            <p className="text-gray-300 mt-2 flex-grow">{service.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-cyan-400">{service.price}</span>
              <button 
                onClick={() => isBookable ? setIsBookingModalOpen(true) : {}}
                disabled={!isBookable}
                className="bg-white hover:bg-gray-200 text-gray-900 font-bold py-2 px-5 rounded-lg transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isBookable ? 'Book Session' : 'Contact Us'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isBookable && (
        <BookingModal 
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          service={service}
          onBook={handleBook}
        />
      )}
    </>
  );
};

export default ServiceCard;