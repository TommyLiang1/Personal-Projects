import React, { useRef, useState, useEffect } from "react";
import {
  getMealByName,
  getRandomMeal,
  getCategories,
  getMealsByCategory,
} from "../api/TheMealDB";
import Navbar from "./Navbar";
import MenuItem from "./MenuItem";
import Category from "./Category";
import "../styles/RecipeApp.css";

const RecipeApp = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  const [category, setCategory] = useState([]);

  const menuItem = useRef();
  const mealIdList = localStorage.getItem("mealIds");

  // API: search recipe by name
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

  // API: get random recipe
  const retrieveRandomMeal = async () => {
    setMenuItems([]);
    await getRandomMeal().then((res) => {
      setMenuItems(res.meals);
      setErrorMsg("");
    });
  };

  // API: retrieve all meals in a category
  const updateMenuList = async (category) => {
    setMenuItems([]);
    let meals = [];

    await getMealsByCategory(category).then((res) => {
      meals = res.meals;
    });

    meals.map(async (meal) => {
      await getMealByName(meal.strMeal).then((res) => {
        setMenuItems((prevArray) => [...prevArray, res.meals[0]]);
      });
    });

    setErrorMsg("");
  };

  // API: retrieve all categories
  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories().then((res) => {
        setCategory(res.categories);
      });
    };

    fetchCategories();
  }, []);

  return (
    <div className="recipeApp-container">
      <Navbar />

      {category.length > 0 && (
        <div className="category-list-container">
          {category.map((cat) => {
            return (
              <div
                className="category-container"
                onClick={() => {
                  updateMenuList(cat.strCategory);
                }}
                key={cat.idCategory}
              >
                <Category category={cat} />
              </div>
            );
          })}
        </div>
      )}

      <div className="search-bar-container">
        <input ref={menuItem} type="text" placeholder="Search recipe" />
        <div className="search-button">
          <button onClick={searchMenuItem}>Search</button>
          <button onClick={retrieveRandomMeal}>Random</button>
        </div>
        <div className="error-msg">{errorMsg}</div>
      </div>

      {menuItems.length > 0 && (
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

      <br />
      <br />
    </div>
  );
};

export default RecipeApp;
