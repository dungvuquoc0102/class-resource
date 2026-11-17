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

export async function getProductById(id: number): Promise<Product | null> {
  return await request<Product>(`/products/${id}`);
}

export function getProductStats(): Promise<ProductStats> {
  return request<ProductStats>("/products/stats");
}

export function createProduct(input: ProductInput): Promise<Product> {
  return request<Product>("/products", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateProduct(
  id: number,
  input: ProductInput,
): Promise<Product> {
  return request<Product>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteProduct(id: number): Promise<{ message: string }> {
  return request<{ message: string }>(`/products/${id}`, {
    method: "DELETE",
  });
}
