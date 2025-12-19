import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./core/assets/css/App.css";
import { AppRouter } from "./router.ts";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>
);
