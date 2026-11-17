import { useContext } from "react";
import { CountContext } from "../CountContext";
import { useCountTheme } from "../main";

export default function ComponentD() {
  console.log("Render D");

  const theme = useCountTheme((state) => state.theme);

  return <div>ComponentD: {theme}</div>;
}
