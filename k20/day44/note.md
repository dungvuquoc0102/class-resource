# Day 44: Next.js App Router — xây dựng trang quản lý sản phẩm

// Client (Request đầu tiên) ------ Web Server (HTML, CSS, JS ở máy chúng ta)
// Client (HTML, CSS, JS) ------ API Server

// HTML, CSS, JS
// React -> HTML, CSS, JS
// Next -> Server + HTML, CSS, JS

### Sau bài này, học viên làm được gì?

- Tạo dự án Next.js mới bằng App Router và TypeScript.
- Tạo trang, layout, route động và điều hướng bằng `Link`.
- Đọc và ghi dữ liệu qua REST API từ Server Component và Server Actions.
- Làm danh sách, tìm kiếm, phân trang, thêm/sửa/xóa sản phẩm.
- Hiểu static/dynamic rendering, streaming, xử lý lỗi, validation, accessibility và metadata.

### Cấu trúc cuối bài

```txt
product-dashboard/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── lib/
│   │   ├── products.ts
│   │   └── actions.ts
│   └── dashboard/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── loading.tsx
│       ├── ProductStats.tsx
│       ├── error.tsx
│       └── products/
│           ├── page.tsx
│           ├── Search.tsx
│           ├── ProductForm.tsx
│           ├── loading.tsx
│           ├── create/page.tsx
│           └── [id]/
│               ├── page.tsx
│               ├── not-found.tsx
│               └── edit/page.tsx
├── public/
│   └── product.png  # ảnh do lớp tự thêm; không bắt buộc để chạy CRUD
└── package.json
```

> Quy ước: Các file ví dụ nằm trong `app/` ở gốc dự án. Nếu lúc khởi tạo chọn `src/`, dùng `src/app/` tương ứng. Các đoạn có ghi “thay thế” là phiên bản mới của cùng một file, không ghép hai `default export` vào một file.

---

## 1. Getting Started — tạo dự án mới

Cần Node.js 20.9 trở lên.

```bash
node -v
pnpm create next-app@latest product-dashboard --yes
cd product-dashboard
pnpm dev
```

Lệnh dùng các lựa chọn mặc định của Next.js, gồm TypeScript, ESLint, Tailwind CSS, App Router, không dùng `src/` và import alias `@/*`. Mở `http://localhost:3000`. Xóa nội dung mẫu của `app/page.tsx` và viết lại từ đầu.

```bash
pnpm dev    # server phát triển
pnpm build  # kiểm tra TypeScript và tạo bản production
pnpm start  # chạy bản production sau khi build
```

> Thực tế: Next.js vẫn dùng React. Khác biệt lớn là route theo thư mục và Server Component mặc định trong App Router.

## 2. Styling với Tailwind CSS

Dự án được tạo với Tailwind CSS. Giữ `app/globals.css` và phần import CSS trong `app/layout.tsx` như scaffold sinh ra; Next.js hiện dùng Tailwind CSS v4 nên file này thường có dòng `@import "tailwindcss";`. Viết giao diện bằng utility classes trực tiếp trong `className`, không cần tạo CSS riêng cho từng thành phần.

Ví dụ, các lớp `mx-auto`, `max-w-5xl`, `rounded-lg`, `border` và `p-6` lần lượt căn giữa nội dung, giới hạn chiều rộng, bo góc, thêm viền và khoảng đệm:

```tsx
<main className="mx-auto mt-8 max-w-5xl p-6">
  <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
</main>
```

Chỉ thêm CSS tùy chỉnh vào `app/globals.css` khi cần quy tắc dùng chung mà utility classes không phù hợp. Routing, lấy dữ liệu và Server Actions vẫn độc lập với cách viết CSS.

## 3. Optimizing Fonts and Images — Google Font và ảnh sản phẩm

Dùng `next/font/google` để tải Google Font khi build, tự lưu font cùng ứng dụng và áp dụng trên toàn site. Font không cần tải trực tiếp từ Google mỗi lần khách mở trang. Ví dụ dùng Inter hỗ trợ chữ Latin và tiếng Việt:

```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});
```

Trong `app/layout.tsx`, đặt `className={inter.className}` trên thẻ `<html>`. Inter là variable font nên không cần khai báo từng `weight`. Nếu build không truy cập được Google Fonts, dùng font local với `next/font/local`.

Nếu có ảnh sản phẩm, đặt `product.png` trong `public/` và dùng `next/image`:

