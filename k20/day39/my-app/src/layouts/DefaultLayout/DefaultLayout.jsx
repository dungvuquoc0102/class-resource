import { Outlet } from "react-router";
import Logo from "./Logo";
import Navigation from "./Navigation";
import UserMenu from "./UserMenu";

export default function DefaultLayout() {
  return (
    <div>
      <div className="fixed w-19 top-0 left-0 bottom-0 flex flex-col items-center py-4 px-2 justify-between">
        <Logo />
        <Navigation />
        <UserMenu />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
