import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/Header/header";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <div className="page-background">
      <span id="calc_text">Calculator</span>
      <App />
      <footer>
        <div className="footer">
          Author: William Pottey <br />
          &copy; Copyright Reserved <br />
          <div>
            Contact:{" "}
            <a href="mailto:Williampottey@gmail.com">Williampottey@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  </StrictMode>
);
