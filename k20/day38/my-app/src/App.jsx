import { useState } from "react";
import { lazy } from "react";
import { Button } from "@/components/ui/button";

const Child = lazy(() => import("./components/Child"));

// web 2 component App, Child
// example.com
// -> request ->
// js (App.js, Child.js)

function App() {
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      <div>Hello F8</div>
      <button onClick={() => setIsShow(!isShow)}>Toggle Child</button>
      {isShow && <Child />}
      <Button variant="outline" size="lg">
        Hello anh em!
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className="bg-orange-400 text-white"
      >
        Hello anh em!
      </Button>
      <button>Hello anh em!</button>
    </div>
  );
}

export default App;
