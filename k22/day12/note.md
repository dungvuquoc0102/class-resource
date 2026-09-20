# Day 12: Array, Math trong JavaScript

## 1. Array trong JavaScript

Array dùng để lưu danh sách dữ liệu. Đây là cấu trúc dữ liệu rất hay dùng khi làm web: danh sách sản phẩm, danh sách học viên, danh sách bài viết, giỏ hàng, menu...

### Khai báo mảng

```js
const numbers = [1, 2, 3, 4, 5];
const fruits = ["banana", "apple", "orange"];
const mixed = [1, "hello", true]; // dùng được nhưng không khuyến khích nếu dữ liệu không cùng kiểu
const emptyArr = [];
```

### Length và index

Index của mảng bắt đầu từ `0`.

```js
const fruits = ["banana", "apple", "orange"];

console.log(fruits.length); // 3
console.log(fruits[0]); // "banana"
console.log(fruits[1]); // "apple"
console.log(fruits[fruits.length - 1]); // "orange"
```

### Thêm và xóa phần tử

```js
const fruits = ["banana", "apple", "orange"];

fruits.push("mango"); // thêm cuối
fruits.pop(); // xóa cuối

fruits.unshift("kiwi"); // thêm đầu
fruits.shift(); // xóa đầu
```

Trong thực tế, `push`/`pop` hay dùng hơn `shift`/`unshift` vì thao tác ở cuối mảng thường nhanh và ít phải sắp xếp lại index.

### `splice`: thêm, xóa, thay thế giữa mảng

```js
const colors = ["đỏ", "xanh", "vàng", "tím"];

colors.splice(1, 1); // xóa 1 phần tử tại index 1
// ["đỏ", "vàng", "tím"]

colors.splice(1, 0, "hồng"); // thêm "hồng" tại index 1
// ["đỏ", "hồng", "vàng", "tím"]

colors.splice(2, 1, "cam"); // thay phần tử index 2 bằng "cam"
// ["đỏ", "hồng", "cam", "tím"]
```

### Duyệt mảng

```js
const fruits = ["banana", "apple", "orange"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

for (const fruit of fruits) {
  console.log(fruit);
}

fruits.forEach((fruit, index) => {
  console.log(index, fruit);
});
```

Lưu ý:

- `for` thường dùng khi cần index rõ ràng hoặc cần `break`/`continue`.
- `for...of` gọn khi chỉ cần value.
- `forEach` hay dùng khi muốn chạy một hành động với từng phần tử.

### Tìm kiếm trong mảng

```js
const items = ["bút", "sách", "vở", "thước", "bút"];

console.log(items.indexOf("sách")); // 1
console.log(items.lastIndexOf("bút")); // 4
console.log(items.includes("vở")); // true
console.log(items.includes("tẩy")); // false
```

Với mảng object, thường dùng `find`, `findIndex`, `some`, `every`.

```js
const users = [
  { id: 1, name: "An", active: true },
  { id: 2, name: "Bình", active: false },
  { id: 3, name: "Chi", active: true },
];

const user = users.find((user) => user.id === 2);
const userIndex = users.findIndex((user) => user.id === 2);
const hasInactiveUser = users.some((user) => user.active === false);
const allActive = users.every((user) => user.active === true);
```

### `filter`: lọc mảng

`filter` trả về mảng mới chỉ gồm các phần tử thỏa điều kiện.

```js
const scores = [45, 78, 90, 33, 62, 88];

const passedScores = scores.filter((score) => score >= 50);

console.log(passedScores); // [78, 90, 62, 88]
```

### `map`: biến đổi mảng

`map` trả về mảng mới, mỗi phần tử được biến đổi từ mảng cũ.

```js
const scores = [45, 78, 90];

const bonusScores = scores.map((score) => score + 5);

console.log(bonusScores); // [50, 83, 95]
```

`map` rất hay dùng để render UI.

```js
const users = ["Nam", "Lan", "Anh"];

const html = users.map((user) => `<li>${user}</li>`).join("");

document.querySelector("#student-list").innerHTML = html;
```

### Kết hợp `filter` và `map`

```js
const scores = [45, 78, 90, 33, 62, 88];

const result = scores
  .filter((score) => score >= 50)
  .map((score) => `Đạt ${score} điểm`);

console.log(result);
```

### Sắp xếp mảng

```js
const names = ["Nam", "Anh", "Lan", "Bình"];
names.sort();
console.log(names); // ["Anh", "Bình", "Lan", "Nam"]
```

Với số, phải truyền hàm so sánh.

```js
const nums = [5, 20, 1, 100, 3];

nums.sort(); // sai ý nghĩa số học: [1, 100, 20, 3, 5]
nums.sort((a, b) => a - b); // tăng dần
nums.sort((a, b) => b - a); // giảm dần
```

Sắp xếp object theo thuộc tính:

```js
const products = [
  { name: "Táo", price: 15000 },
  { name: "Cam", price: 8000 },
  { name: "Xoài", price: 20000 },
];

products.sort((a, b) => a.price - b.price);
```

