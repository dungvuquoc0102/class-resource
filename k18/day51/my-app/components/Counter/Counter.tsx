"use client"; // Pragma — báo cho Next.js đây là client component

import { useState, useEffect } from "react";

export default function Counter({ children }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted on client");
  }, []);

  return (
    <div>
      <ComponentA />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
