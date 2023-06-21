import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../fetch.types';



interface State {
  products: Product[];
  categories: string[];
}

const initialState: State = {
  products: [],
  categories: [],
};


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      setProducts: (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        console.log(state.products)
      },
      setCategories: (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload
      },
    },
  });
  
  export const { setProducts, setCategories } = productsSlice.actions;
  export default productsSlice.reducer;