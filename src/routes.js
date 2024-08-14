import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/home";
import Products from "./components/Products/products";

function routes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}

export default routes;
