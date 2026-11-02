# Buổi 40: Primitive types, Literal types, Object type, Array, Tuple, Function types trong TypeScript

## Mục tiêu buổi học

- Hiểu TypeScript giúp kiểm tra kiểu dữ liệu trước khi chạy chương trình như thế nào.
- Khai báo kiểu cho biến, hàm, object, array và các mô hình dữ liệu thường gặp.
- Dùng generic, type guard, utility types và các kiểu nâng cao để tái sử dụng type an toàn.
- Áp dụng class, interface và các nguyên lý OOP khi mô hình hóa đối tượng.

> Các ví dụ dùng TypeScript. Có thể chạy file `.ts` bằng `tsx` khi dự án đã cài TypeScript và `tsx`; hoặc biên dịch bằng `tsc` rồi chạy JavaScript sinh ra. TypeScript kiểm tra kiểu lúc phát triển và biên dịch thành JavaScript, không tự xác thực dữ liệu nhận từ API lúc chạy.

---

## 1. Giới thiệu và cài đặt

### Định nghĩa

TypeScript là JavaScript có hệ thống kiểu tĩnh. Ta khai báo hoặc để TypeScript suy ra kiểu; trình biên dịch phát hiện nhiều lỗi trước khi chương trình chạy. JavaScript đầu ra không chứa các type annotation.

### Ví dụ

```ts
const greeting: string = "Xin chào";
console.log(greeting);
```

Luồng cơ bản: viết `main.ts` → `tsc main.ts` tạo JavaScript → chạy JavaScript bằng Node.js. Trong lúc phát triển có thể chạy trực tiếp bằng `npx tsx main.ts`.

### Thực tế dùng ở đâu?

TypeScript phù hợp với ứng dụng nhiều màn hình, nhiều người cùng phát triển hoặc có dữ liệu phức tạp. Type giúp IDE gợi ý tốt hơn và báo sớm trường hợp truyền nhầm dữ liệu. TypeScript không thay thế kiểm tra dữ liệu đầu vào ở API/server.

---

## 2. Kiểu dữ liệu nguyên thủy và literal types

### Định nghĩa

Các kiểu cơ bản thường dùng là `string`, `number`, `boolean`, `bigint`, `symbol`, `null` và `undefined`. Dùng chữ thường cho kiểu nguyên thủy; `String`, `Number`, `Boolean` là wrapper object và thường không nên dùng để khai báo dữ liệu thông thường. Literal type giới hạn giá trị vào một hằng cụ thể.

### Ví dụ

```ts
let name: string = "An";
let age: number = 20;
let active: boolean = true;
let status: "pending" | "success" = "pending";

status = "success";
// status = "failed"; // Lỗi: không thuộc tập giá trị cho phép
```

### Thực tế dùng ở đâu?

Dùng `string`, `number`, `boolean` cho dữ liệu phổ thông. Literal type hữu ích cho trạng thái đơn hàng, vai trò người dùng, kích thước nút hoặc chế độ giao diện có tập giá trị xác định.

---

## 3. Type annotation và type inference

### Định nghĩa

Type annotation là viết kiểu tường minh. Type inference là TypeScript tự suy ra kiểu từ giá trị ban đầu, biểu thức hoặc ngữ cảnh.

### Ví dụ

```ts
let quantity: number = 3; // annotation
let price = 120_000; // inference: number

function total(count: number, unitPrice: number) {
  return count * unitPrice; // suy ra kiểu trả về number
}
```

### Thực tế dùng ở đâu?

Ưu tiên để TypeScript suy ra kiểu hiển nhiên như biến khởi tạo bằng chuỗi hoặc số. Khai báo rõ kiểu ở ranh giới quan trọng: tham số hàm, dữ liệu trả về cần cố định, state hoặc dữ liệu đến từ nguồn bên ngoài.

---

## 4. Object type, thuộc tính tùy chọn và readonly

### Định nghĩa

Object type mô tả các thuộc tính và kiểu tương ứng. Dấu `?` đánh dấu thuộc tính tùy chọn; `readonly` ngăn gán lại thuộc tính sau khi khởi tạo. TypeScript dùng structural typing: object được chấp nhận nếu có cấu trúc phù hợp.

### Ví dụ

```ts
type User = {
  readonly id: number;
  name: string;
  email?: string;
  address: { city: string };
  greet(): string;
};

const user: User = {
  id: 1,
  name: "An",
  address: { city: "Hà Nội" },
  greet() {
    return `Xin chào, ${this.name}`;
  },
};
```

### Thực tế dùng ở đâu?

Mô tả đối tượng người dùng, sản phẩm, cấu hình hoặc props của component. Đánh dấu `?` khi trường thực sự có thể vắng mặt; kiểm tra trước khi sử dụng thuộc tính tùy chọn.

---

## 5. Array, readonly array và tuple

### Định nghĩa

Array kiểu `T[]` hoặc `Array<T>` chứa các phần tử cùng kiểu. `readonly T[]` không cho phép thay đổi array qua biến đó. Tuple là array có số lượng/vị trí phần tử và kiểu đã xác định.

### Ví dụ

```ts
const scores: number[] = [8, 9, 10];
const names: Array<string> = ["An", "Bình"];
const point: [number, number] = [10, 20];
const tags: readonly string[] = ["typescript", "frontend"];

const labels = scores.map((score) => `Điểm ${score}`);
```

### Thực tế dùng ở đâu?

Array dùng cho danh sách sản phẩm, người dùng hoặc kết quả API. Tuple hợp với cặp tọa độ, kết quả gồm các vị trí cố định hoặc giá trị trả về theo quy ước. Dùng readonly khi muốn hàm nhận dữ liệu nhưng không được sửa danh sách gốc.

---

## 6. Function types

### Định nghĩa

Khai báo kiểu hàm bằng kiểu tham số và kiểu trả về. Hàm có thể có tham số tùy chọn (`?`), giá trị mặc định, rest parameter (`...`) hoặc không trả giá trị hữu ích (`void`). `never` biểu thị hàm không kết thúc bình thường, chẳng hạn luôn ném lỗi. Promises có thể khai báo kiểu trả về `Promise<T>`; `async` tạo Promise nên thường dùng `Promise<T>`.

### Ví dụ

```ts
type Formatter = (value: number) => string;

function formatPrice(value: number, currency = "₫"): string {
  return `${value.toLocaleString("vi-VN")}${currency}`;
}

function sum(first: number, ...rest: number[]): number {
  return [first, ...rest].reduce((total, value) => total + value, 0);
}

async function loadMessage(): Promise<string> {
  return "Đã tải xong";
}

function fail(message: string): never {
  throw new Error(message);
}

const formatter: Formatter = (value) => formatPrice(value);
```

`void` dùng cho hàm không trả kết quả cần sử dụng; `async` tạo Promise nên thường khai báo `Promise<T>`; `never` dành cho hàm không kết thúc bình thường. Khi callback được truyền vào nơi đã biết kiểu, TypeScript có thể tự suy ra kiểu tham số (contextual typing).

### Thực tế dùng ở đâu?

Khai báo kiểu callback, handler sự kiện, hàm sắp xếp, formatter hoặc hàm nhận từ thư viện. Khi hàm không trả dữ liệu, dùng `void`; dùng `never` cho nhánh không thể tiếp tục như `throw new Error(...)`.

---
