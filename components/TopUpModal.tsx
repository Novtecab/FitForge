
import React, { useState } from 'react';
import { useCredits } from '../context/CreditsContext';
import { IconX } from '../constants';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOP_UP_AMOUNTS = [100, 250, 500, 1000];

const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose }) => {
  const { addCredits } = useCredits();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(250);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAmount) return;

    setIsProcessing(true);
    setTimeout(() => {
      addCredits(selectedAmount);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500); // Simulate network delay
  };

  const handleClose = () => {
    setIsSuccess(false);
    setSelectedAmount(250);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center" onClick={handleClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Up Credits</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-800 dark:hover:text-white">
            <IconX className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8">
          {isSuccess ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-500 dark:text-green-400 mb-4">Top Up Successful!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedAmount} SEK in credits has been added to your account.</p>
              <button
                onClick={handleClose}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Awesome!
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-center text-gray-500 dark:text-gray-400 mb-4">Select an amount to add to your balance.</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {TOP_UP_AMOUNTS.map(amount => (
                    <button
                        type="button"
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={`p-4 rounded-lg text-xl font-bold border-2 transition-colors ${
                            selectedAmount === amount 
                            ? 'bg-cyan-500 border-cyan-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-400'
                        }`}
                    >
                        {amount} SEK
                    </button>
                ))}
              </div>
              <p className="text-center text-gray-500 dark:text-gray-400 mb-6 text-sm">A simulated payment form would appear here.</p>
              <button
                type="submit"
                disabled={isProcessing || !selectedAmount}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-500 dark:disabled:bg-gray-600"
              >
                {isProcessing ? 'Processing...' : `Add ${selectedAmount} SEK Credits`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopUpModal;