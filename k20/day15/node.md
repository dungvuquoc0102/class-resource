# Day 15: Câu điều kiện, vòng lặp trong JavaScript, String, Number

## Các khái niệm cơ bản trong JS

- Biến: username, age, isAdmin
- Giá trị: 10, "Hello", true
- Toán tử: +, -, &&, ||, ==, ===
- Biểu thức:
  - `age >= 18`
  - `username === "admin"`
  - `score > 50 && score < 80`
- Câu lệnh:
  - console.log("Hello");
  - let age = 18;
- Từ khóa:
  - let, const, var
  - if, else, switch, for, while, do-while
  - function, return

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

### Bài tập If/else

1. **Xếp loại học lực**: Nhập điểm `score` (0-100), in ra: Giỏi (>=80), Khá (>=60), Trung bình (>=40), Yếu (<40).

2. **Kiểm tra số chẵn lẻ**: Nhập một số nguyên, in ra "Chẵn" hoặc "Lẻ".

3. **Tìm số lớn nhất**: Nhập 3 số a, b, c, tìm và in số lớn nhất.

4. **Tính tiền taxi**:
   - 1km đầu: 10.000đ
   - Từ km thứ 2-10: 8.000đ/km
   - Từ km thứ 11 trở đi: 6.000đ/km  
     Nhập số km, in ra tổng tiền.

5. **Đăng nhập**: Cho `username = "admin"` và `password = "123456"`. Nhập username và password, kiểm tra đăng nhập thành công hay sai (sai username, sai password, hoặc thành công).

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

### Bài tập Vòng lặp

1. **Bảng cửu chương**: In bảng cửu chương từ 1 đến 5.

2. **Tính giai thừa**: Nhập n, tính n! (1*2*3*...*n).

3. **Dãy Fibonacci**: In n số Fibonacci đầu tiên (0, 1, 1, 2, 3, 5, 8...).

4. **Số nguyên tố**: Kiểm tra một số n có phải số nguyên tố không.

5. **Vẽ hình**: In ra hình tam giác vuông cân bằng dấu `*` với chiều cao 10:

```
   *
  ***
 *****
*******
```

6. **Số hoàn hảo**: Tìm tất cả số hoàn hảo nhỏ hơn 1000 (số bằng tổng ước số của nó, VD: 6 = 1+2+3).

---

Hết buổi 15

---

## String: Xử lý chuỗi trong thực tế

Chuỗi (string) là kiểu dữ liệu được dùng nhiều nhất khi làm việc với dữ liệu từ người dùng, API, hay hiển thị nội dung.

### Template literals - nội suy chuỗi

Thay vì cộng chuỗi bằng `+`, dùng backtick `` ` `` để nhúng biến:

```js
let name = "Nam";
let age = 22;

// Cộng chuỗi
console.log("Tôi tên là " + name + ", " + age + " tuổi");

// Template literals
console.log(`Tôi tên là ${name}, ${age} tuổi`);
```

```js
// Tính toán trong ${}
let a = 5,
  b = 10;
console.log(`${a} + ${b} = ${a + b}`); // "5 + 10 = 15"

// Multi-line
let html = `
  <div>
    <h1>Hello ${name}</h1>
  </div>
`;
```

### Các method xử lý chuỗi thường gặp

```js
let str = "  Hello World, Xin chào!  ";

// Cắt khoảng trắng
str.trim(); // "Hello World, Xin chào!"
str.trimStart(); // "Hello World, Xin chào!  "
str.trimEnd(); // "  Hello World, Xin chào!"

// Chuyển đổi hoa/thường
str.toLowerCase(); // "  hello world, xin chào!  "
str.toUpperCase(); // "  HELLO WORLD, XIN CHÀO!  "
```

```js
// Tìm kiếm trong chuỗi
let text = "Học JavaScript tại lớp K20";

text.indexOf("JavaScript"); // 4
text.includes("K20"); // true
text.startsWith("Học"); // true
text.endsWith("K20"); // true

// Cắt chuỗi
text.slice(4, 14); // "JavaScript" (start, end)
text.slice(4); // "JavaScript tại lớp K20"
text.substring(4, 14); // "JavaScript"

