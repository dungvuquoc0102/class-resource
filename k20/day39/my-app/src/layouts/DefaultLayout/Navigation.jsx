import NavIcon from "./NavIcon";

export default function Navigation() {
  return (
    <div className="flex flex-col gap-1 w-full">
      <NavIcon to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          aria-label="Home"
          className="transition-colors duration-200 text-threads-nav-icon-active h-6 w-6"
          viewBox="0 0 26 26"
          fill="currentColor"
          style={{
            "--x-fill": "currentColor",
            "--x-height": "24",
            "--x-width": "24",
          }}
        >
          <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.5"
            d="M2.25 12.886v7.864a2 2 0 0 0 2 2h4a.5.5 0 0 0 .5-.5V17.5a4.25 4.25 0 0 1 8.5 0v4.75a.5.5 0 0 0 .5.5h4a2 2 0 0 0 2-2v-7.864a5 5 0 0 0-1.855-3.887l-5.75-4.654a5 5 0 0 0-6.29 0L4.105 9a5 5 0 0 0-1.855 3.887Z"
          ></path>
        </svg>
      </NavIcon>
      <NavIcon to="/search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          aria-label="Search"
          className="transition-colors duration-200 text-threads-nav-icon-default h-6 w-6"
          viewBox="0 0 26 26"
          fill="currentColor"
          style={{
            "--x-fill": "transparent",
            "--x-height": "24",
            "--x-width": "24",
          }}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M3.5 11.5a8 8 0 1 1 16 0 8 8 0 0 1-16 0m8-10.5C5.701 1 1 5.701 1 11.5S5.701 22 11.5 22c2.449 0 4.702-.838 6.488-2.244l4.378 4.378a1.25 1.25 0 0 0 1.768-1.768l-4.378-4.378A10.46 10.46 0 0 0 22 11.5C22 5.701 17.299 1 11.5 1"
            clipRule="evenodd"
          ></path>
        </svg>
      </NavIcon>
      <div className="w-full h-13 grid place-items-center bg-nav-hover-bg rounded-2xl transition-all text-nav-fg hover:text-black hover:cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          aria-label="Create"
          className="transition-colors duration-200 text-threads-nav-icon-default group-hover:text-threads-nav-icon-active h-6 w-6"
          viewBox="0 0 12 12"
          fill="currentColor"
          style={{
            "--x-fill": "currentColor",
            "--x-height": "24",
            "--x-width": "24",
          }}
        >
          <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            d="M6 2v8m4-4H2"
          ></path>
        </svg>
      </div>
      <NavIcon to="/activity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          aria-label="Notifications"
          className="transition-colors duration-200 text-threads-nav-icon-default h-[30px] w-[30px]"
          viewBox="0 0 32 32"
          fill="currentColor"
          style={{
            "--x-fill": "transparent",
            "--x-height": "30",
            "--x-width": "30",
          }}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            d="M5.5 12.857c0 4.367 3.722 8.673 9.533 12.346.322.194.707.388.967.388.27 0 .655-.194.967-.388 5.811-3.673 9.533-7.979 9.533-12.346 0-3.745-2.63-6.357-6.04-6.357-1.975 0-3.524.898-4.46 2.245-.915-1.337-2.474-2.245-4.46-2.245-3.4 0-6.04 2.612-6.04 6.357Z"
          ></path>
        </svg>
      </NavIcon>
      <NavIcon to="/profile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          aria-label="Profile"
          className="transition-colors duration-200 text-threads-nav-icon-default h-6 w-6"
          viewBox="0 0 26 26"
          fill="currentColor"
          style={{
            "--x-fill": "currentColor",
            "--x-height": "24",
            "--x-width": "24",
          }}
        >
          <circle
            cx="13"
            cy="7.25"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          ></circle>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            d="M6.267 23.75h13.477c1.859 0 2.756-.531 2.756-1.683 0-2.696-3.696-6.317-9.5-6.317s-9.5 3.621-9.5 6.317c0 1.152.897 1.683 2.767 1.683Z"
          ></path>
        </svg>
      </NavIcon>
    </div>
  );
}
