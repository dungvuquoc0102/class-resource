import { NavLink } from "react-router";
import NavIcon from "./NavIcon";

export default function UserMenu() {
  return (
    <div className="w-full">
      <NavIcon to="/menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 196 196"
          width="1em"
          height="1em"
          fill="currentColor"
          className="h-6 w-6 transition-colors duration-200"
        >
          <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="23"
            d="M162.12 67.76H14.31M104.59 133.29H14.31"
          ></path>
        </svg>
      </NavIcon>
    </div>
  );
}
