import { createContext, useReducer, useState } from "react";

export const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE":
      return {
        ...state,
        items: [...state.items].filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, {
    items: [],
  });

  const store = {
    cart,
    dispatch,
  };

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
}
