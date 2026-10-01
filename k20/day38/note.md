# Buổi 38: React.lazy, Suspense, Axios, shadcn/ui

## React.lazy: tải code của component khi cần

### Giới thiệu

`React.lazy` trì hoãn tải code đến lần đầu component được render. Kết hợp với `import()`, bundler như Vite có thể tách code thành các phần tải riêng, giúp giảm lượng JavaScript tải ban đầu. [Tài liệu React.lazy](https://react.dev/reference/react/lazy).

### Ví dụ: chỉ tải phần báo cáo khi người dùng mở

```jsx
// src/components/SalesReport.jsx
export default function SalesReport() {
  return <section>Báo cáo doanh thu tháng này: 120 triệu đồng</section>;
}
```

```jsx
// src/App.jsx
import { lazy, Suspense, useState } from "react";

const SalesReport = lazy(() => import("./components/SalesReport.jsx"));

export default function App() {
  const [showReport, setShowReport] = useState(false);

  return (
    <main>
      <h1>Quản lý cửa hàng</h1>
      <button onClick={() => setShowReport((value) => !value)}>
        {showReport ? "Ẩn báo cáo" : "Xem báo cáo"}
      </button>

      {showReport && (
        <Suspense fallback={<p role="status">Đang tải báo cáo...</p>}>
          <SalesReport />
        </Suspense>
      )}
    </main>
  );
}
```

Khai báo `lazy` ngoài component và dùng `export default` cho file được tải. React ghi nhớ kết quả tải; ẩn rồi mở lại không tải lại module đó.

### Thực tế dùng ở đâu?

Trang quản trị, trình soạn thảo, bản đồ hoặc báo cáo có thư viện biểu đồ nặng. Ví dụ trên dùng nội dung đơn giản để minh họa luồng tải. Với nút bấm hay tiêu đề nhỏ luôn xuất hiện, import trực tiếp thường phù hợp hơn.

---

## Suspense: hiển thị giao diện chờ đúng khu vực

### Giới thiệu

`Suspense` hiển thị `fallback` khi component con tạm chờ, chẳng hạn đang tải code qua `lazy`. Khi tải xong, React hiển thị nội dung thật. [Tài liệu Suspense](https://react.dev/reference/react/Suspense).

### Ví dụ: giữ thanh điều hướng khi tải trang

```jsx
// src/App.jsx — ví dụ độc lập với phần trên
import { lazy, Suspense } from "react";

const SalesReport = lazy(() => import("./components/SalesReport.jsx"));

export default function App() {
  return (
    <>
      <header>Quản lý cửa hàng</header>
      <main>
        <Suspense fallback={<p role="status">Đang tải nội dung...</p>}>
          <SalesReport />
        </Suspense>
      </main>
    </>
  );
}
```

`header` nằm ngoài `Suspense` nên vẫn hiển thị. Đặt vùng chờ quanh phần cần tải; có thể dùng chữ, spinner hoặc skeleton làm `fallback`.

### Thực tế dùng ở đâu?

Giữ menu và bố cục trong lúc tải trang hoặc một khu vực lớn. `Suspense` không tự nhận biết `fetch` trong `useEffect`; với `useQuery` thông thường ở buổi 37, vẫn xử lý `isPending` và `isError`. Lỗi tải module cần Error Boundary, không được xử lý bằng `fallback` của `Suspense`.

---

## Axios: gọi API và lấy dữ liệu

### Giới thiệu

Axios là thư viện gửi HTTP request, dùng với `async/await`. Các thao tác thường gặp là `get` để đọc, `post` để tạo, `patch` để sửa một phần và `delete` để xóa dữ liệu.

Với API JSON, Axios tự chuyển object gửi đi thành JSON và trả nội dung phản hồi qua `response.data`, không cần gọi `response.json()`. [Ví dụ Axios](https://axios-http.com/docs/post_example).

Cài đặt:

```bash
npm install axios
```

### Ví dụ: tạo bộ hàm gọi API sản phẩm

Các ví dụ giả sử backend có các endpoint `/api/products`, trả danh sách dạng array và trả sản phẩm dạng object khi tạo/sửa.

```js
// src/api/client.js
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 10_000,
});
```

`axios.create` tạo cấu hình dùng chung. `baseURL` là phần đầu đường dẫn; `timeout` tính bằng mili giây. `/api` ở đây trỏ đến cùng origin với frontend; nếu backend chạy riêng, cần đổi URL hoặc cấu hình proxy trong Vite. [Tài liệu Axios instance](https://axios-http.com/docs/instance).

```js
// src/api/products.js
import { api } from "./client";

export async function getProducts(categoryId) {
  const response = await api.get("/products", {
    params: { categoryId },
  });
  return response.data;
}

export async function createProduct(product) {
  const response = await api.post("/products", product);
  return response.data;
}

export async function updateProduct(id, changes) {
  const response = await api.patch(`/products/${id}`, changes);
  return response.data;
}

export async function deleteProduct(id) {
  await api.delete(`/products/${id}`);
}
```

`params` tạo query string, ví dụ `getProducts(2)` gọi `/api/products?categoryId=2`. Với `post` và `patch`, đối số thứ hai là body; với `get`, đối số thứ hai là cấu hình request.

### Thực tế dùng ở đâu?

Tách các lời gọi API ra khỏi component để dùng lại ở trang danh sách, trang chi tiết và form chỉnh sửa. Khi đổi địa chỉ backend hoặc thời gian chờ, sửa tại `client.js`.

---

## Axios: xử lý lỗi và kết hợp TanStack Query

### Giới thiệu

Mặc định Axios reject Promise khi server trả status ngoài khoảng 2xx. Nếu gọi trực tiếp, xử lý bằng `try/catch`; khi dùng TanStack Query, để lỗi truyền ra cho query hoặc mutation quản lý.

- `error.response`: server đã phản hồi; đọc status và nội dung lỗi tại đây.
- Không có `error.response`: có thể do lỗi mạng, timeout hoặc request chưa được gửi thành công.

[Tài liệu xử lý lỗi Axios](https://axios-http.com/docs/handling_errors).

### Ví dụ: danh sách sản phẩm có loading và thông báo lỗi

Ví dụ dùng `getProducts` ở trên và giả sử ứng dụng đã được bọc bằng `QueryClientProvider` như buổi 37.

```jsx
// src/components/ProductList.jsx
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";

export default function ProductList({ categoryId }) {
  const {
    data: products = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => getProducts(categoryId),
  });

  if (isPending) return <p>Đang tải sản phẩm...</p>;

  if (isError) {
    // Giả sử API trả lỗi dạng { message: "Nội dung lỗi" }.
    const message = error.response?.data?.message;
    return (
      <p role="alert">
        {typeof message === "string"
          ? message
          : "Không tải được sản phẩm. Vui lòng thử lại."}
      </p>
    );
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

Không `catch` lỗi rồi trả `[]` trong `getProducts`, vì query sẽ hiểu request thành công và hiển thị danh sách rỗng. Nếu cần bắt lỗi trong hàm API để xử lý thêm, phải `throw` lại lỗi để phía gọi nhận biết thất bại.

### Thực tế dùng ở đâu?

Axios đảm nhiệm gửi request; TanStack Query quản lý loading, lỗi và cache trên giao diện. Với thao tác thêm/sửa/xóa, truyền hàm API tương ứng vào `mutationFn`, rồi invalidate query sau khi thành công như buổi 37.

---

## shadcn/ui: thêm component giao diện vào dự án

### Giới thiệu

shadcn/ui cung cấp mã nguồn component để đưa vào dự án và chỉnh sửa. Các component thường nằm trong `src/components/ui`; ứng dụng import từ những file này. Giao diện được xây dựng với Tailwind CSS. [Giới thiệu shadcn/ui](https://ui.shadcn.com/docs).

### Ví dụ: khởi tạo và thêm component

Với dự án React + Vite đã cấu hình Tailwind CSS và alias `@` trỏ đến `src`, chạy tại thư mục chứa `package.json`:

```bash
npx shadcn@latest init
npx shadcn@latest add button input label dialog
```

`init` thiết lập cấu hình; `add` đưa component và dependency cần thiết vào dự án. Nếu chưa có Tailwind hoặc alias, làm phần thiết lập trong [hướng dẫn Vite](https://ui.shadcn.com/docs/installation/vite) trước. Với dự án JavaScript, đặt `"tsx": false` trong `components.json` trước khi thêm component để tạo file `.jsx`. [Hướng dẫn JavaScript](https://ui.shadcn.com/docs/javascript).

```jsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Thêm sản phẩm</Button>;
}
```

### Thực tế dùng ở đâu?

Trang quản trị, form nhập liệu, màn hình quản lý sản phẩm cần các thành phần giao diện đồng bộ. Khi cần đổi thiết kế dùng chung, có thể sửa component ngay trong dự án.

---

## Button, Input, Label: xây dựng form cơ bản

### Giới thiệu

- `Button`: nút thao tác; `variant` chọn kiểu, `size` chọn kích thước, `className` bổ sung giao diện. [Tài liệu Button](https://ui.shadcn.com/docs/components/radix/button).
- `Input`: ô nhập liệu, dùng `value` và `onChange` như input thông thường.
- `Label`: nhãn mô tả ô nhập; nối `htmlFor` với `id` của input.

### Ví dụ: form nhập tên sản phẩm

```jsx
// src/components/ProductForm.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const productName = name.trim();
    if (!productName) return;

    setMessage(`Đã nhận tên sản phẩm: ${productName}`);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="product-name">Tên sản phẩm</Label>
        <Input
          id="product-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ví dụ: Bàn phím"
          required
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={!name.trim()}>
          Thêm sản phẩm
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setName("");
            setMessage("");
          }}
        >
          Nhập lại
        </Button>
      </div>

      <p role="status">{message}</p>
    </form>
  );
}
```

Nút thao tác phụ trong form dùng `type="button"` để tránh submit ngoài ý muốn. Ví dụ chỉ xử lý dữ liệu trên giao diện; shadcn/ui không tự gọi API hay lưu sản phẩm.

### Thực tế dùng ở đâu?

Form thêm/sửa sản phẩm, đăng nhập hoặc tìm kiếm. Khi kết nối API, dùng `useMutation` của buổi 37 trong luồng submit; khóa nút khi đang gửi, hiển thị lỗi và chỉ xóa dữ liệu nhập sau khi lưu thành công.

---

## Dialog: mở hộp thoại và điều khiển trạng thái

### Giới thiệu

`Dialog` hiển thị nội dung nổi phía trên trang. Các phần thường dùng là `DialogContent`, `DialogHeader`, `DialogTitle` và `DialogDescription`. Dùng `open` cùng `onOpenChange` khi cần quản lý đóng/mở bằng state. [Tài liệu Dialog](https://ui.shadcn.com/docs/components/radix/dialog).

### Ví dụ: xem nhanh thông tin sản phẩm

```jsx
// src/components/ProductDialog.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProductDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Xem sản phẩm</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bàn phím cơ</DialogTitle>
          <DialogDescription>Thông tin nhanh về sản phẩm.</DialogDescription>
        </DialogHeader>

        <p>Giá: 1.200.000 đồng</p>
        <Button type="button" onClick={() => setOpen(false)}>
          Đóng
        </Button>
      </DialogContent>
    </Dialog>
  );
}
```

`DialogTrigger` mở hộp thoại. `onOpenChange` đồng bộ state khi người dùng đóng bằng Escape hoặc nút đóng có sẵn. Giữ tiêu đề và mô tả rõ nghĩa để người dùng, kể cả người dùng trình đọc màn hình, hiểu nội dung hộp thoại.

### Thực tế dùng ở đâu?

Xem nhanh sản phẩm hoặc mở form chỉnh sửa ngay trên trang danh sách. Với form gọi API trong Dialog, gọi `setOpen(false)` sau khi lưu thành công; nếu thất bại, giữ hộp thoại mở để người dùng sửa và gửi lại.

---

Tóm tắt: `lazy` tải code khi cần, `Suspense` hiển thị giao diện chờ, Axios gửi request đến API, shadcn/ui cung cấp component có thể chỉnh sửa. Bắt đầu với Button, Input, Label và Dialog để xây dựng các màn hình thường gặp.
