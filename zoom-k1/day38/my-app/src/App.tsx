import { useEffect, useRef, useState } from "react";
import { Notification } from "./components/Notification";

function App() {
  const [count, setCount] = useState(0);
  const notificationRef = useRef(0);

  useEffect(() => {
    notificationRef.current += 1;
  }, [count]);
  return (
    <div>
      {/* <Notification ref={notificationRef} /> */}
      {notificationRef.current}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;
