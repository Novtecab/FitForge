// FIX: Add missing React import.
import React from 'react';
import { Product, Service, ServiceCategory, Trainer, Print } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Velocity Jump Rope',
    description: 'High-speed, lightweight rope for intense cardio sessions. Perfect for double-unders.',
    price: 250,
    imageUrl: 'https://picsum.photos/seed/jumprope/400/400',
    category: 'Cardio',
  },
  {
    id: 2,
    name: 'Aura Yoga Mat',
    description: 'Eco-friendly, non-slip mat with alignment markers. Enhance your practice.',
    price: 700,
    imageUrl: 'https://picsum.photos/seed/yogamat/400/400',
    category: 'Yoga & Pilates',
  },
  {
    id: 3,
    name: 'Titan Kettlebell',
    description: 'Cast iron kettlebell with a powder-coated finish for superior grip. Available in 8-32kg.',
    price: 500,
    imageUrl: 'https://picsum.photos/seed/kettlebell/400/400',
    category: 'Strength',
  },
  {
    id: 4,
    name: 'Kinetic Resistance Bands',
    description: 'Set of 5 premium latex bands for versatile strength training and physical therapy.',
    price: 200,
    imageUrl: 'https://picsum.photos/seed/bands/400/400',
    category: 'Accessories',
  },
  {
    id: 5,
    name: 'Pulse Foam Roller',
    description: 'Deep tissue massage roller to relieve muscle soreness and improve recovery.',
    price: 350,
    imageUrl: 'https://picsum.photos/seed/roller/400/400',
    category: 'Recovery',
  },
  {
    id: 6,
    name: 'HydraFlow Steel Bottle',
    description: '24oz insulated stainless steel bottle. Keeps your drinks cold for 24 hours.',
    price: 300,
    imageUrl: 'https://picsum.photos/seed/bottle/400/400',
    category: 'Accessories',
  },
];

export const PRINTS: Print[] = [
    {
      id: 1,
      name: 'The Final Push',
      description: 'A powerful shot capturing the raw emotion of a weightlifter at the peak of their lift.',
      price: 450,
      imageUrl: 'https://picsum.photos/seed/print1/400/600',
      category: 'Photography',
    },
    {
      id: 2,
      name: 'Morning Run',
      description: 'A serene photograph of a lone runner against a stunning sunrise, embodying peace and determination.',
      price: 550,
      imageUrl: 'https://picsum.photos/seed/print2/400/600',
      category: 'Photography',
    },
    {
      id: 3,
      name: 'Victory Leap',
      description: 'A dynamic image of a basketball player soaring through the air for a slam dunk.',
      price: 500,
      imageUrl: 'https://picsum.photos/seed/print3/400/600',
      category: 'Photography',
    },
    {
      id: 4,
      name: 'Focused Mind',
      description: 'A close-up of a yoga practitioner in a moment of deep concentration and balance.',
      price: 400,
      imageUrl: 'https://picsum.photos/seed/print4/400/600',
      category: 'Photography',
    },
];


export const SERVICES: Service[] = [
  {
    id: 1,
    name: 'Private Studio Booking',
    description: 'Book our fully-equipped private fitness studio for your personal workouts or content creation.',
    price: '500 SEK/hr',
    category: ServiceCategory.STUDIO,
    imageUrl: 'https://picsum.photos/seed/studio/600/400',
  },
  {
    id: 2,
    name: 'HIIT Bootcamp',
    description: 'High-Intensity Interval Training group class. Burn calories and build strength in a motivating environment.',
    price: '250 SEK/class',
    category: ServiceCategory.CLASSES,
    imageUrl: 'https://picsum.photos/seed/bootcamp/600/400',
  },
  {
    id: 3,
    name: '1-on-1 Personal Training',
    description: 'Get a personalized workout plan and expert guidance from our certified personal trainers.',
    price: '800 SEK/session',
    category: ServiceCategory.PT,
    imageUrl: 'https://picsum.photos/seed/pt/600/400',
  },
  {
    id: 4,
    name: 'Athlete Brand Photoshoot',
    description: 'A dedicated session in our creative studio to capture high-quality, sporty photos for your brand.',
    price: 'Starting at 3000 SEK',
    category: ServiceCategory.CREATIVE,
    imageUrl: 'https://picsum.photos/seed/photoshoot/600/400',
  },
  {
    id: 5,
    name: 'Content Creator Package',
    description: 'Comprehensive service including content strategy, creation, and promotion to build your fitness brand.',
    price: 'Starting at 4000 SEK',
    category: ServiceCategory.CREATIVE,
    imageUrl: 'https://picsum.photos/seed/content/600/400',
  },
  {
    id: 6,
    name: 'Vinyasa Flow Yoga',
    description: 'A dynamic yoga class that synchronizes movement with breath. All levels welcome.',
    price: '200 SEK/class',
    category: ServiceCategory.CLASSES,
    imageUrl: 'https://picsum.photos/seed/yoga/600/400',
  },
];

