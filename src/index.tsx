import React from "react";
import ReactDOM from "react-dom/client";
import HymnalApp from "./HymnalApp.tsx";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HymnalApp />
  </React.StrictMode>
);


