import { memo } from "react";

const ComponentE = memo(function ComponentE({ func }) {
  console.log("Render Component E");

  return (
    <div className="border border-orange-300">
      <div>ComponentE</div>
      <button onClick={func}>Click Me</button>
    </div>
  );
});

export default ComponentE;
