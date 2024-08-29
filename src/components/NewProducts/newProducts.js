import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./newProducts.css";

const NewProducts = ({ onClose }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [message, setMessage] = useState("");

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.role === "admin");
        }
      }
    };

    fetchUserRole();
  }, [auth, db]);

  const onProductSubmit = async (event) => {
    event.preventDefault();

    try {
      // Check if user is an admin
      if (!isAdmin) {
        setMessage("Você não tem permissão para adicionar produtos.");
        return;
      }

      // Create a reference to the Firestore document
      const productRef = doc(db, "products", new Date().getTime().toString());

      let imageURL = "";
      if (productImage) {
        // Create a reference to the Firebase Storage path
        const imageRef = ref(storage, `products/${productImage.name}`);

        // Upload the image
        await uploadBytes(imageRef, productImage);
        imageURL = await getDownloadURL(imageRef);
      }

      // Save the product data to Firestore
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
      console.error("Erro no cadastro do produto:", error);
      setMessage(`Erro no cadastro do produto: ${error.message}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {isAdmin ? (
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
        ) : (
          <p className="message">Você não tem permissão para adicionar produtos.</p>
        )}
      </div>
    </div>
  );
};

export default NewProducts;
