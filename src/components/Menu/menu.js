import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import carrinho from '../../images/carrinho.png';

const Menu = () => {
  return (
    <header id="main-header">
      <div className="header-content">
        <div className="left-menu">
          <Link to="/home">
            <h3>Home</h3>
          </Link>
          <Link to="/products">
            <h3>Produtos</h3>
          </Link>
          {/* <Link to="/newOrder">
            <h3>Novo Pedido</h3>
          </Link> */}
        </div>
        <Link to='/cart' className="right-menu">
          <img src={carrinho} alt="Cart" />
        </Link>
      </div>
    </header>
  );
};

export default Menu;