```tsx
import Image from "next/image";

<Image
  src="/product.png"
  alt="Ảnh minh họa sản phẩm"
  width={120}
  height={120}
/>;
```

`public/product.png` được truy cập bằng URL `/product.png`. `width` và `height` giúp giữ chỗ trước khi ảnh tải. Ảnh là tùy chọn; nếu chưa có ảnh, bỏ đoạn `<Image />` để dự án vẫn chạy.

## 4. Creating Layouts and Pages — route theo thư mục

Trong App Router, thư mục tạo URL segment; file `page.tsx` làm segment đó thành trang. Root layout là bắt buộc và chứa `<html>`, `<body>`.

| File                                     | URL                          |
| ---------------------------------------- | ---------------------------- |
| `app/page.tsx`                           | `/`                          |
| `app/dashboard/page.tsx`                 | `/dashboard`                 |
| `app/dashboard/products/page.tsx`        | `/dashboard/products`        |
| `app/dashboard/products/[id]/page.tsx`   | `/dashboard/products/1`      |
| `app/dashboard/products/create/page.tsx` | `/dashboard/products/create` |

`app/layout.tsx`:

```tsx
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.className}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
```

`app/page.tsx`:

```tsx
import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Trang chủ</h1>
      <p className="mt-3 text-slate-600">
        Ứng dụng quản lý sản phẩm viết bằng Next.js.
      </p>
      <Link
        className="mt-5 inline-flex rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        href="/dashboard"
      >
        Vào trang quản lý
      </Link>
    </main>
  );
}
```

`app/dashboard/layout.tsx` bọc mọi trang dưới `/dashboard`:

```tsx
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold">Quản lý sản phẩm</h1>
          <nav className="flex gap-5 text-sm font-medium text-slate-600">
            <Link className="hover:text-blue-700" href="/">
              Trang chủ
            </Link>
            <Link className="hover:text-blue-700" href="/dashboard">
              Tổng quan
            </Link>
            <Link className="hover:text-blue-700" href="/dashboard/products">
              Sản phẩm
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </>
  );
}
```

`children` trong layout tương tự vị trí `<Outlet />` từng học ở React Router. Layout con không viết lại `<html>` và `<body>`.

## 5. Navigating Between Pages — `Link`

Dùng `Link` từ `next/link` cho đường dẫn nội bộ:

```tsx
import Link from "next/link";

<Link href="/dashboard/products">Xem sản phẩm</Link>;
```

| React Router            | Next.js                              |
| ----------------------- | ------------------------------------ |
| `<Link to="/products">` | `<Link href="/dashboard/products">`  |
| `useNavigate()`         | `useRouter()` trong Client Component |
| `<Outlet />`            | `{children}` trong `layout.tsx`      |

`Link` cho phép điều hướng phía client và có thể prefetch. Với hành động bình thường của người dùng, dùng `Link`; khi cần chuyển trang bằng code trong Client Component, dùng `useRouter()` từ `next/navigation`.

> Thực tế: Link là thẻ điều hướng có ngữ nghĩa; người dùng có thể mở tab mới, sao chép URL và dùng bàn phím.

## 6. Kết nối REST API — đọc và ghi sản phẩm

Dùng Express API trong thư mục `api/` của tài liệu buổi học. API chạy ở cổng `3001`; Next.js tiếp tục dùng cổng mặc định `3000`.

| Method   | Endpoint                             | Chức năng                          |
| -------- | ------------------------------------ | ---------------------------------- |
| `GET`    | `/products?query=&page=1&pageSize=5` | Tìm kiếm và phân trang danh sách   |
| `GET`    | `/products/stats`                    | Tổng số sản phẩm và giá trung bình |
| `GET`    | `/products/:id`                      | Lấy chi tiết một sản phẩm          |
| `POST`   | `/products`                          | Thêm sản phẩm; API tự tạo `id`     |
| `PATCH`  | `/products/:id`                      | Cập nhật tên hoặc giá              |
| `DELETE` | `/products/:id`                      | Xóa sản phẩm                       |

Mở terminal thứ nhất và chạy API:

```bash
cd "/Users/vuquocdung/my-folder/1.work/2.teach-class/1.class-resource/k20/day43/api"
pnpm install
pnpm dev
```

Trong terminal thứ hai, chạy Next.js như bình thường:

```bash
cd product-dashboard
pnpm dev
```

Mở `http://localhost:3000`. API demo lưu dữ liệu trong bộ nhớ; khi dừng API, danh sách quay về dữ liệu mẫu. API có kiểm tra đầu vào cơ bản và trả mã `400`/`404`, nhưng chưa có database hay xác thực người dùng.

