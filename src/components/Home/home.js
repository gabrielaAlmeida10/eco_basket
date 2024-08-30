// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import Card from "../Card/card";
import { getAuth } from "firebase/auth";
import './home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <main>
      <section className="apresentacao">
        <h1>Bem-vindo à Cooperativa de Produtos Orgânicos</h1>
        <p>
          Somos uma cooperativa comprometida em fornecer produtos orgânicos
          frescos e saudáveis para nossos clientes. Trabalhamos em parceria com
          produtores locais, garantindo qualidade e sustentabilidade em cada
          produto que oferecemos.
        </p>
      </section>
    
      {user && (
        <>
          <h2>Alguns de nossos produtos</h2>
          <section className="produtos">
            <Card />
          </section>
        </>
      )}
    </main>
  );
};

export default Home;
