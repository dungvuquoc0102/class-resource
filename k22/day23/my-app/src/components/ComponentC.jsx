import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "Iphone 14", price: 2000 },
  { id: 2, name: "Iphone 14 Pro", price: 3000 },
  { id: 3, name: "Iphone 14 Pro Max", price: 4000 },
  { id: 4, name: "Samsung Galaxy S23", price: 4000 },
  { id: 5, name: "Samsung Galaxy S23 Ultra", price: 5000 },
];

export default function ComponentC() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("Iphone");

  const result = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div>
        {result.map((product) => (
          <div key={product.id}>
            <span>{product.name}</span>
            <span>${product.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div>
        <div>Count: {count}</div>
        <button onClick={() => setCount(count + 1)}>Increase Count</button>
        <button onClick={() => setSearch("Samsung")}>
          Change search to Samsung
        </button>
      </div>
    </div>
  );
}
