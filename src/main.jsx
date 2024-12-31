import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/Header/header";

createRoot(document.getElementById("root")).render(
  <>
    <Header />
    <div className="page-background">
      <h1 className="about-header">Calculator</h1>
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
  </>
);
