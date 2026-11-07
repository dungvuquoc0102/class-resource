# Day 22: useEffect, useContext, useReducer, useRef, useImperativeHandle, useMemo, useCallback

## useEffect

### Giúp đồng bộ với hệ thống bên ngoài

- component Products - server Products
- component Video playing - DOM
- component Connection - Service

### Tính chất của useEffect:

- Đối số đầu tiên:
  - Là 1 callback (không được phép là 1 async callback)
  - Thời điểm gọi: khi component render xong giao diện
  - Số lần gọi: Dựa vào các phụ thuộc mà có hành vi thực thi callback khác nhau
  - Trả về 1 clean-up function, sẽ được gọi khi:
    - Khi re-render component, trước khi gọi callback
    - Khi component unmount
- Đối số thứ 2 của useEffect có thể nhận vào:
  - Không nhận gì: callback gọi lại mỗi lần component re-render
  - Nhận vào mảng rỗng: callback chỉ gọi lại 1 lần duy nhất khi component mount
  - Nhận vào mảng có phần tử: callback gọi lại mỗi khi phần tử trong mảng thay đổi

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

## Custom hooks

### Giới thiệu

Custom hook là function do mình viết để tái sử dụng logic có sử dụng React hooks.

Tên custom hook bắt đầu bằng `use`, theo sau là chữ viết hoa, ví dụ: `useToggle`, `useDebounce`.

```jsx
function useSomething() {
  // Kết hợp useState, useEffect hoặc các hook khác
  // Trả về dữ liệu và function mà component cần dùng
}
```

### Ví dụ bật/tắt nội dung với `useToggle`

```jsx
import { useState } from "react";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue((previousValue) => !previousValue);
  }

  return { value, toggle };
}

function ProductDetail() {
  const { value: isExpanded, toggle } = useToggle();

  return (
    <div>
      <button onClick={toggle}>{isExpanded ? "Thu gọn" : "Xem thêm"}</button>
      {isExpanded && <p>Thông tin chi tiết về sản phẩm...</p>}
    </div>
  );
}
```

Component lo phần giao diện, `useToggle` lo logic bật/tắt. Có thể dùng lại hook này cho menu, modal hoặc phần xem thêm.

### Custom hook có chia sẻ state không?

```jsx
function ProductPage() {
  const menu = useToggle();
  const modal = useToggle();

  return (
    <div>
      <button onClick={menu.toggle}>Bật/tắt menu</button>
      <button onClick={modal.toggle}>Bật/tắt modal</button>
      {menu.value && <nav>Danh mục sản phẩm</nav>}
      {modal.value && <div>Nội dung modal</div>}
    </div>
  );
}
```

Hai lần gọi `useToggle` tạo hai state độc lập. Bật menu không làm modal mở theo.

> Custom hook chia sẻ logic, không tự động chia sẻ state giữa các lần gọi.

### Khi nào dùng custom hooks?

| Nên dùng                                         | Không cần dùng                      |
| ------------------------------------------------ | ----------------------------------- |
| Logic dùng hooks lặp lại ở nhiều component       | Function chỉ tính toán thuần túy    |
| Muốn tách một nhóm logic rõ ràng khỏi giao diện  | Tách mọi dòng code thành hook       |
| Logic quản lý form, debounce, trạng thái kết nối | Logic đơn giản, chưa cần tách riêng |

### Lưu ý với custom hooks

- Gọi custom hook ở cấp cao nhất của component hoặc hook khác
- Không gọi trong `if`, vòng lặp, event handler hoặc sau `return` có điều kiện
- Nếu chỉ xử lý dữ liệu và không dùng hooks, thường chỉ cần function thông thường
- Custom hook không tự động tối ưu render; dependency và cleanup của hook bên trong vẫn phải đúng

---
