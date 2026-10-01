// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Suspense } from "react";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Suspense
    fallback={
      <div
        style={{
          display: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "lightgray",
          textAlign: "center",
          lineHeight: "100vh",
        }}
      >
        Loading...
      </div>
    }
  >
    <App />
  </Suspense>,
  // </StrictMode>,
);
