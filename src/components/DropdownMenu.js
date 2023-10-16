import React from "react";

import "../styles/DropdownMenu.css";

const DropdownMenu = (props) => {
  const ingredients = props.ingredients;

  return (
    <div className="dropdown-container">
      <div className="meal-desc">Region: {props.area}</div>
      <div className="meal-desc">Category: {props.category}</div>
      <div>
        Ingredients ({ingredients.length})
        <div className="meal-ingredient-list">
          {ingredients.map((ingredient, i) => {
            return <span key={i}> {ingredient} |</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
