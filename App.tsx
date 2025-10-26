
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import Sessions from './pages/Sessions';
import Trainers from './pages/Trainers';
import Prints from './pages/Prints';
import Invest from './pages/Invest';
import ChatWidget from './components/ChatWidget';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { CreditsProvider } from './context/CreditsContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CreditsProvider>
        <CartProvider>
          <HashRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/sessions" element={<Sessions />} />
                  <Route path="/trainers" element={<Trainers />} />
                  <Route path="/prints" element={<Prints />} />
                  <Route path="/invest" element={<Invest />} />
                </Routes>
              </main>
              <Footer />
              <ChatWidget />
            </div>
          </HashRouter>
        </CartProvider>
      </CreditsProvider>
    </ThemeProvider>
  );
};

export default App;