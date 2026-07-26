import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import { DefaultLayout } from "./layouts/DefaultLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
