import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/home">
          <h1>Home</h1>
        </Link>
        <Link to="/products">
          <h3>Produtos</h3>
        </Link>
      </div>
    </header>
  );
};

export default Menu;
