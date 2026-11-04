# Day 21: React Router

## Giới thiệu

React mặc định chỉ là thư viện xây dựng UI, không tự có hệ thống routing.

Theo tài liệu chính thức ở Declarative Mode, `react-router` giúp ứng dụng React có nhiều URL khác nhau như:

- `/` - trang chủ
- `/products` - danh sách sản phẩm
- `/products/12` - chi tiết sản phẩm có id là `12`
- `/about` - giới thiệu
- `*` - trang không tìm thấy

> Thực tế: Với SPA (Single Page Application), khi chuyển trang bằng React Router, trình duyệt không reload toàn bộ HTML. React chỉ thay đổi component cần hiển thị theo URL hiện tại.

## Cài đặt

Cài React Router:

```bash
npm i react-router
```

> Lưu ý: Với phiên bản mới theo trang chủ React Router, package cài đặt và import là `react-router`, không phải `react-router-dom`.

## Cấu trúc cơ bản với `BrowserRouter`

Trong `main.jsx`, bọc toàn bộ app bằng `BrowserRouter`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

Trong `App.jsx`, khai báo danh sách route:

```jsx
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
```

| Thành phần      | Ý nghĩa                                           |
| --------------- | ------------------------------------------------- |
| `BrowserRouter` | Kết nối React Router với URL trên trình duyệt     |
| `Routes`        | Vùng chứa danh sách các route                     |
| `Route`         | Định nghĩa một đường dẫn và component tương ứng   |
| `path`          | URL cần khớp                                      |
| `element`       | Component sẽ render khi URL khớp                  |
| `path="*"`      | Route bắt mọi URL không khớp, thường dùng cho 404 |

> Theo docs Declarative Mode: Route được cấu hình bằng cách render `<Routes>` và `<Route>` để nối URL segment với UI component.

## Chuyển trang với `Link`

Không nên dùng thẻ `<a href="/about">` để chuyển trang nội bộ trong SPA, vì trình duyệt sẽ reload lại toàn bộ trang.

React Router cung cấp `Link`:

```jsx
import { Link } from "react-router";

function Header() {
  return (
    <nav>
      <Link to="/">Trang chủ</Link>
      <Link to="/products">Sản phẩm</Link>
      <Link to="/about">Giới thiệu</Link>
    </nav>
  );
}
```

| HTML thường      | React Router       |
| ---------------- | ------------------ |
| `<a href="/">`   | `<Link to="/">`    |
| Reload lại trang | Không reload trang |

## `NavLink` - link có trạng thái active

`NavLink` giống `Link`, nhưng biết được route hiện tại có đang active hay không. Theo mặc định, khi active nó tự có class `.active`, nên có thể style trực tiếp bằng CSS.

```jsx
import { NavLink } from "react-router";

function Header() {
  return (
    <nav>
      <NavLink to="/" end>
        Trang chủ
      </NavLink>
      <NavLink to="/products">Sản phẩm</NavLink>
    </nav>
  );
}
```

```css
.active {
  color: red;
  font-weight: bold;
}
```

> Thực tế: Menu chính của website thường dùng `NavLink`, còn link bình thường trong nội dung trang thường dùng `Link`.

Nếu cần tự điều kiện class theo `isActive`, có thể dùng callback:

```jsx
<NavLink
  to="/products"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  Sản phẩm
</NavLink>
```

## Route động với `useParams`

Route động dùng khi URL có phần thay đổi, ví dụ id sản phẩm:

```jsx
<Route path="/products/:productId" element={<ProductDetailPage />} />
```

Lấy giá trị `productId` bằng `useParams`:

```jsx
import { useParams } from "react-router";

function ProductDetailPage() {
  const { productId } = useParams();

  return <h1>Chi tiết sản phẩm #{productId}</h1>;
}
```

| URL             | `useParams()` trả về   |
| --------------- | ---------------------- |
| `/products/1`   | `{ productId: "1" }`   |
| `/products/abc` | `{ productId: "abc" }` |

> Lưu ý: Giá trị lấy từ URL luôn là `string`. Nếu cần tính toán số học, phải ép kiểu bằng `Number(productId)`.

### Chuyển trang bằng code với `useNavigate`

`useNavigate` dùng khi cần chuyển trang bằng code, ví dụ đăng nhập thành công, logout do hết phiên, hoặc UI có timer như bài quiz.

> Thực tế: Nếu người dùng bấm vào link để chuyển trang bình thường, ưu tiên dùng `Link` hoặc `NavLink` vì trải nghiệm mặc định tốt hơn: hỗ trợ mở tab mới, menu chuột phải, keyboard, accessibility.

```jsx
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();

  function handleLogin() {
    // Giả sử đăng nhập thành công
    navigate("/dashboard");
  }

  return <button onClick={handleLogin}>Đăng nhập</button>;
}
```

Một vài cách dùng phổ biến:

```jsx
navigate("/products"); // đi tới trang sản phẩm
navigate(-1); // quay lại trang trước
navigate("/", { replace: true }); // thay thế lịch sử hiện tại
```

## Query string với `useSearchParams`

Query string là phần sau dấu `?` trên URL.

Ví dụ:

```txt
/products?keyword=phone&page=2
```

Đọc và cập nhật query string:

```jsx
import { useSearchParams } from "react-router";

function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const page = searchParams.get("page") || "1";

  function handleSearch(keyword) {
    setSearchParams({ keyword, page: "1" });
  }

  return (
    <div>
      <p>Từ khóa: {keyword}</p>
      <p>Trang: {page}</p>
      <button onClick={() => handleSearch("laptop")}>Tìm laptop</button>
    </div>
  );
}
```

> Thực tế: Dùng query string cho filter, search, sort, pagination vì người dùng có thể copy URL và mở lại đúng trạng thái đó.

