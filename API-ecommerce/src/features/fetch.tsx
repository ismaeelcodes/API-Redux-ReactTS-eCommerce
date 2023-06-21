import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../fetch.types';



interface State {
  products: Product[];
}

const initialState: State = {
  products: [],
};


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      setProducts: (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      },
    },
  });
  
  export const { setProducts } = productsSlice.actions;
  export default productsSlice.reducer;