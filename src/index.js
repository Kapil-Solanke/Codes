import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import AppContextProvider from "./context/AppContext";
ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
