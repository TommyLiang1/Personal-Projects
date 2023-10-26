import React, { useState, useEffect } from "react";
import { getMealById } from "../api/TheMealDB";

import Navbar from "./Navbar";
import MenuItem from "./MenuItem";

import "../styles/Favorite.css";

const Favorite = () => {
  const mealIdList = JSON.parse(localStorage.getItem("mealIds"));
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  // Retrieve meals from Local Storage
  useEffect(() => {
    if (mealIdList !== null && mealIdList.length > 0) {
      mealIdList.map(async (mealId) => {
        const meal = await getMealById(mealId);
        setFavoriteMeals((prev) => [...prev, meal.meals[0]]);
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      {favoriteMeals?.length === 0 ? (
        <div className="favorite-empty">
          <div>No Favorite Meals</div>
          <a href="/">Add A Favorite Meal</a>
        </div>
      ) : (
        <div>
          <div className="favorite-title">Favorite Meals</div>
          <div className="favorite-menu-container">
            {favoriteMeals.map((item) => {
              return <MenuItem key={item.idMeal} item={item} heart={true} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;
