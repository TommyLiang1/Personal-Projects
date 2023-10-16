import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeApp from "./components/RecipeApp";
import Favorite from "./components/Favorite";
import Recipe from "./components/Recipe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeApp />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </Router>
  );
}

export default App;
