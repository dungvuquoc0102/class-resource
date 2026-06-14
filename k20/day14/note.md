# Day 14: Câu điều kiện, Vòng lặp, String, Array

## Kiểu dữ liệu trong Javascript

### `typeof` - kiểm tra kiểu dữ liệu

Là toán tử (operator) dùng để kiểm tra kiểu dữ liệu của một biến hoặc một giá trị.

#### Cú pháp

- `typeof value` (Cách dùng phổ biến)
- `typeof(value)` (Giống như một hàm, thường dùng khi cần kiểm tra một biểu thức phức tạp)

Kết quả trả về của `typeof` **luôn luôn là một chuỗi (string)** viết thường đại diện cho kiểu dữ liệu đó.

#### Các kết quả trả về của `typeof`

- Các kiểu dữ liệu nguyên thủy (Primitive Types)

Hầu hết các kiểu nguyên thủy đều trả về kết quả rất "thẳng thắn":

```javascript
typeof "Hello World"; // "string"
typeof 42; // "number"
typeof NaN; // "number"  <-- Chú ý: Not a Number vẫn là kiểu số!
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object"  <-- Lỗi lịch sử của JS, nhưng không sửa được
typeof Symbol("id"); // "symbol"
typeof 10n; // "bigint"  <-- Kiểu số nguyên lớn (ES2020)
```

- Kiểu dữ liệu phức tạp (Reference Types) và Function

```javascript
// 1. Object thông thường
typeof { name: "Alex" }; // "object"

// 2. Array (Mảng)
typeof [1, 2, 3]; // "object"

// 3. Function (Hàm)
typeof function () {}; // "function"
```

> Thực tế:

- Cần đảm bảo dữ liệu truyền vào đúng kiểu khi viết hàm, tránh lỗi runtime.
- Kiểm tra tính năng của trình duyệt trước khi sử dụng một API nào đó.

### So sánh Primitive và Reference

```js
// Primitive - so sánh giá trị
let x = 10;
let y = 10;
console.log(x === y); // true

// Reference - so sánh tham chiếu (địa chỉ vùng nhớ)
let objA = { value: 10 };
let objB = { value: 10 };
let objC = objA;
console.log(objA === objB); // false - khác vùng nhớ
console.log(objA === objC); // true - cùng tham chiếu
```

| Đặc điểm | Primitive       | Reference (Object)        |
| -------- | --------------- | ------------------------- |
| Lưu tại  | Stack (giá trị) | Heap (tham chiếu đến)     |
| So sánh  | Theo giá trị    | Theo tham chiếu (địa chỉ) |
| Gán biến | Copy giá trị    | Copy tham chiếu           |

## Toán tử và biểu thức

### 1. Toán tử số học (Arithmetic)

| Toán tử | Ý nghĩa        | Ví dụ            |
| ------- | -------------- | ---------------- |
| `+`     | Cộng           | `5 + 3 -> 8`     |
| `-`     | Trừ            | `5 - 3 -> 2`     |
| `*`     | Nhân           | `5 * 3 -> 15`    |
| `/`     | Chia           | `5 / 2 -> 2.5`   |
| `%`     | Chia lấy dư    | `5 % 2 -> 1`     |
| `**`    | Luỹ thừa (ES6) | `2 ** 3 -> 8`    |
| `++`    | Tăng 1         | `let a = 1; a++` |
| `--`    | Giảm 1         | `let b = 5; b--` |

```js
let sum = 10 + 5; // 15
let remainder = 17 % 3; // 2
let power = 2 ** 4; // 16

let counter = 0;
counter++; // counter = 1
counter--; // counter = 0
```

### 2. Toán tử gán (Assignment)

| Toán tử | Tương đương  | Ví dụ               |
| ------- | ------------ | ------------------- |
| `=`     | `x = y`      | `let x = 5`         |
| `+=`    | `x = x + y`  | `x += 3` -> x = 8   |
| `-=`    | `x = x - y`  | `x -= 2` -> x = 6   |
| `*=`    | `x = x * y`  | `x *= 2` -> x = 12  |
| `/=`    | `x = x / y`  | `x /= 3` -> x = 4   |
| `%=`    | `x = x % y`  | `x %= 3` -> x = 1   |
| `**=`   | `x = x ** y` | `x **= 2` -> x = 25 |

```js
let score = 10;
score += 5; // score = score + 5
score *= 2; // 30
```

### 3. Toán tử so sánh (Comparison)

Trả về `boolean` (`true` / `false`).

