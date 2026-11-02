export default function Button(props) {
  const handleClick1 = () => {
    console.log("Button clicked 1!");
  };

  const handleClick2 = () => {
    console.log("Button clicked 2!");
  };

  const handleClick3 = () => {
    console.log("Button clicked 3!");
  };
  const handleClick = (f8ClassName) => {
    console.log(`Hello ${f8ClassName}`);

    handleClick1();
    handleClick2();
    handleClick3();
    a;
  };
  return <button {...props}>{props.children}</button>;
}
