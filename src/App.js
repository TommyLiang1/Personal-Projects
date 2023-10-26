import "./App.css";
import { BrowserRouter as HashRouter, Route, Routes } from "react-router-dom";
import RecipeApp from "./components/RecipeApp";
import Favorite from "./components/Favorite";
import Recipe from "./components/Recipe";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RecipeApp />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
