
import { setProducts } from './features/fetch';
import { Product } from './fetch.types';
import { AppThunk } from './store';

export const fetchProducts = (sorter: string): AppThunk => {
  return (dispatch) => {
    fetch(`https://fakestoreapi.com/products?sort=${sorter}`)
      .then(response => response.json())
      .then((products: Product[]) => dispatch(setProducts(products)))
      .catch(error => {
        // Handle error if necessary
        console.error('Error fetching products:', error);
      });
  };
};