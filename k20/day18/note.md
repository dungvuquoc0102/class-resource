# Day 18: Number & Function trong JavaScript

## Number trong JavaScript

### Kiểu số (Number Types)

JS chỉ có một kiểu số duy nhất - số 64-bit floating point (IEEE 754).

```javascript
let x = 3.14; // số thập phân
let y = 3; // số nguyên
let z = 123e5; // 12300000 (khoa học)
```

### Độ chính xác (Precision)

```javascript
// Số nguyên chính xác tới 15 chữ số
let x = 999999999999999; // 999999999999999
let y = 9999999999999999; // 10000000000000000

// Số thập phân không phải lúc nào cũng chính xác
let z = 0.2 + 0.1; // 0.30000000000000004

// Cách khắc phục
let fix = (0.2 * 10 + 0.1 * 10) / 10; // 0.3
```

### Cộng số và chuỗi (Number + String)

JavaScript dùng `+` cho cả cộng số và nối chuỗi.

```javascript
let x = 10;
let y = 20;
let z = x + y; // 30 (số + số = số)

let a = "10";
let b = "20";
let c = a + b; // "1020" (chuỗi + chuỗi = nối)

// Số + chuỗi = nối chuỗi
console.log(10 + "20"); // "1020"
console.log("10" + 20); // "1020"

// Lưu ý thứ tự: JS chạy từ trái sang phải
console.log(10 + 20 + "30"); // "3030" (10+20=30, 30+"30"="3030")
console.log("10" + 20 + 30); // "102030"
```

### Numeric Strings

JS sẽ tự động ép chuỗi số thành số khi dùng toán tử khác `+`:

```javascript
let x = "100";
let y = "10";

console.log(x / y); // 10
console.log(x * y); // 1000
console.log(x - y); // 90
console.log(x + y); // "10010" (ưu tiên nối chuỗi)
```

### NaN (Not a Number)

`NaN` là giá trị đặc biệt khi một phép toán số không hợp lệ.

```javascript
let x = 100 / "Apple"; // NaN
isNaN(x); // true
typeof NaN; // "number"

// NaN trong phép toán
let y = NaN + 5; // NaN
let z = NaN + "5"; // "NaN5" (nối chuỗi)

// So sánh với NaN luôn false
NaN === NaN; // false
Number.isNaN(NaN); // true
```

### Infinity

`Infinity` là giá trị khi tính toán vượt quá số lớn nhất.

```javascript
let x = 2 / 0; // Infinity
let y = -2 / 0; // -Infinity
typeof Infinity; // "number"

// Nhân tới khi ra Infinity
let myNumber = 2;
while (myNumber !== Infinity) {
  myNumber = myNumber * myNumber;
}
```

### Hexadecimal, Octal, Binary

```javascript
let hex = 0xff; // 255 (hệ 16)
let oct = 0o77; // 63 (hệ 8)
let bin = 0b1010; // 10 (hệ 2)

// Chuyển đổi cơ số với toString()
let myNumber = 32;
myNumber.toString(16); // "20"
myNumber.toString(2); // "100000"
myNumber.toString(8); // "40"
```

### Number Methods

| Method             | Mô tả                                      |
| ------------------ | ------------------------------------------ |
| `toString()`       | Số -> chuỗi                                |
| `toExponential(n)` | Số -> chuỗi dạng số mũ, n chữ số thập phân |
| `toFixed(n)`       | Làm tròn n chữ số thập phân -> chuỗi       |
| `toPrecision(n)`   | Làm tròn tổng n chữ số -> chuỗi            |
| `valueOf()`        | Trả về giá trị nguyên thủy của số          |

```javascript
let x = 9.656;

x.toExponential(2); // "9.66e+0"
x.toExponential(4); // "9.6560e+0"
x.toFixed(0); // "10"
x.toFixed(2); // "9.66"  (dùng cho tiền tệ)
x.toPrecision(2); // "9.7"
x.toPrecision(4); // "9.656"
```

