import React, { useState } from "react";
import Card from "../Card/card";
import NewProducts from "../NewProducts/newProducts";
import "./products.css";

const Products = () => {
  const [showProducts, setShowProducts] = useState(false);

  const handleCloseModal = () => {
    setShowProducts(false);
  };

  return (
    <div className="products-container">
      <button
        className="add-product-button"
        onClick={() => setShowProducts(true)}
      >
        Adicionar Novo Produto
      </button>
      {showProducts && <NewProducts onClose={handleCloseModal} />}
      <div className="cards-container">
        <Card />
        {/* Adicione mais <Card /> conforme necessário */}
      </div>
    </div>
  );
};

export default Products;
