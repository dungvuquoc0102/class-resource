import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z.object({
  name: z.string(),
  price: z.coerce.number().min(10, "Giá thấp nhất là $10"),
});

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Product 4",
      price: 10,
    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div>CreateProduct</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name..."
          {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
        />
        {errors.name && <div>{errors.name.message}</div>}
        <input
          type="text"
          placeholder="Price..."
          {...register("price", { required: "Giá sản phẩm là bắt buộc" })}
        />
        {errors.price && <div>{errors.price.message}</div>}
        <button>Tạo mới</button>
      </form>
    </div>
  );
}
