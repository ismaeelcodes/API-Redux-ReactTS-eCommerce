import { setCategories } from './features/fetch';
import { AppThunk } from './store';

export const fetchCategories = (): AppThunk => {
  return (dispatch) => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then((categories: string[]) => dispatch(setCategories(categories)))
      .catch(error => {
        // Handle error if necessary
        console.error('Error fetching products:', error);
      });
  };
};