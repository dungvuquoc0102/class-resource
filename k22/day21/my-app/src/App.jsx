import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import DefaultLayout from "./layouts/DefaultLayout";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FilePage from "./pages/FilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path=":lang?/products" element={<ProductPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
      </Route>
      <Route path="files/*" element={<FilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
