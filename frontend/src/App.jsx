import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Auth from "./pages/login";
import Boutique from "./pages/boutique";



function App() {
  return (
    <div className="flex flex-col min-h-screen">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/boutique" element={<Boutique />} />
    </Routes>
    </div>
  );
}

export default App;
