import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";

export default function DefaultLayout() {
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setIsActive(pathname.split("/").pop() === "products");
  }, [pathname]);
  return (
    <>
      <div>
        <ul className="flex gap-2 mt-2">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white px-3 py-1 rounded-md underline"
                  : "bg-blue-500 text-white px-3 py-1 rounded-md"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={
                isActive
                  ? "bg-blue-500 text-white px-3 py-1 rounded-md underline"
                  : "bg-blue-500 text-white px-3 py-1 rounded-md"
              }
              to="/products"
            >
              {/* Path: /vi/products */}
              Products
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
