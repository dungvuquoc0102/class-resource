import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { CartContext } from "../contexts/CartContext";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { theme, setTheme } = useContext(ThemeContext);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      await fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
        });
    }
    fetchProduct();
  }, []);

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const addToCart = (product) => {
    dispatch({
      type: "ADD",
      payload: product,
    });
  };

  return (
    <div className="mx-5">
      <button onClick={handleToggleTheme}>Toggle theme</button>
      <h1>Product List</h1>
      <ul className="grid grid-cols-4">
        {products.map((product) => (
          <li key={product}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full aspect-square object-cover"
            />
            <div className="text-2xl font-bold">{product.title}</div>
            <div className="text-2xl">{product.price}</div>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
