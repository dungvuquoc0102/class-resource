import { useImperativeHandle, useRef } from "react";

export default function ComponentB({ ref }) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return (
    <div>
      <div>ComponentB</div>
      <div>
        <input className="border p-2" ref={inputRef} type="text" />
      </div>
    </div>
  );
}

// Có ref ở componnent cha -> truyền xuống con -> cắm vào element
// Có ref ở component cha -> truyền xuống con -> useImperativeHandle cắm vào 1 object
