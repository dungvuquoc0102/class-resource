# Day 13: Prototype, Classes, Date, Map, Set, JSON, Error

## 1. Prototype

- Prototype là cơ chế kế thừa trong JavaScript
  - Một object tạo ra từ một constructor function sẽ kế thừa các thuộc tính và phương thức từ `prototype` của constructor function đó.
- Chuỗi kế thừa:
  - Prototype là 1 object nên nó cũng có thể được tạo ra từ một constructor function khác, hoặc chính là constructor function Object

## 2. Classes

Class là cú pháp giúp tạo nhiều object cùng cấu trúc.

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  showInfo() {
    console.log(`Tên: ${this.name}, tuổi: ${this.age}`);
  }
}

const user1 = new User("Nguyễn Văn A", 20);
const user2 = new User("Nguyễn Thị B", 21);

user1.showInfo();
user2.showInfo();
```

### Kế thừa với `extends`

```js
class Staff extends User {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }

  showRole() {
    console.log(`${this.name} - ${this.role}`);
  }
}

const staff = new Staff("Nguyễn Văn C", 25, "Marketing");
staff.showInfo();
staff.showRole();
```

Lưu ý:

- `constructor` chạy khi gọi `new`.
- `this` trỏ tới object đang được tạo.
- Class con dùng `super(...)` để gọi constructor của class cha.
- Method trong class không cần viết từ khóa `function`.

## 3. Date

`Date` dùng để lưu và xử lý thời gian.

```js
const now = new Date();
console.log(now);
```

### Tạo Date thường dùng

```js
const date1 = new Date(); // thời điểm hiện tại
const date2 = new Date("2026-07-20T20:55:00+07:00"); // ISO có timezone
const date3 = new Date(2026, 6, 20); // 20/07/2026
```

Lưu ý quan trọng: tháng trong constructor dạng số bắt đầu từ `0`.

```js
new Date(2026, 0, 1); // 01/01/2026
new Date(2026, 6, 20); // 20/07/2026
```

### Get Date Methods hay dùng

| Method          | Kết quả                         |
| --------------- | ------------------------------- |
| `getFullYear()` | Năm                             |
| `getMonth()`    | Tháng, từ `0` đến `11`          |
| `getDate()`     | Ngày trong tháng                |
| `getDay()`      | Thứ trong tuần, `0` là Chủ Nhật |
| `getHours()`    | Giờ                             |
| `getMinutes()`  | Phút                            |
| `getSeconds()`  | Giây                            |
| `getTime()`     | Milliseconds từ `01/01/1970`    |

### Format ngày đơn giản

```js
const days = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

const date = new Date("2026-07-20T20:55:00+07:00");

const result = `${days[date.getDay()]}, ngày ${date.getDate()} tháng ${
  date.getMonth() + 1
} năm ${date.getFullYear()}`;

console.log(result);
```

### Set Date Methods hay dùng

```js
const deadline = new Date("2026-09-15");
deadline.setDate(deadline.getDate() + 7);

console.log(deadline);
```

`Date` tự xử lý nhảy tháng/năm. Ví dụ ngày 28 cộng thêm 10 ngày thì tự sang tháng tiếp theo.

### So sánh ngày

```js
const today = new Date();
const expiredAt = new Date("2100-01-14");

if (expiredAt > today) {
  console.log("Voucher còn hạn");
} else {
  console.log("Voucher đã hết hạn");
}
```

### Tính khoảng cách giữa 2 ngày

```js
function getDaysBetween(dateStr1, dateStr2) {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.round(Math.abs(date1.getTime() - date2.getTime()) / oneDay);
}

console.log(getDaysBetween("2026-09-15", "2026-09-20")); // 5
```

## 4. Map

`Map` là một tập hợp các cặp key - value (khóa - giá trị) tương tự như Object. Tuy nhiên, điểm khác biệt lớn nhất là key của `Map` có thể là bất kỳ kiểu dữ liệu nào (Object, Function, Number, Boolean,...), trong khi key của Object thông thường chỉ có thể là String hoặc Symbol.

```js
const myMap = new Map();

