import { useEffect, useState } from "react";

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);

  let intervalId;

  useEffect(() => {
    intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
      console.log("Render interval");
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h1>{seconds}</h1>

      {/* <button onClick={handleStart}>Start</button> */}
      {/* <button onClick={handleStop}>Stop</button> */}
    </div>
  );
}
