import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/home";
import Products from "./components/Products/products";
import NewOrder from "./components/NewOrder/newOrder";
import Cart from "./components/Cart/cart";

function routes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/newOrder" element={<NewOrder />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default routes;
