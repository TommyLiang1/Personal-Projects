import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "../styles/Navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

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
      <div className="mobile">
        <i
          id="mobile-icon"
          onClick={handleClick}
          className={clicked ? "fas fa-times" : "fas fa-bars"}
        ></i>
        <div className={clicked ? "mobile-links active" : "mobile-links"}>
          <NavLink className="mobile-nav-item" to="/">
            Home
          </NavLink>
          <NavLink className="mobile-nav-item" to="/favorite">
            Favorite Meals
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
