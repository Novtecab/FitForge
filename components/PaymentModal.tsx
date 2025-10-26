
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { IconX, IconCreditCard, IconGooglePay, IconApplePay, IconSwish } from '../constants';
import QrCode from './QrCode';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = 'card' | 'google' | 'apple' | 'swish';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, clearCart, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  const handlePayment = (e?: React.FormEvent) => {
    if(e) e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const newOrderId = `FF-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      
      console.log('Order successful:', {
        orderId: newOrderId,
        items: cartItems,
        total: totalPrice,
        paymentMethod,
      });

      setOrderId(newOrderId);
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setOrderId(null);
    setPaymentMethod('card');
    onClose();
  };

  const PaymentMethodButton: React.FC<{ method: PaymentMethod; icon: React.ReactNode; label: string }> = ({ method, icon, label }) => (
    <button
      onClick={() => setPaymentMethod(method)}
      className={`flex-1 p-3 flex items-center justify-center gap-2 text-sm font-semibold transition-colors border-b-2 ${
        paymentMethod === method
          ? 'border-cyan-500 text-cyan-500 dark:text-cyan-400'
          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center" onClick={handleClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-800 dark:hover:text-white">
            <IconX className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8">
          {isSuccess ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-500 dark:text-green-400 mb-4">Payment Successful!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Thank you for your purchase. Your order is confirmed.</p>
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
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                <PaymentMethodButton method="card" icon={<IconCreditCard className="w-5 h-5"/>} label="Card" />
                <PaymentMethodButton method="google" icon={<IconGooglePay className="w-5 h-5"/>} label="G Pay" />
                <PaymentMethodButton method="apple" icon={<IconApplePay className="w-5 h-5"/>} label="Apple Pay" />
                <PaymentMethodButton method="swish" icon={<IconSwish className="w-5 h-5"/>} label="Swish" />
              </div>

              {paymentMethod === 'card' && (
                <form onSubmit={handlePayment}>
                  <div className="space-y-4">
                    <input type="text" placeholder="Card Number" className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500 text-gray-900 dark:text-white" required />
                    <div className="flex space-x-4">
                      <input type="text" placeholder="MM / YY" className="w-1/2 p-3 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500 text-gray-900 dark:text-white" required />
                      <input type="text" placeholder="CVC" className="w-1/2 p-3 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500 text-gray-900 dark:text-white" required />
                    </div>
                    <input type="text" placeholder="Name on Card" className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500 text-gray-900 dark:text-white" required />
                  </div>
                  <button type="submit" disabled={isProcessing} className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-500 dark:disabled:bg-gray-600">
                    {isProcessing ? 'Processing...' : `Pay ${totalPrice.toFixed(2)} SEK`}
                  </button>
                </form>
              )}
              
              {paymentMethod === 'google' && (
                <div className="text-center">
                    <button onClick={() => handlePayment()} disabled={isProcessing} className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-600">
                      <IconGooglePay className="w-6 h-6"/> Pay
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Simulated Google Pay checkout</p>
                </div>
              )}

              {paymentMethod === 'apple' && (
                <div className="text-center">
                    <button onClick={() => handlePayment()} disabled={isProcessing} className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-600">
                      <IconApplePay className="w-6 h-6"/> Pay
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Simulated Apple Pay checkout</p>
                </div>
              )}

              {paymentMethod === 'swish' && (
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-300">Open your Swish app and pay to:</p>
                    <p className="text-3xl font-bold tracking-wider text-gray-900 dark:text-white my-4">0731442276</p>
                    <div className="flex justify-center mb-6">
                      <QrCode />
                    </div>
                    <button onClick={() => handlePayment()} disabled={isProcessing} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-500">
                        {isProcessing ? 'Verifying...' : 'Complete Purchase'}
                    </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;