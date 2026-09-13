// Bất cập khi code JS
// Phải gọi lại hàm render -> useState để giải quyết
// Phải trả về htmlString -> JSX để giải quyết
// Tự xử lý routing -> React Router để giải quyết
// Dự án 1 file -> Component để giải quyết

# Day 34: React router, Layout, useContext, useReducer, useMemo, memo, useCallback, useRef, useImperativeHandle

## Mục tiêu buổi học

- Biết cách tạo nhiều trang trong React bằng `react-router`
- Hiểu tư duy `Layout` và `Outlet` để tái sử dụng khung giao diện
- Dùng `useContext` để truyền dữ liệu qua nhiều cấp component
- Dùng `useReducer` để quản lý state phức tạp hơn `useState`
- Biết khi nào dùng `useMemo`, `memo`, `useCallback` để tối ưu render
- Dùng `useRef` để truy cập DOM hoặc lưu giá trị không cần render lại
- Hiểu `useImperativeHandle` và trường hợp hiếm khi cần expose API từ component con

---

## React Router

### Giới thiệu

React mặc định chỉ là thư viện xây dựng UI, không tự có hệ thống routing.

Theo tài liệu chính thức ở Declarative Mode, `react-router` giúp ứng dụng React có nhiều URL khác nhau như:

- `/` - trang chủ
- `/products` - danh sách sản phẩm
- `/products/12` - chi tiết sản phẩm có id là `12`
- `/about` - giới thiệu
- `*` - trang không tìm thấy

> Thực tế: Với SPA (Single Page Application), khi chuyển trang bằng React Router, trình duyệt không reload toàn bộ HTML. React chỉ thay đổi component cần hiển thị theo URL hiện tại.

### Cài đặt

Cài React Router:

```bash
npm i react-router
```

> Lưu ý: Với phiên bản mới theo trang chủ React Router, package cài đặt và import là `react-router`, không phải `react-router-dom`.

### Cấu trúc cơ bản với `BrowserRouter`

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

### Chuyển trang với `Link`

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

### `NavLink` - link có trạng thái active

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

### Route động với `useParams`

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

### Query string với `useSearchParams`

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

### Location object với `useLocation`

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

---

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

---

## `useContext`

### Vấn đề: Prop drilling

Khi component cha truyền dữ liệu xuống component cháu, chắt qua nhiều tầng, ta phải truyền props qua cả những component trung gian không thật sự dùng dữ liệu đó.

```jsx
function App() {
  const user = { name: "An", role: "admin" };

  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Header user={user} />;
}

function Header({ user }) {
  return <UserMenu user={user} />;
}

function UserMenu({ user }) {
  return <p>Xin chào {user.name}</p>;
}
```

Vấn đề ở đây: `Layout` và `Header` chỉ nhận props để truyền tiếp.

### Context là gì?

Context giúp truyền dữ liệu xuống nhiều component mà không cần truyền props qua từng tầng.

Các bước dùng Context:

1. Tạo context bằng `createContext`
2. Bọc component bằng `Provider`
3. Đọc dữ liệu bằng `useContext`

### Ví dụ `ThemeContext`

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");

  const value = {
    theme,
    toggleTheme: () => {
      setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      <Page />
    </ThemeContext.Provider>
  );
}

function Page() {
  return <Toolbar />;
}

function Toolbar() {
  return <ThemeButton />;
}

function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return <button onClick={toggleTheme}>Theme hiện tại: {theme}</button>;
}
```

### Tách Context ra file riêng

Cách tổ chức thường dùng:

```txt
src/
  contexts/
    AuthContext.jsx
  components/
  pages/
```

```jsx
// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(userInfo) {
    setUser(userInfo);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return value;
}
```

Dùng trong `main.jsx`:

```jsx
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
```

Dùng trong component:

```jsx
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      {user ? (
        <>
          <span>{user.name}</span>
          <button onClick={logout}>Đăng xuất</button>
        </>
      ) : (
        <span>Chưa đăng nhập</span>
      )}
    </header>
  );
}
```

### Khi nào nên dùng Context?

| Nên dùng Context       | Không nên dùng Context                   |
| ---------------------- | ---------------------------------------- |
| Theme                  | State chỉ dùng trong một component       |
| Auth user              | State form cục bộ                        |
| Ngôn ngữ               | Input đang gõ từng ký tự                 |
| Giỏ hàng dùng toàn app | Dữ liệu chỉ truyền qua 1-2 tầng đơn giản |

> Lưu ý: Khi `value` của Provider thay đổi, các component đang đọc context đó sẽ render lại.

---

## `useReducer`

### Giới thiệu

`useReducer` là hook quản lý state bằng mô hình:

```txt
state hiện tại + action -> reducer -> state mới
```

Nó giống `useState`, nhưng phù hợp hơn khi:

- State có nhiều field liên quan nhau
- Có nhiều kiểu hành động làm thay đổi state
- Logic cập nhật state dài và cần gom lại một chỗ
- Muốn code dễ test hơn

### Cú pháp

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

| Thành phần     | Ý nghĩa                                    |
| -------------- | ------------------------------------------ |
| `state`        | State hiện tại                             |
| `dispatch`     | Hàm gửi action                             |
| `reducer`      | Hàm nhận state và action, trả về state mới |
| `initialState` | Giá trị khởi tạo                           |
| `action`       | Object mô tả chuyện vừa xảy ra             |

### Ví dụ counter

```jsx
import { useReducer } from "react";

