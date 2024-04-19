import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-main">
        <Link to="/" className="logo">TEXT 2 SQL</Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/how-to-use">How to Use</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
