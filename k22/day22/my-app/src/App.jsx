import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      {/* <div>
        <div>{count}</div>
        <button onClick={handleClick}>Tăng count</button>
      </div> */}
      {/* {count % 2 === 0 && <ProductList />} */}
      <Cart />
      <ProductList />
    </>
  );
}
