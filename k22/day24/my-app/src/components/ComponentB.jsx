import ComponentC from "./ComponentC";
import ComponentD from "./ComponentD";

export default function ComponentB({ countObject }) {
  return (
    <div>
      <div>ComponentB</div>
      <ComponentC countObject={countObject} />
      <ComponentD />
    </div>
  );
}
