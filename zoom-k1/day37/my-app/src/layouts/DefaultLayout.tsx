import { Outlet } from "react-router";
import { Header } from "./components/Header";

export const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