Tạo `app/lib/products.ts` làm lớp gọi API từ Server Components và Server Actions. `cache: "no-store"` yêu cầu lấy dữ liệu mới mỗi lần gọi. Tìm kiếm và phân trang được gửi đến API thay vì tải toàn bộ danh sách về Next.js.

```ts
// app/lib/products.ts
const API_URL = process.env.API_URL ?? "http://localhost:3001";

type ApiError = Error & { status?: number };

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type ProductInput = Omit<Product, "id">;
export type ProductPage = {
  items: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
};
export type ProductStats = { total: number; averagePrice: number };

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = new Error(
      `API lỗi: ${response.status} ${response.statusText}`,
    ) as ApiError;
    error.status = response.status;
    throw error;
  }
  return response.json() as Promise<T>;
}

export function getProducts(
  query = "",
  page = 1,
  pageSize = 5,
): Promise<ProductPage> {
  const params = new URLSearchParams({
    query,
    page: String(page),
    pageSize: String(pageSize),
  });
  return apiRequest<ProductPage>(`/products?${params}`);
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    return await apiRequest<Product>(`/products/${id}`);
  } catch (error) {
    if ((error as ApiError).status === 404) return null;
    throw error;
  }
}

export function getProductStats(): Promise<ProductStats> {
  return apiRequest<ProductStats>("/products/stats");
}

export function createProduct(input: ProductInput): Promise<Product> {
  return apiRequest<Product>("/products", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateProduct(
  id: number,
  input: ProductInput,
): Promise<Product> {
  return apiRequest<Product>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteProduct(id: number): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/products/${id}`, {
    method: "DELETE",
  });
}
```

Tất cả request chạy ở server Next.js nên không cần cấu hình CORS cho bài tập này. Khi triển khai, đặt `API_URL` trỏ đến địa chỉ API thật; không hard-code địa chỉ localhost trong môi trường production.

## 7. Fetching Data — lấy dữ liệu trong Server Component

`app/dashboard/page.tsx` phiên bản đầu tiên:

```tsx
import { getProductStats } from "@/app/lib/products";

export default async function Page() {
  const stats = await getProductStats();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Tổng quan</h2>
      <p>Số sản phẩm: {stats.total}</p>
      <p>Giá trung bình: {stats.averagePrice.toLocaleString("vi-VN")} đ</p>
    </section>
  );
}
```

Server Component có thể là hàm `async` và chờ dữ liệu API trước khi tạo UI. `cache: "no-store"` trong lớp gọi API yêu cầu Next.js lấy dữ liệu mới thay vì dùng Data Cache.

> Thực tế: Nếu một trang cần nhiều nguồn dữ liệu độc lập, bắt đầu các Promise cùng lúc rồi dùng `Promise.all` để tránh chờ tuần tự không cần thiết.

## 8. Static and Dynamic Rendering — dữ liệu thay đổi khi nào?

| Kiểu render | Ý nghĩa                             | Ví dụ                                        |
| ----------- | ----------------------------------- | -------------------------------------------- |
| Static      | Nội dung có thể tạo sẵn và dùng lại | Trang giới thiệu ít thay đổi                 |
| Dynamic     | Tạo nội dung theo request           | Dashboard đọc API mới nhất, trang theo query |

Server Component **không đồng nghĩa** với “render lại ở mọi request”. Cache và request-time API quyết định thời điểm render. Trong ví dụ này, API chứa dữ liệu có thể thay đổi sau thao tác thêm/sửa/xóa, nên `cache: "no-store"` giúp Next.js đọc dữ liệu mới từ API mỗi lần render.

> Lưu ý: Với dữ liệu ít thay đổi, có thể chọn cache hoặc revalidation thay vì lấy mới ở mọi request.

## 9. Streaming — hiện giao diện trong lúc chờ dữ liệu

API demo phản hồi nhanh. Để quan sát loading/streaming trong lớp, `ProductStats` dưới đây cố ý chờ thêm 1,5 giây trước khi gọi API. Xóa dòng `delay` sau khi thực hành.

`app/dashboard/loading.tsx`:

```tsx
export default function Loading() {
  return <p className="animate-pulse text-slate-500">Đang tải dashboard...</p>;
}
```

`app/dashboard/ProductStats.tsx`:

```tsx
import { getProductStats } from "@/app/lib/products";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function ProductStats() {
  await delay(1500); // chỉ để thấy rõ streaming trong bài thực hành
  const stats = await getProductStats();

  return (
    <div className="space-y-2">
      <p>Số sản phẩm: {stats.total}</p>
      <p>Giá trung bình: {stats.averagePrice.toLocaleString("vi-VN")} đ</p>
    </div>
  );
}
```

**Thay thế** `app/dashboard/page.tsx` của chương 7:

```tsx
import { Suspense } from "react";
import ProductStats from "./ProductStats";

export default function Page() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Tổng quan</h2>
      <Suspense fallback={<p>Đang tải thống kê...</p>}>
        <ProductStats />
      </Suspense>
    </section>
  );
}
```

Tiêu đề có thể hiện trước; số liệu đến sau. `loading.tsx` dùng cho cả route, `<Suspense>` cho một phần. Nếu muốn thông báo riêng khi mở danh sách sản phẩm, thêm `app/dashboard/products/loading.tsx` với UI loading tương tự.

## 10. Adding Search and Pagination — API và URL

API nhận `query`, `page` và `pageSize`, rồi trả về danh sách trang hiện tại cùng tổng số kết quả. URL `/dashboard/products?query=product&page=2` lưu được bộ lọc và vị trí trang; ô tìm kiếm là Client Component để cập nhật URL.

`app/dashboard/products/Search.tsx`:

```tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("query", value);
    else params.delete("query");
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mb-5 flex flex-col gap-2 sm:max-w-sm">
      <label className="text-sm font-medium" htmlFor="query">
        Tìm sản phẩm
      </label>
      <input
        className="rounded-md border border-slate-300 bg-white px-3 py-2"
        id="query"
        type="search"
        defaultValue={searchParams.get("query") ?? ""}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
}
```

`app/dashboard/products/page.tsx` (bản danh sách cuối, sẽ dùng tiếp ở chương 11):

```tsx
import Link from "next/link";
import { deleteProductAction } from "@/app/lib/actions";
import { getProducts } from "@/app/lib/products";
import Search from "./Search";

const PAGE_SIZE = 5;

