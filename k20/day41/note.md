# Day 41: Interface, type alias, union, intersection, type assertion trong TypeScript

## 7. Interface, type alias và declaration merging

### Định nghĩa

`interface` mô tả hình dạng object, có thể mở rộng bằng `extends` và có declaration merging khi khai báo nhiều lần cùng tên. `type` tạo bí danh cho nhiều loại kiểu, gồm union, intersection, primitive, tuple và object. Hai cách đều mô tả object tốt; chọn theo mục đích và quy ước dự án.

### Ví dụ

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}

type ApiResult = { data: string } | { error: string };

interface WindowConfig {
  theme: "light" | "dark";
}
interface WindowConfig {
  locale: string;
}
// WindowConfig được gộp thêm thuộc tính locale.
```

### Thực tế dùng ở đâu?

Dùng interface khi định nghĩa hợp đồng object/class cần mở rộng hoặc thư viện cho phép mở rộng khai báo. Dùng type khi cần union/intersection, tuple hoặc kiểu ghép phức tạp. Tránh declaration merging vô tình gây khó hiểu; chỉ dùng có chủ đích.

---

## 8. Union, narrowing và discriminated union

### Định nghĩa

Union (`A | B`) cho phép giá trị thuộc một trong các kiểu. Trước khi dùng đặc điểm riêng, cần narrowing (thu hẹp kiểu) bằng kiểm tra điều kiện. Discriminated union là union các object có chung trường literal làm dấu phân biệt.

### Ví dụ

```ts
type Result =
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function showResult(result: Result) {
  if (result.status === "success") {
    return result.data.join(", ");
  }
  return result.message;
}
```

### Thực tế dùng ở đâu?

Mô tả trạng thái loading/success/error, kết quả API hoặc các loại sự kiện. Discriminated union giúp trình biên dịch biết trường nào tồn tại ở mỗi nhánh, giảm lỗi truy cập nhầm thuộc tính.

---

## 9. Intersection và kết hợp kiểu

### Định nghĩa

Intersection (`A & B`) kết hợp các yêu cầu kiểu: giá trị phải thỏa cả `A` lẫn `B`. Khác union, intersection không phải chọn một trong hai. Giao nhau của các thuộc tính xung đột đôi khi tạo kiểu không thể dùng.

### Ví dụ

```ts
type HasId = { id: number };
type HasTimestamp = { createdAt: Date };
type Entity = HasId & HasTimestamp;

const product: Entity = { id: 1, createdAt: new Date() };
```

### Thực tế dùng ở đâu?

Ghép các nhóm thuộc tính dùng chung như định danh, metadata và dữ liệu nghiệp vụ. Dùng union để biểu diễn lựa chọn; dùng intersection khi một object phải đáp ứng nhiều hợp đồng cùng lúc.

---

## 10. null, undefined, any và unknown

### Định nghĩa

`undefined` thường biểu thị giá trị chưa được gán hoặc thuộc tính không có; `null` thường biểu thị vắng mặt có chủ đích. `strictNullChecks` giúp yêu cầu xử lý riêng hai kiểu này. `any` tắt kiểm tra kiểu; `unknown` nhận mọi giá trị nhưng phải kiểm tra trước khi sử dụng. `noImplicitAny` báo khi kiểu `any` bị suy ra ngầm.

### Ví dụ

```ts
function findName(id: number): string | undefined {
  return id === 1 ? "An" : undefined;
}

function printValue(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

### Thực tế dùng ở đâu?

Bật `strict` trong dự án để phát hiện trường hợp thiếu dữ liệu sớm. Dùng `unknown` cho dữ liệu chưa tin cậy như JSON, lỗi bắt được hoặc đầu vào bên ngoài rồi xác thực/narrowing. Hạn chế `any` vì nó làm mất lợi ích kiểm tra kiểu.

---

## 11. Type assertion và const assertion

### Định nghĩa

Type assertion (`as Type`) báo cho trình biên dịch biết cách ta hiểu kiểu của một giá trị. Nó chỉ thay đổi cách kiểm tra lúc biên dịch, không chuyển đổi hoặc xác thực dữ liệu khi chạy. `as const` giữ giá trị literal hẹp và biến thuộc tính/mảng thành readonly.

### Ví dụ

```ts
const button = document.querySelector("button");
button?.addEventListener("click", () => console.log("clicked"));

const config = {
  method: "GET",
  paths: ["/users", "/products"],
} as const;
// method có kiểu literal "GET"; paths là tuple readonly.
```

### Thực tế dùng ở đâu?

Dùng assertion khi đã kiểm tra điều kiện mà TypeScript chưa suy ra được, ví dụ tương tác với DOM hoặc thư viện thiếu type. Không dùng `as` để che lỗi hay xác nhận dữ liệu API chưa được kiểm tra.

---
