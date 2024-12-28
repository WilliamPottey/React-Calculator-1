import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/Header/header";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <span id="calc_text">Calculator</span>
    <App />
  </StrictMode>
);