## Location object với `useLocation`

`useLocation` trả về thông tin URL hiện tại như `pathname`, `search`, `hash`, `state`, `key`.

```jsx
import { useEffect } from "react";
import { useLocation } from "react-router";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    console.log("Page view:", location.pathname);
  }, [location]);

  return null;
}
```

> Thực tế: `useLocation` thường dùng cho analytics, scroll restoration, hoặc chạy logic phụ khi URL thay đổi.

## Layout trong React Router

### Vì sao cần Layout?

Nhiều trang trong app thường có chung:

- Header
- Sidebar
- Footer
- Container
- Menu điều hướng

Nếu copy `Header` và `Footer` vào từng page, code sẽ bị lặp.

`Layout` giúp tạo một khung giao diện chung, còn nội dung bên trong thay đổi theo route.

### `Outlet`

`Outlet` là vị trí React Router render route con.

```jsx
import { Outlet, NavLink } from "react-router";

function MainLayout() {
  return (
    <div>
      <header>
        <h1>My Shop</h1>
        <nav>
          <NavLink to="/">Trang chủ</NavLink>
          <NavLink to="/products">Sản phẩm</NavLink>
          <NavLink to="/about">Giới thiệu</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>Copyright 2026</footer>
    </div>
  );
}

export default MainLayout;
```

Khai báo nested route:

```jsx
import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/:productId" element={<ProductDetailPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
```

| Cú pháp                          | Ý nghĩa                               |
| -------------------------------- | ------------------------------------- |
| `<Route path="/" element={...}>` | Route cha, render layout              |
| `<Route index element={...} />`  | Trang mặc định của route cha          |
| `path="products"`                | Route con, không cần viết `/products` |
| `<Outlet />`                     | Nơi route con được render             |

> Lưu ý: Trong nested route, `path` của route con thường viết tương đối, ví dụ `products`, không cần `/products`.

### Index route

Index route là route mặc định render vào `<Outlet />` của route cha khi URL đang ở đúng path của route cha.

```jsx
<Routes>
  <Route path="/" element={<MainLayout />}>
    <Route index element={<HomePage />} />

    <Route path="dashboard" element={<DashboardLayout />}>
      <Route index element={<DashboardHomePage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
  </Route>
</Routes>
```

| URL                   | Component được render trong `Outlet` |
| --------------------- | ------------------------------------ |
| `/`                   | `HomePage`                           |
| `/dashboard`          | `DashboardHomePage`                  |
| `/dashboard/settings` | `SettingsPage`                       |

> Lưu ý: Index route không có `path` và không có route con. Nó là trang mặc định của route cha.

### Layout route không có `path`

Theo React Router, một route không có `path` nhưng có `element` sẽ tạo thêm một tầng layout cho các route con, nhưng không thêm segment nào vào URL.

```jsx
<Routes>
  <Route element={<MarketingLayout />}>
    <Route index element={<MarketingHomePage />} />
    <Route path="contact" element={<ContactPage />} />
  </Route>
</Routes>
```

Trong ví dụ trên:

- `/` render `MarketingHomePage` bên trong `MarketingLayout`
- `/contact` render `ContactPage` bên trong `MarketingLayout`

### Route prefix không có `element`

Một `<Route path>` không có `element` sẽ thêm tiền tố URL cho route con, nhưng không tự render layout.

```jsx
<Routes>
  <Route path="projects">
    <Route index element={<ProjectsHomePage />} />
    <Route path=":projectId" element={<ProjectDetailPage />} />
    <Route path=":projectId/edit" element={<EditProjectPage />} />
  </Route>
</Routes>
```

| URL                 | Component           |
| ------------------- | ------------------- |
| `/projects`         | `ProjectsHomePage`  |
| `/projects/12`      | `ProjectDetailPage` |
| `/projects/12/edit` | `EditProjectPage`   |

### Dynamic, optional và splat route

#### Dynamic segment

Segment bắt đầu bằng `:` là dynamic segment.

```jsx
<Route path="/teams/:teamId" element={<TeamPage />} />
```

```jsx
import { useParams } from "react-router";

function TeamPage() {
  const { teamId } = useParams();

  return <h1>Team: {teamId}</h1>;
}
```

#### Optional segment

Thêm `?` vào cuối segment để biến nó thành không bắt buộc.

```jsx
<Route path=":lang?/categories" element={<CategoriesPage />} />
```

Route trên có thể khớp:

- `/categories`
- `/vi/categories`
- `/en/categories`

Optional static segment cũng dùng được:

```jsx
<Route path="users/:userId/edit?" element={<UserPage />} />
```

Route trên có thể khớp:

- `/users/10`
- `/users/10/edit`

#### Splat route

Splat, hay catchall, dùng để khớp phần còn lại của URL.

```jsx
<Route path="files/*" element={<FilePage />} />
```

```jsx
import { useParams } from "react-router";

function FilePage() {
  const { "*": filePath } = useParams();

  return <p>File path: {filePath}</p>;
}
```

| URL                         | `filePath`           |
| --------------------------- | -------------------- |
| `/files/readme.md`          | `readme.md`          |
| `/files/docs/react/note.md` | `docs/react/note.md` |

### Layout riêng cho từng nhóm trang

Một app thực tế có thể có nhiều layout:

- `MainLayout`: cho trang public
- `AdminLayout`: cho trang quản trị
- `AuthLayout`: cho đăng nhập, đăng ký

```jsx
<Routes>
  <Route path="/" element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path="about" element={<AboutPage />} />
  </Route>

  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<DashboardPage />} />
    <Route path="users" element={<UserManagementPage />} />
  </Route>

  <Route path="/login" element={<LoginPage />} />
</Routes>
```
