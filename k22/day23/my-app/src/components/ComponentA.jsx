import { useRef, useState } from "react";

export default function ComponentA() {
  const myRef = useRef(0);
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);
  return (
    <>
      <input ref={inputRef} type="text" className="border" />
      <div>{myRef.current}</div>
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Tăng count
      </button>
      <button
        onClick={() => {
          myRef.current++;
          console.log(myRef.current);
        }}
      >
        Tăng current
      </button>
      <button>Focus button</button>
    </>

    // <div>
    //   <div>ComponentA</div>
    //   <ComponentB ref={aRef} />
    //   <button
    //     onClick={() => {
    //       if (aRef.current) {
    //         console.log(aRef.current);
    //       }
    //     }}
    //   >
    //     Lấy giá trị của input
    //   </button>
    // </div>
  );
}
