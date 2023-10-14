import React, { useRef, useState } from "react";
import { getMealByName, getRandomMeal } from "../api/TheMealDB";
import Navbar from "./Navbar";
import MenuItem from "./MenuItem";
import "../styles/RecipeApp.css";

const RecipeApp = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  const menuItem = useRef();

  const mealIdList = localStorage.getItem("mealIds");

  const searchMenuItem = async () => {
    if (menuItem.current.value === "") return;
    await getMealByName(menuItem.current.value).then((res) => {
      if (res.meals != null) {
        setMenuItems(res.meals);
        setErrorMsg("");
      } else {
        setErrorMsg("No search results for: " + menuItem.current.value);
      }
    });

    menuItem.current.value = "";
  };

  const retrieveRandomMeal = async () => {
    await getRandomMeal().then((res) => {
      setMenuItems(res.meals);
      setErrorMsg("");
    });
  };

  return (
    <div className="recipeApp-container">
      <Navbar />
      <div className="search-bar-container">
        <input ref={menuItem} type="text" placeholder="Search recipe" />
        <div className="search-button">
          <button onClick={searchMenuItem}>Search</button>
          <button onClick={retrieveRandomMeal}>Random</button>
        </div>
        <div className="error-msg">{errorMsg}</div>
      </div>

      {menuItems.length === 0 ? (
        <div>No Items</div>
      ) : (
        <div className="menu-list-container">
          {menuItems.map((item) => {
            return (
              <MenuItem
                key={item.idMeal}
                item={item}
                heart={mealIdList.includes(item.idMeal)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecipeApp;
