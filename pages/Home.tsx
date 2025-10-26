
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import { PRODUCTS, SERVICES, IconDumbbell, IconUsers, IconCamera, IconSparkles } from '../constants';

const Home: React.FC = () => {
  // Select one featured product and service to display
  const featuredProduct = PRODUCTS.find(p => p.id === 3); // Titan Kettlebell
  const featuredService = SERVICES.find(s => s.id === 2); // HIIT Bootcamp

  return (
    <div className="space-y-24 md:space-y-32 pb-16">
      {/* Hero Section */}
      <section className="relative text-center -mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
        <div className="absolute inset-0 bg-gray-900">
          <img src="https://picsum.photos/seed/hero-bg/1600/900" alt="Fitness background" className="w-full h-full object-cover opacity-20 dark:opacity-30"/>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tighter leading-tight">
            Forge Your Ultimate Fitness Journey.
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Premium gear, expert-led classes, and personalized training. Everything you need to achieve greatness, all in one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/store" className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-lg">
              Shop Gear
            </Link>
            <Link to="/sessions" className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-lg">
              Book a Session
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Why Choose FitForge?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              The tools and guidance you need for peak performance.
            </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
            <IconDumbbell className="mx-auto w-12 h-12 text-cyan-500 dark:text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Elite-Grade Gear</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Our curated selection of equipment is built for performance, durability, and results.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
            <IconUsers className="mx-auto w-12 h-12 text-cyan-500 dark:text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Expert-Led Sessions</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Transform your routine with our HIIT bootcamps, Vinyasa yoga, and 1-on-1 personal training.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
            <IconCamera className="mx-auto w-12 h-12 text-cyan-500 dark:text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Build Your Brand</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Leverage our creative studio and branding services to capture your athletic journey.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
            <IconSparkles className="mx-auto w-12 h-12 text-cyan-500 dark:text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI-Powered Guidance</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">ForgeBot is available 24/7 to help you find the right gear and services instantly.</p>
          </div>
        </div>
      </section>

      {/* Featured Highlights Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">This Week's Highlights</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Discover what's new and popular at FitForge.
            </p>
        </div>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {featuredProduct && (
             <div className="lg:col-span-2">
              <ProductCard product={featuredProduct} />
            </div>
          )}
          {featuredService && (
            <div className="lg:col-span-3">
              <ServiceCard service={featuredService} />
            </div>
          )}
        </div>
        <div className="mt-12 text-center">
            <Link to="/store" className="text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 font-semibold text-lg">
                Explore All Products &rarr;
            </Link>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gray-100 dark:bg-gray-800 p-12 rounded-lg">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Ready to Elevate Your Fitness?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
          Don't just work out. Train with purpose. Gear up and book your session today.
        </p>
        <div className="mt-8">
            <Link to="/store" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-lg">
              Get Started
            </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;