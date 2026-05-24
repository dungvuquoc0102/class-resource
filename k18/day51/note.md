# Day 50: Next.js Cơ Bản

### Installation & Setup

#### Yêu cầu hệ thống

- **Node.js** ≥ 20 trở lên
- **npm**, **yarn**, **pnpm** hoặc **bun**

#### Cài đặt nhanh với `create-next-app`

```bash
# Cách 1: Dùng official CLI (recommended)
npx create-next-app@latest my-app
cd my-app
npm run dev
```

```bash
# Cách 2: Dùng TypeScript (chọn khi hỏi)
npx create-next-app@latest my-app --typescript
```

```bash
# Cách 3: Cài thủ công
npm init -y
npm install next react react-dom
# Tạo thư mục app/
# Viết code...
```

#### Cấu trúc thư mục mặc định (App Router - recommended)

```
my-app/
├── app/
│   ├── layout.js          # Root layout (HTML bao quanh toàn bộ ứng dụng)
│   ├── page.js            # Route / (trang chủ)
│   └── dashboard/
│       └── page.js        # Route /dashboard
├── public/                # Static assets (ảnh, font, …)
├── node_modules/
├── package.json
├── next.config.js         # Cấu hình Next.js
├── jsconfig.json          # JavaScript config (hoặc tsconfig.json cho TS)
└── .gitignore
```

#### Scripts trong `package.json`

```json
{
  "scripts": {
    "dev": "next dev", // Dev server tại http://localhost:3000
    "build": "next build", // Build cho production
    "start": "next start", // Chạy production build
    "lint": "next lint" // Lint code
  }
}
```

---

### Project Structure (App Router)

#### File hệ thống (Special Files)

| File           | Mục đích                                                      |
| -------------- | ------------------------------------------------------------- |
| `layout.js`    | Khung chứa các route con; định nghĩa `<html>` bao quanh trang |
| `page.js`      | Route chính của folder — `page.js` trong `app/` → Route `/`   |
| `not-found.js` | Hiển thị khi route không tồn tại (404)                        |
| `error.js`     | Error boundary — bắt lỗi trong con của folder                 |
| `loading.js`   | Suspense fallback khi trang đang load                         |

#### Ví dụ cấu trúc routing

```
app/
├── layout.js              # <html>, <body>, nav, … cho toàn site
├── page.js                # /
├── about/
│   └── page.js            # /about
├── blog/
│   ├── page.js            # /blog (danh sách bài)
│   └── [id]/
│       └── page.js        # /blog/123 (chi tiết bài với id=123)
└── dashboard/
    ├── layout.js          # Layout riêng cho /dashboard
    ├── page.js            # /dashboard
    └── settings/
        └── page.js        # /dashboard/settings
```

**Dynamic routes** dùng `[param]` — Next.js truyền giá trị qua **props**:

```javascript
// app/blog/[id]/page.js
export default function BlogPost({ params }) {
  return <h1>Bài viết #{params.id}</h1>;
}
```

---

### Linking & Navigation

#### `<Link>` component (Recommended)

Next.js cung cấp component `<Link>` — tự động **prefetch** (tải trước) trang được link để tăng tốc độ.

```javascript
// app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <nav>
      <Link href="/">Trang chủ</Link>
      <Link href="/about">Giới thiệu</Link>
      <Link href="/blog">Blog</Link>
      <Link href={`/blog/${id}`}>Chi tiết bài {id}</Link>
    </nav>
  );
}
```

#### Lợi ích của `<Link>`

1. **Code Splitting** — chỉ load JS/CSS của trang đích khi cần
2. **Prefetching** — tự động tải trước khi hover (sản xuất mặc định)
3. **Caching** — các trang ghé qua được lưu, quay lại nhanh hơn
4. **Soft Navigation** — không reload toàn bộ trang (giữ state nếu cần)

#### `useRouter()` hook (JavaScript logic)

```javascript
"use client";
import { useRouter } from "next/navigation";

export default function SubmitButton() {
  const router = useRouter();

  function handleClick() {
    // Logic xử lý…
    router.push("/dashboard"); // Điều hướng
    // hoặc
    router.back(); // Quay lại
    router.refresh(); // Reload current page từ server
  }

  return <button onClick={handleClick}>Gửi</button>;
}
```

> **Lưu ý**: `useRouter` phải được gọi trong **client component** (có directive `'use client'`).

---

