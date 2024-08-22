import React, { useState } from "react";
import "./cart.css";
import NewOrder from "../NewOrder/newOrder";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main>
      <h2 className="title">Meus Pedidos</h2>
      <button className="open-modal-btn" onClick={openModal}>
        Novo Pedido
      </button>
      
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

      

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <NewOrder />
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
