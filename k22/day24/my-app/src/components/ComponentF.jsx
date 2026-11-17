import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./ComponentE";

export default function ComponentF() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return (
    <div>
      <ul>
        {data?.products.slice(0, 3).map((product) => (
          <li>
            <div>{product.title}</div>
            <div>${product.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
