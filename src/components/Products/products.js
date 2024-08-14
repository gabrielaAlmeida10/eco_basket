import React from "react";
import { useState } from "react";
import Card from "../Card/card";
import NewProducts from "../NewProducts/newProducts";

const Produtcs = () => {
  const [showProducts, setShowProducts] = useState(false);
  return (
    <div>
      <button onClick={() => setShowProducts(!showProducts)}>
        Adicionar Novo Produto
      </button>
      {showProducts && <NewProducts />}
      <Card />
    </div>
  );
};

export default Produtcs;
