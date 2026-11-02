import { useState } from "react";

export default function Count() {
  console.log("Hello");
  const [count, setCount] = useState(0);
  let count2 = 0;
  return (
    <div>
      <div>{count}</div>
      <div>{count2}</div>
      <button
        className="bg-blue-500 text-white p-3 rounded-md"
        onClick={() => {
          setCount(count + 1);
          count2++;
        }}
      >
        +
      </button>
      <button
        className="bg-blue-500 text-white p-3 rounded-md"
        onClick={() => setCount(count - 1)}
      >
        -
      </button>
    </div>
  );
}

// function render(count) {
//   const divEl = document.querySelector("div");
//   divEl.innerHTML = count;
// }

// render(0);
// render(1);
