import React from "react";
import "./card.css";

const products = [
  {
    id: "1",
    name: "Alface",
    price: "R$ 2,00",
    image: "../../images/alface.jpg",
  },
  {
    id: "2",
    name: "Maçã",
    price: "R$ 3,50",
    image: "../../images/maca.jpg",
  },
  {
    id: "3",
    name: "Goiaba",
    price: "R$ 4,99",
    image: "../../images/goiaba.jpg",
  },
  {
    id: "4",
    name: "Rúcula",
    price: "R$ 4,00",
    image: "../../images/rucula.jpg",
  },
  {
    id: "5",
    name: "Tomate",
    price: "R$ 4,00",
    image: "../../images/tomate.jpg",
  },
];

const Card = () => {
  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} alt={`Imagem de ${product.name}`} />
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
