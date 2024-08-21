import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/home";
import Products from "./components/Products/products";
import NewOrder from "./components/NewOrder/newOrder";
import Cart from "./components/Cart/cart";
import AuthPage from "./components/AuthPage/authPage";

function routes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/newOrder" element={<NewOrder />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/authPage" element={<AuthPage />}/>
    </Routes>
  );
}

export default routes;
