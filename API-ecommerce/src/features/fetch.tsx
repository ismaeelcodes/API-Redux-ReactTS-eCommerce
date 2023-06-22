import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../fetch.types';
import { State } from '../fetch.types'



// Initializing state
const initialState: State = {
  products: [],
  categories: [],
};

// Slicer
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      setProducts: (state, action: PayloadAction<Product[]>) => { // Product Setter function which sets the state to the data recieved
        state.products = action.payload;
        console.log(state.products)
      },
      setCategories: (state, action: PayloadAction<string[]>) => { // Category setter function which sets the categories to the data recieved
        state.categories = action.payload
      },
    },
  });
  
  // Exporting reducers
  export const { setProducts, setCategories } = productsSlice.actions;
  export default productsSlice.reducer;