### Chuyển đổi thành số (Converting to Number)

| Method         | Mô tả                       |
| -------------- | --------------------------- |
| `Number()`     | Chuyển đổi giá trị thành số |
| `parseInt()`   | Chuỗi -> số nguyên          |
| `parseFloat()` | Chuỗi -> số thực            |

```javascript
// Number()
Number(true); // 1
Number(false); // 0
Number("10"); // 10
Number(" 10 "); // 10
Number("10.33"); // 10.33
Number("John"); // NaN

// parseInt()
parseInt("-10"); // -10
parseInt("-10.33"); // -10
parseInt("10 years"); // 10
parseInt("years 10"); // NaN

// parseFloat()
parseFloat("10.33"); // 10.33
parseFloat("10 years"); // 10
```

### Static Number Methods

| Method                    | Mô tả                              |
| ------------------------- | ---------------------------------- |
| `Number.isInteger(x)`     | true nếu x là số nguyên            |
| `Number.isNaN(x)`         | true nếu x là NaN                  |
| `Number.isFinite(x)`      | true nếu x không phải Infinity/NaN |
| `Number.isSafeInteger(x)` | true nếu x là safe integer         |
| `Number.parseFloat(x)`    | Giống parseFloat()                 |
| `Number.parseInt(x)`      | Giống parseInt()                   |

```javascript
Number.isInteger(10); // true
Number.isInteger(10.5); // false
Number.isFinite(123); // true
Number.isFinite(Infinity); // false
Number.isNaN(123); // false
Number.isSafeInteger(9007199254740991); // true
Number.isSafeInteger(9007199254740992); // false
```

> Lưu ý: Các static method chỉ gọi được qua `Number.isInteger(x)`, không gọi được qua `x.isInteger()`.

### Number Properties (Constants)

| Property                   | Giá trị                 |
| -------------------------- | ----------------------- |
| `Number.EPSILON`           | 2.220446049250313e-16   |
| `Number.MAX_VALUE`         | 1.7976931348623157e+308 |
| `Number.MIN_VALUE`         | 5e-324                  |
| `Number.MAX_SAFE_INTEGER`  | 9007199254740991        |
| `Number.MIN_SAFE_INTEGER`  | -9007199254740991       |
| `Number.POSITIVE_INFINITY` | Infinity                |
| `Number.NEGATIVE_INFINITY` | -Infinity               |
| `Number.NaN`               | NaN                     |

> Lưu ý: Number properties chỉ truy cập qua `Number.MAX_VALUE`, không qua `x.MAX_VALUE`.

### Bitwise Operators

JS lưu số 64-bit nhưng bitwise chuyển thành 32-bit signed integer.

| Operator | Tên                   | Ví dụ         |
| -------- | --------------------- | ------------- |
| `&`      | AND                   | `5 & 1 = 1`   |
| `\|`     | OR                    | `5 \| 1 = 5`  |
| `^`      | XOR                   | `5 ^ 1 = 4`   |
| `~`      | NOT                   | `~5 = -6`     |
| `<<`     | Left shift            | `5 << 1 = 10` |
| `>>`     | Signed right shift    | `5 >> 1 = 2`  |
| `>>>`    | Zero-fill right shift | `5 >>> 1 = 2` |

```javascript
// AND: chỉ 1 khi cả 2 bit đều 1
// 0101 & 0001 = 0001
console.log(5 & 1); // 1

// OR: 1 khi 1 trong 2 bit là 1
console.log(5 | 1); // 5

// XOR: 1 khi 2 bit khác nhau
console.log(5 ^ 1); // 4

// NOT: đảo bit
console.log(~5); // -6

// Left shift: đẩy bit sang trái
console.log(5 << 1); // 10

// Right shift: đẩy bit sang phải
console.log(5 >> 1); // 2
```

#### Bitwise Assignment Operators

