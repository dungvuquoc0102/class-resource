import { memo } from "react";

const ChildComponent = memo(function ChildComponent({ result }) {
  // console.log("Render Child Component");
  // result();
  // console.log(result);

  return <div>Child Component</div>;
});

export default ChildComponent;
