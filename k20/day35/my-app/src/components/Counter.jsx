import { useReducer, useState } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + Number(action.payload),
      };
    case "decrement":
      return {
        ...state,
        count: state.count - Number(action.payload),
      };
    case "reset":
      return { count: 0 };
    default:
      throw new Error("Invalid action type");
  }
};

// reducer - Hệ thống tạo landing page
// state - Trang giáo dục
// action - "Tạo trang y tế"

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState("0");

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold">{state.count}</p>
      <div>
        <button
          className="border rounded-md bg-sky-500 px-5 py-2 text-white text-2xl font-bold"
          onClick={() => dispatch({ type: "decrement" })}
        >
          -
        </button>
        <button
          className="border rounded-md bg-sky-500 px-5 py-2 text-white text-2xl font-bold"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
        <button
          className="border rounded-md bg-sky-500 px-5 py-2 text-white text-2xl font-bold"
          onClick={() => dispatch({ type: "increment" })}
        >
          +
        </button>
      </div>
      <div>
        <button
          className="border rounded-md bg-sky-500 px-5 py-2 text-white text-2xl font-bold"
          onClick={() => dispatch({ type: "increment", payload: value })}
        >
          Add {value}
        </button>
        <input
          className="border"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a value"
        />
      </div>
    </div>
  );
}
