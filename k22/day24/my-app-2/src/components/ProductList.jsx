import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { queryClient } from "../main";
import CreateProduct from "./CreateProduct";

export default function ProductList() {
  const { data, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      await new Promise((res) => setTimeout(() => res(), 1000));
      const res = await fetch("http://localhost:3001/products");
      return res.json();
    },
  });

  // fetch, refetch
  // cache: cache có thời hạn
  // Nơi chứa cache: [products(10s, 60s), products1(), products2()]
  return (
    <div>
      <div>ProductList</div>
      <CreateProduct />
      {/* <button
        onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
        }}
      >
        Làm hết hạn cache
      </button> */}
      {isPending ? (
        "Loading..."
      ) : (
        <ul>
          {data &&
            data?.items.map((product) => (
              <li key={product.id}>
                <Link to={"/products/" + product.id}>
                  <div>{product.name}</div>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
