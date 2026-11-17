import { useRef, useState } from "react";
import Child from "./components/Child";
import ComponentA from "./components/ComponentA";
import ComponentC from "./components/ComponentC";
import ComponentD from "./components/ComponentD";
import Stopwatch from "./components/Stopwatch";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Toggle Child</button>
      {count % 2 === 0 && <Child />} */}
      <ComponentA />
      {/* <ComponentC /> */}
      {/* <ComponentD />
      {count % 2 === 0 && <Stopwatch />}
      <button onClick={() => setCount(count + 1)}>Click me</button> */}
    </div>
  );
}

export default App;
