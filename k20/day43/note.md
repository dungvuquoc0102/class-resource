# Buổi 43: TypeScript (Part 4)

## 19. typeof trong type position, keyof và indexed access types

### Định nghĩa

`typeof` trong biểu thức JavaScript lấy kiểu tại runtime; trong vị trí type, nó lấy kiểu của một biến/hằng có sẵn. `keyof` tạo union các tên thuộc tính của object type. Indexed access `T[K]` lấy kiểu thuộc tính theo key.

### Ví dụ

```ts
const settings = { theme: "dark", pageSize: 20 };
type Settings = typeof settings;
type SettingKey = keyof Settings; // "theme" | "pageSize"
type Theme = Settings["theme"];

function getValue<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
```

### Thực tế dùng ở đâu?

Tạo type từ cấu hình/hằng có sẵn để tránh khai báo trùng. `keyof` và indexed access giúp viết hàm truy cập object tổng quát nhưng vẫn bảo đảm key và giá trị trả về liên quan chính xác.

---

## 20. Utility types: Partial, Record, Parameters

### Định nghĩa

Utility types dựng kiểu mới từ kiểu có sẵn. `Partial<T>` biến các thuộc tính của `T` thành tùy chọn; `Record<K, V>` tạo object có key thuộc `K`, value kiểu `V`; `Parameters<F>` lấy tuple kiểu tham số của hàm `F`.

### Ví dụ

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

type ProductUpdate = Partial<Product>;
type StockByCategory = Record<"book" | "toy", number>;
type SearchArgs = Parameters<(query: string, page: number) => void>;

const update: ProductUpdate = { price: 150_000 };
const stock: StockByCategory = { book: 4, toy: 7 };
```

### Thực tế dùng ở đâu?

`Partial` thường dùng cho payload cập nhật một phần. `Record` dùng cho bảng tra cứu/cấu hình theo key cố định. `Parameters` đồng bộ kiểu khi bọc hoặc tái sử dụng tham số của một hàm hiện có.

---

## 21. Mapped types

### Định nghĩa

Mapped type tạo object type bằng cách duyệt qua các key của kiểu khác. Có thể thêm hoặc bỏ modifier như `readonly` và `?`. `Partial<T>` là ví dụ mapped type có sẵn.

### Ví dụ

```ts
type Flags<T> = {
  [K in keyof T]: boolean;
};

type Product = { id: number; name: string; price: number };
type ProductFlags = Flags<Product>;
// { id: boolean; name: boolean; price: boolean }
```

### Thực tế dùng ở đâu?

Tạo kiểu metadata, trạng thái kiểm tra hoặc bộ cấu hình từ một model. Dùng utility type tích hợp nếu đáp ứng yêu cầu; tự viết mapped type khi cần quy tắc chuyển đổi cụ thể, dễ tái sử dụng.

---

## 22. Conditional types và infer

### Định nghĩa

Conditional type có dạng `T extends U ? X : Y`, chọn kiểu kết quả theo quan hệ giữa các kiểu. `infer` đặt tên cho kiểu con được suy ra bên trong điều kiện. Với generic union, conditional type có thể phân phối trên từng thành viên nếu `T` đứng riêng ở vế trái `extends`.

### Ví dụ

```ts
type ElementOf<T> = T extends (infer Item)[] ? Item : T;

type A = ElementOf<string[]>; // string
type B = ElementOf<number>; // number
type C = ElementOf<string | number[]>; // string | number
```

### Thực tế dùng ở đâu?

Viết utility type có điều kiện, trích kiểu phần tử/kiểu trả về hoặc chuyển đổi generic phức tạp. Đây là kỹ thuật nâng cao; ưu tiên type đơn giản nếu nó làm API dễ hiểu hơn.

---

## 23. Template literal types

### Định nghĩa

Template literal type ghép các literal string thành tập kiểu chuỗi mới. Khi kết hợp union, TypeScript tạo các tổ hợp có thể có.

### Ví dụ

```ts
type Size = "sm" | "md" | "lg";
type ButtonClass = `button-${Size}`;
// "button-sm" | "button-md" | "button-lg"

type EventName<T extends string> = `${T}Changed`;
type UserEvent = EventName<"name" | "email">;
```

### Thực tế dùng ở đâu?

Ràng buộc tên sự kiện, class, key theo quy ước hoặc đường dẫn trong thư viện. Nếu cần tạo nhiều tổ hợp phức tạp, cân nhắc số lượng type tăng nhanh và giữ cách khai báo dễ đọc.

---

## 24. Modules và import type

### Định nghĩa

Module chia chương trình thành file có `export`/`import`. `import type` chỉ nhập kiểu và bị loại khỏi JavaScript đầu ra, làm rõ rằng dependency chỉ phục vụ kiểm tra kiểu.

### Ví dụ

```ts
// user.ts
export interface User {
  id: number;
  name: string;
}

// app.ts
import type { User } from "./user";

function greet(user: User) {
  return `Xin chào ${user.name}`;
}
```