| Operator | Tương đương   |
| -------- | ------------- |
| `&=`     | `x = x & y`   |
| `\|=`    | `x = x \| y`  |
| `^=`     | `x = x ^ y`   |
| `<<=`    | `x = x << y`  |
| `>>=`    | `x = x >> y`  |
| `>>>=`   | `x = x >>> y` |

### BigInt

Dùng khi số nguyên vượt quá `Number.MAX_SAFE_INTEGER`.

```javascript
// Tạo BigInt: thêm n hoặc dùng BigInt()
let big = 9999999999999999n;
let big2 = BigInt("9999999999999999");

typeof big; // "bigint"
```

#### Arithmetic với BigInt

```javascript
let x = 9007199254740995n;
let y = 9007199254740995n;
let z = x * y;

// Không thể trộn BigInt và Number
let a = 10n + 5; // TypeError
let b = Number(10n) + 5; // 15
```

#### So sánh với BigInt

```javascript
console.log(10n > 5n); // true
console.log(10n === 10); // false (khác kiểu)
console.log(10n == 10); // true (loose equality)
```

> BigInt không thể có số thập phân, không dùng được `Math` functions, không `JSON.stringify()`.

---

## Function trong JavaScript

### Giới thiệu

Function là khối code tái sử dụng, thực thi khi được gọi.

```javascript
function sayHello() {
  return "Hello World";
}

let message = sayHello();
```

### Cú pháp (Syntax)

```javascript
function tenHam(thamSo1, thamSo2) {
  // code cần thực thi
  return ketQua;
}
```

| Phần                 | Mô tả                               |
| -------------------- | ----------------------------------- |
| `function`           | Từ khóa khai báo hàm                |
| `tenHam`             | Tên hàm (theo quy tắc đặt tên biến) |
| `(thamSo1, thamSo2)` | Tham số (không bắt buộc)            |
| `{ ... }`            | Khối code thực thi                  |
| `return ketQua`      | Trả về giá trị (không bắt buộc)     |

### Gọi hàm (Invocation)

Hàm chỉ chạy khi được gọi.

```javascript
function sayHello() {
  return "Hello World";
}

// Gọi hàm
sayHello(); // trả về "Hello World"
sayHello; // tham chiếu hàm, không chạy

// Lưu kết quả
let greeting = sayHello();

// Dùng kết quả trong biểu thức
let text = "The temperature is " + toCelsius(77) + " Celsius";
```

#### Các cách gọi hàm

- Gọi từ code: `myFunction()`
- Gọi từ sự kiện: `onclick="myFunction()"`
- Tự gọi (IIFE)

#### Phân biệt hàm và kết quả

```javascript
// toCelsius là function itself
// toCelsius() là kết quả của function

function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}

let value1 = toCelsius; // function
let value2 = toCelsius(77); // 25
```

### Tham số (Parameters)

Tham số cho phép truyền giá trị vào hàm.

```javascript
function multiply(a, b) {
  return a * b;
}

multiply(4, 5); // 20
```

#### Nhiều tham số

```javascript
function fullName(firstName, lastName) {
  return firstName + " " + lastName;
}

fullName("John", "Doe"); // "John Doe"
```

#### Default Parameters (ES6)

```javascript
function myFunction(x, y = 10) {
  return x + y;
}

myFunction(5); // 15
myFunction(5, 20); // 25
```

### Return

`return` gửi giá trị ra ngoài hàm và dừng hàm ngay lập tức.

```javascript
function add(a, b) {
  return a + b;
}

let result = add(2, 3); // 5
```

#### Return dừng execution

```javascript
function multiply(a, b) {
  return "Done";
  return a * b; // không bao giờ chạy
}
```

#### Return sớm với điều kiện

```javascript
function checkAge(age) {
  if (age < 18) {
    return "Too young";
  }
  return "Access granted";
}

console.log(checkAge(15)); // "Too young"
console.log(checkAge(20)); // "Access granted"
```

#### Hàm không có return -> undefined

```javascript
function multiply(a, b) {
  let x = a * b;
}

let result = multiply(4, 3);
console.log(result); // undefined
```