// Thay thế
text.replace("JavaScript", "JS"); // "Học JS tại lớp K20"
// Thay toàn bộ
text.replaceAll("a", "A"); // "Học JAvAScript tại lớp K20"
```

### Tách và nối chuỗi

```js
// CSV -> Array
let csv = "táo, cam, xoài, chuối";
let fruits = csv.split(", ");
// ["táo", "cam", "xoài", "chuối"]

// Array -> String
fruits.join(" | "); // "táo | cam | xoài | chuối"
```

### Xử lý tên, email thực tế

```js
// Viết hoa chữ cái đầu mỗi từ
function capitalize(str) {
  return str
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

capitalize("  nguyễn văn A  "); // "Nguyễn Văn A"

// Ẩn bớt email
function maskEmail(email) {
  let [name, domain] = email.split("@");
  return name.slice(0, 3) + "***@" + domain;
}

maskEmail("nguyenvana@gmail.com"); // "ngu***@gmail.com"
```

### Bài tập String

1. **Chuẩn hóa họ tên**: Viết hàm `normalizeName(name)` nhận chuỗi họ tên, xoá khoảng trắng thừa, viết hoa chữ đầu mỗi từ, và trả về chuẩn.  
   `normalizeName("  nguyễN   vĂN   a  ")` → `"Nguyễn Văn A"`

2. **Rút gọn tên**: Viết hàm `shortName(fullName)` chỉ giữ lại họ và tên, bỏ tên đệm.  
   `shortName("Nguyễn Văn Anh")` → `"Nguyễn Anh"`

3. **Kiểm tra email**: Viết hàm `isValidEmail(email)` kiểm tra email hợp lệ (có `@`, có domain, không có khoảng trắng).  
   `isValidEmail("test@gmail.com")` → `true`, `isValidEmail("test @gmail.com")` → `false`

4. **Đếm ký tự**: Viết hàm `countChar(str, char)` đếm số lần xuất hiện của `char` trong `str`.  
   `countChar("javascript", "a")` → `2`

5. **Ẩn số điện thoại**: Viết hàm `maskPhone(phone)` ẩn 4 số giữa, chỉ hiện 3 số đầu và 2 số cuối.  
   `maskPhone("0987654321")` → `"098*****21"`

---

## Number: Format số và tiền tệ

Làm việc với số trong thực tế thường cần định dạng theo vùng miền, làm tròn, hiển thị tiền tệ.

### Các method hữu ích

```js
// Làm tròn
let price = 123.4567;

price.toFixed(2); // "123.46" - làm tròn 2 chữ số thập phân, trả về string
price.toFixed(0); // "123"
Math.round(price); // 123
Math.floor(price); // 123
Math.ceil(price); // 124

// Chuyển về số
Number("123.45"); // 123.45
parseInt("123.45"); // 123
parseFloat("123.45"); // 123.45
+"123.45"; // 123.45 (cách ngắn)
```

### Intl.NumberFormat - Format số chuyên nghiệp

`Intl.NumberFormat` là API có sẵn trong trình duyệt/NodeJS dùng để format số theo locale.

```js
// Format số với dấu phân cách
let n = 1234567.89;

new Intl.NumberFormat("vi-VN").format(n);
// "1.234.567,89"

new Intl.NumberFormat("en-US").format(n);
// "1,234,567.89"
```

### Format tiền tệ

```js
let price = 2500000;

new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
}).format(price);
// "2.500.000 ₫"

new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(price);
// "$2,500,000.00"

new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
}).format(price);
// "¥2,500,000"
```

### Format phần trăm

```js
let rate = 0.857;

new Intl.NumberFormat("vi-VN", {
  style: "percent",
  maximumFractionDigits: 1,
}).format(rate);
// "85,7%"
```

### Xử lý giá trị nhập từ input

```js
// Xoá ký tự không phải số, giữ lại số
function parseCurrency(input) {
  return Number(input.replace(/[^\d]/g, ""));
}

parseCurrency("1.234.567₫"); // 1234567
parseCurrency("$2,500.00"); // 250000

// Hiển thị giá dạng rút gọn
function formatCompact(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

formatCompact(2500000); // "2.5M"
formatCompact(12500); // "12.5K"
```
