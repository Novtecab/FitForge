import React, { useState, useMemo } from 'react';
import { Service } from '../types';
import { IconX } from '../constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  onBook: (details: { displayDate: string; isoDate: string; time: string }) => void;
}

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, service, onBook }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { month, year, calendarDays } = useMemo(() => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

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
    setSelectedTime(null); // Reset time when date changes
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      onBook({
        displayDate: selectedDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }),
        isoDate: selectedDate.toISOString().split('T')[0], // YYYY-MM-DD for stable UID
        time: selectedTime,
      });
    }
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedDate(newDate);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Book: {service.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 dark:hover:text-white">
            <IconX className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => changeMonth(-1)}>&larr;</button>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <button onClick={() => changeMonth(1)}>&rarr;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="font-bold text-gray-500 dark:text-gray-400">{day}</div>
                ))}
                {calendarDays.map((day, index) => {
                    const isCurrentMonth = day.getMonth() === month;
                    const isSelected = day.toDateString() === selectedDate.toDateString();
                    const isPast = day < today;
                    return (
                        <button
                            key={index}
                            onClick={() => handleDateChange(day)}
                            disabled={isPast || !isCurrentMonth}
                            className={`p-2 rounded-full transition-colors ${
                                isSelected ? 'bg-cyan-500 text-white' : 
                                isCurrentMonth && !isPast ? 'hover:bg-gray-200 dark:hover:bg-gray-700' : ''
                            } ${!isCurrentMonth ? 'text-gray-300 dark:text-gray-600' : ''} ${isPast ? 'text-gray-400 line-through' : ''}`}
                        >
                            {day.getDate()}
                        </button>
                    )
                })}
            </div>
          </div>
          {/* Time Slots */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Select a Time Slot</h3>
            <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map(time => (
                    <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg font-semibold border-2 transition-colors ${
                            selectedTime === time 
                            ? 'bg-cyan-500 border-cyan-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-400'
                        }`}
                    >
                        {time}
                    </button>
                ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg">
            <button
              onClick={handleBooking}
              disabled={!selectedTime}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Confirm & Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