const initialState = {
  count: 0,
};

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```

### Action có payload

`payload` là dữ liệu đi kèm action.

```jsx
function todoReducer(state, action) {
  switch (action.type) {
    case "add_todo":
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload.title,
          completed: false,
        },
      ];

    case "toggle_todo":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

    case "delete_todo":
      return state.filter((todo) => todo.id !== action.payload.id);

    default:
      return state;
  }
}
```

```jsx
dispatch({
  type: "add_todo",
  payload: {
    title: "Học useReducer",
  },
});
```

### Quy tắc khi viết reducer

- Reducer phải là pure function
- Không sửa trực tiếp state cũ
- Luôn trả về state mới nếu có thay đổi
- Không gọi API, không `setTimeout`, không thao tác DOM trong reducer

```jsx
// Sai: mutate state cũ
state.count++;
return state;

// Đúng: tạo object mới
return {
  ...state,
  count: state.count + 1,
};
```

### So sánh `useState` và `useReducer`

| `useState`                         | `useReducer`                              |
| ---------------------------------- | ----------------------------------------- |
| State đơn giản                     | State phức tạp, nhiều action              |
| Logic cập nhật ngắn                | Logic cập nhật dài                        |
| Dễ viết nhanh                      | Dễ tổ chức khi app lớn hơn                |
| Phù hợp input, toggle, counter nhỏ | Phù hợp cart, todo, filter, form phức tạp |

---

## Kết hợp `useContext` và `useReducer`

### Ý tưởng

`useReducer` quản lý logic thay đổi state.

`useContext` chia sẻ state và `dispatch` cho nhiều component.

Đây là pattern thường dùng để tạo một store nhỏ trong app React.

### Ví dụ giỏ hàng

```jsx
// src/contexts/CartContext.jsx
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "add_item": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "remove_item":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "clear_cart":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return value;
}
```

Dùng trong component:

```jsx
import { useCart } from "../contexts/CartContext";

function ProductCard({ product }) {
  const { dispatch } = useCart();

  function handleAddToCart() {
    dispatch({
      type: "add_item",
      payload: product,
    });
  }

  return (
    <article>
      <h3>{product.name}</h3>
      <p>{product.price} VND</p>
      <button onClick={handleAddToCart}>Thêm vào giỏ</button>
    </article>
  );
}
```

---

## Render và tối ưu trong React

### Render lại là chuyện bình thường

Component render lại khi:

- State của chính nó thay đổi
- Props truyền vào thay đổi
- Component cha render lại
- Context mà nó đang đọc thay đổi

Không phải mọi render lại đều là vấn đề.

> Thực tế: Chỉ tối ưu khi có dấu hiệu chậm, danh sách lớn, component nặng, hoặc render lại gây tốn kém thật sự.

---

## `useMemo`

### Giới thiệu

`useMemo` dùng để ghi nhớ kết quả tính toán giữa các lần render.

```jsx
const memoizedValue = useMemo(() => {
  return calculateSomething(a, b);
}, [a, b]);
```

React chỉ tính lại khi dependency thay đổi.

### Ví dụ lọc danh sách sản phẩm

```jsx
import { useMemo, useState } from "react";

