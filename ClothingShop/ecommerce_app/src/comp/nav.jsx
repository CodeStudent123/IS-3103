import React from "react";
import { Link } from "react-router-dom";
import "./styling/nav.css"; 

const Nav = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <h2 className="logo">🛍️ ClothingShop</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Products</Link></li>
        <li><Link to="/cart">Cart ({cartCount})</Link></li>
        <li><Link to="/order">Order</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
