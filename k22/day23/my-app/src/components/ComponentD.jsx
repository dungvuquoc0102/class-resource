import { useCallback, useMemo, useState } from "react";
import ComponentE from "./ComponentE";
import useCount from "../hooks/useCount";

export default function ComponentD() {
  const { count, increaseCount } = useCount();
  console.log("Render Component D");

  const func = useCallback(() => {
    increaseCount();
  }, []);

  return (
    <div className="border border-green-300">
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <div>ComponentD</div>
      <ComponentE func={func} />
    </div>
  );
}
