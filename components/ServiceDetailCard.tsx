
import React, { useState, useMemo } from 'react';
import { Service } from '../types';
import { useCart } from '../context/CartContext';
import { ATHLETE_SHOOT_OPTIONS, CONTENT_CREATOR_OPTIONS } from '../constants';

interface ServiceDetailCardProps {
  service: Service;
}

const ServiceDetailCard: React.FC<ServiceDetailCardProps> = ({ service }) => {
  const { addToCart } = useCart();

  // State for Athlete Photoshoot
  const [shotTypes, setShotTypes] = useState<string[]>([]);
  const [extraPhotos, setExtraPhotos] = useState(0);

  // State for Content Creator Package
  const [selectedCreatorServices, setSelectedCreatorServices] = useState<string[]>([]);

  const handleShotTypeToggle = (type: string) => {
    setShotTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };
  
  const handleCreatorServiceToggle = (serviceName: string) => {
    setSelectedCreatorServices(prev =>
      prev.includes(serviceName) ? prev.filter(s => s !== serviceName) : [...prev, serviceName]
    );
  };


  const { totalPrice, details } = useMemo(() => {
    if (service.id === 4) { // Athlete Brand Photoshoot
      const total = ATHLETE_SHOOT_OPTIONS.BASE_PRICE + extraPhotos * ATHLETE_SHOOT_OPTIONS.EXTRA_PHOTOS_PRICE;
      const detailsArray = [...shotTypes];
      if (extraPhotos > 0) {
        detailsArray.push(`+${extraPhotos * 5} extra photos`);
      }
      return { totalPrice: total, details: detailsArray.length > 0 ? detailsArray.join(', ') : 'Standard Package' };
    }
    if (service.id === 5) { // Content Creator Package
      const total = selectedCreatorServices.reduce((acc, serviceName) => {
        const selectedService = CONTENT_CREATOR_OPTIONS.find(s => s.name === serviceName);
        return acc + (selectedService ? selectedService.price : 0);
      }, 0);
      return { totalPrice: total, details: selectedCreatorServices.join(', ') };
    }
    return { totalPrice: 0, details: '' };
  }, [service.id, shotTypes, extraPhotos, selectedCreatorServices]);
  
  const handleAddToCart = () => {
    if (service.id === 5 && selectedCreatorServices.length === 0) {
      alert('Please select at least one service for the Content Creator Package.');
      return;
    }
    addToCart(service, { price: totalPrice, details });
  };


  const renderAthletePhotoshootOptions = () => (
    <>
      <div className="mb-4">
        <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Shot Types (Optional)</h4>
        <div className="flex gap-2">
          {ATHLETE_SHOOT_OPTIONS.SHOT_TYPES.map(type => (
            <button
              key={type}
              onClick={() => handleShotTypeToggle(type)}
              className={`px-3 py-1 rounded-full text-sm font-semibold border-2 transition-colors ${
                shotTypes.includes(type)
                  ? 'bg-cyan-500 border-cyan-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-cyan-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Extra Photos</h4>
        <div className="flex items-center gap-4">
          <button onClick={() => setExtraPhotos(Math.max(0, extraPhotos - 1))} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md font-bold">-</button>
          <span>{extraPhotos * 5} photos (+{extraPhotos * ATHLETE_SHOOT_OPTIONS.EXTRA_PHOTOS_PRICE} SEK)</span>
          <button onClick={() => setExtraPhotos(extraPhotos + 1)} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md font-bold">+</button>
        </div>
      </div>
    </>
  );
  
  const renderContentCreatorOptions = () => (
     <div className="mb-4">
        <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Build Your Package</h4>
        <div className="space-y-2">
            {CONTENT_CREATOR_OPTIONS.map(option => (
                <label key={option.name} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{option.name}</span>
                    <div className="flex items-center">
                        <span className="font-bold text-cyan-500 dark:text-cyan-400 mr-4">{option.price} SEK</span>
                        <input
                            type="checkbox"
                            checked={selectedCreatorServices.includes(option.name)}
                            onChange={() => handleCreatorServiceToggle(option.name)}
                            className="w-5 h-5 rounded text-cyan-600 bg-gray-200 border-gray-300 focus:ring-cyan-500"
                        />
                    </div>
                </label>
            ))}
        </div>
     </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-none border border-gray-200 dark:border-gray-700 flex flex-col lg:col-span-2">
      <img src={service.imageUrl} alt={service.name} className="w-full h-64 object-cover rounded-t-lg" />
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-sm font-semibold text-cyan-500 dark:text-cyan-400">{service.category}</span>
        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">{service.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 flex-grow">{service.description}</p>
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            {service.id === 4 && renderAthletePhotoshootOptions()}
            {service.id === 5 && renderContentCreatorOptions()}
        </div>
        <div className="flex justify-between items-center mt-auto pt-4">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Price</span>
            <span className="text-3xl font-black text-cyan-500 dark:text-cyan-400 block">{totalPrice} SEK</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailCard;