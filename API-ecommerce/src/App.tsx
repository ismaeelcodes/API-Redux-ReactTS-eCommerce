import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./fetchproducts";
import { RootState, AppDispatch } from "./store";
import './App.css'

export default function App() {
  const dispatch = useDispatch<AppDispatch>(); // Specify the type of the dispatch function

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]); // Include 'dispatch' as a dependency

  const products = useSelector((state: RootState) => state.products.products);

  const ourProducts =  products.map((product) => (
    <div key={product.id} className="productDiv">
      <img src={product.image} className="productImg"/>
      <h3 className="productTitle">{product.title}</h3>
      <p className="productPrice">${product.price}</p>
      {/* Render other product properties as needed */}
    </div>
  ))

  return (
    <div className="container">
     {ourProducts}
    </div>
  );
}