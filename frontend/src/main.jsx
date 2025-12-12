import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import NavBar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Bulle from "./components/bulle.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Bulle />
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
