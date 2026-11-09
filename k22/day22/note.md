# Day 22: useEffect, useContext, useReducer trong React

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
