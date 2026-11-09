# Day 23: useRef, useImperativeHandle, useMemo, useCallback

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