### Server & Client Components

Next.js 13+ phân biệt **Server Components** (mặc định) và **Client Components** (dùng khi cần interactivity).

#### Server Components (mặc định)

```javascript
// app/posts/page.js
// Chạy trên server — được gọi mỗi lần request

import db from "@/lib/db";

export default async function PostsPage() {
  const posts = await db.query("SELECT * FROM posts");

  return (
    <div>
      <h1>Danh sách bài viết</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Lợi ích**:

- Truy cập trực tiếp database, API keys, tokens an toàn
- Logic xử lý nhạy cảm ở server
- Giảm kích thước bundle JS (không gửi code xuống client)

#### Client Components (khi cần)

```javascript
"use client"; // Pragma — báo cho Next.js đây là client component

import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted on client");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

**Khi nào dùng Client Components**:

- Hooks: `useState`, `useEffect`, `useContext`, …
- Event listeners: `onClick`, `onChange`, …
- Interactivity (forms, animations, …)

#### Hỗn hợp Server & Client

```javascript
// app/page.js
import PostsList from "@/components/PostsList"; // Server component
import Counter from "@/components/Counter"; // Client component

export default function Home() {
  // Server component — có thể async
  return (
    <main>
      <PostsList /> {/* server → data from db */}
      <Counter /> {/* client → interactive */}
    </main>
  );
}
```

---

### Fetching Data

#### `fetch()` trong Server Components (async/await)

