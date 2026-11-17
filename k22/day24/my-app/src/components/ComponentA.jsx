import { useState } from "react";
import ComponentB from "./ComponentB";

export default function ComponentA() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>ComponentA</div>
      <ComponentB countObject={{ count, setCount }} />
    </div>
  );
}
