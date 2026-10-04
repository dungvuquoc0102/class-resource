import { Route, Routes } from "react-router";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import HomePage from "../pages/HomePage/HomePage";
import SearchPage from "../pages/SearchPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
