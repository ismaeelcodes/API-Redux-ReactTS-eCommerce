import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import  productsReducer  from './features/fetch'

export const store = configureStore({
  reducer: {
    products: productsReducer
  },
})


// Defining Thunk Action Type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch