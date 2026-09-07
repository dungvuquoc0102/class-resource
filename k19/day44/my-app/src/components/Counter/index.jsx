import { useReducer, useState } from "react";
import { initialState, reducer } from "./reducer";

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [amount, setAmount] = useState(1);
  return (
    <div>
      <h1 className="text-2xl font-bold">Counter</h1>
      <div className="flex-col gap-5 size-100 mx-auto mt-10 rounded-md bg-sky-300 flex items-center justify-center">
        <div className="text-7xl font-semibold text-white">{state.count}</div>
        <div className="flex gap-4">
          <button
            className="bg-orange-300 hover:-translate-y-0.5 transition-all hover:brightness-105 hover:cursor-pointer px-4 py-2 rounded-md text-lg font-semibold"
            onClick={() => dispatch({ type: "DECREMENT" })}
          >
            Decrement
          </button>
          <button
            className="bg-orange-300 hover:-translate-y-0.5 transition-all hover:brightness-105 hover:cursor-pointer px-4 py-2 rounded-md text-lg font-semibold"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Reset
          </button>
          <button
            className="bg-orange-300 hover:-translate-y-0.5 transition-all hover:brightness-105 hover:cursor-pointer px-4 py-2 rounded-md text-lg font-semibold"
            onClick={() => dispatch({ type: "INCREMENT" })}
          >
            Increment
          </button>
        </div>
        <div className="flex gap-2">
          <input
            className="bg-white px-4 py-2 rounded-md text-lg font-semibold  "
            type="text"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <button
            className="bg-orange-300 hover:-translate-y-0.5 transition-all hover:brightness-105 hover:cursor-pointer px-4 py-2 rounded-md text-lg font-semibold"
            onClick={() => dispatch({ type: "INCREMENT", payload: amount })}
          >
            Add {amount}
          </button>
        </div>
      </div>
    </div>
  );
};
