import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Login from "./pages/login";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
