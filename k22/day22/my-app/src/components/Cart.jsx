import { useContext, useReducer } from "react";
import { CartContext } from "../contexts/CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="border rounded-lg p-4 m-4">
      <ul className="grid grid-cols-4">
        {cart.items.map((item) => (
          <li key={item}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full aspect-square object-cover"
            />
            <div className="text-2xl font-bold">{item.title}</div>
            <div className="text-2xl">{item.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
