import "./App.css";
// eslint-disable-next-line
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import RecipeApp from "./components/RecipeApp";
import Favorite from "./components/Favorite";
import Recipe from "./components/Recipe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RecipeApp />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/recipe/:id" element={<Recipe />} />
    </Routes>
  );
}

export default App;
