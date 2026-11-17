import { createContext, useReducer } from "react";

export const CountContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "Increase":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
}

const initialStore = {
  count: 0,
  theme: "light",
};

export function CountProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialStore);
  const store = { state, dispatch };
  return (
    <CountContext.Provider value={store}>{children}</CountContext.Provider>
  );
}
