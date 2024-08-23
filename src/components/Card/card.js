import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import "./card.css";

const Card = () => {
  const [products, setProducts] = useState([]);
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Referência à coleção de produtos no Firestore
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map((doc) => doc.data());

        // Atualiza o estado com os produtos
        setProducts(productsList);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error.message);
      }
    };

    fetchProducts();
  }, [db]);

  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.name} className="product">
          {/* Renderiza a imagem do produto */}
          {product.imageURL ? (
            <img
              src={product.imageURL}
              alt={`Imagem de ${product.name}`}
              className="product-image"
            />
          ) : (
            <div className="no-image">Imagem não disponível</div>
          )}
          <p>{product.name}</p>
          <p>{`R$ ${product.price.toFixed(2)}`}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