function ProductList({ products }) {
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("price");

  const visibleProducts = useMemo(() => {
    console.log("Đang lọc và sắp xếp...");

    return products
      .filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortBy === "price") {
          return a.price - b.price;
        }

        return a.name.localeCompare(b.name);
      });
  }, [products, keyword, sortBy]);

  return (
    <div>
      <input
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Tìm sản phẩm"
      />

      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
      >
        <option value="price">Giá</option>
        <option value="name">Tên</option>
      </select>

      {visibleProducts.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}
```

### Khi nào dùng `useMemo`?

| Nên dùng                                   | Không cần dùng                  |
| ------------------------------------------ | ------------------------------- |
| Tính toán nặng                             | Tính toán rất đơn giản          |
| Lọc, sort danh sách lớn                    | Ghép vài chuỗi đơn giản         |
| Cần giữ reference ổn định cho object/array | Dùng ở mọi biến trong component |

> Lưu ý: `useMemo` là công cụ tối ưu, không phải công cụ sửa logic. Code phải đúng trước, tối ưu sau.

---

## `memo`

### Giới thiệu

`memo` là API dùng để bọc component, giúp component bỏ qua render lại nếu props không thay đổi.

```jsx
import { memo } from "react";

const ProductItem = memo(function ProductItem({ product }) {
  console.log("Render ProductItem:", product.name);

  return <li>{product.name}</li>;
});
```

Nếu component cha render lại nhưng `product` vẫn là cùng một reference, `ProductItem` có thể không cần render lại.

### Ví dụ

```jsx
import { memo, useState } from "react";

const UserCard = memo(function UserCard({ user }) {
  console.log("Render UserCard");

  return (
    <article>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </article>
  );
});

function UserPage() {
  const [count, setCount] = useState(0);
  const user = {
    name: "An",
    email: "an@example.com",
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <UserCard user={user} />
    </div>
  );
}
```

Ví dụ trên `UserCard` vẫn render lại vì mỗi lần `UserPage` render, object `user` mới được tạo lại.

Sửa bằng `useMemo`:

```jsx
import { memo, useMemo, useState } from "react";

const UserCard = memo(function UserCard({ user }) {
  console.log("Render UserCard");

  return (
    <article>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </article>
  );
});

function UserPage() {
  const [count, setCount] = useState(0);

  const user = useMemo(() => {
    return {
      name: "An",
      email: "an@example.com",
    };
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <UserCard user={user} />
    </div>
  );
}
```

### Lưu ý với `memo`

- `memo` so sánh props theo kiểu shallow compare
- Object, array, function tạo mới mỗi render sẽ được xem là khác
- `memo` không chặn render lại do state của chính component thay đổi
- `memo` không chặn render lại khi context mà component đọc thay đổi

---

## `useCallback`

### Giới thiệu

`useCallback` dùng để ghi nhớ function giữa các lần render.

```jsx
const memoizedFunction = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

Có thể hiểu đơn giản:

```jsx
useCallback(fn, deps);
```

gần giống:

```jsx
useMemo(() => fn, deps);
```

### Vì sao cần `useCallback`?

Mỗi lần component render, function viết bên trong component sẽ được tạo lại.

Điều này thường không sao. Nhưng nếu truyền function đó xuống component con đang được bọc `memo`, function mới sẽ làm props thay đổi và component con vẫn render lại.

### Ví dụ

```jsx
import { memo, useCallback, useState } from "react";

const SearchBox = memo(function SearchBox({ onSearch }) {
  console.log("Render SearchBox");

  return <button onClick={() => onSearch("react")}>Tìm React</button>;
});

function ProductPage() {
  const [count, setCount] = useState(0);

  const handleSearch = useCallback((keyword) => {
    console.log("Search:", keyword);
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <SearchBox onSearch={handleSearch} />
    </div>
  );
}
```

### Dependency của `useCallback`

Nếu function dùng biến từ component, phải đưa biến đó vào dependency array:

```jsx
function ProductPage({ categoryId }) {
  const handleSearch = useCallback(
    (keyword) => {
      fetch(`/api/products?category=${categoryId}&keyword=${keyword}`);
    },
    [categoryId],
  );

  return <SearchBox onSearch={handleSearch} />;
}
```

### Khi nào dùng `useCallback`?

| Nên dùng                                  | Không cần dùng                         |
| ----------------------------------------- | -------------------------------------- |
| Truyền callback xuống component có `memo` | Function nhỏ dùng ngay trong component |
| Callback là dependency của hook khác      | Dùng cho mọi event handler             |
| Component con render nặng                 | Chưa có vấn đề hiệu năng rõ ràng       |

---

## `useRef`

### Giới thiệu

`useRef` tạo ra một object có dạng:

```jsx
{
  current: giá_trị;
}
```

Giá trị trong `.current` được giữ lại giữa các lần render, nhưng thay đổi `.current` không làm component render lại.

```jsx
const ref = useRef(initialValue);
```

### Truy cập DOM element

```jsx
import { useRef } from "react";

function LoginForm() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Email" />
      <button onClick={focusInput}>Focus input</button>
    </div>
  );
}
```

### Lưu giá trị không cần render lại

Ví dụ lưu số lần render:

```jsx
import { useEffect, useRef, useState } from "react";

function RenderCounter() {
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);

  useEffect(() => {
    renderCountRef.current += 1;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <p>Số lần render: {renderCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
    </div>
  );
}
```

Ví dụ lưu timer id:

```jsx
import { useRef } from "react";

function Timer() {
  const intervalRef = useRef(null);

  function startTimer() {
    intervalRef.current = setInterval(() => {
      console.log("Tick");
    }, 1000);
  }

  function stopTimer() {
    clearInterval(intervalRef.current);
  }

  return (
    <div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

### `useRef` khác gì `useState`?

| `useState`                        | `useRef`                                  |
| --------------------------------- | ----------------------------------------- |
| Thay đổi làm component render lại | Thay đổi không làm component render lại   |
| Dùng cho dữ liệu hiển thị trên UI | Dùng cho DOM, timer id, cache giá trị phụ |
| Cập nhật bằng setter              | Cập nhật bằng `.current`                  |

> Lưu ý: Không nên dùng `useRef` để né render cho dữ liệu thật sự cần hiển thị lên UI. Nếu UI cần thay đổi, hãy dùng `useState`.

---

## `useImperativeHandle`

### Giới thiệu

Thông thường React khuyến khích luồng dữ liệu một chiều:

```txt
Cha truyền props xuống con
Con báo sự kiện ngược lên cha qua callback
```

`useImperativeHandle` là hook dùng để component con tự định nghĩa những hàm mà component cha có thể gọi thông qua `ref`.

Hook này ít dùng hơn các hook khác, thường chỉ cần trong:

- Component input custom cần expose `focus()`
- Modal cần expose `open()` / `close()`
- Component tích hợp thư viện UI hoặc DOM bên ngoài React

### Ví dụ custom input expose hàm `focus`

Từ React 19, component có thể nhận `ref` như một prop. Vì vậy không cần dùng `forwardRef` cho ví dụ mới.

```jsx
import { useImperativeHandle, useRef } from "react";

function TextInput({ ref, ...props }) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      clear() {
        inputRef.current.value = "";
      },
    };
  }, []);

  return <input ref={inputRef} {...props} />;
}

function LoginPage() {
  const emailInputRef = useRef(null);

  function handleFocusEmail() {
    emailInputRef.current.focus();
  }

  function handleClearEmail() {
    emailInputRef.current.clear();
  }

  return (
    <div>
      <TextInput ref={emailInputRef} placeholder="Email" />
      <button onClick={handleFocusEmail}>Focus email</button>
      <button onClick={handleClearEmail}>Clear email</button>
    </div>
  );
}
```

> Lưu ý: Trong React 18 trở về trước, muốn component nhận `ref` thì phải dùng `forwardRef`. Từ React 19, `forwardRef` không còn cần thiết cho trường hợp này và nằm trong nhóm API cũ.

### Vì sao không truyền thẳng DOM ref?

Nếu truyền thẳng DOM ref, component cha có thể truy cập toàn bộ DOM node:

```jsx
emailInputRef.current.value = "abc";
emailInputRef.current.style.color = "red";
emailInputRef.current.remove();
```

Với `useImperativeHandle`, component con chỉ expose những API được phép:

```jsx
{
  focus() {},
  clear() {}
}
```

> Thực tế: Dùng `useImperativeHandle` khi thật sự cần điều khiển imperative. Với phần lớn UI thông thường, props và state vẫn là cách nên dùng.

---

## Tổng kết các hook trong buổi 34

| Hook / API            | Dùng để làm gì?                                 |
| --------------------- | ----------------------------------------------- |
| `useContext`          | Đọc dữ liệu từ Context                          |
| `useReducer`          | Quản lý state phức tạp bằng reducer/action      |
| `useMemo`             | Ghi nhớ kết quả tính toán                       |
| `memo`                | Ghi nhớ kết quả render của component theo props |
| `useCallback`         | Ghi nhớ function                                |
| `useRef`              | Lưu giá trị không gây render hoặc truy cập DOM  |
| `useImperativeHandle` | Tùy chỉnh API expose qua ref                    |
| `Outlet`              | Vị trí render route con trong layout            |
| `useParams`           | Đọc params từ URL                               |
| `useNavigate`         | Chuyển trang bằng code                          |
| `useSearchParams`     | Đọc và cập nhật query string                    |
| `useLocation`         | Đọc location object của URL hiện tại            |

### Thứ tự ưu tiên khi viết React app

1. Viết code rõ ràng, đúng logic trước
2. Tách component khi UI có trách nhiệm riêng
3. Dùng Context khi dữ liệu cần dùng ở nhiều nơi
4. Dùng Reducer khi logic cập nhật state bắt đầu phức tạp
5. Chỉ tối ưu bằng `memo`, `useMemo`, `useCallback` khi có lý do rõ ràng
6. Dùng `useRef` cho DOM hoặc giá trị không cần render lại
7. Dùng `useImperativeHandle` ít nhất có thể

---

Hết buổi 34
