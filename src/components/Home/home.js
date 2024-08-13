import React from "react";
import Card from "../Card/card";

const Home = () => {
  return (
    <main>
      <section class="apresentacao">
        <h1>Bem-vindo à Cooperativa de Produtos Orgânicos</h1>
        <p>
          Somos uma cooperativa comprometida em fornecer produtos orgânicos
          frescos e saudáveis para nossos clientes. Trabalhamos em parceria com
          produtores locais, garantindo qualidade e sustentabilidade em cada
          produto que oferecemos.
        </p>
      </section>

      <h2>Alguns de nossos produtos</h2>
      <section class="produtos">
        <Card />
      </section>
    </main>
  );
};

export default Home;
