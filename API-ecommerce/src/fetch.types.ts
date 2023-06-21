export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export interface Product {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {
      count: number;
      rate: number;
    };
    title: string;
  }


