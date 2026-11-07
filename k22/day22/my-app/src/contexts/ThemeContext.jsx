import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const store = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
  );
}
