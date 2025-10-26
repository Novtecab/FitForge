
import React, { useState, useMemo } from 'react';
import { Service } from '../types';
import { useCart } from '../context/CartContext';

interface StudioBookingCardProps {
  service: Service;
}

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const StudioBookingCard: React.FC<StudioBookingCardProps> = ({ service }) => {
  const { addToCart } = useCart();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const hourlyRate = useMemo(() => {
    const match = service.price.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0;
  }, [service.price]);

  const { month, year, calendarDays } = useMemo(() => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const date = new Date(firstDayOfMonth);
    date.setDate(date.getDate() - date.getDay());
    const calendarDays = [];
    for (let i = 0; i < 42; i++) {
        calendarDays.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return { month, year, calendarDays };
  }, [selectedDate]);

  const handleDateChange = (day: Date) => {
    if (day < today) return;
    setSelectedDate(day);
    setSelectedSlots([]);
  };
  
  const toggleSlot = (time: string) => {
    setSelectedSlots(prev => 
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  const handleAddToCart = () => {
    if (selectedSlots.length === 0) {
      alert("Please select at least one time slot.");
      return;
    }
    
    selectedSlots.forEach(time => {
      const bookingDetails = {
        displayDate: selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' }),
        isoDate: selectedDate.toISOString().split('T')[0],
        time: `${time} - ${String(parseInt(time.split(':')[0]) + 1).padStart(2, '0')}:00`
      };
      addToCart(service, { bookingDetails });
    });
    setSelectedSlots([]);
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedDate(newDate);
  }

  const totalPrice = selectedSlots.length * hourlyRate;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-none border border-gray-200 dark:border-gray-700 flex flex-col lg:col-span-2">
      <img src={service.imageUrl} alt={service.name} className="w-full h-64 object-cover rounded-t-lg" />
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-sm font-semibold text-cyan-500 dark:text-cyan-400">{service.category}</span>
        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">{service.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{service.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          {/* Calendar */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Select Date</h4>
            <div className="flex justify-between items-center mb-2">
              <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">&larr;</button>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">&rarr;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => ( <div key={day} className="font-bold text-gray-500 dark:text-gray-400">{day}</div> ))}
              {calendarDays.map((day, index) => {
                const isCurrentMonth = day.getMonth() === month;
                const isSelected = day.toDateString() === selectedDate.toDateString();
                const isPast = day < today;
                return (
                  <button key={index} onClick={() => handleDateChange(day)} disabled={isPast || !isCurrentMonth}
                    className={`p-1 rounded-full aspect-square transition-colors ${ isSelected ? 'bg-cyan-500 text-white' : isCurrentMonth && !isPast ? 'hover:bg-gray-200 dark:hover:bg-gray-700' : '' } ${!isCurrentMonth ? 'text-gray-300 dark:text-gray-600' : ''} ${isPast ? 'text-gray-400 line-through' : ''}`}
                  > {day.getDate()} </button>
                )
              })}
            </div>
          </div>
          {/* Time Slots */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Select Slot(s)</h4>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map(time => (
                <button key={time} onClick={() => toggleSlot(time)}
                  className={`p-1.5 rounded-md text-xs font-semibold border-2 transition-colors ${ selectedSlots.includes(time) ? 'bg-cyan-500 border-cyan-500 text-white' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-400'}`}
                > {time} </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Price</span>
            <span className="text-3xl font-black text-cyan-500 dark:text-cyan-400 block">{totalPrice} SEK</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={selectedSlots.length === 0}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudioBookingCard;
