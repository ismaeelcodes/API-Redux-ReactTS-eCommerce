import { setCategories } from './features/fetch';
import { AppThunk } from './store';


// Category fetcher which works on the same logic as product fetcher
export const fetchCategories = (): AppThunk => {
  return (dispatch) => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then((categories: string[]) => dispatch(setCategories(categories))) // Defines categories type and dispatches reducer function
      .catch(error => {
        // Handles error if necessary
        console.error('Error fetching products:', error);
      });
  };
};