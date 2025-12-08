import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Temporarily remove React.StrictMode to debug potential issues with framer-motion or other libraries
createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
