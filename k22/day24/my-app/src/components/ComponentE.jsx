import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import UpdateProduct from "./CreateProduct";

export async function fetchProducts() {
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  const res = await fetch("http://localhost:3001/products");
  return res.json();
}

export default function ComponentE() {
  const { data, error, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60_000,
  });

  return (
    <div>
      <UpdateProduct />
      <div>ComponentE</div>
      <ul>
        {isPending ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Có lỗi xảy ra. Vui lòng thử lại sau!</div>
        ) : (
          data?.items.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div>{product.name}</div>
              <div>${product.price}</div>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
}
