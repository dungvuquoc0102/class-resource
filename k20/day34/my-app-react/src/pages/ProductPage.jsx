import { Link, useSearchParams } from "react-router";

export default function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const handleFilter = () => {
    searchParams.set("category", "apple");
    setSearchParams(searchParams);
  };

  return (
    <div>
      <h1>Product List: </h1>
      <p>Search: {q}</p>
      <p>Category: {category}</p>
      <button onClick={() => handleFilter()}>Filter by category: apple</button>
      <ul>
        <li>
          <Link to="/products/iphone-due">Iphone Due</Link>
        </li>
        <li>
          <Link to="/products/samsung-zfold-8">Samsung ZFold 8</Link>
        </li>
      </ul>
    </div>
  );
}