type Props = {
  searchParams: Promise<{
    query?: string | string[];
    page?: string | string[];
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const query = typeof params.query === "string" ? params.query : "";
  const rawPage = typeof params.page === "string" ? Number(params.page) : 1;
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const result = await getProducts(query, page, PAGE_SIZE);
  const hrefFor = (nextPage: number) =>
    `/dashboard/products?${new URLSearchParams({ query, page: String(nextPage) })}`;

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold">Danh sách sản phẩm</h2>
      <Search />
      <Link
        className="inline-flex rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        href="/dashboard/products/create"
      >
        Thêm sản phẩm
      </Link>
      {result.items.length === 0 ? (
        <p>Không có sản phẩm phù hợp.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Tên
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Giá
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {result.items.map((product) => (
                <tr key={product.id}>
                  <td className="border-t px-4 py-3">
                    <Link
                      className="font-medium text-blue-700 hover:underline"
                      href={`/dashboard/products/${product.id}`}
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="border-t px-4 py-3">
                    {product.price.toLocaleString("vi-VN")} đ
                  </td>
                  <td className="border-t px-4 py-3">
                    <Link
                      className="font-medium text-blue-700 hover:underline"
                      href={`/dashboard/products/${product.id}/edit`}
                    >
                      Sửa
                    </Link>
                    <form
                      action={deleteProductAction.bind(null, product.id)}
                      className="ml-3 inline"
                    >
                      <button
                        className="font-medium text-red-700 hover:underline"
                        type="submit"
                        aria-label={`Xóa ${product.name}`}
                      >
                        Xóa
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p>
        Có {result.total} sản phẩm. Trang {result.currentPage}/
        {result.totalPages}
      </p>
      <nav
        className="flex gap-4 text-sm font-medium text-blue-700"
        aria-label="Phân trang sản phẩm"
      >
        {result.currentPage > 1 && (
          <Link href={hrefFor(result.currentPage - 1)}>Trước</Link>
        )}
        {result.currentPage < result.totalPages && (
          <Link href={hrefFor(result.currentPage + 1)}>Sau</Link>
        )}
      </nav>
    </section>
  );
}
```

**Thứ tự thực hành:** Đến chương 10, có thể tạm bỏ import `deleteProductAction` và form Xóa. Thêm lại sau khi tạo Server Actions ở chương 11. `searchParams` trong Next.js hiện hành là Promise nên cần `await`.

> Thực tế: Tìm kiếm/phân trang chạy trong API, tránh tải toàn bộ sản phẩm về Next.js khi danh sách lớn.

## 11. Mutating Data — thêm, sửa, xóa với Server Actions

Server Action chạy ở server, gọi các hàm trong `app/lib/products.ts`, rồi làm mới trang liên quan. API nhận JSON và tự tạo id cho sản phẩm mới; lớp gọi API ở chương 6 chuyển tiếp request từ Server Action.

Tạo `app/lib/actions.ts`:

```ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  type ProductInput,
} from "@/app/lib/products";

function readProduct(formData: FormData): ProductInput {
  const name = String(formData.get("name") ?? "").trim();
  const priceText = String(formData.get("price") ?? "").trim();
  const price = Number(priceText);

  if (!name || !priceText || !Number.isFinite(price) || price < 0) {
    throw new Error("Dữ liệu sản phẩm không hợp lệ");
  }
  return { name, price };
}

export async function createProductAction(formData: FormData) {
  await createProduct(readProduct(formData));
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard");
  redirect("/dashboard/products");
}

export async function updateProductAction(id: number, formData: FormData) {
  await updateProduct(id, readProduct(formData));
  revalidatePath("/dashboard/products");
  revalidatePath(`/dashboard/products/${id}`);
  revalidatePath("/dashboard");
  redirect("/dashboard/products");
}

export async function deleteProductAction(id: number) {
  await deleteProduct(id);
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard");
}
```

> Lưu ý: API demo chưa xác thực hay kiểm tra dữ liệu. Server Action cần kiểm tra dữ liệu ở server; ứng dụng thật cũng phải xác thực người dùng và phân quyền trước khi gọi API.

Tạo component form chung `app/dashboard/products/ProductForm.tsx`:

```tsx
import type { Product } from "@/app/lib/products";

type Props = {
  action: (formData: FormData) => Promise<void>;
  product?: Product;
};

export default function ProductForm({ action, product }: Props) {
  return (
    <form className="grid max-w-lg gap-4" action={action}>
      <label htmlFor="name">Tên sản phẩm</label>
      <input
        className="rounded-md border border-slate-300 px-3 py-2"
        id="name"
        name="name"
        required
        defaultValue={product?.name ?? ""}
      />

      <label htmlFor="price">Giá (đồng)</label>
      <input
        className="rounded-md border border-slate-300 px-3 py-2"
        id="price"
        name="price"
        type="number"
        min="0"
        required
        defaultValue={product?.price ?? ""}
      />

      <button
        className="mt-2 w-fit rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        type="submit"
      >
        {product ? "Lưu thay đổi" : "Thêm sản phẩm"}
      </button>
    </form>
  );
}
```

`app/dashboard/products/create/page.tsx`:

```tsx
import { createProductAction } from "@/app/lib/actions";
import ProductForm from "../ProductForm";

export default function Page() {
  return (
    <>
      <h2 className="mb-5 text-2xl font-bold">Thêm sản phẩm</h2>
      <ProductForm action={createProductAction} />
    </>
  );
}
```

`app/dashboard/products/[id]/edit/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { updateProductAction } from "@/app/lib/actions";
import { getProductById } from "@/app/lib/products";
import ProductForm from "../../ProductForm";

type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <>
      <h2 className="mb-5 text-2xl font-bold">Sửa sản phẩm</h2>
      <ProductForm
        product={product}
        action={updateProductAction.bind(null, id)}
      />
    </>
  );
}
```

Sau khi tạo actions, dùng lại nút Xóa ở danh sách chương 10. Luồng lúc này là form → Server Action → `fetch()` đến Express API → `revalidatePath()` → UI mới.

## 12. Handling Errors — lỗi bất ngờ và không tìm thấy

`app/dashboard/products/[id]/page.tsx`:

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/app/lib/products";

type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <article className="space-y-4 rounded-lg border bg-white p-6">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p>Giá: {product.price.toLocaleString("vi-VN")} đ</p>
      <Link
        className="font-medium text-blue-700 hover:underline"
        href="/dashboard/products"
      >
        Về danh sách
      </Link>
    </article>
  );
}
```

`app/dashboard/products/[id]/not-found.tsx`:

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h2>Không tìm thấy sản phẩm</h2>
      <Link
        className="font-medium text-blue-700 hover:underline"
        href="/dashboard/products"
      >
        Về danh sách
      </Link>
    </>
  );
}
```

`app/dashboard/error.tsx` xử lý lỗi render không mong đợi trong các trang con của dashboard:

```tsx
"use client";

