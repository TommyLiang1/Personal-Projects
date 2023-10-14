import React, { useEffect, useState } from "react";
import { addFavMeal, removeFavMeal } from "../api/TheMealDB";
import "../styles/MenuItem.css";

const MenuItem = (props) => {
  const [item, setItem] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [heart, setHeart] = useState(props.heart);

  const toggleFavorite = () => {
    if (!heart) addFavMeal(item.idMeal);
    else removeFavMeal(item.idMeal);

    setHeart(!heart);
  };

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  useEffect(() => {
    let ingredient = "strIngredient";
    for (let i = 1; i <= 20; i++) {
      let combinedIngred = ingredient + i;
      if (props.item[combinedIngred] === "") break;
      setIngredients((prevArray) => [...prevArray, props.item[combinedIngred]]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="menuItem-container">
      <h1 className="meal-name">{item.strMeal}</h1>
      <div className="meal-desc">Region: {item.strArea}</div>
      <div className="meal-desc">Category: {item.strCategory}</div>
      <div className="meal-ingredient">
        Ingredients ({ingredients.length})
        <div className="meal-ingredient-list">
          {ingredients.map((ingredient, i) => {
            return <span key={i}> {ingredient} |</span>;
          })}
        </div>
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
