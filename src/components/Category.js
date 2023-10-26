import React from "react";

import "../styles/Category.css";

const Category = (props) => {
  const category = props.category;
  return (
    <>
      <h1 className="category-name">{category.strCategory}</h1>
      <img className="category-img" src={category.strCategoryThumb} alt="" />
    </>
  );
};

export default Category;
