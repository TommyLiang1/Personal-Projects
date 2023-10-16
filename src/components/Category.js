import React from "react";

import "../styles/Category.css";

const Category = (props) => {
  const category = props.category;
  return (
    <div>
      <h1 className="category-name">{category.strCategory}</h1>
      <img className="category-img" src={category.strCategoryThumb} alt="" />
    </div>
  );
};

export default Category;
