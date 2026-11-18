import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { queryClient } from "../main";

async function createProduct(data) {
  const res = await fetch("http://localhost:3001/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await res.json();
}

export default function UpdateProduct() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createProduct,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ name: value, price: 1000 });

    queryClient.invalidateQueries({ queryKey: ["products"] });
    // navigate("/products");
  };
  return (
    <div>
      <div>CreateProduct</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>Tạo mới</button>
      </form>
    </div>
  );
}