// Thêm dữ liệu với các kiểu key khác nhau
myMap.set("name", "Nguyễn Văn A");
myMap.set(123, "Mã ID");
myMap.set(true, "Trạng thái kích hoạt");

console.log(myMap.get("name")); // Nguyễn Văn A
console.log(myMap.get(123)); // Mã ID
```

### Các Method và Property hay dùng

| Method / Property | Công dụng                                             |
| ----------------- | ----------------------------------------------------- |
| `set(key, value)` | Thêm hoặc cập nhật cặp key-value                      |
| `get(key)`        | Lấy giá trị tương ứng với key                         |
| `has(key)`        | Kiểm tra key có tồn tại không (trả về `true`/`false`) |
| `delete(key)`     | Xóa cặp key-value                                     |
| `clear()`         | Xóa toàn bộ phần tử trong Map                         |
| `size`            | Lấy số lượng phần tử trong Map                        |

### Duyệt qua Map

```js
const userRoles = new Map([
  ["admin", "Quản trị viên"],
  ["editor", "Biên tập viên"],
  ["viewer", "Người xem"],
]);

// Duyệt qua cả key và value
for (const [key, value] of userRoles) {
  console.log(`${key}: ${value}`);
}

// Hoặc sử dụng forEach
userRoles.forEach((value, key) => {
  console.log(`${key} -> ${value}`);
});
```

Lưu ý:

- `Map` giữ nguyên thứ tự thêm vào khi duyệt qua các phần tử.
- Dùng `myMap.size` để lấy độ dài thay vì `Object.keys(obj).length`.

---

## 5. Set

`Set` là một tập hợp các giá trị duy nhất (không chứa các phần tử trùng lặp).

```js
const numbers = new Set([1, 2, 2, 3, 4, 4, 5]);

console.log(numbers); // Set(5) { 1, 2, 3, 4, 5 }
```

### Các Method và Property hay dùng

| Method / Property | Công dụng                                          |
| ----------------- | -------------------------------------------------- |
| `add(value)`      | Thêm một giá trị mới                               |
| `has(value)`      | Kiểm tra giá trị có tồn tại không (`true`/`false`) |
| `delete(value)`   | Xóa một giá trị                                    |
| `clear()`         | Xóa toàn bộ giá trị trong Set                      |
| `size`            | Lấy số lượng phần tử trong Set                     |

```js
const tags = new Set();

tags.add("javascript");
tags.add("nodejs");
tags.add("javascript"); // Bị bỏ qua vì đã tồn tại

console.log(tags.has("nodejs")); // true
console.log(tags.size); // 2
```

### Tác dụng phổ biến: Lọc phần tử trùng lặp trong Array

```js
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbers)];

console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
```

---

## 6. JSON

`JSON` (JavaScript Object Notation) là một định dạng dữ liệu dựa trên văn bản, dùng để trao đổi dữ liệu giữa client và server.

### 2 Method quan trọng nhất

#### 1. `JSON.stringify()` - Chuyển Object/Array thành chuỗi JSON

```js
const user = {
  name: "Nguyễn Văn A",
  age: 20,
  skills: ["JS", "React"],
};

const jsonString = JSON.stringify(user);
console.log(jsonString);
// Output: '{"name":"Nguyễn Văn A","age":20,"skills":["JS","React"]}'
```

#### 2. `JSON.parse()` - Chuyển chuỗi JSON thành Object/Array

```js
const jsonString = '{"name":"Nguyễn Văn A","age":20}';

