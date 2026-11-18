import { useState } from "react";
import ComponentA from "./components/ComponentA";
import ComponentE from "./components/ComponentE";
import ComponentF from "./components/ComponentF";
import ProductDetail from "./components/ProductDetail";
import CreateProduct from "./components/CreateProduct";
import { Route, Router, Routes } from "react-router";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // <div>
    //   <div>Hello F8</div>
    //   <button onClick={() => setIsOpen(!isOpen)}>Toggle component E</button>
    //   {isOpen && <ComponentE />}
    //   <ProductDetail id={1} />
    // </div>
    <>
      <Routes>
        <Route path="/products" element={<ComponentE />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/create" element={<CreateProduct />} />
      </Routes>
    </>
  );
}

export default App;
