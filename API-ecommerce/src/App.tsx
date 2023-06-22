import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./fetchproducts";
import { fetchCategories } from "./fetchcategories";
import { RootState, AppDispatch } from "./store";

import './App.css'

export default function App() {
  const dispatch = useDispatch<AppDispatch>(); // Specifying the type of the dispatch function
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Intializing States
  const [selectSort, setSelectSort] = useState<string>('')
  const [priceSlider, setPriceSlider] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const sorter = selectSort === '' ? 'asc' : selectSort
    dispatch(fetchProducts(sorter));
    dispatch(fetchCategories())
  }, [dispatch, selectSort]); // Sorter useEffect which runs everytime our sort select changes value or dispatch 

  // calling our states
  const products = useSelector((state: RootState) => state.products.products); 
  const categories = useSelector((state: RootState) => state.products.categories)
   
  // max price calculator
  const maxPrice = products.reduce((max, product) => { // Takes a block variable max, and our product as params
    return product.price > max ? product.price : max; // checks if product's price is bigger than max, if so returns price, otherwise returns max as the new comparison.
  }, 0); // starter value of 0
  


  
  // Sets Category on click
  const handleCategoryClick = (category: string) => {
    if(category === "All"){
      setSelectedCategory(null)
      return
    }
    setSelectedCategory(category);
  };

  // Sets Sorting method on select
  const handleSelectSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSort(e.target.value)
  }

  // Sets Slider Value on Change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ourNumber = parseInt(e.target.value)
    setPriceSlider(ourNumber)
  }

  // Category mapper
  const ourCategories = categories.map((category) => (
    <span className="categorySpan" onClick={() => handleCategoryClick(category)}>{category}</span>
  ) )

  // Product Filter which filters our products according to 3 factors: selectory category, search query and price
  const filteredProducts = selectedCategory
  ? products.filter(
      (product) => product.category === selectedCategory && product.title.toLowerCase().includes(searchQuery.toLowerCase()) && product.price >= priceSlider
    )
  : products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()) && product.price >= priceSlider);

  const ourProducts = filteredProducts.map((product) => (
    <div key={product.id} className="productDiv">
      <img src={product.image} className="productImg" alt={product.title} />
      <h3 className="productTitle">{product.title}</h3>
      <p className="productPrice">${product.price}</p>
      {/* Render other product properties as needed */}
    </div>
  ));
  
  

  return (
   <div className="searchBar">
   <input
  type="text"
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
    <div className="container">
      
     <aside className="asideContainer">
     <div className="priceCont">
      <span>Price</span>
     <input type="range" min="0" max={maxPrice} value={priceSlider} id="myRange" onChange={(event) => handlePriceChange(event)}/>
     {<span>${priceSlider}</span>}
     </div>
      
      {ourCategories}
      <span className="categorySpan" onClick={() => handleCategoryClick("All")}>All</span>
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
    </div>
  );
}