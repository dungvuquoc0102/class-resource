import ExpensiveComponent from "./components/ExpensiveComponent";
import RegisterForm from "./components/RegisterForm";
import { useEffect } from "react";

function App() {
  const token = import.meta.env.VITE_TOKEN;
  useEffect(() => {
    console.log(token);
  }, []);
  return (
    <>
      <ExpensiveComponent />
      <hr />
      <RegisterForm />
    </>
  );
}

export default App;