### Tách, nối và sao chép mảng

```js
const arr = [10, 20, 30, 40, 50];

console.log(arr.slice(1, 3)); // [20, 30]
console.log(arr.slice(2)); // [30, 40, 50]
console.log(arr.slice()); // clone mảng
```

```js
const a = [1, 2];
const b = [3, 4];

const c = a.concat(b);
const d = [...a, ...b];
```

### `join` và `split`

```js
const tags = ["js", "array", "method"];

console.log(tags.join(", ")); // "js, array, method"
console.log("banana, apple, orange".split(", ")); // ["banana", "apple", "orange"]
```

### Destructuring mảng

```js
const point = [10, 20, 30];

const [x, y, z] = point;
console.log(x); // 10
console.log(y); // 20

const [first, ...rest] = point;
console.log(first); // 10
console.log(rest); // [20, 30]
```

Kết hợp với `split`:

```js
const email = "nguyenvana@gmail.com";
const [username, domain] = email.split("@");
```

### Mảng là object, so sánh theo tham chiếu

```js
const arrA = [1, 2];
const arrB = [1, 2];

console.log(arrA === arrB); // false

const arrC = arrA;
console.log(arrC === arrA); // true
```

Clone mảng đúng cách:

```js
const clone1 = arrA.slice();
const clone2 = [...arrA];
const clone3 = Array.from(arrA);
```

### Bài tập Array

1. Viết hàm `sumArray(arr)` nhận mảng số, trả về tổng các phần tử.
2. Viết hàm `findMax(arr)` tìm số lớn nhất trong mảng, không dùng `Math.max`.
3. Viết hàm `filterEven(arr)` trả về mảng chỉ gồm số chẵn.
4. Viết hàm `reverseArray(arr)` trả về mảng đảo ngược, không dùng `reverse`.
5. Viết hàm `removeDuplicates(arr)` xóa phần tử trùng, chỉ giữ lại 1 lần.
6. Cho mảng sản phẩm, dùng `filter` lấy sản phẩm có giá trên `100000`.
7. Cho mảng sản phẩm, dùng `map` render thành danh sách `<li>Tên sản phẩm - Giá</li>`.

## 2. Math trong JavaScript

`Math` là object có sẵn, dùng để tính toán. Không cần `new Math()`.

### Method thường dùng

| Method           | Ý nghĩa                              | Ví dụ                      |
| ---------------- | ------------------------------------ | -------------------------- |
| `Math.round(x)`  | Làm tròn tới số nguyên gần nhất      | `Math.round(4.6)` -> `5`   |
| `Math.ceil(x)`   | Làm tròn lên                         | `Math.ceil(4.1)` -> `5`    |
| `Math.floor(x)`  | Làm tròn xuống                       | `Math.floor(4.9)` -> `4`   |
| `Math.trunc(x)`  | Cắt phần thập phân                   | `Math.trunc(4.9)` -> `4`   |
| `Math.abs(x)`    | Trị tuyệt đối                        | `Math.abs(-10)` -> `10`    |
| `Math.min(...)`  | Số nhỏ nhất                          | `Math.min(2, 5, 1)` -> `1` |
| `Math.max(...)`  | Số lớn nhất                          | `Math.max(2, 5, 1)` -> `5` |
| `Math.pow(a, b)` | Lũy thừa                             | `Math.pow(2, 3)` -> `8`    |
| `Math.sqrt(x)`   | Căn bậc hai                          | `Math.sqrt(16)` -> `4`     |
| `Math.random()`  | Số ngẫu nhiên từ `0` đến nhỏ hơn `1` | `0 <= x < 1`               |

### `floor` và `trunc` với số âm

```js
console.log(Math.floor(-4.9)); // -5
console.log(Math.trunc(-4.9)); // -4
```

`floor` luôn làm tròn xuống phía nhỏ hơn. `trunc` chỉ cắt phần thập phân.

### Tìm min/max trong mảng

```js
const scores = [45, 92, 18, 73, 55, 99, 4];

console.log(Math.min(...scores)); // 4
console.log(Math.max(...scores)); // 99
```

`...scores` là spread operator: biến mảng thành danh sách argument.

### Random số nguyên trong khoảng

```js
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomInt(1, 10));
```

Ứng dụng: mã OTP, random màu, random phần tử, game đơn giản.

## 3. Date trong JavaScript

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

## 4. Scope cần nhớ

Scope là phạm vi nơi biến có thể được truy cập.

### Global scope

```js
const appName = "My App";

function showAppName() {
  console.log(appName);
}
```

Biến global có thể dùng ở nhiều nơi, nhưng không nên lạm dụng vì dễ bị sửa nhầm.

### Function scope

```js
function greeting() {
  const message = "Hello";
  console.log(message);
}

// console.log(message); // lỗi
```

### Block scope

```js
if (true) {
  let count = 10;
  const total = 20;
}

// console.log(count); // lỗi
```

`let` và `const` có block scope. `var` không có block scope nên hiện tại nên hạn chế dùng `var`.