export default function ErrorPage({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return (
    <div
      className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-5"
      role="alert"
    >
      <h2>Đã có lỗi xảy ra</h2>
      <button
        className="rounded-md bg-red-700 px-4 py-2 font-medium text-white"
        type="button"
        onClick={() => unstable_retry()}
      >
        Thử lại
      </button>
    </div>
  );
}
```

`error.tsx` phải là Client Component. `notFound()` dành cho tài nguyên không tồn tại; lỗi dữ liệu bất ngờ thì xử lý hoặc ném lỗi để error boundary hiển thị. Tên callback retry có thể thay đổi theo phiên bản Next.js; ví dụ trên theo tài liệu Next.js hiện hành.

## 13. Improving Accessibility — validation và HTML có ngữ nghĩa

Ở form chương 11, mỗi input có `<label htmlFor="...">`, `name`, `required`; số có `min` và `step`. Bảng dùng `<th scope="col">` để đánh dấu tiêu đề cột, vùng phân trang có `aria-label`, nút Xóa có nhãn theo tên sản phẩm. Thử dùng phím `Tab` để đi qua form và link mà không cần chuột.

Validation ở browser giúp trải nghiệm, nhưng **server phải kiểm tra lại** vì người dùng có thể gửi request bỏ qua HTML. Hàm `readProduct()` ở trên là một bước kiểm tra server. Để hiện lỗi ngay trong form thay vì ném lỗi chung, chương tiếp theo có thể nâng cấp Server Action trả về trạng thái lỗi và dùng `useActionState`:

```tsx
"use client";

import { useActionState } from "react";

// action có chữ ký: (previousState, formData) => Promise<{ message: string }>
function ExampleForm({
  action,
}: {
  action: (
    state: { message: string },
    data: FormData,
  ) => Promise<{ message: string }>;
}) {
  const [state, formAction, pending] = useActionState(action, { message: "" });
  return (
    <form action={formAction}>
      <label htmlFor="example-name">Tên</label>
      <input id="example-name" name="name" required />
      {state.message && <p role="alert">{state.message}</p>}
      <button disabled={pending}>Lưu</button>
    </form>
  );
}
```

Đây là **mẫu mở rộng độc lập**, chưa thay thế `ProductForm` của chương 11. Khi áp dụng thật, Server Action phải trả về `{ message: ... }` cho lỗi dự kiến, và chỉ redirect khi lưu thành công.

## 14. Adding Authentication — phân biệt đăng nhập và phân quyền

Bài gốc dùng thư viện xác thực và bảo vệ dashboard. Với demo dữ liệu giả, trước tiên cần hiểu:

| Khái niệm      | Câu hỏi          | Ví dụ                               |
| -------------- | ---------------- | ----------------------------------- |
| Authentication | Bạn là ai?       | Đăng nhập bằng tài khoản            |
| Authorization  | Bạn được làm gì? | Chỉ quản trị viên được xóa sản phẩm |

Lớp **không thêm màn hình đăng nhập giả** vào demo để tránh hiểu nhầm rằng ẩn nút Xóa hoặc kiểm tra ở client là bảo vệ dữ liệu. Nếu mở rộng thành ứng dụng thật, dùng giải pháp xác thực có session, bảo vệ route ở server, và **kiểm tra quyền trong từng Server Action** `createProductAction`, `updateProductAction`, `deleteProductAction` trước khi ghi dữ liệu. API demo hiện lưu mảng trong bộ nhớ; ứng dụng thật cần database để dữ liệu tồn tại bền vững.

> Câu hỏi thảo luận: Nếu người dùng tự gửi request đến `deleteProductAction`, việc ẩn nút Xóa trên giao diện có ngăn được họ không? Vì sao cần kiểm tra quyền ngay trong action?

## 15. Adding Metadata — tiêu đề và mô tả trang

Metadata giúp browser và công cụ tìm kiếm hiểu trang. Thêm vào `app/layout.tsx` (giữ nguyên `RootLayout` đã tạo ở chương 4):

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý sản phẩm",
  description: "Bài thực hành Next.js App Router kết nối REST API sản phẩm",
};
```

Có thể khai báo metadata riêng trong `app/dashboard/products/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Danh sách sản phẩm" };
```

Hai đoạn trên là **phần thêm vào file hiện có**, không thay thế toàn bộ file. Metadata tĩnh export từ Server Component; với tiêu đề theo sản phẩm, tìm hiểu `generateMetadata` và `await params`.
