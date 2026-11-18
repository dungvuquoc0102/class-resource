import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { queryClient } from "../main";

export async function fetchProductById(id) {
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  const res = await fetch("http://localhost:3001/products/" + id);
  return res.json();
}

export default function ProductDetail() {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["products", id],
    queryFn: fetchProductById.bind(null, id),
    staleTime: 60_000,
  });
  return (
    <div>
      <div>ProductDetail</div>
      <button
        onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
        }}
      >
        Làm cũ cache
      </button>
      <div>Tên sản phẩm: {isPending ? "Loading..." : data?.name}</div>
    </div>
  );
}
