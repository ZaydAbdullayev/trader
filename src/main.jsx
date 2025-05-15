import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TokenList } from "./home.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TokenDetails } from "./components/token-list.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TokenList />} />
        <Route path="/token/:id" element={<TokenDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
