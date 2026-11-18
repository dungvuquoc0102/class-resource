import { useState } from "react";
import ProductList from "./components/ProductList";
import { Route, Routes } from "react-router";
import ProductDetail from "./components/ProductDetail";

function App() {
  const [isShow, setIsShow] = useState(true);
  return (
    // <div>
    //   <div>Trang chủ</div>
    //   <button onClick={() => setIsShow(!isShow)}>Toggle ProductList</button>
    //   {isShow && <ProductList />}
    // </div>
    <>
      <Routes>
        <Route index element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
