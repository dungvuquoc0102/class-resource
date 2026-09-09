import { useState } from "react";
import Game from "./components/Board/Game";
import Counter from "./components/Counter";
import ProductPage from "./components/ProductPage/ProductPage";

function App() {
  const [isShow, setIsShow] = useState(true);
  return (
    <>
      <Counter />
      <Game />
      {isShow && <ProductPage />}
      <button onClick={() => setIsShow(!isShow)}>Toggle Product Page</button>
    </>
  );
}

export default App;
