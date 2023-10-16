// https://www.themealdb.com/api.php

export const getRandomMeal = async () => {
  const fetchedData = await fetch(
    "https://themealdb.com/api/json/v1/1/random.php"
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return fetchedData;
};

export const getMealByName = async (name) => {
  const fetchedData = await fetch(
    "https://themealdb.com/api/json/v1/1/search.php?s=" + name
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};

export const getMealById = async (id) => {
  const fetchedData = await fetch(
    "https://themealdb.com/api/json/v1/1/lookup.php?i=" + id
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};

export const getCategories = async () => {
  const fetchedData = await fetch(
    "https://themealdb.com/api/json/v1/1/categories.php"
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};

export const getMealsByCategory = async (category) => {
  const fetchedData = await fetch(
    "https://themealdb.com/api/json/v1/1/filter.php?c=" + category
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return fetchedData;
};

export const addFavMeal = (mealId) => {
  const mealIds = getFavMeals();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
};

export const removeFavMeal = (mealId) => {
  const mealIds = getFavMeals();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
};

const getFavMeals = () => {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
};
