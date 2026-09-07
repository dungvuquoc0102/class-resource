import { Counter } from "./components/Counter";
import { SearchInput } from "./components/SearchInput";

function App() {
  return (
    <div className="background-primary min-h-dvh">
      {/* <Counter /> */}
      <div className="flex justify-center pt-20">
        <SearchInput />
      </div>
    </div>
  );
}

export default App;
