import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../main";
import { useRef } from "react";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const priceRef = useRef("");
  const inputRef = useRef(null);
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return res.json();
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ name, price: priceRef.current });

    queryClient.invalidateQueries(["products"]);

    setName("");
    inputRef.current.value = "";
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Price..."
          defaultValue={priceRef.current}
          onChange={(e) => {
            priceRef.current = e.target.value;
          }}
        />
        <button>Tạo mới</button>
      </form>
    </div>
  );
}
