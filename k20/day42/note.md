# Day 42: Type guards, generic, DOM types, OOP trong TypeScript

## 12. Type guards: typeof, instanceof và type predicate

### Định nghĩa

Type guard là kiểm tra giúp TypeScript thu hẹp kiểu. `typeof` phù hợp với primitive; `instanceof` nhận diện instance của class; type predicate có dạng `value is Type` để tự định nghĩa hàm kiểm tra kiểu.

### Ví dụ

```ts
function describe(value: string | Date) {
  if (value instanceof Date) return value.toISOString();
  return value.toUpperCase();
}

type User = { id: number; name: string };
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string"
  );
}
```

### Thực tế dùng ở đâu?

Xử lý union và xác thực dữ liệu chưa rõ kiểu trước khi dùng. Type predicate hữu ích khi có quy tắc kiểm tra lặp lại; riêng `typeof` và `instanceof` nên dùng khi phù hợp, đơn giản và dễ đọc.

---

## 13. Generic

### Định nghĩa

Generic là tham số kiểu, giúp hàm, interface, type alias hoặc class làm việc với nhiều kiểu dữ liệu mà vẫn giữ quan hệ giữa đầu vào và đầu ra. Có thể đặt kiểu mặc định hoặc ràng buộc generic bằng `extends`.

### Ví dụ

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
}

function getId<T extends { id: number }>(item: T): number {
  return item.id;
}

const firstName = first(["An", "Bình"]); // string | undefined
```

### Thực tế dùng ở đâu?

Tạo hàm dùng được với nhiều danh sách, response API, component hoặc repository mà không phải dùng `any`. Dùng constraint khi generic cần một thuộc tính cụ thể; tránh generic nếu kiểu cụ thể đơn giản và đủ rõ.

---

## 14. DOM types và event types

### Định nghĩa

TypeScript cung cấp sẵn kiểu cho DOM như `HTMLElement`, `HTMLInputElement` và các event. Hàm `querySelector` có generic để chỉ định loại phần tử; kết quả vẫn có thể `null` nếu không tìm thấy.

### Ví dụ

```ts
const input = document.querySelector<HTMLInputElement>("#email");
input?.addEventListener("input", (event) => {
  const currentTarget = event.currentTarget;
  if (currentTarget instanceof HTMLInputElement) {
    console.log(currentTarget.value);
  }
});
```

### Thực tế dùng ở đâu?

Trong ứng dụng thao tác DOM trực tiếp hoặc tích hợp thư viện trình duyệt. Nếu selector được bảo đảm tồn tại, cần kiểm tra null hoặc dùng assertion có căn cứ; không giả định phần tử luôn có mặt mà bỏ qua kiểm tra.

---

## 15. Lập trình hướng đối tượng (OOP)

### Định nghĩa

OOP tổ chức chương trình quanh các đối tượng có dữ liệu và hành vi. Tư duy cốt lõi là mô hình hóa trách nhiệm của từng đối tượng, đóng gói trạng thái và xác định cách các đối tượng cộng tác; không phải bài toán nào cũng cần class.

### Ví dụ

```ts
class ShoppingCart {
  private items: string[] = [];

  add(item: string) {
    this.items.push(item);
  }

  get count() {
    return this.items.length;
  }
}
```

### Thực tế dùng ở đâu?

Class có thể phù hợp khi cần đối tượng giữ trạng thái và cung cấp hành vi liên quan như giỏ hàng, kết nối hoặc dịch vụ. Với dữ liệu thuần như response API, object type/interface thường đủ và ít ceremony hơn.

---

## 16. Classes: fields, constructor, access modifiers, getter/setter, static

// Tính đóng
// Tính gói

### Định nghĩa

Class định nghĩa khuôn mẫu tạo instance. `constructor` khởi tạo; `public` là mặc định, `private` giới hạn trong class, `protected` cho class và lớp con. Parameter properties khai báo thuộc tính ngay trên tham số constructor. Getter/setter kiểm soát cách đọc/ghi; `static` thuộc về class thay vì từng instance; `readonly` không cho gán lại sau khởi tạo.

### Ví dụ

```ts
class BankAccount {
  private balance = 0;
  static currency = "VND";

  constructor(public readonly owner: string) {}

  deposit(amount: number) {
    if (amount <= 0) throw new Error("Số tiền phải lớn hơn 0");
    this.balance += amount;
  }

  get currentBalance() {
    return this.balance;
  }
}
```

### Thực tế dùng ở đâu?

Dùng access modifier để bảo vệ trạng thái nội bộ và chỉ cung cấp thao tác hợp lệ. Getter/setter hữu ích khi cần tính toán/kiểm tra lúc đọc ghi; tránh tạo getter/setter không thêm ý nghĩa. Dùng static cho giá trị hoặc tiện ích chung của class.

---

## 17. Inheritance, overriding và polymorphism

### Định nghĩa

Kế thừa (`extends`) cho phép class con nhận hành vi từ class cha. Constructor class con gọi `super(...)` trước khi dùng `this`. Overriding ghi đè phương thức của cha; từ khóa `override` giúp trình biên dịch xác nhận có phương thức tương ứng. Polymorphism (đa hình) cho phép dùng cùng một hợp đồng nhưng mỗi lớp triển khai hành vi riêng. TypeScript hỗ trợ overload chữ ký hàm, nhưng JavaScript cuối cùng vẫn có một implementation.

### Ví dụ

```ts
abstract class Payment {
  constructor(protected amount: number) {}
  abstract pay(): string;
}

class CardPayment extends Payment {
  override pay() {
    return `Thanh toán thẻ: ${this.amount}`;
  }
}

class CashPayment extends Payment {
  override pay() {
    return `Thanh toán tiền mặt: ${this.amount}`;
  }
}

function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return String(value);
}

function checkout(payment: Payment) {
  return payment.pay();
}
```

Overload khai báo nhiều chữ ký gọi nhưng chỉ có một phần thân triển khai. Trong ví dụ `checkout`, cùng một hàm gọi được với các kiểu con của `Payment`, còn hành vi thực tế phụ thuộc instance.

### Thực tế dùng ở đâu?

Đa hình hữu ích khi nhiều phương thức thanh toán, thông báo hoặc bộ lưu trữ cùng cung cấp một thao tác chung. Chọn composition/interface thay vì cây kế thừa sâu nếu các lớp chỉ chia sẻ một ít hành vi hoặc quan hệ “là một” không tự nhiên.

---

## 18. Abstraction và implements interface

### Định nghĩa

Abstraction (trừu tượng hóa) đưa ra những hành động cần có mà không buộc nơi sử dụng biết cách triển khai. Abstract class không tạo instance trực tiếp; có thể chứa abstract member và thành phần triển khai sẵn. Interface mô tả hợp đồng; class dùng `implements` để cam kết đáp ứng hợp đồng.

### Ví dụ

```ts
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}

abstract class Storage {
  abstract save(key: string, value: string): void;
  describe() {
    return "Key-value storage";
  }
}
```

### Thực tế dùng ở đâu?

Khai báo hợp đồng cho dịch vụ logging, storage hoặc repository để thay implementation dễ hơn. Dùng interface cho hợp đồng thuần; abstract class khi muốn chia sẻ cả hợp đồng lẫn một phần hành vi/cấu trúc triển khai.

---
