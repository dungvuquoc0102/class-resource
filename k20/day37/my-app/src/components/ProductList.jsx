import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) {
    throw new Error("Có lỗi xảy ra!");
  }
  return res.json();
}

export default function ProductList() {
  const { isFetching, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  console.log(data);

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
