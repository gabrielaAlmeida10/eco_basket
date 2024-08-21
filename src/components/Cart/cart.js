import React from "react";

import "./cart.css";

const Cart = () => {
  return (
    <main>
      <h2 className="title">Meus Pedidos</h2>
      <section className="pedidos">
        <div className="pedido">
          <h3>Pedido 1</h3>
          <p>Produtos:</p>
          <ul>
            <li className="carrinho-item">
              <span className="produto-nome">Maçã</span>
            </li>
            <li className="carrinho-item">
              <span className="produto-nome">Goiaba</span>
            </li>
          </ul>
          <p>Total: R$ 8,49</p>
        </div>
        <div className="pedido">
          <h3>Pedido 2</h3>
          <p>Produtos:</p>
          <ul>
            <li className="carrinho-item">
              <span className="produto-nome">Alface</span>
            </li>
            <li className="carrinho-item">
              <span className="produto-nome">Rucula</span>
            </li>
            <li className="carrinho-item">
              <span className="produto-nome">Tomate</span>
            </li>
          </ul>
          <p>Total: R$ 10,00</p>
        </div>
      </section>
    </main>
  );
};

export default Cart;
