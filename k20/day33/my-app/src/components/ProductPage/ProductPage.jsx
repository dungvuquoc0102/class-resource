import { useEffect, useState } from "react";
import ProductList from "./ProductList";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  // Fetch, truy cập DOM, connect server

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      const response = await fetch(
        `https://cellphones.f8team.dev/api/v1/products${filterText ? `?q=${filterText}` : ""}`,
        {
          signal: controller.signal,
        },
      );
      const data = await response.json();
      setProducts(data.items);
      setLoading(false);
    };

    fetchProducts();

    return () => {
      // Remove event listener
      // clear setinterval
      // Cancel request
      controller.abort();
    };
  }, [filterText]);

  return (
    <div>
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Search..."
      />
      {loading ? <div>Loading...</div> : <ProductList products={products} />}
    </div>
  );
}

// Component render lần đầu tiên ~ component được mount
// State thay đổi => Component re-render
// Component bị gỡ khỏi DOM ~ component unmount

// [] -> Hàm gọi 1 lần duy nhất sau render
// [filterText] -> Hàm gọi lại mỗi khi filterText thay đổi
// để trống -> Hàm gọi lại mỗi khi component re-render

// Hàm truyền vào đối số đầu tiên trong useEffect chỉ được gọi sau khi component đã render giao diện xong

// Cleanup function: Gọi trước khi component unmount hoặc trước khi useEffect render lại
