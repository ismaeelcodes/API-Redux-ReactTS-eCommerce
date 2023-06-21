
import { setProducts } from './features/fetch';
import { Product } from './fetch.types';
import { AppThunk } from './store';

export const fetchProducts = (): AppThunk => {
  return (dispatch) => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then((products: Product[]) => dispatch(setProducts(products)))
      .catch(error => {
        // Handle error if necessary
        console.error('Error fetching products:', error);
      });
  };
};