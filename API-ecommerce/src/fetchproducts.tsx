
import { setProducts } from './features/fetch';
import { Product } from './fetch.types';
import { AppThunk } from './store';

// product fetcher which takes a string and API calls according to the string 
export const fetchProducts = (sorter: string): AppThunk => {
  return (dispatch) => {
    fetch(`https://fakestoreapi.com/products?sort=${sorter}`) // sorter might be ASC or Desc
      .then(response => response.json())
      .then((products: Product[]) => dispatch(setProducts(products))) // Defines products type and dispatches our Reducer function and sends it the data
      .catch(error => {
        // Handles error if necessary
        console.error('Error fetching products:', error);
      });
  };
};