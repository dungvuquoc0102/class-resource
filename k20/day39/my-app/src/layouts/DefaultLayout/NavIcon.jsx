import { NavLink } from "react-router";

export default function NavIcon({ to, children }) {
  const handleActive = ({ isActive }) =>
    isActive
      ? "w-full h-13 grid place-items-center hover:bg-nav-hover-bg rounded-2xl transition-all"
      : "w-full h-13 grid place-items-center hover:bg-nav-hover-bg rounded-2xl transition-all text-nav-fg";

  return (
    <NavLink className={handleActive} to={to}>
      {children}
    </NavLink>
  );
}
