import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMealById } from "../api/TheMealDB";

import Navbar from "./Navbar";

import "../styles/Recipe.css";

const Recipe = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [tags, setTags] = useState([]);

  // Retrieve recipe info
  useEffect(() => {
    const fetchRecipeData = async () => {
      await getMealById(params.id).then((res) => {
        const mealData = res.meals[0];
        setRecipe(mealData);

        // Set Up Ingredients
        let ingredient = "strIngredient";
        for (let i = 1; i <= 20; i++) {
          let combinedIngred = ingredient + i;
          if (
            mealData[combinedIngred] === "" ||
            mealData[combinedIngred === null]
          )
            break;
          setIngredients((prevArray) => [
            ...prevArray,
            mealData[combinedIngred],
          ]);
        }

        // Parse Tags
        if (mealData.strTags !== null) setTags(mealData.strTags.split(","));

        // Parse Instructions
        if (mealData.strInstructions !== null) {
          let instr = mealData.strInstructions.split(".");
          setInstructions(
            instr.filter((word) => {
              return word.length > 5;
            })
          );
        }
      });
    };

    fetchRecipeData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <div className="recipe-container">
        <div className="recipe-content">
          <h1>{recipe.strMeal}</h1>
          <div className="recipe-desc">Region: {recipe.strArea}</div>
          <div className="recipe-desc">Category: {recipe.strCategory}</div>
          <img className="recipe-img" src={recipe.strMealThumb} alt="" />
          {tags?.length !== 0 && (
            <div className="recipe-tags">
              <i className="fa fa-tags"></i>
              <div>
                {tags.map((tag, i) => {
                  if (i !== tags.length - 1)
                    return <span key={i}>{tag}, </span>;
                  return <span key={i}>{tag}</span>;
                })}
              </div>
            </div>
          )}
          <div className="recipe-links">
            {recipe.strSource && (
              <a href={recipe.strSource} target="_blank" rel="noreferrer">
                <div className="recipe-source">
                  <div>Website</div>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </a>
            )}
            {recipe.strYoutube && (
              <a href={recipe.strYoutube} target="_blank" rel="noreferrer">
                <div className="recipe-youtube">
                  <div>Youtube</div>
                  <i className="fa-brands fa-youtube"></i>
                </div>
              </a>
            )}
          </div>
        </div>
        <div className="recipe-content">
          <div className="recipe-ingredient-container">
            <div className="recipe-ingredient-title">Ingredients</div>
            <div className="recipe-ingredient">
              {ingredients.map((ingredient, i) => {
                return (
                  <div key={i}>
                    {i + 1}. {ingredient}
                  </div>
                );
              })}
            </div>
          </div>
          {instructions?.length !== 0 && (
            <div className="recipe-instruction-container">
              <div className="recipe-instruction-title">Instructions</div>
              {instructions.map((instruction, i) => {
                return (
                  <div key={i} className="recipe-instruction">
                    {i + 1}. {instruction}.
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Recipe;
