import Menu from "./components/Menu/Menu";

function App() {
  const products = [
    { name: "iPhone 18 Pro Max", price: 1299, color: "Red" },
    { name: "Mac Mimi M6", price: 999, color: "Silver" },
    { name: "Macbook Pro M6 Pro", price: 1999, color: "Space Gray" },
  ];
  const users = [
    { name: "John Doe", age: 30 },
    { name: "Jane Smith", age: 26 },
    { name: "Jack Ma", age: 45 },
  ];
  return (
    <>
      <h1
        style={{ color: "blue", fontSize: "30px" }}
        className="text-red-500"
        onClick={() => alert("Hello")}
      >
        {true}
        {false}
        {null}
        {undefined}
        {1}
        {"1"}
        {JSON.stringify({
          name: "iPhone 18 Pro Max",
          price: 1299,
          color: "Red",
        })}
        Day 32
      </h1>
      <p>Hello</p>
      <div className="flex flex-col gap-3">
        <Menu items={products} />
        <Menu items={users} />
      </div>

      {/* Cmd/Ctrl/Alt + click */}
    </>
  );
}

export default App;

// Browser: HTML, CSS, JS

// Compiler: TailwindCSS -> CSS => HTML + CSS
// Compiler: JSX -> JS => HTML + JS
// HTML + CSS + JS

const productCard = `
  <div class>
    <img src="" alt="" />
    <h3></h3>
    <p></p>
  </div>
`;
