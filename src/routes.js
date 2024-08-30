import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/home";
import Products from "./components/Products/products";
import NewOrder from "./components/NewOrder/newOrder";
import Cart from "./components/Cart/cart";
import AuthPage from "./components/AuthPage/authPage";
import AdminRegisterPage from './components/AuthPage/adminRegisterPage';
import OrderSummary from "./components/NewOrder/orderSummary";

function routes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/newOrder" element={<NewOrder />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/authPage" element={<AuthPage />}/>
      <Route path="/adminRegister" element={<AdminRegisterPage />}/>
      <Route path="/orderSummary" element={<OrderSummary />}/>
    </Routes>
  );
}

export default routes;
