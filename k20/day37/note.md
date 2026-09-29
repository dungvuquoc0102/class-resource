# Buổi 37: Zustand, TanStack Query

## Phân biệt state trong ứng dụng

### Giới thiệu

- Client state là dữ liệu do giao diện quản lý: menu đang mở, bộ lọc đã chọn, giỏ hàng tạm thời. Khi nhiều component cần dùng chung, có thể đưa vào Zustand.
- Server state là dữ liệu lấy từ API: danh sách sản phẩm, thông tin tài khoản, đơn hàng. TanStack Query giúp tải, lưu cache và đồng bộ dữ liệu này.

### Ví dụ

Trang sản phẩm có `categoryId` do người dùng chọn và danh sách sản phẩm lấy từ API. Có thể lưu `categoryId` trong Zustand, rồi dùng nó trong `queryKey` và `queryFn` của TanStack Query.

### Thực tế dùng ở đâu?

Phân biệt hai loại state trước khi chọn công cụ. Tránh chép toàn bộ kết quả API vào Zustand để tự quản lý loading, lỗi và cache lần nữa.

---

## Zustand: chia sẻ client state

### Giới thiệu

Zustand tạo một store chứa state và các action để cập nhật state. Component đọc phần cần dùng qua selector. Store có thể dùng ở nhiều component mà không cần truyền props qua nhiều cấp.

Cài đặt:

```bash
npm install zustand
```

### Ví dụ: giỏ hàng dùng chung

```jsx
// src/stores/useCartStore.js
import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => ({ items: [...state.items, product] })),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
}));
```

```jsx
// Component ở trang sản phẩm
function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return <button onClick={() => addItem(product)}>Thêm vào giỏ</button>;
}

// Component ở thanh điều hướng
function CartCount() {
  const count = useCartStore((state) => state.items.length);

  return <span>Giỏ hàng: {count}</span>;
}
```

`set` cập nhật store; callback nhận state hiện tại khi giá trị mới phụ thuộc giá trị cũ. Selector như `(state) => state.items.length` giúp component chỉ theo dõi dữ liệu nó cần. Khi cập nhật array hoặc object, tạo giá trị mới thay vì sửa trực tiếp giá trị cũ.

### Thực tế dùng ở đâu?

Giỏ hàng tạm thời, trạng thái modal, bộ lọc dùng ở nhiều màn hình, hoặc lựa chọn giao diện cần chia sẻ giữa các component. State chỉ dùng trong một component thì `useState` thường đủ.

---

## TanStack Query: đọc dữ liệu từ API với `useQuery`

// Hiển thị dữ liệu: loading, error, performance: cache, refetch, gộp request
// Cập nhật dữ liệu: invalidate query, optimistic update

### Giới thiệu

`useQuery` quản lý việc gọi API, trạng thái tải/lỗi và cache của dữ liệu đọc từ server. Cần bọc ứng dụng bằng `QueryClientProvider` trước khi dùng hook này.

Cài đặt:

```bash
npm install @tanstack/react-query
```

### Ví dụ: danh sách sản phẩm theo danh mục

```jsx
// src/main.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
```

```jsx
// Component danh sách sản phẩm
import { useQuery } from "@tanstack/react-query";

async function fetchProducts(categoryId) {
  const response = await fetch(`/api/products?categoryId=${categoryId}`);
  if (!response.ok) throw new Error("Không tải được sản phẩm");
  return response.json();
}

function ProductList({ categoryId }) {
  const {
    data: products = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => fetchProducts(categoryId),
    staleTime: 60_000,
  });

  if (isPending) return <p>Đang tải...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

`queryKey` xác định dữ liệu trong cache. Mỗi `categoryId` tạo một cache riêng, nên biến nào làm thay đổi kết quả API cần nằm trong key. `fetch` không tự báo lỗi cho HTTP 4xx/5xx; cần kiểm tra `response.ok`.

### Thực tế dùng ở đâu?

Các trang danh sách, trang chi tiết, dashboard hoặc bất kỳ màn hình nào cần đọc dữ liệu từ API và hiển thị loading, lỗi, dữ liệu mới nhất.

---

## Cache: `staleTime` và `gcTime`

### Giới thiệu

- `staleTime`: khoảng thời gian dữ liệu trong cache được xem là còn mới. Trong thời gian này, query thường không tự gọi lại API chỉ vì component mount lại hoặc người dùng quay lại tab.
- `gcTime`: thời gian giữ cache sau khi không còn component nào dùng query đó. Hết thời gian này, cache có thể bị xóa.

Mặc định `staleTime` là `0`; `gcTime` trên trình duyệt là 5 phút. Dữ liệu cũ vẫn có thể hiện ngay từ cache trong lúc TanStack Query tải lại ở nền.

### Ví dụ

```jsx
useQuery({
  queryKey: ["categories"],
  queryFn: fetchCategories,
  staleTime: 5 * 60_000, // Xem dữ liệu là mới trong 5 phút
  gcTime: 10 * 60_000, // Giữ cache 10 phút sau khi không còn dùng
});
```

### Thực tế dùng ở đâu?

Danh mục sản phẩm ít thay đổi có thể dùng `staleTime` dài hơn; số liệu cần cập nhật thường xuyên nên dùng thời gian ngắn hơn. Không đặt `gcTime: 0` chỉ để ép gọi lại API, vì thao tác đó loại bỏ lợi ích tái sử dụng cache khi component mount lại.

---

## Ghi dữ liệu với `useMutation` và cập nhật query

### Giới thiệu

`useMutation` dùng cho thao tác tạo, sửa, xóa trên server. Sau khi ghi thành công, gọi `invalidateQueries` để đánh dấu dữ liệu liên quan là cũ và tải lại khi query đang được sử dụng.

### Ví dụ: thêm sản phẩm

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createProduct(product) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) throw new Error("Không thêm được sản phẩm");
  return response.json();
}

function AddProductButton() {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  return (
    <>
      <button
        disabled={createMutation.isPending}
        onClick={() => createMutation.mutate({ name: "Bàn phím" })}
      >
        {createMutation.isPending ? "Đang thêm..." : "Thêm sản phẩm"}
      </button>
      {createMutation.isError && <p>{createMutation.error.message}</p>}
    </>
  );
}
```

Key `["products"]` khớp các query như `["products", categoryId]`, nên danh sách sản phẩm đang hiển thị sẽ được cập nhật sau khi thêm thành công.

### Thực tế dùng ở đâu?

Form tạo/sửa dữ liệu, nút xóa, thay đổi trạng thái đơn hàng. Sau mỗi thao tác ghi, xác định màn hình nào đang hiển thị dữ liệu liên quan để invalidate đúng query.

---

Tóm tắt: Dùng `useState` cho state cục bộ, Zustand cho client state cần chia sẻ, và TanStack Query cho dữ liệu từ API. Với TanStack Query, nhớ đặt `queryKey` theo tham số, chọn `staleTime` theo độ mới cần thiết, và invalidate query sau mutation.
