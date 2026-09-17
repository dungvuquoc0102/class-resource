import Component1 from "./components/Component1";
import Counter from "./components/Counter";
import { createContext, useReducer } from "react";
import RefComponent from "./components/RefComponent";
import Login from "./components/Login";
import ParentComponent from "./components/ParentComponent/ParentComponent";

export const messageContext = createContext(null);

const initialState = {
  message: "Hello from App",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setMessage":
      return {
        ...state,
        message: action.payload,
      };
    default:
      throw new Error("Invalid action type");
  }
};

export default function App() {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <messageContext.Provider value={{ store, dispatch }}>
      <Counter />
      <Component1 />
      <Login />
      <RefComponent />
      <ParentComponent />
    </messageContext.Provider>
  );
}
