import f8Logo from "@/assets/images/f8-logo.png";
import { Link } from "react-router";

export const AppLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src={f8Logo} alt="App Logo" className="h-8 w-8 rounded-md" />
      <span className="text-xl font-bold">Học lập trình để đi làm</span>
    </Link>
  );
};
