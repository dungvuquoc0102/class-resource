import { useContext } from "react";
import { CountContext } from "../CountContext";
import { useCountTheme } from "../main";

export default function ComponentC() {
  console.log("Render C");

  const count = useCountTheme((state) => state.count);
  const increase = useCountTheme((state) => state.increase);
  return (
    <div>
      <div>ComponentC</div>
      <div>{count}</div>
      <div>
        <button onClick={increase}>Tăng count</button>
      </div>
    </div>
  );
}