export const ATHLETE_SHOOT_OPTIONS = {
  BASE_PRICE: 3000,
  EXTRA_PHOTOS_PRICE: 750, // Per 5 extra photos
  SHOT_TYPES: ['Portraits', 'Action Photographs'],
};

export const CONTENT_CREATOR_OPTIONS = [
  { name: 'Brand Photography', price: 4000 },
  { name: 'Promotional Videos (2x)', price: 6000 },
  { name: 'Website Development', price: 15000 },
];

export const TRAINERS: Trainer[] = [
    {
      id: 1,
      name: 'Alex "The Anchor" Johnson',
      specialty: 'Strength & Conditioning',
      imageUrl: 'https://picsum.photos/seed/trainer1/400/400',
      rate: 900,
    },
    {
      id: 2,
      name: 'Jasmine "Zen" Lee',
      specialty: 'Yoga & Mobility',
      imageUrl: 'https://picsum.photos/seed/trainer2/400/400',
      rate: 750,
    },
    {
      id: 3,
      name: 'Marco "The Matrix" Diaz',
      specialty: 'HIIT & Functional Fitness',
      imageUrl: 'https://picsum.photos/seed/trainer3/400/400',
      rate: 850,
    },
];

export const IconShoppingCart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

export const IconMessageCircle = (props: React.SVGProps<SVGSVGElement>) => (
    // FIX: Corrected typo in viewBox attribute
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
    </svg>
);

export const IconSend = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

export const IconX = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const IconDumbbell = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="9" width="4" height="6" rx="1" />
        <rect x="18" y="9" width="4" height="6" rx="1" />
        <line x1="6" y1="12" x2="18" y2="12" />
    </svg>
);

export const IconUsers = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M20 8v6" />
        <path d="M23 11h-6" />
    </svg>
);

export const IconCamera = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
        <circle cx="12" cy="13" r="3"/>
    </svg>
);

export const IconSparkles = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9L12 18l1.9-5.8 5.8-1.9-5.8-1.9L12 3z"/>
        <path d="M5 3v4"/>
        <path d="M19 17v4"/>
        <path d="M3 5h4"/>
        <path d="M17 19h4"/>
    </svg>
);

export const IconWallet = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
    </svg>
);

export const IconHome = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

export const IconStore = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
        <path d="M2 7h20" />
        <path d="M22 7v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7" />
    </svg>
);

export const IconCalendar = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

export const IconImage = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
);

export const IconTrendingUp = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
    </svg>
);


export const IconSun = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

export const IconMoon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

export const IconUserCheck = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
    </svg>
);

export const IconCreditCard = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
);

export const IconGooglePay = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19.33,9.63H19.33A5.43,5.43,0,0,0,14.2,4.4a5.21,5.21,0,0,0-5.12,5.23H4.67a5.38,5.38,0,0,0,0,10.75H14.2v-1.7H4.67a3.68,3.68,0,1,1,0-7.35H14.2V9.63Zm0,0" />
        <path d="M14.2,14.94h3.4a1.7,1.7,0,1,0,0-3.4H14.2Zm0,0" />
        <path d="M10.66,9.81a3.54,3.54,0,0,1,3.54-3.53h0a3.54,3.54,0,0,1,3.54,3.53v4.29H10.66Zm0,0" />
    </svg>
);

export const IconApplePay = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M10.5,13.1c-0.2,1-0.3,2-0.5,3c-0.1,0.6-0.2,1.2-0.4,1.8c-0.8,2.5,0.4,4.3,1.3,4.5c0.8,0.2,1.3-0.5,2.7-0.5c1.4,0,1.8,0.5,2.7,0.5c0.9-0.2,2.1-2,1.3-4.5c-0.2-0.6-0.3-1.2-0.4-1.8c-0.2-1-0.3-2-0.5-3c-0.6-2.5-1.9-4.2-3.3-4.5C12.4,8.9,11.1,10.6,10.5,13.1z" />
        <path d="M14.4,8.1c0.7-0.9,1.2-2.3,1-3.6c-0.9,0-2.2,0.7-3,1.6C11.6,7,12,8.4,12.2,9.6C13,9.4,13.8,8.9,14.4,8.1z" />
    </svg>
);

export const IconSwish = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3.8 8.2a2.4 2.4 0 0 1 3.4 0L12 13l4.8-4.8a2.4 2.4 0 0 1 3.4 3.4l-6.5 6.5a2.4 2.4 0 0 1-3.4 0L3.8 11.6a2.4 2.4 0 0 1 0-3.4Z" />
    </svg>
);

export const IconLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2 9v6h4V9H2zm16 0v6h4V9h-4zM8 4h8v16H8V4z" />
  </svg>
);