import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFavMeal, removeFavMeal } from "../api/TheMealDB";
import DropdownMenu from "./DropdownMenu";
import "../styles/MenuItem.css";

const MenuItem = (props) => {
  const [item, setItem] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [heart, setHeart] = useState(props.heart);
  const [dropdown, setDropdown] = useState(false);

  const navigate = useNavigate();

  // Add / Remove Meals to Local Storage
  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (!heart) addFavMeal(item.idMeal);
    else removeFavMeal(item.idMeal);

    setHeart(!heart);
  };

  // Set Recipe Item
  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  // Set Ingredients
  useEffect(() => {
    let ingredient = "strIngredient";
    for (let i = 1; i <= 20; i++) {
      let combinedIngred = ingredient + i;
      if (
        props.item[combinedIngred] === "" ||
        props.item[combinedIngred] === null
      )
        break;
      setIngredients((prevArray) => [...prevArray, props.item[combinedIngred]]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="menuItem-container"
      onClick={() => {
        navigate(`/recipe/${item.idMeal}`);
      }}
    >
      <h1 className="meal-name">{item.strMeal}</h1>

      <div>
        {!dropdown ? (
          <i
            className="fa fa-caret-down dropdown-icon"
            onClick={(e) => {
              e.stopPropagation();
              setDropdown(!dropdown);
            }}
          ></i>
        ) : (
          <i
            className="fa fa-caret-up dropdown-icon"
            onClick={(e) => {
              e.stopPropagation();
              setDropdown(!dropdown);
            }}
          ></i>
        )}
        {dropdown && (
          <DropdownMenu
            ingredients={ingredients}
            area={item.strArea}
            category={item.strCategory}
          />
        )}
      </div>

      <img className="meal-img" src={item.strMealThumb} alt="" />

      {heart ? (
        <i className="fa fa-heart full-heart" onClick={toggleFavorite}></i>
      ) : (
        <i
          className="fa-regular fa-heart empty-heart"
          onClick={toggleFavorite}
        ></i>
      )}
    </div>
  );
};

export default MenuItem;
