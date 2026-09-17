import { useContext } from "react";
import { messageContext } from "../App";

export default function Component2() {
  const { store, dispatch } = useContext(messageContext);

  const handleChangeMessage = () =>
    dispatch({ type: "setMessage", payload: "Hello F8" });

  return (
    <>
      <div>Component 2: {store.message}</div>
      <button
        className="border rounded-md bg-sky-500 px-5 py-2 text-white text-2xl font-bold"
        onClick={handleChangeMessage}
      >
        Change message: Hello F8
      </button>
    </>
  );
}
