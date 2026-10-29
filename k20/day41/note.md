# Day 41: TypeScript (Part 2)

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

## 13. typeof trong type position, keyof và indexed access types

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

## 14. Generic

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

## 15. Utility types: Partial, Record, Parameters

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

## 16. Mapped types

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

## 17. Conditional types và infer

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

## 18. Template literal types

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

## 19. DOM types và event types

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

## 20. Lập trình hướng đối tượng (OOP)

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

## 21. Classes: fields, constructor, access modifiers, getter/setter, static

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

## 22. Inheritance, overriding và polymorphism

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

## 23. Abstraction và implements interface

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

## 24. Generic class và typeof class

### Định nghĩa

Generic class giữ quan hệ kiểu giữa dữ liệu lưu trữ và phương thức. `typeof SomeClass` trong type position lấy kiểu constructor/tĩnh của class; `InstanceType<typeof SomeClass>` lấy kiểu instance.

### Ví dụ

```ts
class Box<T> {
  constructor(public value: T) {}
  getValue(): T {
    return this.value;
  }
}

const box = new Box("hello");
type BoxInstance = typeof box;
type BoxConstructor = typeof Box;
```

### Thực tế dùng ở đâu?

Generic class phù hợp với container, cache, repository hoặc cấu trúc dữ liệu cần giữ kiểu phần tử. Lấy kiểu constructor hữu ích khi truyền class vào factory hoặc đăng ký các class trong cấu hình.

---

## 25. Modules và import type

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

### Thực tế dùng ở đâu?

Tách model, hàm gọi API và logic giao diện thành module dễ bảo trì. Dùng `import type` khi chỉ cần kiểu để tránh tạo import runtime không cần thiết và phân biệt rõ dependency dữ liệu với dependency kiểu.

---
