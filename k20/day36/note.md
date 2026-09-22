# Buổi 36: useMemo, memo, useCallback, custom hooks, React Hook Form

## Render và tối ưu trong React

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