```js
if (true) {
  var oldValue = 100;
}

console.log(oldValue); // 100
```

## 5. Error và xử lý lỗi

Lỗi thường gặp:

- `ReferenceError`: dùng biến chưa tồn tại.
- `TypeError`: gọi sai kiểu dữ liệu, ví dụ `10.filter()`.
- `SyntaxError`: sai cú pháp.
- `RangeError`: giá trị vượt phạm vi cho phép.
- `URIError`: lỗi encode/decode URI.

### `try...catch...finally`

```js
try {
  const data = JSON.parse('{"name":"An"}');
  console.log(data.name);
} catch (error) {
  console.log("Có lỗi:", error.message);
} finally {
  console.log("Luôn chạy dù có lỗi hay không");
}
```

### Tự ném lỗi bằng `throw`

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error("Không thể chia cho 0");
  }

  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (error) {
  console.log(error.message);
}
```

Ứng dụng: validate form, xử lý dữ liệu API, bảo vệ chương trình không bị dừng đột ngột.

## 6. Class cơ bản

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

## 7. DOM cơ bản

DOM là cách JavaScript đọc và thay đổi nội dung HTML.

### Select element

```js
const title = document.querySelector("h1");
const button = document.querySelector("#change-title");
const items = document.querySelectorAll(".item");
```

### Đổi nội dung

```js
title.textContent = "Tiêu đề mới";
```

### Đổi attribute

```js
const link = document.querySelector("a");
link.href = "https://fullstack.edu.vn";
link.target = "_blank";
```

### Đổi style/class

```js
title.style.color = "red";
title.classList.add("active");
title.classList.remove("active");
title.classList.toggle("active");
```

### Bắt sự kiện

```js
button.addEventListener("click", function () {
  title.textContent = "Bạn vừa click";
});
```

```js
const input = document.querySelector("#name");

input.addEventListener("input", function (event) {
  console.log(event.target.value);
});
```

## Bài tập trên lớp

### Bài 1: Random màu

Viết hàm `getRandomColor()` trả về màu RGB ngẫu nhiên:

```js
rgb(12, 120, 255);
```

Khi click button, đổi màu chữ của `h1`.

### Bài 2: Format thời gian

Viết hàm `formatDate(date)` nhận vào một object `Date`, trả về chuỗi:

```txt
Thứ Hai, ngày 20 tháng 7 năm 2026
```

### Bài 3: Tính hạn khóa học

Học viên đăng ký ngày `"2026-09-15"`, khóa học kéo dài 45 ngày.

Yêu cầu:

- Tạo ngày đăng ký bằng `new Date`.
- Dùng `setDate()` để cộng thêm 45 ngày.
- In ra ngày hết hạn.

### Bài 4: Validate tuổi

Viết hàm `checkAge(age)`:

- Nếu `age` không phải number hợp lệ -> `throw new Error("Tuổi không hợp lệ")`.
- Nếu `age < 18` -> trả về `"Chưa đủ tuổi"`.
- Ngược lại -> trả về `"Đủ tuổi"`.

Dùng `try...catch` để gọi hàm.

### Bài 5: Class Product

Tạo class `Product` có:

- `name`
- `price`
- method `showInfo()` in ra tên và giá.
- method `getSalePrice(percent)` trả về giá sau giảm.

Tạo ít nhất 2 sản phẩm và gọi method.

### Bài 6: DOM mini app

Tạo giao diện gồm:

- 1 input nhập tên.
- 1 button.
- 1 thẻ `h2`.

Khi click button, hiển thị:

```txt
Xin chào, <tên vừa nhập>
```

Nếu input rỗng thì hiển thị:

```txt
Vui lòng nhập tên
```

## Tổng kết cần nhớ

- `Math.random()` luôn trả số từ `0` đến nhỏ hơn `1`.
- Array dùng để xử lý danh sách dữ liệu: thêm, xóa, tìm kiếm, lọc, biến đổi, sắp xếp.
- `filter` dùng để lọc dữ liệu, `map` dùng để biến đổi dữ liệu.
- `sort` với số cần truyền callback `(a, b) => a - b` hoặc `(a, b) => b - a`.
- Mảng là object nên so sánh theo tham chiếu, muốn copy nên dùng `slice`, spread `...`, hoặc `Array.from`.
- Muốn random số nguyên trong khoảng, thường kết hợp `Math.random()` và `Math.floor()`.
- `Date.getMonth()` trả về tháng từ `0` đến `11`, nên khi hiển thị phải `+ 1`.
- `Date.getDay()` trả về thứ từ `0` đến `6`, trong đó `0` là Chủ Nhật.
- Dùng `getTime()` khi cần tính khoảng cách giữa hai thời điểm.
- Ưu tiên `let`/`const`, hạn chế `var`.
- `try...catch` giúp chương trình không bị dừng khi có lỗi có thể dự đoán.
- Class giúp tạo nhiều object cùng cấu trúc.
- DOM giúp JS tương tác với HTML: chọn element, đổi nội dung, đổi thuộc tính, bắt sự kiện.
