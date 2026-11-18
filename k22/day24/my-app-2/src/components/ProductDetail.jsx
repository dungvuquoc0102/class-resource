import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function ProductDetail() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/products/" + id);
      return res.json();
    },
    staleTime: 60_000,
  });

  return (
    <div>
      <div>ProductDetail</div>
      <div>Tên sản phẩm: {data?.name}</div>
    </div>
  );
}
