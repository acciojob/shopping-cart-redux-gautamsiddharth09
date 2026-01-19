
import React from "react";
import './../styles/App.css';
import Cart from "./Cart";
import WishList from "./WishList";
import Product from "./Product";

const App = () => {
  return (
    <div>
      
        <Cart />
        <Product />
        <WishList />
    </div>
  )
}

export default App