const userObject = JSON.parse(jsonString);
console.log(userObject.name); // Nguyễn Văn A
```

Lưu ý khi dùng JSON:

- Khóa (Key) trong chuỗi JSON chuẩn bắt buộc phải bọc trong dấu ngoặc kép `""`.
- JSON không hỗ trợ lưu trữ hàm (`function`), `undefined` hay biểu thức logic.

---

## 7. Error (Bắt và xử lý lỗi)

Xử lý lỗi giúp chương trình không bị đứt quãng (crash) khi gặp sự cố đột ngột trong quá trình chạy (ví dụ: mất kết nối mạng, dữ liệu nhập không hợp lệ,...).

### Cú pháp `try...catch...finally`

```js
try {
  // Đoạn code có thể phát sinh lỗi
  const result = 10 / x; // Lỗi x chưa khai báo
  console.log(result);
} catch (error) {
  // Chạy khi có lỗi xảy ra ở khối try
  console.log("Đã có lỗi xảy ra:", error.message);
} finally {
  // Luôn chạy dù có lỗi hay không (dùng để đóng kết nối, dọn dẹp tài nguyên...)
  console.log("Hoàn thành tiến trình");
}
```

### Tự tạo lỗi với `throw`

Bạn có thể chủ động bắn ra lỗi bằng từ khóa `throw` kết hợp với đối tượng `Error`.

```js
function checkAge(age) {
  if (age < 18) {
    throw new Error("Bạn chưa đủ 18 tuổi!");
  }
  return "Truy cập thành công";
}

try {
  console.log(checkAge(15));
} catch (err) {
  console.error("Lỗi:", err.message); // Lỗi: Bạn chưa đủ 18 tuổi!
}
```

Các thuộc tính thường dùng của đối tượng `Error`:

- `error.name`: Tên loại lỗi.
- `error.message`: Thông điệp mô tả lỗi.
- `error.stack`: Dấu vết ngăn xếp (stack trace) hỗ trợ debug.

## Bài tập: Quản lý Giỏ hàng

Hãy viết chương trình mô phỏng hệ thống giỏ hàng đơn giản cho một trang thương mại điện tử với các yêu cầu sau:

### 1. Lớp Sản phẩm (`Product`)

Tạo class `Product` gồm:

- Constructor: nhận vào `id`, `name`, `price`, `category`.
- Method `getFormattedPrice()`: Trả về chuỗi giá tiền đã được định dạng VND (Ví dụ: `15000000`➔`"15,000,000 VNĐ"`).

### 2. Lớp Giỏ hàng (`Cart`)

Tạo class `Cart` quản lý danh sách sản phẩm mua hàng với các thuộc tính và phương thức:

- Thuộc tính trong constructor:
- `items`: Sử dụng một `Map` để lưu các mặt hàng trong giỏ.
- _Key_: Object `Product`.
- _Value_: Số lượng mua (`quantity`).

- `createdDate`: Ngày tạo giỏ hàng (sử dụng đối tượng `Date`).

- Phương thức:
- `addProduct(product, quantity = 1)`: Thêm sản phẩm vào giỏ. Nếu sản phẩm đã có trong `Map`, hãy cộng dồn số lượng.
- `removeProduct(productId)`: Xóa hoàn toàn sản phẩm ra khỏi `Map` dựa theo `id`.
- `getCategories()`: Trả về danh sách các danh mục sản phẩm (`category`) không trùng lặp hiện có trong giỏ hàng (sử dụng `Set`).
- `calculateTotal()`: Tính tổng số tiền của toàn bộ giỏ hàng.
- `checkout(voucherExpiredDate)`:
- Kiểm tra ngày thanh toán hiện tại (`new Date()`) với ngày hết hạn của Voucher (`voucherExpiredDate`).
- Nếu Voucher còn hạn: Giảm giá 10% trên tổng hóa đơn.
- Nếu Voucher đã hết hạn: Tính nguyên giá và in ra thông báo "Voucher đã hết hạn".

- `printReceipt()`: In ra hóa đơn chi tiết gồm: Ngày tạo giỏ hàng, danh sách từng sản phẩm (Tên, Số lượng, Đơn giá, Thành tiền), Danh mục các mặt hàng mua và Tổng tiền thanh toán cuối cùng.
