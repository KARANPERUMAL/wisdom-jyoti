import React from "react";
import { createRoot } from "react-dom/client";
import App from "./AppPages.jsx";
import "./styles.css";
import "./styles-v2.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
