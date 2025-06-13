import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import RestaurantPicker from "./components/ResturuantPicker";
import RestaurantView from "./components/Resturuant";

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/restaurants" element={<RestaurantPicker />} />
        <Route path="/restaurant/:placeid" element={<RestaurantView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
