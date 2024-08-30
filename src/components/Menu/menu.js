// src/components/Menu.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, checkAdmin } from "../AuthPage/auth";
import "./menu.css";
import carrinho from '../../images/carrinho.svg';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Menu = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const adminStatus = await checkAdmin();
        setIsAdmin(adminStatus);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await logout();
    navigate("/authPage");
  };

  return (
    <header id="main-header">
      <div className="header-content">
        <div className="left-menu">
          <Link to="/home">
            <h3>Home</h3>
          </Link>
          {user && (
            <Link to="/products">
              <h3>Produtos</h3>
            </Link>
          )}
        </div>
        {user && (
          <Link to='/cart' className="right-menu">
            <img src={carrinho} alt="Cart" className="cart-icon" />
          </Link>
        )}
        {user ? (
          <>
            <button className="menu-button" onClick={handleLogout}>Logout</button>
            {isAdmin && (
              <Link to="/adminRegister">
                <button className="menu-button">Admin Page</button>
              </Link>
            )}
          </>
        ) : (
          <Link to='/authPage'>
            <button className="menu-button">Login</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Menu;
