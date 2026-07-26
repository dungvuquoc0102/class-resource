import { AppLogo } from "./AppLogo";
import { SearchForm } from "./SearchForm";

export const Header = () => {
  return (
    <header className="flex justify-between mx-auto container px-6 py-4">
      <AppLogo />
      <SearchForm />
    </header>
  );
};
