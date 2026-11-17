import { useRef, useState } from "react";

export default function ComponentA() {
  const myRef = useRef("Hi"); // null -> A
  const [count, setCount] = useState(0);
  const inputRef = useRef(null); // inputRef.current chính là element input

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={() => inputRef.current.focus()}>Focus input</button>
      <div>ComponentA</div>
      <div>myRef.current: {myRef.current}</div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Tăng count</button>
      <button
        onClick={() => {
          myRef.current = "Hello";
        }}
      >
        Thay đổi myRef.current
      </button>
    </div>
  );
}
