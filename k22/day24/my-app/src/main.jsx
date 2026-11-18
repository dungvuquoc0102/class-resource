// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CountProvider } from "./CountContext.jsx";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";

const useCount = (set, get) => ({
  count: 0,
  increase() {
    const store = get();
    set({
      count: store.count + 1,
    });
  },
});

const useTheme = (set, get) => ({
  theme: "light",
  toggle() {
    set((store) => ({
      theme: store.theme === "light" ? "dark" : "light",
    }));
  },
});

export const useCountTheme = create(
  persist(
    (...a) => ({
      ...useCount(...a),
      ...useTheme(...a),
    }),
    {
      name: "CountTheme",
    },
  ),
);

// store: 1 cái kho chứa dữ liệu dùng chung, và thường là 1 object
// state là 1 dữ liệu trong store

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // <CountProvider>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
  // </CountProvider>,
  // </StrictMode>,
);

const user = {
  name: "John",
  age: 30,
};

const newAge = {
  age: 35,
};

const updatedUser = {
  ...user,
  ...newAge,
};
