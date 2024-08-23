import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import carrinho from '../../images/carrinho.svg';

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
        </div>
        <Link to='/cart' className="right-menu">
          <img src={carrinho} alt="Cart" className="cart-icon" />
        </Link>
        <Link to='/authPage' >
         <button className="menu-button">Cadastro</button>
        </Link>
      </div>
    </header>
  );
};

export default Menu;
