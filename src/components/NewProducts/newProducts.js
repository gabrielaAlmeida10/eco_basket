import React from "react";
import { useState } from "react";
const NewProducts = () => {
  const [newProducts, setNewProducts] = useState();

  const onProductSubimt = (event) => {
    event.preventDefault();
    console.log("botão clicado!");
  };

  return (
    <form className="formProducts" onSubmit={onProductSubimt}>
      <input type="text" id="productName" placeholder="Nome do Produto" />
      <input type="number" id="productPrice" placeholder="Preço do Produto" />
      <input type="text" id="productImage" placeholder="Imagem do Produto" />
      <input type="submit" value="Cadastrar Produto" />
    </form>
  );
};

export default NewProducts;
