import { useImperativeHandle, useRef } from "react";

export default function ChildComponent({ ref }) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      // abc
      inputRef.current.focus();
    },
  }));
  return <input ref={inputRef} type="text" placeholder="Enter text..." />;
}
