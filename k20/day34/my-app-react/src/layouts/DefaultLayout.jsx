import { NavLink, Outlet, useNavigate } from "react-router";

export default function DefaultLayout() {
  const navigate = useNavigate();
  const handleActive = ({ isActive }) => (isActive ? "active" : "");
  return (
    <>
      <main>
        <Outlet />
      </main>
      <header>
        <NavLink className={handleActive} to="/" end>
          Home
        </NavLink>
        <NavLink className={handleActive} to="/products">
          Products
        </NavLink>
        <NavLink className={handleActive} to="/cart">
          Cart
        </NavLink>
        <button onClick={() => navigate("/login")}>Sign in</button>
      </header>
    </>
  );
}
