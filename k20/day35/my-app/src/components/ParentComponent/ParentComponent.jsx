import { useEffect, useRef } from "react";
import ChildComponent from "./ChildComponent";

export default function ParentComponent() {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);
  const callback = () => {
    console.log("callback");
  };
  return <ChildComponent callback={callback} ref={ref} />;
}
