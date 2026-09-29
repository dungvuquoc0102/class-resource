import { create } from "zustand";
import ProductList, { fetchProducts } from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import { useQuery } from "@tanstack/react-query";

export const useTheme = create((set, get) => ({
  theme: "light",
  toggleTheme: () => {
    set((oldState) => oldState);

    console.log(get());
  },
}));

function App() {
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

  const { isFetching, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div>
      <div>Product List App</div>
      <ul>
        {data?.products?.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      <div>{theme}</div>
      <button onClick={toggleTheme}>Change theme</button>
      <ProductList />
      <ProductForm />
    </div>
  );
}

export default App;
