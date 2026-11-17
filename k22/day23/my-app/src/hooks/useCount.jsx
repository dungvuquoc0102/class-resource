import { useState } from "react";

export default function useCount() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((count) => count + 1);
  };

  return { count, increaseCount };
}
