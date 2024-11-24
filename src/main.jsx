import React from "react";
import ReactDOM from "react-dom/client";
import UrlRouter from "./routes/UrlRouter.jsx";
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <UrlRouter />
  </React.StrictMode>
);
