import { useEffect, useRef, useState } from "react";

export default function Child() {
  const myRef = useRef(null);
  const videoRef = useRef(null);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     clearInterval(myRef.current);
  //   };
  // }, []);

  // const startInterval = () => {
  //   myRef.current = setInterval(() => {
  //     console.log("Call interval");
  //   }, 1000);
  // };

  const handleChangeColor = () => {
    if (myRef.current) {
      myRef.current.classList.remove("bg-orange-500");
      myRef.current.classList.add("bg-blue-500");
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="border rounded-md p-3">
      {count % 2 === 0 && (
        <div ref={myRef} className="bg-orange-500 border rounded-lg p-3 m-3">
          <div>Child Component</div>
        </div>
      )}
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={handleChangeColor}>Change background color</button>
      <video
        ref={videoRef}
        className="w-100 border"
        src="/video.mp4"
        controls
      ></video>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        Toggle play video
      </button>
    </div>
  );
}
