
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CreditsContextType {
  credits: number;
  addCredits: (amount: number) => void;
  spendCredits: (amount: number) => void;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const CreditsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [credits, setCredits] = useState<number>(0);

  const addCredits = (amount: number) => {
    setCredits(prevCredits => prevCredits + amount);
  };

  const spendCredits = (amount: number) => {
    setCredits(prevCredits => {
      if (prevCredits < amount) {
        console.error("Not enough credits to spend.");
        return prevCredits;
      }
      return prevCredits - amount;
    });
  };


  return (
    <CreditsContext.Provider value={{ credits, addCredits, spendCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};