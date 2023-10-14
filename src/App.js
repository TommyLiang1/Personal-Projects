import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeApp from "./components/RecipeApp";
import Favorite from "./components/Favorite";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeApp />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </Router>
  );
}

export default App;
