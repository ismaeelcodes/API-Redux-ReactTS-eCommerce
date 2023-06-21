import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./fetchproducts";
import { fetchCategories } from "./fetchcategories";
import { RootState, AppDispatch } from "./store";

import './App.css'

export default function App() {
  const dispatch = useDispatch<AppDispatch>(); // Specify the type of the dispatch function
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectSort, setSelectSort] = useState<string>('')
  const [priceSlider, setPriceSlider] = useState<number>(0)
  useEffect(() => {
    const sorter = selectSort === '' ? 'asc' : selectSort
    dispatch(fetchProducts(sorter));
    dispatch(fetchCategories())
  }, [dispatch, selectSort]); // Include 'dispatch' as a dependency

  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => state.products.categories)
  



  
  
  const handleCategoryClick = (category: string) => {
    if(category === "All"){
      setSelectedCategory(null)
      return
    }
    setSelectedCategory(category);
  };

  const handleSelectSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSort(e.target.value)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ourNumber = parseInt(e.target.value)
    setPriceSlider(ourNumber)
  }

  const ourCategories = categories.map((category) => (
    <span className="categorySpan" onClick={() => handleCategoryClick(category)}>{category}</span>
  ) )

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory && product.price >= priceSlider)
    : products.filter((product) => product.price >= priceSlider);

  const ourProducts = filteredProducts.map((product) => (
    <div key={product.id} className="productDiv">
      <img src={product.image} className="productImg" alt={product.title} />
      <h3 className="productTitle">{product.title}</h3>
      <p className="productPrice">${product.price}</p>
      {/* Render other product properties as needed */}
    </div>
  ));
  
  

  return (
    <div className="container">
     <aside className="asideContainer">
     <input type="range" min="1" max="100" value={priceSlider} id="myRange" onChange={(event) => handlePriceChange(event)}/>
     {<span>{priceSlider}</span>}
      <span className="categorySpan" onClick={() => handleCategoryClick("All")}>All</span>
      {ourCategories}
     </aside>
     <div>
     <select className="selectSort" value={selectSort} onChange={(event) => handleSelectSort(event)}>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
      
     <section className="productContainer" >
      
     {ourProducts}
     </section>
     </div>
    </div>
  );
}