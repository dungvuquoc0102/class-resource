function App() {
  const string = "Hello F8";
  const numbers = [1, 2, 3];
  return (
    <div
      onClick={() => console.log("click")}
      style={{ color: "blue", backgroundColor: "lightgray" }}
    >
      <div className="">{string}</div>
      <div>
        {numbers.map((num, index) => (
          <div key={index}>Number {num}</div>
        ))}
      </div>
    </div>
  );
}

export default App;

// const a = <div className="text-red-500">Hello F8</div>;
// const a = React.createElement("div", { className: "text-red-500" }, "Hello F8");

// tailwindcss -> compiler -> css (html + css)
// jsx -> compiler -> js (html + js)
