// src/components/AuthPage/AuthPage.js

import React, { useState } from "react";
import "./authPage.css";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebaseConfig"; // Importe a instância do Firebase Auth

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Nome para cadastro

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('login!');
      /*try {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirecionar ou exibir mensagem de sucesso
      } catch (error) {
        // Lidar com erros
        console.error(error.message);
      }*/
    } else {
      console.log('cadastro!');
      /*try {
        await createUserWithEmailAndPassword(auth, email, password);
        // Redirecionar ou exibir mensagem de sucesso
      } catch (error) {
        // Lidar com erros
        console.error(error.message);
      }*/
    }
  };

  return (
    <div className="auth-container">
      <div className="tabs">
        <button className={`tab ${isLogin ? 'active' : ''}`} onClick={handleToggle}>
          Login
        </button>
        <button className={`tab ${!isLogin ? 'active' : ''}`} onClick={handleToggle}>
          Cadastro
        </button>
      </div>
      <div className="form-container">
        <h2>{isLogin ? "Login" : "Cadastro"}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}
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
          <button type="submit">{isLogin ? "Entrar" : "Cadastrar"}</button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