```javascript
// app/posts/page.js
export default async function PostsPage() {
  // Direct database query
  const data = await fetch("https://api.example.com/posts", {
    next: { revalidate: 60 }, // ISR: revalidate mỗi 60 giây
  });
  const posts = await data.json();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

#### URL Search Params từ query string

```javascript
// app/search/page.js
export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";

  const res = await fetch(
    `https://api.example.com/search?q=${encodeURIComponent(query)}`,
  );
  const results = await res.json();

  return (
    <div>
      <h1>Search: {query}</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
```

#### Dynamic Route Params

```javascript
// app/blog/[id]/page.js
export default async function BlogPost({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await res.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

---

### Mutating Data (Server Actions)

#### Server Actions (async functions)

```javascript
// app/actions.js (hoặc inline trong server component)
"use server";

import db from "@/lib/db";

export async function createPost(formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  // Database insert
  const result = await db.insert("posts", { title, content });

  return { success: true, id: result.id };
}
```

#### Sử dụng trong Form

```javascript
// app/new-post/page.js
import { createPost } from "@/app/actions";

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input type="text" name="title" placeholder="Tiêu đề" required />
      <textarea name="content" placeholder="Nội dung" required />
      <button type="submit">Tạo bài viết</button>
    </form>
  );
}
```

**Lợi ích**:

- Không cần tạo API route
- Server action tự động được gọi khi form submit
- Kết quả có thể revalidate cache

#### Server Action với hook `useFormStatus` (Client)

```javascript
"use client";

import { useFormStatus } from "react-dom";
import { createPost } from "@/app/actions";

export default function PostForm() {
  const { pending } = useFormStatus();

  return (
    <form action={createPost}>
      <input name="title" placeholder="Tiêu đề" required />
      <textarea name="content" placeholder="Nội dung" required />
      <button type="submit" disabled={pending}>
        {pending ? "Đang tạo..." : "Tạo bài viết"}
      </button>
    </form>
  );
}
```

---

### Caching

Next.js có nhiều lớp caching để tối ưu hiệu năng.

#### 1. Request Memoization

Trong **cùng một render** (server component), `fetch()` có cùng URL được **tự động deduped** (gọi 1 lần).

```javascript
// app/page.js
export default async function Page() {
  // Chỉ fetch 1 lần, kết quả dùng chung
  const user1 = await fetch("https://api.example.com/user/123");
  const user2 = await fetch("https://api.example.com/user/123");

  // user1 === user2 (cùng promise)
}
```

#### 2. Data Cache (default - persistent between builds)

```javascript
// next.config.js hoặc fetch option
export default async function Page() {
  // Mặc định: cache vô hạn (lên máy chủ production)
  const data = await fetch("https://api.example.com/posts");
  // hoặc
  const dataRefresh = await fetch(
    "https://api.example.com/posts",
    { next: { revalidate: 3600 } }, // Revalidate mỗi 1 giờ (ISR)
  );
  // hoặc
  const dataNoCache = await fetch(
    "https://api.example.com/posts",
    { cache: "no-store" }, // Luôn fetch mới
  );
}
```

| Option                        | Ý nghĩa                              |
| ----------------------------- | ------------------------------------ |
| `next: { revalidate: 60 }`    | ISR — revalidate mỗi 60 giây         |
| `next: { revalidate: false }` | Cache vô hạn                         |
| `cache: 'no-store'`           | Không cache — luôn fetch mới         |
| `next: { tags: ['posts'] }`   | Tagging — dùng cho `revalidateTag()` |

#### 3. Revalidation

**ISR (Incremental Static Regeneration)**:

```javascript
// app/blog/page.js
export const revalidate = 60; // Revalidate mỗi 60 giây

export default async function BlogPage() {
  const posts = await fetch("https://api.example.com/posts");
  return <div>...</div>;
}
```

**On-Demand Revalidation** (trong Server Action):

```javascript
// app/actions.js
"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function updatePost(id, data) {
  // Update database…

  // Revalidate liền
  revalidatePath("/blog"); // Revalidate path /blog
  revalidateTag("posts"); // Revalidate posts tag

  return { success: true };
}
```

#### 4. Route Segment Config (toàn file component)

```javascript
// app/page.js
export const dynamic = "force-dynamic"; // Luôn dynamic (không cache)
export const revalidate = 0; // Không cache
export const dynamicParams = true; // Cho phép dynamic params

export default async function Page() {
  // ...
}
```

---

## Bài tập từng phần

### Bài tập 1: Installation & Setup

**Mục tiêu**: Làm quen với cài đặt và cấu trúc dự án Next.js

1. Tạo một dự án Next.js mới dùng `create-next-app@latest`
   - Chọn cấu hình: App Router (recommended)
   - Chọn Tailwind CSS hoặc CSS modules
   - Chọn không TypeScript (hoặc có nếu bạn muốn)

2. Kiểm tra cấu trúc thư mục — phải có:
   - `app/` folder với `layout.js` và `page.js`
   - `public/` folder
   - `package.json` với scripts `dev`, `build`, `start`

3. Chạy dev server: `npm run dev` (hoặc `pnpm dev`)
   - Mở http://localhost:3000
   - Xem trang mặc định

4. Sửa `app/page.js` — hiển thị:

   ```javascript
   export default function Home() {
     return (
       <main>
         <h1>Chào mừng đến với Next.js</h1>
         <p>Đây là dự án đầu tiên của tôi</p>
       </main>
     );
   }
   ```

5. Kiểm tra hot reload — thay đổi text, xem trang tự cập nhật

---

### Bài tập 2: Project Structure & Routing

**Mục tiêu**: Tạo routing cơ bản với nhiều page

1. Tạo cấu trúc như sau:

   ```
   app/
   ├── layout.js
   ├── page.js (trang chủ)
   ├── about/
   │   └── page.js (/about)
   └── services/
       └── page.js (/services)
   ```

2. Mỗi page ghi nội dung riêng:

   ```javascript
   // app/about/page.js
   export default function About() {
     return <h1>Giới thiệu về chúng tôi</h1>;
   }
   ```

3. Cập nhật root `layout.js` để có navigation:

   ```javascript
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
             <a href="/">Trang chủ</a> |<a href="/about">Giới thiệu</a> |
             <a href="/services">Dịch vụ</a>
           </nav>
           {children}
         </body>
       </html>
     );
   }
   ```

4. Truy cập từng page: `/`, `/about`, `/services`

5. **Bài tập mở rộng**: Tạo dynamic route `/products/[id]`
   - Tạo file: `app/products/[id]/page.js`
   - Hiển thị: `Product ID: {params.id}`
   - Test với `/products/1`, `/products/banana`, etc.

---

### Bài tập 3: Linking & Navigation

**Mục tiêu**: Sử dụng `<Link>` component và `useRouter`

1. Thay thế các `<a>` tag trong layout bằng `<Link>`:

   ```javascript
   import Link from "next/link";

   <nav>
     <Link href="/">Trang chủ</Link>
     <Link href="/about">Giới thiệu</Link>
   </nav>;
   ```

2. Tạo trang danh sách sản phẩm `app/products/page.js`:

   ```javascript
   import Link from "next/link";

   const products = [
     { id: 1, name: "Laptop" },
     { id: 2, name: "Phone" },
     { id: 3, name: "Tablet" },
   ];

   export default function Products() {
     return (
       <div>
         <h1>Danh sách sản phẩm</h1>
         <ul>
           {products.map((p) => (
             <li key={p.id}>
               <Link href={`/products/${p.id}`}>{p.name}</Link>
             </li>
           ))}
         </ul>
       </div>
     );
   }
   ```

3. Tạo page chi tiết sản phẩm `app/products/[id]/page.js`:

   ```javascript
   import Link from "next/link";

   export default function ProductDetail({ params }) {
     return (
       <div>
         <h1>Product ID: {params.id}</h1>
         <Link href="/products">← Quay lại danh sách</Link>
       </div>
     );
   }
   ```

4. Test: Click vào các sản phẩm, quay lại

5. **Bài tập mở rộng**: Tạo component button với `useRouter`:

   ```javascript
   "use client";
   import { useRouter } from "next/navigation";

   export default function BackButton() {
     const router = useRouter();
     return <button onClick={() => router.back()}>← Quay lại</button>;
   }
   ```

---

### Bài tập 4: Server & Client Components

**Mục tiêu**: Hiểu khi nào dùng Server vs Client components

1. Tạo component Server hiển thị dữ liệu giả (không dùng state):

   ```javascript
   // app/components/ServerInfo.js
   export default function ServerInfo() {
     return (
       <div>
         <h2>Server Component</h2>
         <p>Thời gian render: {new Date().toLocaleTimeString()}</p>
       </div>
     );
   }
   ```

2. Tạo component Client với interactivity:

   ```javascript
   // app/components/Counter.js
   "use client";
   import { useState } from "react";

   export default function Counter() {
     const [count, setCount] = useState(0);

     return (
       <div>
         <h2>Client Component</h2>
         <p>Count: {count}</p>
         <button onClick={() => setCount(count + 1)}>+1</button>
       </div>
     );
   }
   ```

3. Import cả hai vào `app/page.js`:

   ```javascript
   import ServerInfo from "./components/ServerInfo";
   import Counter from "./components/Counter";

   export default function Home() {
     return (
       <main>
         <h1>Home</h1>
         <ServerInfo />
         <Counter />
       </main>
     );
   }
   ```

4. Quan sát: Component nào cần interactivity → Client

5. **Bài tập mở rộng**: Tạo form client component:

   ```javascript
   "use client";
   import { useState } from "react";

   export default function Form() {
     const [name, setName] = useState("");

     return (
       <div>
         <input
           placeholder="Tên của bạn"
           value={name}
           onChange={(e) => setName(e.target.value)}
         />
         <p>Xin chào {name}</p>
       </div>
     );
   }
   ```

---

### Bài tập 5: Fetching Data

**Mục tiêu**: Fetch từ API và hiển thị dữ liệu

1. Tạo page fetch từ JSONPlaceholder (API public miễn phí):

   ```javascript
   // app/posts/page.js
   export default async function PostsPage() {
     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
     const posts = await res.json();

     return (
       <div>
         <h1>Bài viết (từ API)</h1>
         <ul>
           {posts.slice(0, 5).map((post) => (
             <li key={post.id}>
               <h3>{post.title}</h3>
               <p>{post.body}</p>
             </li>
           ))}
         </ul>
       </div>
     );
   }
   ```

2. Tạo dynamic page chi tiết post:

   ```javascript
   // app/posts/[id]/page.js
   export default async function PostDetail({ params }) {
     const res = await fetch(
       `https://jsonplaceholder.typicode.com/posts/${params.id}`,
     );
     const post = await res.json();

     return (
       <article>
         <h1>{post.title}</h1>
         <p>{post.body}</p>
         <small>User ID: {post.userId}</small>
       </article>
     );
   }
   ```

3. Link từ danh sách đến chi tiết:

   ```javascript
   import Link from "next/link";

   {
     posts.map((post) => (
       <li key={post.id}>
         <Link href={`/posts/${post.id}`}>{post.title}</Link>
       </li>
     ));
   }
   ```

4. **Bài tập mở rộng**: Thêm ISR caching
   ```javascript
   export default async function PostsPage() {
     const res = await fetch(
       "https://jsonplaceholder.typicode.com/posts",
       { next: { revalidate: 3600 } }, // Cache 1 giờ
     );
     // ...
   }
   ```

---

### Bài tập 6: Mutating Data (Server Actions)

**Mục tiêu**: Tạo form submit dùng Server Actions

1. Tạo file `app/actions.js`:

   ```javascript
   "use server";

   export async function addPost(formData) {
     const title = formData.get("title");
     const body = formData.get("body");

     console.log("Server received:", { title, body });

     // Giả lập gọi API
     return { success: true, message: "Bài viết tạo thành công!" };
   }
   ```

2. Tạo page form `app/new-post/page.js`:

   ```javascript
   import { addPost } from "@/app/actions";

   export default function NewPostPage() {
     return (
       <form action={addPost}>
         <input name="title" placeholder="Tiêu đề" required />
         <textarea name="body" placeholder="Nội dung" required />
         <button type="submit">Tạo bài viết</button>
       </form>
     );
   }
   ```

3. Test: Submit form, xem console server (terminal `npm run dev`)

4. **Bài tập mở rộng**: Thêm client-side loading state:

   ```javascript
   "use client";
   import { useFormStatus } from "react-dom";
   import { addPost } from "@/app/actions";

   function SubmitButton() {
     const { pending } = useFormStatus();
     return (
       <button type="submit" disabled={pending}>
         {pending ? "Đang tạo..." : "Tạo bài viết"}
       </button>
     );
   }

   export default function NewPostPage() {
     return (
       <form action={addPost}>
         <input name="title" placeholder="Tiêu đề" required />
         <textarea name="body" placeholder="Nội dung" required />
         <SubmitButton />
       </form>
     );
   }
   ```

---

### Bài tập 7: Caching & Revalidation

**Mục tiêu**: Thực hành caching strategies

1. **Tạo page với ISR**:

   ```javascript
   // app/cached-data/page.js
   export const revalidate = 30; // Revalidate mỗi 30 giây

   export default async function CachedPage() {
     const res = await fetch("https://jsonplaceholder.typicode.com/users");
     const users = await res.json();

     return (
       <div>
         <h1>Danh sách người dùng (cached)</h1>
         <p>Cập nhật lần cuối: {new Date().toLocaleTimeString()}</p>
         <ul>
           {users.slice(0, 5).map((u) => (
             <li key={u.id}>{u.name}</li>
           ))}
         </ul>
       </div>
     );
   }
   ```

2. **Tạo page dynamic (no-store)**:

   ```javascript
   // app/live-data/page.js
   export const dynamic = "force-dynamic";

   export default async function LivePage() {
     const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
       cache: "no-store",
     });
     const post = await res.json();

     return (
       <div>
         <h1>Live Data (luôn mới)</h1>
         <p>Lấy lúc: {new Date().toLocaleTimeString()}</p>
         <h2>{post.title}</h2>
       </div>
     );
   }
   ```

3. Test:
   - `/cached-data` — thời gian giống nhau trong 30s
   - `/live-data` — thời gian thay đổi mỗi lần refresh

4. **Bài tập mở rộng**: On-demand revalidation

   ```javascript
   // app/actions.js
   "use server";
   import { revalidatePath } from "next/cache";

   export async function refreshCache() {
     revalidatePath("/cached-data");
     return { success: true };
   }
   ```

---

### Bài tập 8: Tổng hợp Mini Project

**Mục tiêu**: Kết hợp tất cả kiến thức vào một dự án nhỏ

**Yêu cầu**:

1. Tạo ứng dụng "Todo List" đơn giản:
   - Trang chủ: Danh sách todo (từ API hoặc fake data)
   - Page tạo todo mới (Server Action)
   - Trang chi tiết: `/todos/[id]`

2. Cấu trúc:

   ```
   app/
   ├── layout.js (navigation)
   ├── page.js (home)
   ├── actions.js (addTodo)
   ├── new/page.js (form tạo)
   ├── todos/
   │   ├── page.js (danh sách)
   │   └── [id]/page.js (chi tiết)
   └── components/
       ├── Counter.js (client)
       └── TodoForm.js (client)
   ```

3. Tính năng:
   - ✅ Routing cơ bản (home, /todos, /new, /todos/[id])
   - ✅ Linking giữa các page
   - ✅ Server component fetch dữ liệu (danh sách todo)
   - ✅ Client component form (tạo todo)
   - ✅ Server Action (submit form)
   - ✅ Dynamic route với params

4. Test toàn bộ luồng:
   - Xem danh sách
   - Click vào từng item
   - Tạo todo mới
   - Quay lại danh sách

---