### Parameters vs Arguments

| Thuật ngữ  | Mô tả                           |
| ---------- | ------------------------------- |
| Parameters | Tên biến trong định nghĩa hàm   |
| Arguments  | Giá trị thực truyền vào khi gọi |

```javascript
function multiply(a, b) {
  // a, b là parameters
  return a * b;
}

multiply(4, 5); // 4, 5 là arguments
```

#### Quy tắc

- JS không kiểm tra kiểu dữ liệu của argument
- JS không kiểm tra số lượng argument
- Thiếu argument -> undefined
- Thừa argument -> dùng `arguments` object

### Arguments Object

Mỗi hàm JS có sẵn `arguments` - object chứa mảng các đối số.

```javascript
function findMax() {
  let max = -Infinity;
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > max) {
      max = arguments[i];
    }
  }
  return max;
}

findMax(1, 123, 500, 115, 44, 88); // 500

// Tính tổng
function sumAll() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

sumAll(1, 2, 3, 4, 5); // 15
```

#### Rest Parameter (`...args`)

Cách hiện đại hơn để xử lý nhiều đối số.

```javascript
function sum(...args) {
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}

sum(4, 9, 16, 25, 29, 100); // 183
```

### Function Expressions

Function được gán cho biến.

```javascript
// Function Declaration
function add(a, b) {
  return a + b;
}

// Function Expression
const multiply = function (a, b) {
  return a * b;
};

multiply(4, 5); // 20
```

#### Anonymous Function

Function expression không cần tên.

```javascript
const sayHello = function () {
  return "Hello World";
};

sayHello(); // "Hello World"
```

> Function expression kết thúc bằng dấu `;` vì nó là câu lệnh gán.

#### Hoisting

| Loại                 | Hoisted?                              |
| -------------------- | ------------------------------------- |
| Function Declaration | Có - gọi trước khi định nghĩa được    |
| Function Expression  | Không - phải định nghĩa trước khi gọi |

```javascript
// Function Declaration - hoisted
let sum = add(2, 3); // OK
function add(a, b) {
  return a + b;
}

// Function Expression - không hoisted
let sum = add(2, 3); // Error
const add = function (a, b) {
  return a + b;
};
```

### Local Variables (Biến địa phương)

Biến khai báo trong hàm chỉ tồn tại trong hàm đó.

```javascript
function myFunction() {
  let carName = "Volvo";
  // code trong hàm có thể dùng carName
}
// code ngoài hàm không thể dùng carName
```

- Local variables được tạo khi hàm chạy, xoá khi hàm kết thúc
- Có thể dùng cùng tên biến ở các hàm khác nhau

---

--- Ở trên là nội dung chính. Kiến thức từ đây thuộc phần nâng cao của Function, các bạn có thể tìm hiểu thêm nếu muốn.

### Arrow Functions

Cú pháp ngắn gọn hơn cho function expression (giới thiệu).

```javascript
// Function expression
const add = function (a, b) {
  return a + b;
};

// Arrow function
const add = (a, b) => a + b;
```

---

## Bài tập thực hành

1. Viết hàm `calcCircleArea(r)` tính diện tích hình tròn (Math.PI \* r \*\* 2)
2. Viết hàm `timSoLonNhat(...so)` dùng rest parameter
3. Viết hàm `kiemTraSoNguyenTo(n)` kiểm tra số nguyên tố
4. Dùng `toFixed(2)` để format số tiền: `123.4567` -> `"123.46"`
5. Chuyển chuỗi "100" và "50" thành số rồi tính tổng

## Câu hỏi ôn tập

1. Tại sao `0.1 + 0.2` không bằng `0.3`? Cách khắc phục?
2. Phân biệt `Number()`, `parseInt()`, `parseFloat()`?
3. Khi nào dùng BigInt thay vì Number?
4. Phân biệt function declaration và function expression?
5. `sayHello` và `sayHello()` khác nhau thế nào?
6. Rest parameter (`...args`) dùng để làm gì?
