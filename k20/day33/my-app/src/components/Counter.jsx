import { useState } from "react";

export default function Counter() {
  const [status, setStatus] = useState("loading");

  const handleStatus = () => {
    setStatus("success");
  };

  return (
    <div>
      <div>{status}</div>
      <button
        className="border rounded-md bg-sky-100 p-2 hover: cursor-pointer"
        onClick={handleStatus}
      >
        Change status
      </button>
    </div>
  );
}

// function Button() {
//   const handleClick = () => {
//     //
//   };
//   return <button onClick={handleClick}>Click me</button>;
// }

// const status = "loading";
// const renderStatus = (status) => {
//   // Logic DOM render status
// };
// renderStatus(status);

// status = "success";
// renderStatus(status);

// button - HTML
// Có 3 file JS đều truy cập tới button
// 1. button.onclick
// 2. button.addEventListener("click")

// button - React
// Có 3 nơi cần xử lý logic khi click button
// Viết 3 cái logic trong component Button
