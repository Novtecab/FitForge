
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface Print {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export enum ServiceCategory {
  STUDIO = 'Studio',
  CLASSES = 'Classes & Bootcamps',
  PT = 'Personal Training',
  CREATIVE = 'Creative & Brand',
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  category: ServiceCategory;
  imageUrl: string;
}

export interface CartItem {
  uid: string; // unique id for cart item, e.g., 'product-1' or 'service-1-2024-01-01-10:00'
  id: number; // original product or service id
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  bookingDetails?: {
    date: string;
    time: string;
  };
  trainerName?: string;
  details?: string;
}

export interface Trainer {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  rate: number;
}