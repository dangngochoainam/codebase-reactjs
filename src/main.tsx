import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./core/assets/css/App.css";
import { AppRouter } from "./router.ts";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./core/auth/contexts/AuthContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
