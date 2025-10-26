
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, Service, Trainer, Print } from '../types';

interface AddToCartOptions {
  bookingDetails?: { displayDate: string; isoDate: string; time: string };
  trainer?: Trainer;
  price?: number; // Override price for configurable items
  details?: string; // Configuration details string
  quantity?: number; // Add a specific quantity
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const parsePrice = (priceStr: string): number | null => {
  const numericPart = priceStr.replace(/[^0-9.]/g, '');
  if (numericPart) {
    return parseFloat(numericPart);
  }
  return null;
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Product | Service | Print, options?: AddToCartOptions) => void;
  removeFromCart: (uid: string) => void;
  updateQuantity: (uid: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Product | Service | Print, options: AddToCartOptions = {}) => {
    const { bookingDetails, trainer, price: customPrice, details, quantity: customQuantity } = options;

    let price: number | null;
    let uid: string;
    let name = item.name;
    let imageUrl = item.imageUrl;
    let id: number;

    const quantityToAdd = customQuantity || 1;

    if (typeof item.price === 'number') { // Product or Print
      price = item.price;
      uid = `product-${item.id}`;
      id = item.id;
    } else { // Service
      id = item.id;
      if (trainer && bookingDetails) {
        price = trainer.rate;
        name = '1-on-1 Personal Training';
        uid = `trainer-${trainer.id}-${bookingDetails.isoDate}-${bookingDetails.time}`;
        imageUrl = trainer.imageUrl;
      } else {
        price = parsePrice(item.price);
        uid = bookingDetails
          ? `service-${item.id}-${bookingDetails.isoDate}-${bookingDetails.time}`
          : `service-${item.id}`;
      }
    }
    
    if (customPrice !== undefined) {
      price = customPrice;
    }

    if (details) {
      // Create a simple hash from details string for a unique ID
      const detailsHash = details.split('').reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0);
      uid = `service-${item.id}-${detailsHash}`;
    }

    if (price === null) {
      alert("This service cannot be added to the cart. Please contact us for a quote.");
      return;
    }

    const finalPrice = price;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.uid === uid);
      if (existingItem) {
        // Bookings, configured services, and trainer sessions are unique and shouldn't be stacked.
        if (bookingDetails || details || trainer) {
          alert("This specific service or configuration is already in your cart.");
          return prevItems;
        }
        return prevItems.map(i =>
          i.uid === uid ? { ...i, quantity: i.quantity + quantityToAdd } : i
        );
      }
      
      const newCartItem: CartItem = {
        uid,
        id,
        name,
        price: finalPrice,
        imageUrl,
        quantity: quantityToAdd,
        bookingDetails: bookingDetails ? { date: bookingDetails.displayDate, time: bookingDetails.time } : undefined,
        trainerName: trainer ? trainer.name : undefined,
        details: details,
      };

      return [...prevItems, newCartItem];
    });
  };

  const removeFromCart = (uid: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.uid !== uid));
  };

  const updateQuantity = (uid: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(uid);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.uid === uid ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };
  
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};