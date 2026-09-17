import { useEffect, useRef } from "react";

export default function Login() {
  const inputRef = useRef(null);

  useEffect(() => {
    // inputRef.current.focus();
  }, []);

  return (
    <>
      <div>
        <h1>Login</h1>
        <input
          ref={inputRef}
          className="border p-3"
          type="text"
          placeholder="Enter email..."
        />
      </div>
    </>
  );
}
