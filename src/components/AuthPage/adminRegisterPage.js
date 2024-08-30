// src/components/AdminRegisterPage.jsx
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./authPage.css";

const AdminRegisterPage = () => {
  const auth = getAuth();
  const db = getFirestore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salvar os dados do administrador no Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        address: address,
        role: "admin", // Define a função como 'admin'
      });

      setMessage("Admin cadastrado com sucesso!");
      navigate("/home"); // Redireciona para a página inicial após cadastro
    } catch (error) {
      setMessage(`Erro no cadastro: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2>Cadastro de Administrador</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="address">Endereço Residencial:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
          {message && <p className={`auth-message ${message.includes('Erro') ? 'error' : ''}`}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
