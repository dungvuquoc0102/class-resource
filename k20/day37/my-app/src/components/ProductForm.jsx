import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { instance } from "./api/http";

async function createProduct(data) {
  const result = await instance.post("products/add", data);
  return result;
}

export default function ProductForm() {
  const [productName, setProductName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({
      title: productName,
    });
  }

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Tên sản phẩm:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
