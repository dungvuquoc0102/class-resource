# Buổi 36: useMemo, memo, useCallback, custom hooks, React Hook Form, Zod

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

## React Hook Form

### Giới thiệu

React Hook Form là thư viện hỗ trợ quản lý dữ liệu form, validation và trạng thái lỗi.

Thay vì tự tạo `useState` và `onChange` cho từng input, có thể đăng ký input bằng `register`.

### Cài đặt

```bash
npm install react-hook-form
```

### Ví dụ form nhập tên

```jsx
import { useForm } from "react-hook-form";

function ProfileForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
    },
  });

  function onSubmit(data) {
    console.log("Thông tin hợp lệ:", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="fullName">Họ tên</label>
      <input
        id="fullName"
        {...register("fullName", {
          required: "Vui lòng nhập họ tên",
          minLength: {
            value: 2,
            message: "Họ tên phải có ít nhất 2 ký tự",
          },
          validate: (value) =>
            value.trim().length >= 2 ||
            "Họ tên cần ít nhất 2 ký tự ngoài khoảng trắng",
        })}
      />
      {errors.fullName && <p role="alert">{errors.fullName.message}</p>}

      <button type="submit">Lưu</button>
      <button type="button" onClick={() => reset()}>
        Nhập lại
      </button>
    </form>
  );
}
```

### Các thành phần thường dùng

| Thành phần               | Vai trò                                     |
| ------------------------ | ------------------------------------------- |
| `useForm()`              | Khởi tạo bộ công cụ quản lý form            |
| `register("fullName")`   | Kết nối input với trường `fullName`         |
| `handleSubmit(onSubmit)` | Kiểm tra dữ liệu, gọi `onSubmit` khi hợp lệ |
| `formState.errors`       | Chứa lỗi validation theo từng trường        |
| `defaultValues`          | Khai báo giá trị ban đầu                    |
| `reset()`                | Đưa form về giá trị mặc định                |
| `formState.isSubmitting` | Cho biết form đang xử lý submit             |

`{...register("fullName")}` truyền các thuộc tính như `name`, `ref`, `onChange`, `onBlur` vào input.

`noValidate` tắt validation mặc định của trình duyệt để ví dụ hiển thị thông báo lỗi từ React Hook Form.

### Lưu ý với React Hook Form

- Mặc định validation chạy khi submit; có thể cấu hình `mode: "onBlur"` hoặc `"onChange"`
- Nút trong form không dùng để submit nên có `type="button"`
- Với input HTML thông thường, không cần thêm `value` và state riêng khi đã dùng `register`
- Với component controlled của thư viện UI, có thể cần `Controller`
- `handleSubmit` không tự gửi API; phần gửi dữ liệu do mình viết trong `onSubmit`

---

## Zod

### Giới thiệu

Zod là thư viện kiểm tra dữ liệu dựa trên schema.

Schema mô tả dữ liệu cần có kiểu gì và phải đáp ứng điều kiện nào. Zod dùng được với cả JavaScript và TypeScript.

### Cài đặt

```bash
npm install zod
```

### Ví dụ kiểm tra thông tin người dùng

```js
import { z } from "zod";

const userSchema = z.object({
  fullName: z.string().trim().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.email("Email không hợp lệ"),
  age: z.number().int("Tuổi phải là số nguyên").min(18, "Phải từ 18 tuổi"),
});

const result = userSchema.safeParse({
  fullName: "  An  ",
  email: "an@example.com",
  age: 20,
});

if (result.success) {
  console.log(result.data); // { fullName: "An", email: "an@example.com", age: 20 }
} else {
  console.log(result.error.issues);
}
```

`.trim()` loại bỏ khoảng trắng ở hai đầu trước khi kiểm tra độ dài. Khi hợp lệ, dùng `result.data` để lấy dữ liệu đã được xử lý.

### `parse` và `safeParse`

| Cách dùng                | Khi hợp lệ                       | Khi không hợp lệ                   |
| ------------------------ | -------------------------------- | ---------------------------------- |
| `schema.parse(data)`     | Trả về dữ liệu đã kiểm tra       | Ném lỗi `ZodError`                 |
| `schema.safeParse(data)` | Trả về `{ success: true, data }` | Trả về `{ success: false, error }` |

`safeParse` tiện khi muốn tự xử lý nhánh thành công và thất bại mà không cần `try...catch` cho lỗi validation.

### Một số schema thường dùng

```js
z.string().min(1, "Không được để trống");
z.email("Email không hợp lệ");
z.number().min(0, "Không được là số âm");
z.boolean();
z.enum(["admin", "user"]);
z.array(z.string());
z.string().optional(); // Chấp nhận thêm undefined
```

### Lưu ý với Zod

- `z.number()` không chấp nhận chuỗi `"20"`; cần chuyển dữ liệu sang số trước hoặc dùng coercion có chủ đích
- `.optional()` cho phép `undefined`, không tự biến chuỗi rỗng thành `undefined`
- Zod kiểm tra dữ liệu; phần hiển thị lỗi trên giao diện do mình xử lý
- TypeScript kiểm tra kiểu lúc phát triển; Zod kiểm tra giá trị thực tế khi chương trình chạy

---

## Kết hợp React Hook Form và Zod

React Hook Form quản lý form. Zod định nghĩa quy tắc kiểm tra dữ liệu. `zodResolver` kết nối hai thư viện để đưa lỗi từ schema vào `formState.errors`.

### Cài đặt

```bash
npm install react-hook-form zod @hookform/resolvers
```

### Ví dụ form đăng ký

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.email("Email không hợp lệ"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data) {
    // Gửi email và password tới API đăng ký tại đây.
    // confirmPassword chỉ dùng để đối chiếu trên form.
    alert(`Dữ liệu đăng ký của ${data.email} hợp lệ`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Mật khẩu</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p role="alert">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit">Đăng ký</button>
    </form>
  );
}
```

### Luồng xử lý

1. Người dùng nhập dữ liệu rồi submit form
2. `handleSubmit` gọi resolver để kiểm tra dữ liệu theo schema
3. Nếu có lỗi, React Hook Form cập nhật `errors` để hiển thị
4. Nếu hợp lệ, `onSubmit` nhận dữ liệu đã qua kiểm tra

`.refine()` thêm điều kiện kiểm tra giữa các trường. `path: ["confirmPassword"]` gắn lỗi vào ô nhập lại mật khẩu.

### Lưu ý khi kết hợp

- Đặt quy tắc validation trong schema để dễ quản lý, tránh khai báo lặp lại trong `register`
- Với input số, có thể dùng `register("age", { valueAsNumber: true })` cùng `z.number()`; ô rỗng có thể thành `NaN` và bị schema từ chối
- Khi submit bất đồng bộ, trả về hoặc `await` Promise trong `onSubmit` để `isSubmitting` theo dõi đúng thời gian xử lý
- Nếu logic form dài hoặc cần tái sử dụng, có thể tách phần `useForm` và xử lý liên quan thành custom hook

---
