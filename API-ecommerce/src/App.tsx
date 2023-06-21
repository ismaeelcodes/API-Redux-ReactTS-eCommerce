import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./fetchproducts";
import { RootState, AppDispatch } from "./store";

export default function App() {
  const dispatch = useDispatch<AppDispatch>(); // Specify the type of the dispatch function

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]); // Include 'dispatch' as a dependency

  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image}/>
          <h3>{product.title}</h3>
          <p>{product.price}</p>
          {/* Render other product properties as needed */}
        </div>
      ))}
    </div>
  );
}