import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export async function fetchProducts() {
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  const res = await fetch("https://dummyjson.com/products");
  return res.json();
}

export default function ComponentE() {
  const { data, error, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div>
      <div>ComponentE</div>
      <ul>
        {isFetching ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Có lỗi xảy ra. Vui lòng thử lại sau!</div>
        ) : (
          data?.products.slice(0, 3).map((product) => (
            <li>
              <div>{product.title}</div>
              <div>${product.price}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
