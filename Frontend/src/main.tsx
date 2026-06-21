import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { JuliusBaerApp } from "./components/jb/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JuliusBaerApp />
  </StrictMode>
);
