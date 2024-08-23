import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "./newProducts.css";

const NewProducts = ({ onClose }) => {
  const storage = getStorage();
  const db = getFirestore(); // Firestore para salvar os dados do produto
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [message, setMessage] = useState(""); // Adiciona o estado para a mensagem

  const onProductSubmit = async (event) => {
    event.preventDefault();
    try {
      // Cria um documento para o produto no Firestore
      const productRef = doc(db, "products", new Date().getTime().toString());
      
      let imageURL = "";
      if (productImage) {
        const imageRef = ref(storage, `products/${productImage.name}`);
        await uploadBytes(imageRef, productImage);
        imageURL = await getDownloadURL(imageRef);
      }

      // Salva os dados do produto no Firestore
      await setDoc(productRef, {
        name: productName,
        price: parseFloat(productPrice),
        imageURL: imageURL,
      });

      setMessage("Produto cadastrado com sucesso!");
      setProductName("");
      setProductPrice("");
      setProductImage(null);
    } catch (error) {
      setMessage(`Erro no cadastro do produto: ${error.message}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form className="formProducts" onSubmit={onProductSubmit}>
          <label htmlFor="productName">Nome do Produto:</label>
          <input
            type="text"
            id="productName"
            placeholder="Nome do Produto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <label htmlFor="productPrice">Preço do Produto:</label>
          <input
            type="number"
            id="productPrice"
            placeholder="Preço do Produto"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
          <label htmlFor="productImage">Imagem do Produto (Opcional):</label>
          <input
            type="file"
            id="productImage"
            onChange={(e) => setProductImage(e.target.files[0])}
          />
          <input type="submit" value="Cadastrar Produto" />
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewProducts;
