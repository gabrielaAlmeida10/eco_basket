import React from "react";
import "./newProducts.css";

const NewProducts = ({ onClose }) => {
  const onProductSubmit = (event) => {
    event.preventDefault();
    console.log("Produto cadastrado!");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form className="formProducts" onSubmit={onProductSubmit}>
          <input type="text" id="productName" placeholder="Nome do Produto" />
          <input type="number" id="productPrice" placeholder="Preço do Produto" />
          <input type="text" id="productImage" placeholder="Imagem do Produto" />
          <input type="submit" value="Cadastrar Produto" />
        </form>
      </div>
    </div>
  );
};

export default NewProducts;