| Toán tử | Ý nghĩa                       | Ví dụ                |
| ------- | ----------------------------- | -------------------- |
| `==`    | Bằng nhau (không check kiểu)  | `5 == "5" -> true`   |
| `===`   | Bằng nhau tuyệt đối (cả kiểu) | `5 === "5" -> false` |
| `!=`    | Khác nhau (không check kiểu)  | `5 != "5" -> false`  |
| `!==`   | Khác nhau tuyệt đối           | `5 !== "5" -> true`  |
| `>`     | Lớn hơn                       | `10 > 5 -> true`     |
| `<`     | Nhỏ hơn                       | `10 < 5 -> false`    |
| `>=`    | Lớn hơn hoặc bằng             | `5 >= 5 -> true`     |
| `<=`    | Nhỏ hơn hoặc bằng             | `4 <= 5 -> true`     |

> Thực tế:

- Luôn dùng `===` và `!==` thay vì `==`/`!=` để tránh lỗi ép kiểu ngầm định.

```js
console.log(5 == "5"); // true  (ép kiểu)
console.log(5 === "5"); // false (khác kiểu)

console.log(null == undefined); // true  (đặc biệt)
console.log(null === undefined); // false
```

### 4. Toán tử logic (Logical)

| Toán tử | Ý nghĩa  | Ví dụ                              |
| ------- | -------- | ---------------------------------- |
| `&&`    | VÀ       | `true && false -> false`           |
| `\|\|`  | HOẶC     | `true \|\| false -> true`          |
| `!`     | PHỦ ĐỊNH | `!true -> false`                   |
| `??`    | Nullish  | `null ?? "mặc định" -> "mặc định"` |

```js
let isLoggedIn = true;
let isAdmin = false;

console.log(isLoggedIn && isAdmin); // false
console.log(isLoggedIn || isAdmin); // true
console.log(!isLoggedIn); // false
```

#### Short-circuit evaluation

```js
// && - nếu vế trái false thì không đánh giá vế phải
false && console.log("Không chạy"); // không in gì

// || - nếu vế trái truthy thì không đánh giá vế phải
true || console.log("Không chạy");

// Dùng || để gán giá trị mặc định (cách cũ)
let username = inputValue || "Khách";

// Dùng ?? - chỉ fallback khi null/undefined
let displayName = userInput ?? "Mặc định";
```

| `??` (Nullish coalescing) | Fallback chỉ khi `null` hoặc `undefined`     |
| ------------------------- | -------------------------------------------- |
| `0 ?? "x" -> 0`           | `0` là falsy nhưng không phải null/undefined |
| `"" ?? "x" -> ""`         | `""` tương tự                                |
| `null ?? "x" -> "x"`      | null -> fallback                             |

### 5. Toán tử chuỗi (String operator) `+`

Toán tử `+` với chuỗi thực hiện nối chuỗi:

```js
let firstName = "Nguyễn";
let lastName = "An";
let fullName = firstName + " " + lastName; // "Nguyễn An"

// Template literal tốt hơn
let greeting = `Xin chào ${fullName}!`; // "Xin chào Nguyễn An!"
```

### 6. Toán tử ba ngôi (Ternary)

Cú pháp rút gọn của `if/else`:

```js
let age = 18;
let status = age >= 18 ? "Trưởng thành" : "Chưa đủ tuổi";
console.log(status); // "Trưởng thành"

// Tương đương:
// let status;
// if (age >= 18) {
//   status = "Trưởng thành";
// } else {
//   status = "Chưa đủ tuổi";
// }
```

### Truthy và Falsy

| Falsy (7 giá trị)    | Truthy (mọi thứ còn lại)      |
| -------------------- | ----------------------------- |
| `false`              | `true`                        |
| `0`, (và `-0`), `0n` | Mọi số khác 0                 |
| `""` (chuỗi rỗng)    | Chuỗi không rỗng              |
| `null`               | Mọi object (kể cả `[]`, `{}`) |
| `undefined`          | Function                      |
| `NaN`                |                               |
| `document.all`       |                               |

---

Hết buổi 14

---

### Ép kiểu (Type coercion) - ngầm định

JS tự động ép kiểu trong một số tình huống:

```js
console.log("5" - 2); // 3  (string -> number)
console.log("5" + 2); // "52" (number -> string - + ưu tiên nối chuỗi)
console.log("5" * "2"); // 10 (cả hai sang number)
console.log(+"5"); // 5 (unary + ép sang number)
```

> `+` là ngoại lệ: nếu có string, nó ưu tiên nối chuỗi; các toán tử khác (`-`, `*`, `/`, `%`) ưu tiên ép sang number.

### Ép kiểu tường minh

```js
// String -> Number
console.log(Number("42")); // 42
console.log(parseInt("42px")); // 42
console.log(parseFloat("3.14")); // 3.14

// Number -> String
console.log(String(100)); // "100"
console.log((100).toString()); // "100"

// Anything -> Boolean
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean("abc")); // true
```

