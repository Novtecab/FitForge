
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCredits } from '../context/CreditsContext';
import { IconX, IconCalendar, IconWallet } from '../constants';
import PaymentModal from './PaymentModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, cartCount, clearCart } = useCart();
  const { credits, spendCredits } = useCredits();
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!isOpen) return null;
  
  const handleCheckout = () => {
    onClose();
    setPaymentModalOpen(true);
  };
  
  const handlePayWithCredits = () => {
    if (credits >= totalPrice) {
        const newOrderId = `FF-CR-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        console.log('Order successful (Paid with Credits):', {
            orderId: newOrderId,
            items: cartItems,
            total: totalPrice,
        });
        setOrderId(newOrderId);
        spendCredits(totalPrice);
        clearCart();
        setPaymentSuccess(true);
    }
  };

  const handleClose = () => {
    setPaymentSuccess(false);
    setOrderId(null);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center" onClick={handleClose}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-800 dark:hover:text-white">
              <IconX className="w-6 h-6" />
            </button>
          </div>
          
          {paymentSuccess ? (
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-green-500 dark:text-green-400 mb-4">Payment Successful!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Paid with credits. Your order is confirmed.</p>
              {orderId && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Your Order ID is: <span className="font-mono font-bold text-gray-700 dark:text-gray-200">{orderId}</span>
                </p>
              )}
              <button
                onClick={handleClose}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">Your cart is empty.</p>
                ) : (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cartItems.map(item => (
                      <li key={item.uid} className="py-4 flex items-center">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover mr-4" />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                          {item.trainerName && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">with {item.trainerName}</p>
                          )}
                          {item.details && (
                             <p className="text-sm text-gray-500 dark:text-gray-400">{item.details}</p>
                          )}
                          {item.bookingDetails && (
                            <div className="flex items-center gap-1.5 text-sm text-cyan-500 dark:text-cyan-400 font-medium mt-1">
                              <IconCalendar className="w-4 h-4" />
                              <span>{item.bookingDetails.date} @ {item.bookingDetails.time}</span>
                            </div>
                          )}
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.price.toFixed(2)} SEK</p>
                        </div>
                        <div className="flex items-center">
                          {item.bookingDetails || item.trainerName || item.details ? (
                            <span className="w-16 text-center font-bold text-gray-800 dark:text-white">x {item.quantity}</span>
                          ) : (
                            <input 
                              type="number" 
                              value={item.quantity} 
                              onChange={(e) => updateQuantity(item.uid, parseInt(e.target.value, 10))}
                              className="w-16 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-center rounded border border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500"
                              min="1"
                            />
                          )}
                          <button onClick={() => removeFromCart(item.uid)} className="ml-4 text-red-500 hover:text-red-400">
                            <IconX className="w-5 h-5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {cartCount > 0 && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg">
                  <div className="flex justify-between items-center mb-4 text-lg">
                    <span className="font-semibold text-gray-600 dark:text-gray-300">Total</span>
                    <span className="font-bold text-cyan-500 dark:text-cyan-400">{totalPrice.toFixed(2)} SEK</span>
                  </div>
                  <div className="space-y-3">
                    <button
                        onClick={handlePayWithCredits}
                        disabled={credits < totalPrice}
                        className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                        <IconWallet className="w-6 h-6" /> Pay with Credits ({credits.toFixed(2)} SEK)
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-lg"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
    </>
  );
};

export default CartModal;