const API_URL = process.env.API_URL || "http://localhost:3001";

type Product = {
  id: number;
  name: string;
  price: number;
};
type ProductInput = Omit<Product, "id">;
type ProductPage = {
  items: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
};
type ProductStats = { total: number; averagePrice: number };

async function request<T>(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}/${path}`, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...{ ...options?.headers },
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  return data as T;
}

export async function getProducts(query = "", page = 1, pageSize = 5) {
  const params = new URLSearchParams({
    query: query,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  const data = await request<ProductPage>(`products?${params.toString()}`);
  return data;
}
