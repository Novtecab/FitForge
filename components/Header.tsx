import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconShoppingCart, IconWallet, IconStore, IconCalendar, IconSun, IconMoon, IconUsers, IconImage, IconTrendingUp, IconLogo } from '../constants';
import { useCart } from '../context/CartContext';
import { useCredits } from '../context/CreditsContext';
import { useTheme } from '../context/ThemeContext';
import CartModal from './CartModal';
import TopUpModal from './TopUpModal';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <IconMoon className="w-6 h-6" /> : <IconSun className="w-6 h-6" />}
        </button>
    );
};


const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { credits } = useCredits();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-1 px-2 py-1 rounded-md transition-colors duration-300 ${
      isActive 
      ? 'text-cyan-500 dark:text-cyan-400' 
      : 'text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400'
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <NavLink to="/" className="flex items-center gap-3 group">
              <IconLogo className="w-8 h-8 text-gray-800 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
              <span className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">FitForge</span>
            </NavLink>
            <nav className="hidden md:flex items-center space-x-4">
              <NavLink to="/store" className={navLinkClasses}>
                <IconStore className="w-6 h-6" />
                <span className="text-xs font-bold">Store</span>
              </NavLink>
              <NavLink to="/prints" className={navLinkClasses}>
                <IconImage className="w-6 h-6" />
                <span className="text-xs font-bold">Prints</span>
              </NavLink>
              <NavLink to="/sessions" className={navLinkClasses}>
                <IconCalendar className="w-6 h-6" />
                <span className="text-xs font-bold">Sessions</span>
              </NavLink>
              <NavLink to="/invest" className={navLinkClasses}>
                <IconTrendingUp className="w-6 h-6" />
                <span className="text-xs font-bold">Invest</span>
              </NavLink>
              <NavLink to="/trainers" className={navLinkClasses}>
                <IconUsers className="w-6 h-6" />
                <span className="text-xs font-bold">Trainers</span>
              </NavLink>
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <IconWallet className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                <span className="font-bold text-gray-800 dark:text-white">{credits.toFixed(2)}</span>
                <button 
                  onClick={() => setIsTopUpOpen(true)}
                  className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold py-1 px-2 rounded-md transition-colors"
                >
                  Top Up
                </button>
              </div>
              <ThemeToggle />
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                aria-label="Open shopping cart"
              >
                <IconShoppingCart className="w-7 h-7" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-cyan-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
    </>
  );
};

export default Header;