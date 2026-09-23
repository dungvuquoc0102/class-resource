import { useState, useMemo, useCallback } from "react";
import ChildComponent from "./ChildComponent";
import useCount from "../hooks/useCount";

export default function ExpensiveComponent() {
  const { count, handleCount } = useCount();

  // const result = useMemo(() => {
  //   // console.log("Excute in useMemo");

  //   let sum = 0;
  //   for (let i = 0; i < count; i++) {
  //     sum += i;
  //   }
  //   return sum;
  // }, [count]);

  const result = useCallback(() => {
    console.log(count);
  }, [count]);
  // const result = useMemo(() => {
  //   return () => {};
  // }, []);

  return (
    <div>
      {/* <div>Result: {result}</div> */}
      <div>Count: {count}</div>
      <div>
        <button onClick={handleCount}>Tăng count</button>
      </div>
      <ChildComponent count={count} result={result} />
    </div>
  );
}
// {} === {}
// 10 === 10
