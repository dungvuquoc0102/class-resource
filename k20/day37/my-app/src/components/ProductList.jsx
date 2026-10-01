import { useQuery } from "@tanstack/react-query";
import { instance } from "./api/http";

export async function fetchProducts() {
  const res = await instance.get("products");

  return res.data;
}

// Component -> Server
// Conponent (data) ~ cache (data)

// Form
// component ProductList

export default function ProductList() {
  const { isFetching, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
  });

  return (
    <div>
      <h1>Product List</h1>
      {isFetching ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Có lỗi xảy ra!</div>
      ) : (
        <ul>
          {data?.products?.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
