import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { checkAdmin } from "../AuthPage/auth"; // Certifique-se de que esta função está corretamente implementada
import Card from "../Card/card";
import NewProducts from "../NewProducts/newProducts";
import "./products.css";

const Products = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const adminStatus = await checkAdmin();
      setIsAdmin(adminStatus);
    };

    fetchAdminStatus();
  }, []);

  const handleCloseModal = () => {
    setShowProducts(false);
  };

  return (
    <div className="products-container">
      {isAdmin && (
        <button
          className="add-product-button"
          onClick={() => setShowProducts(true)}
        >
          Adicionar Novo Produto
        </button>
      )}
      {showProducts && <NewProducts onClose={handleCloseModal} />}
      <div className="cards-container">
        <Card />
      </div>
    </div>
  );
};

export default Products;