## If/else và switch case

### Câu điều kiện if/else

Dùng để rẽ nhánh chương trình dựa trên điều kiện.

```js
let age = 18;

if (age >= 18) {
  console.log("Đủ tuổi");
} else {
  console.log("Chưa đủ tuổi");
}
```

#### if - else if - else

```js
let score = 85;

if (score >= 90) {
  console.log("Xuất sắc");
} else if (score >= 75) {
  console.log("Giỏi");
} else if (score >= 50) {
  console.log("Trung bình");
} else {
  console.log("Yếu");
}
```

#### Lưu ý

- Điều kiện trong `if(...)` luôn được ép về boolean (truthy/falsy).
- `else if` có thể viết nhiều cái.
- `else` là không bắt buộc.

```js
// Truthy/falsy trong if
if ("") console.log("Không chạy"); // falsy
if ("abc") console.log("Chạy"); // truthy
if (0) console.log("Không chạy"); // falsy
if (1) console.log("Chạy"); // truthy
```

### Toán tử ba ngôi (Ternary) - ôn lại

```js
let age = 20;
let status = age >= 18 ? "Trưởng thành" : "Chưa đủ tuổi";
```

### switch case

Dùng khi so sánh một giá trị với nhiều trường hợp cụ thể.

```js
let day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = "Thứ Hai";
    break;
  case 2:
    dayName = "Thứ Ba";
    break;
  case 3:
    dayName = "Thứ Tư";
    break;
  case 4:
    dayName = "Thứ Năm";
    break;
  case 5:
    dayName = "Thứ Sáu";
    break;
  default:
    dayName = "Cuối tuần";
}

console.log(dayName); // "Thứ Tư"
```

> Lưu ý: `break` - nếu không có `break`, chương trình sẽ "rơi tự do" (fall-through) xuống case tiếp theo.

```js
// Fall-through có chủ đích
let fruit = "táo";
switch (fruit) {
  case "táo":
  case "lê":
  case "cam":
    console.log("Đây là trái cây");
    break;
  default:
    console.log("Không biết");
}
```

#### Khi nào dùng if/else, khi nào dùng switch?

| if/else                           | switch                                      |
| --------------------------------- | ------------------------------------------- |
| So sánh phức tạp (>, <, &&, \|\|) | So sánh === với nhiều giá trị cụ thể        |
| Truthy/falsy                      | Ít hơn 5-7 case (nhiều hơn thì nên xem xét) |

> Thực tế: if/else được dùng nhiều hơn switch. Switch thích hợp khi có 3+ case so sánh cùng một biến.

---

## Vòng lặp: for, while, do-while

Vòng lặp dùng để thực thi một khối code nhiều lần.

### for loop

```js
for (khởi_tạo; điều_kiện; bước_nhảy) {
  // code
}

for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

| Phần        | Vai trò                                |
| ----------- | -------------------------------------- |
| `let i = 0` | Khởi tạo biến đếm - chạy 1 lần đầu     |
| `i < 5`     | Điều kiện - kiểm tra trước mỗi lần lặp |
| `i++`       | Bước nhảy - chạy sau mỗi lần lặp       |

```js
// Duyệt mảng với for
let colors = ["đỏ", "xanh", "vàng"];
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

// Đếm ngược
for (let i = 10; i >= 0; i--) {
  console.log(i);
}
```

### while loop

```js
while (điều_kiện) {
  // code - chỉ chạy khi điều kiện đúng
}

let count = 0;
while (count < 3) {
  console.log(count); // 0, 1, 2
  count++;
}
```

> Dùng while khi không biết trước số lần lặp.

```js
// Ví dụ: random tới khi được số > 0.9
let random;
while (random < 0.9) {
  random = Math.random();
}
```

### do-while loop

```js
do {
  // code - chạy ít nhất 1 lần
} while (điều_kiện);

let x = 0;
do {
  console.log(x); // 0
  x++;
} while (x < 3);
```

Khác với `while`: `do-while` luôn chạy ít nhất 1 lần dù điều kiện sai.

| Vòng lặp   | Đặc điểm                                |
| ---------- | --------------------------------------- |
| `for`      | Biết trước số lần lặp, có biến đếm      |
| `while`    | Không biết trước số lần, kiểm tra đầu   |
| `do-while` | Không biết trước số lần, chạy ít nhất 1 |

### break và continue

```js
// break - thoát vòng lặp ngay lập tức
for (let i = 0; i < 10; i++) {
  if (i === 3) break;
  console.log(i); // 0, 1, 2
}

// continue - bỏ qua lần lặp hiện tại
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // 0, 1, 3, 4
}
```

---
