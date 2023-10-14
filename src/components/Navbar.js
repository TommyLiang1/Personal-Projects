import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-title">Recipe Cook Book</div>
      <div>
        <NavLink className="nav-item" to="/">
          Home
        </NavLink>
        <NavLink className="nav-item" to="/favorite">
          Favorite Meals
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
