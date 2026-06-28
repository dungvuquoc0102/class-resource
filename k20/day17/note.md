# Day 17: String, Number, Function trong JavaScript

## PHẦN 1 - STRING (Chuỗi)

### 1.1. Tạo chuỗi

Chuỗi trong JS là dãy ký tự nằm trong dấu nháy. Có thể dùng nháy đơn `'...'` hoặc nháy đôi `"..."`, hai cách này hoàn toàn tương đương, không có sự khác biệt nào về hành vi.

```js
let a = "Xin chào"; // nháy đôi
let b = "Xin chào"; // nháy đơn
```

**Dùng nháy lồng nhau**: được phép, miễn là nháy bên trong khác loại với nháy bao ngoài.

```js
let s1 = "It's alright";
let s2 = "He is called 'Johnny'";
let s3 = 'He is called "Johnny"';
```

### 1.2. Template literals (chuỗi mẫu - dấu backtick)

Ra đời từ ES6 (2015), viết bằng dấu backtick `` ` `` thay vì nháy.

- Cho phép chứa **cả nháy đơn và nháy đôi** bên trong mà không cần escape:

```js
let text = `He's often called "Johnny"`;
```

- Cho phép viết **chuỗi nhiều dòng** trực tiếp, không cần ký tự `\n`:

```js
let text = `Dòng 1
Dòng 2
Dòng 3`;
```

- (Lưu ý: trang gốc chỉ nói tới khả năng nhiều dòng và chứa nháy lồng; phần nội suy biến `${...}` thuộc bài "String Templates" riêng, không nằm trong nội dung trang Strings này.)

### 1.3. Độ dài chuỗi

Dùng thuộc tính `.length`:

```js
let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let length = text.length; // 26
```

### 1.4. Ký tự thoát (Escape Characters)

Vì chuỗi phải nằm trong dấu nháy, nếu trong chuỗi có chính dấu nháy đó thì JS sẽ hiểu sai (chuỗi bị "cắt cụt"). Giải pháp: dùng dấu **backslash** `\` để biến ký tự đặc biệt thành ký tự thường trong chuỗi.

| Mã   | Kết quả | Ý nghĩa       |
| ---- | ------- | ------------- |
| `\'` | `'`     | Nháy đơn      |
| `\"` | `"`     | Nháy đôi      |
| `\\` | `\`     | Dấu backslash |

Ví dụ:

```js
let text1 = 'We are the so-called "Vikings" from the north.';
let text2 = "It's alright.";
let text3 = "The character \\ is called backslash.";
```

Ngoài 3 mã trên, còn 6 escape sequence khác (nguồn gốc từ thời máy đánh chữ/telex, hiện không còn nhiều ý nghĩa thực tế trong HTML):

| Mã   | Ý nghĩa               |
| ---- | --------------------- |
| `\b` | Backspace             |
| `\f` | Form feed             |
| `\n` | Xuống dòng (New line) |
| `\r` | Carriage return       |
| `\t` | Tab ngang             |
| `\v` | Tab dọc               |

### 1.5. Ngắt dòng code cho dễ đọc

- Ngắt một **statement** dài: nên ngắt **sau một operator**.

```js
document.getElementById("demo").innerHTML = "Hello Dolly!";
```

- Ngắt một **chuỗi** dài: dùng phép cộng chuỗi `+`.

```js
document.getElementById("demo").innerHTML = "Hello " + "Dolly!";
```

- Hoặc dùng template literal để viết chuỗi nhiều dòng tự nhiên hơn (xem mục 1.2).

### 1.6. String là kiểu nguyên thủy, nhưng cũng có thể là Object

Bình thường, string trong JS là **giá trị nguyên thủy (primitive)**, tạo từ literal:

```js
let x = "John";
```

Nhưng cũng có thể tạo string dưới dạng **object** bằng từ khóa `new`:

```js
let y = new String("John");
```

**Khuyến cáo: không nên tạo String object.** Từ khóa `new` làm code phức tạp hơn và chạy chậm hơn, đồng thời gây ra kết quả khó hiểu khi so sánh:

- Với `==` (so sánh giá trị, có ép kiểu): `x == y` → `true`.
- Với `===` (so sánh giá trị **và** kiểu dữ liệu): `x === y` → `false` (vì x là string, y là object).
- So sánh hai object bằng nhau bằng `==`/`===`: **luôn luôn `false`**, vì object so sánh theo tham chiếu (reference), không theo nội dung - dù `new String("John") == new String("John")` thì cả hai biến trỏ tới hai object khác nhau trong bộ nhớ.

Đây là lý do thực hành tốt là **luôn dùng string literal**, tránh `new String(...)`.

---

Hết buổi 17

---

## PHẦN 2 - NUMBER (Số)

### 2.1. JavaScript chỉ có MỘT kiểu số

Không như nhiều ngôn ngữ khác (có int, long, float, double riêng biệt), JavaScript chỉ có **một kiểu number duy nhất**, dùng được cho cả số nguyên và số thực.

```js
let x = 3.14; // có phần thập phân
let y = 3; // không có phần thập phân
```

Số rất lớn hoặc rất nhỏ có thể viết theo **ký hiệu khoa học** (e):

```js
let x = 123e5; // = 12300000
let y = 123e-5; // = 0.00123
```

### 2.2. Number luôn là số thực dấu phẩy động 64-bit (IEEE 754)

Mọi number trong JS được lưu dưới dạng **double precision floating point**, theo chuẩn quốc tế IEEE 754, dùng 64 bit:

| Phần giá trị (mantissa/fraction) | Phần mũ (exponent)    | Dấu (sign)        |
| -------------------------------- | --------------------- | ----------------- |
| 52 bit (vị trí 0–51)             | 11 bit (vị trí 52–62) | 1 bit (vị trí 63) |

Trong khi nhiều ngôn ngữ có nhiều kiểu số (byte 8-bit, short 16-bit, int 32-bit, long 64-bit cho số nguyên; float 32-bit, double 64-bit cho số thực), **JavaScript number luôn tương đương "double" (64-bit floating point)**, không có khái niệm kiểu riêng cho số nguyên.

### 2.3. Độ chính xác của số nguyên

Số nguyên (không có dấu thập phân, không ký hiệu khoa học) chỉ **chính xác tới 15 chữ số**.

```js
let x = 999999999999999; // = 999999999999999  (15 chữ số: đúng)
let y = 9999999999999999; // = 10000000000000000 (16 chữ số: SAI, bị làm tròn!)
```

Số thập phân tối đa hỗ trợ **17 chữ số**.

### 2.4. Độ chính xác của số thực (floating point)

Tính toán dấu phẩy động **không phải lúc nào cũng chính xác 100%**, đây là vấn đề kinh điển khi học JS:

```js
let x = 0.2 + 0.1; // kết quả KHÔNG đúng là 0.3 do sai số biểu diễn nhị phân
```

Cách khắc phục phổ biến: **nhân lên rồi chia xuống** để đưa phép tính về số nguyên trước khi quy đổi lại:

```js
let x = (0.2 * 10 + 0.1 * 10) / 10; // = 0.3 chính xác
```

### 2.5. Cộng Number và String - cái bẫy hay gặp nhất

JavaScript dùng cùng một ký hiệu `+` cho cả **phép cộng số học** và **phép nối chuỗi**:

- Số + Số → **cộng**: `10 + 20` → `30`
- Chuỗi + Chuỗi → **nối**: `"10" + "20"` → `"1020"`
- Số + Chuỗi → **nối** (số bị ép thành chuỗi): `10 + "20"` → `"1020"`
- Chuỗi + Số → **nối**: `"10" + 20` → `"1020"`

  **Lỗi thường gặp #1:**

```js
let x = 10,
  y = 20;
let z = "The result is: " + x + y; // = "The result is: 1020" (KHÔNG phải 30!)
```

Vì JS tính từ trái sang phải: `"The result is: " + 10` → nối thành chuỗi trước, sau đó nối tiếp với `20`.

**Lỗi thường gặp #2:**

```js
let x = 10,
  y = 20,
  z = "30";
let result = x + y + z; // = "3030" (KHÔNG phải 102030!)
```

Vì `x + y` được tính trước (10 + 20 = 30, cả hai đều là số), sau đó `30 + "30"` mới nối chuỗi → `"3030"`.

### 2.6. Numeric strings (chuỗi chứa số)

JS sẽ **tự động chuyển chuỗi số thành number** khi thực hiện các phép toán số học - **trừ phép `+`**:

```js
let x = "100",
  y = "10";
x / y; // = 10   (hoạt động, tự chuyển sang number)
x * y; // = 1000 (hoạt động)
x - y; // = 90   (hoạt động)
x + y; // = "10010" (KHÔNG hoạt động như mong đợi - bị nối chuỗi!)
```

### 2.7. NaN - Not a Number

`NaN` là giá trị đặc biệt báo hiệu "đây không phải một số hợp lệ".

```js
let x = 100 / "Apple"; // NaN - vì "Apple" không phải số
let y = 100 / "10"; // = 10 - vì "10" là chuỗi số hợp lệ, tự chuyển đổi được
```

Dùng hàm toàn cục `isNaN()` để kiểm tra:

```js
let x = 100 / "Apple";
isNaN(x); // true
```

**Lưu ý quan trọng:** Nếu `NaN` xuất hiện trong một phép toán, **kết quả luôn là `NaN`** (tính lan truyền):

```js
let x = NaN,
  y = 5;
let z = x + y; // NaN

let a = NaN,
  b = "5";
let c = a + b; // "NaN5" (nối chuỗi vì b là string)
```

Một điều khá nghịch lý: `typeof NaN` trả về `"number"` - về mặt kiểu dữ liệu, NaN **vẫn được coi là một number**.

### 2.8. Infinity

`Infinity` (hoặc `-Infinity`) là giá trị JS trả về khi tính ra một số **vượt quá số lớn nhất có thể biểu diễn**.

```js
let myNumber = 2;
while (myNumber != Infinity) {
  myNumber = myNumber * myNumber; // tăng dần tới khi vượt giới hạn
}
```

Chia cho 0 cũng tạo ra `Infinity`:

```js
let x = 2 / 0; // Infinity
let y = -2 / 0; // -Infinity
```

`typeof Infinity` cũng trả về `"number"`.

### 2.9. Hệ số: Hexadecimal, Octal, Binary

- JS hiểu một số là **hexadecimal (hệ 16)** nếu có tiền tố `0x`:

```js
let x = 0xff; // = 255 (hệ 10)
```

- **Không nên viết số có số 0 ở đầu** (ví dụ `07`), vì một số phiên bản JS coi đó là số **octal (hệ 8)**, gây nhầm lẫn.
- Mặc định, JS hiển thị số ở **hệ 10 (decimal)**. Có thể dùng `.toString(base)` để xuất số ở **hệ 2 tới hệ 36**:

```js
let myNumber = 32;
myNumber.toString(16); // "20"  - hexadecimal (hệ 16)
myNumber.toString(8); // "40"  - octal (hệ 8)
myNumber.toString(2); // "100000" - binary (hệ 2)
```

Tóm tắt: Binary = hệ 2, Octal = hệ 8, Decimal = hệ 10, Hexadecimal = hệ 16.

### 2.10. Number cũng có thể là Object (và cũng không nên dùng)

Tương tự String, Number bình thường là **primitive**:

```js
let x = 123;
```

nhưng cũng tạo được dưới dạng object:

```js
let y = new Number(123);
```

Tương tự khuyến cáo với String: **không nên tạo Number object** - `new` làm chậm code và gây kết quả bất ngờ:

- `x == y` (với x = 500, y = new Number(500)) → `true` (so sánh giá trị)
- `x === y` → `false` (kiểu khác nhau: number vs object)
- `new Number(500) == new Number(500)` hoặc `===` → **luôn `false`**, vì so sánh object là so sánh tham chiếu, không phải nội dung.

---

## PHẦN 3 - FUNCTION (Hàm)

### 3.1. Function là gì?

**Function** là một khối code có thể tái sử dụng, được thiết kế để thực hiện một nhiệm vụ cụ thể. Function **chỉ thực thi khi được gọi (called/invoked)** - định nghĩa function không tự động chạy code bên trong.

**Lợi ích của function:**

- Tái sử dụng code (viết một lần, dùng nhiều lần)
- Tổ chức code thành các phần nhỏ, rõ ràng
- Code dễ đọc, dễ bảo trì hơn

### 3.2. Cú pháp khai báo function

```js
function tenHam(thamSo1, thamSo2, ...) {
  // code thực thi
}
```

- Bắt đầu bằng từ khóa `function`
- Theo sau là **tên hàm** (tuân theo quy tắc đặt tên biến)
- **Tham số** (tùy chọn) nằm trong dấu `()`
- Code thực thi nằm trong dấu `{}`
- Hàm **có thể** trả về một giá trị (return), nhưng không bắt buộc

```js
function multiply(a, b) {
  return a * b;
}
```

Khai báo function **không phải là một statement thực thi** - vì vậy thường **không** cần dấu `;` ở cuối (khác với các statement khác).

### 3.3. Gọi hàm (Invocation)

Code bên trong hàm **không chạy khi định nghĩa**, chỉ chạy khi có "thứ gì đó" gọi (invoke) hàm:

- Gọi từ code JS khác
- Khi một sự kiện xảy ra (ví dụ người dùng click nút)
- Tự gọi (self-invoked)

Để gọi hàm: viết **tên hàm + dấu `()`**:

```js
function sayHello() {
  return "Hello World";
}

let message = sayHello(); // gọi hàm, lưu kết quả vào biến
console.log(sayHello()); // gọi và in ra kết quả
```

**Phân biệt quan trọng - gọi hàm vs tham chiếu hàm:**

| Cách viết    | Ý nghĩa                                          |
| ------------ | ------------------------------------------------ |
| `sayHello`   | Tham chiếu tới **chính hàm đó** (không thực thi) |
| `sayHello()` | **Gọi** hàm, trả về **kết quả** thực thi         |

```js
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}

let a = toCelsius; // a là function itself
let b = toCelsius(77); // b là kết quả: 25
```

Hàm có thể được gọi từ bất kỳ đâu: từ hàm khác, từ event handler, từ bất kỳ block code nào.

**Lỗi thường gặp:**

- Quên dấu `()` khi gọi hàm → không thực thi hàm, chỉ lấy tham chiếu.
- Tưởng mọi hàm đều có giá trị trả về (không phải vậy - xem mục 3.5).
- Có return value nhưng quên hiển thị nó ra (console.log, gán biến, render HTML...).

### 3.4. Tham số (Parameters) và Đối số (Arguments)

Đây là hai khái niệm **khác nhau**, hay bị nhầm:

| Khái niệm               | Định nghĩa                                         |
| ----------------------- | -------------------------------------------------- |
| **Parameter** (tham số) | **Tên biến** được liệt kê trong **định nghĩa** hàm |
| **Argument** (đối số)   | **Giá trị thực** được gửi vào khi **gọi** hàm      |

```js
function multiply(a, b) {
  // a, b là PARAMETERS
  return a * b;
}

let result = multiply(4, 5); // 4, 5 là ARGUMENTS
```

**Quy tắc quan trọng:**

- JS **không khai báo kiểu dữ liệu** cho parameter (khác TypeScript).
- JS **không kiểm tra kiểu** của argument truyền vào.
- JS **không kiểm tra số lượng** argument so với số parameter khai báo.

→ Vì vậy truyền sai kiểu hoặc thiếu/dư argument **không gây lỗi cú pháp**, nhưng có thể cho ra kết quả sai (`NaN`, `undefined`...):

```js
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}
toCelsius(); // thiếu argument → kết quả NaN
toCelsius("John"); // sai kiểu → kết quả NaN
```

**Đối số có thể là biến, không chỉ giá trị trực tiếp:**

```js
let x = 5,
  y = 6;
function multiply(a, b) {
  return a * b;
}
multiply(x, y); // 30
```

**Thứ tự đối số rất quan trọng** - đối số được gán vào tham số theo đúng vị trí:

```js
function subtract(a, b) {
  return a - b;
}
subtract(10, 5); // 5
subtract(5, 10); // -5  (đảo thứ tự → kết quả khác)
```

### 3.5. Default Parameters (tham số mặc định) - từ ES6

Nếu không truyền đối số (hoặc truyền `undefined`), parameter sẽ lấy **giá trị mặc định** được khai báo sẵn:

```js
function myFunction(x, y = 10) {
  return x + y;
}
myFunction(5); // = 15 (y dùng giá trị mặc định 10)
```

Nếu không có default value và thiếu argument, parameter đó sẽ là `undefined`. Trước ES6, người ta thường tự kiểm tra:

```js
function myFunction(x, y) {
  if (y === undefined) y = 2;
  // ...
}
```

### 3.6. The `arguments` Object

Mỗi hàm thông thường (function thường, không phải arrow function) có một **object built-in tên `arguments`**, chứa **mảng tất cả đối số** được truyền vào lúc gọi hàm - kể cả khi số đối số nhiều hơn số parameter khai báo.

```js
function findMax() {
  let max = -Infinity;
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > max) max = arguments[i];
  }
  return max;
}
findMax(1, 123, 500, 115, 44, 88); // 500
```

### 3.7. Rest Parameter (`...`)

Cho phép một hàm nhận **số lượng đối số không xác định** dưới dạng một **mảng thật** (khác `arguments` - object giả-mảng):

```js
function sum(...args) {
  let total = 0;
  for (let arg of args) total += arg;
  return total;
}
sum(4, 9, 16, 25, 29, 100, 66, 77); // 326
```

### 3.8. Truyền giá trị (Pass by Value) vs Truyền tham chiếu (Pass by Reference)

- **Đối số kiểu nguyên thủy** (number, string, boolean...) được truyền **theo giá trị (by value)**: hàm chỉ nhận được **bản sao giá trị**, không phải vị trí lưu trữ gốc. Nếu hàm thay đổi giá trị tham số, **thay đổi đó không ảnh hưởng** ra ngoài hàm.
- **Đối số kiểu object** (bao gồm cả array, function...) hoạt động giống như **truyền theo tham chiếu (by reference)**: vì trong JS, "tham chiếu tới object" chính là giá trị được truyền. Nếu hàm thay đổi **property** của object, thay đổi đó **có ảnh hưởng** ra ngoài hàm (vì cùng trỏ tới một object trong bộ nhớ).

### 3.9. Return - Trả về giá trị

**Câu lệnh `return`** dùng để gửi một giá trị ra ngoài, trả lại cho nơi gọi hàm. Khi hàm gặp `return`, **hàm dừng thực thi ngay lập tức** - code phía sau `return` (trong cùng hàm) **sẽ không bao giờ chạy**.

```js
function sayHello() {
  return "Hello World";
}
let message = sayHello(); // message = "Hello World"
```

**Giá trị trả về có thể dùng trực tiếp trong biểu thức khác:**

```js
function multiply(a, b) {
  return a * b;
}
let total = multiply(2, 3) * 10; // = 60
```

**Return có thể trả về bất kỳ kiểu dữ liệu nào**, không chỉ số:

```js
function fullName(first, last) {
  return first + " " + last;
}
```

**Dùng return để dừng hàm sớm theo điều kiện** (early return) - kỹ thuật rất phổ biến để tránh code lồng nhiều `if`:

```js
function checkAge(age) {
  if (age < 18) {
    return "Too young";
  }
  return "Access granted";
}
```

**Hàm không có `return` → giá trị trả về là `undefined`:**

```js
function multiply(a, b) {
  let x = a * b; // tính nhưng không return
}
let result = multiply(4, 3); // result = undefined
```

**Lỗi thường gặp:**

- Quên `return` → luôn nhận `undefined`.
- Tưởng code sau `return` vẫn chạy → sai, code đó bị bỏ qua hoàn toàn.
- Nhầm `console.log()` với `return` - `console.log()` chỉ **hiển thị** ra màn hình, **không trả giá trị** ra cho nơi gọi hàm.

### 3.10. Function Declaration vs Function Expression

JavaScript có nhiều cách định nghĩa hàm. Hai cách phổ biến nhất:

**Function Declaration (khai báo hàm thường):**

```js
function add(a, b) {
  return a + b;
}
```

Gồm: từ khóa `function` + **tên hàm** (bắt buộc) + tham số + code block.

**Function Expression (biểu thức hàm - hàm được lưu vào biến):**

```js
const add = function (a, b) {
  return a + b;
};
```

Gồm: từ khóa `function` (tên có thể có hoặc **không có** - gọi là **anonymous function**, hàm vô danh) + tham số + code block, toàn bộ được **gán cho một biến**.

Cả hai đều hoạt động giống nhau khi gọi (`add(2,3)`), nhưng khác nhau ở **thời điểm khả dụng trong code**:

| Đặc điểm                            | Function Declaration                                 | Function Expression                                                 |
| ----------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------- |
| Cần tên?                            | Bắt buộc                                             | Có thể vô danh (anonymous)                                          |
| Hoisting (được "kéo" lên đầu scope) | ✅ Có - gọi được **trước** khi định nghĩa trong code | ❌ Không - chỉ gọi được **sau** khi đã thực thi tới điểm định nghĩa |
| Kết thúc bằng `;`                   | Không cần                                            | Cần, vì đây là một statement (gán biến)                             |

Ví dụ về hoisting:

```js
// Function Declaration - hoạt động được, dù gọi trước khi định nghĩa:
let sum = add(2, 3); // OK
function add(a, b) {
  return a + b;
}

// Function Expression - LỖI, vì chưa được gán lúc gọi:
let sum2 = add2(2, 3); // Lỗi
const add2 = function (a, b) {
  return a + b;
};
```

**Vì function expression được lưu trong biến, nó có thể dùng như một giá trị** - truyền vào hàm khác (callback), trả về từ hàm khác, gán cho biến khác:

```js
function run(fn) {
  return fn();
}
const sayHello = function () {
  return "Hello";
};
run(sayHello); // "Hello"
```

**Khi nào dùng cái nào?**

- Dùng **function declaration** cho các hàm tổng quát, dùng nhiều nơi.
- Dùng **function expression** khi gán hàm cho biến, hoặc trong callback/event handler.

Function expression chính là nền tảng cho **arrow function**, **callback**, **closure**, và **IIFE** (các khái niệm JS nâng cao hơn).

### 3.11. Arrow Function (Hàm mũi tên) - ES6

**Arrow function** là cú pháp **ngắn gọn hơn** cho function expression, dùng ký hiệu `=>`. Có thể bỏ qua từ khóa `function`, từ khóa `return`, và dấu `{}` (trong một số trường hợp).

```js
// Function expression truyền thống:
const multiply = function (a, b) {
  return a * b;
};

// Arrow function - đầy đủ:
const add = (a, b) => {
  return a + b;
};

// Arrow function - rút gọn (1 statement → bỏ {} và return):
const multiply2 = (a, b) => a * b;
```

**Quy tắc rút gọn cú pháp:**

1. **Một tham số duy nhất** → có thể **bỏ dấu `()`** quanh tham số:

```js
const square = (x) => x * x; // tương đương (x) => x * x
```

2. **Không có tham số** → **bắt buộc phải có** dấu `()`:

```js
const hello = () => "Hello World!";
```

3. **Chỉ có một câu lệnh trả về giá trị** → có thể **bỏ `{}` và `return`**:

```js
const hello = () => "Hello World!"; // tự động return
```

**Lưu ý an toàn:** Bỏ `{}` và `return` **chỉ hoạt động đúng nếu hàm có đúng một statement**. Nếu thiếu cẩn thận, dễ viết sai và nhận `undefined`:

```js
// SAI - có {} nhưng thiếu return → trả về undefined:
const myFunction = (x, y) => { x * y };

// SAI - cú pháp return + arrow rút gọn lẫn lộn, không hợp lệ:
const myFunction2 = (x, y) => return x * y;

// ĐÚNG:
const myFunction3 = (x, y) => { return x * y };
// hoặc ĐÚNG (rút gọn):
const myFunction4 = (x, y) => x * y;
```

Vì lý do này, nhiều người chọn **luôn giữ `{}` và `return`** cho rõ ràng, an toàn, kể cả khi có thể rút gọn.

**Arrow function KHÔNG phải là declaration - luôn là expression:**

- Phải được **gán cho biến** trước khi dùng.
- **Không hoisting** - không gọi được trước khi định nghĩa.

```js
hello(); // Lỗi
const hello = () => "Hello";
```

**Arrow function và từ khóa `this` - điểm khác biệt quan trọng nhất:**
Arrow function **không có `this` riêng của nó** - nó **kế thừa `this` từ scope bao quanh (nơi nó được định nghĩa)**, khác hẳn với function thường (function thường có `this` được xác định bởi _cách nó được gọi_).

```js
const person = {
  name: "John",
  greet: function () {
    return this.name; // OK - this trỏ tới person
  },
};

const person2 = {
  name: "John",
  greet: () => {
    return this.name; // KHÔNG như mong đợi - this KHÔNG trỏ tới person2
  },
};
```

Đây là lý do **không nên dùng arrow function làm method của object**.

**Khi nào nên dùng arrow function:**

- Hàm ngắn, đơn giản
- Callback và các hàm trong array method (`.map()`, `.filter()`...)
- Khi **không cần** `this` riêng của hàm

**Khi nào KHÔNG nên dùng arrow function:**

- Làm method của object
- Khi cần `this` riêng (gắn theo cách gọi hàm)
- Khi cần hoisting (function declaration)

**Các lỗi thường gặp với arrow function:**

- Quên quy tắc dấu `()` (bắt buộc khi 0 hoặc nhiều tham số).
- Dùng arrow function làm method rồi bất ngờ vì `this` sai.
- Tưởng arrow function được hoisting - không phải.

---

## Bài tập

### Phần 1 - Trắc nghiệm / Lý thuyết

**Câu 1:** Kết quả của dòng code sau là gì?

```js
let text = "  Xin chào  ";
console.log(text.trim().toUpperCase());
```

->A. `"XIN CHÀO"`  
B. `"  XIN CHÀO  "`  
C. `"xin chào"`  
D. `"Xin Chào"`

---

**Câu 2:** `parseInt("3.14abc")` trả về giá trị gì?

A. `3.14`  
B. `3`  
C. `NaN`  
D. Lỗi

---

**Câu 3:** Tại sao nên dùng `===` thay vì `==`?

---

**Câu 4:** Cho đoạn code sau, kết quả in ra là gì? Vì sao?

```js
function test() {
  return;
  console.log("Hello");
}
console.log(test());
```

---

**Câu 5:** `Number("")` trả về giá trị gì?

A. `0`  
B. `NaN`  
C. `""`  
D. `undefined`

---

**Câu 6:** Giá trị nào sau đây là **falsy** trong JavaScript? (Chọn tất cả đáp án đúng)

A. `0`  
B. `"false"`  
C. `null`  
D. `[]`  
E. `undefined`  
F. `NaN`

---

**Câu 7:** Cho đoạn code sau, kết quả là gì và vì sao?

```js
console.log("10" + 5);
console.log("10" - 5);
```

---

### Phần 2 - Tìm lỗi & sửa (debug)

**Bài 1:**

```js
function greet(name) {
  console.log("Xin chào " + name);
}

greet();
```

**Bài 2:**

```js
function double(n) {
  return n * 2;
  console.log("Done");
}

double(5);
```

**Bài 3:**

```js
let a = "5";
let b = "3";
console.log(a + b); // muốn in ra 8
```

**Bài 4:**

```js
let text = "javascript";
text.toUpperCase();
console.log(text);
```

**Bài 5:**

```js
function calc(price, tax) {
  return price + tax;
}
console.log(calc(100)); // muốn in ra 110 (tax mặc định là 10)
```

---

### Phần 3 - Viết code atomic

**Bài 1 - Template literal:** Viết hàm `greetUser(name, role)` trả về chuỗi `"Xin chào, tôi là [name], vai trò: [role]"` dùng template literal.

---

**Bài 2 - String method:** Viết hàm `removeSpaces(str)` xoá toàn bộ khoảng trắng thừa ở đầu, cuối, và giữa các từ, trả về chuỗi đã xử lý.

Ví dụ: `removeSpaces("  JS   rất   hay  ")` → `"JS rất hay"`

---

**Bài 3 - Number / parseInt:** Viết hàm `sumFromString(a, b)` nhận hai chuỗi số, chuyển thành số, trả về tổng.

Ví dụ: `sumFromString("10", "20")` → `30`

---

**Bài 4 - toFixed:** Viết hàm `formatPrice(price)` nhận số, làm tròn 2 chữ số thập phân và trả về dạng `"xxx.xx"`.

Ví dụ: `formatPrice(123.456)` → `"123.46"`

---

**Bài 5 - Arrow function:** Viết arrow function `square(n)` trả về bình phương của `n` (dùng cú pháp rút gọn nhất có thể).

---

**Bài 6 - Function + String:** Viết hàm `maskName(name)` nhận chuỗi họ tên, trả về tên đã ẩn các ký tự giữa: giữ lại ký tự đầu và cuối của mỗi từ, các ký tự giữa thay bằng `***`.

Ví dụ: `maskName("Nguyen Van Anh")` → `"N***n V***n A***h"`

---

### Phần 4 - Bài tổng hợp / Capstone

**Đề bài:** Xây dựng công cụ tính tiền tip (tip calculator) đơn giản.

Viết các hàm theo các bước sau:

**Bước 1:** Viết hàm `parseBill(input)` nhận chuỗi nhập từ người dùng (VD: `"250.000₫"`), loại bỏ ký tự không phải số, trả về số (number).

---

**Bước 2:** Viết hàm `calcTip(bill, percent)` nhận số tiền và phần trăm tip, trả về số tiền tip (làm tròn 2 chữ số thập phân). Nếu `percent` không được truyền, mặc định là `10`.

---

**Bước 3:** Viết hàm `formatCurrency(amount)` nhận số, trả về chuỗi đã format theo locale `vi-VN` dạng tiền tệ VND.

---

**Bước 4 (mở rộng):** Viết hàm `showBillSummary(input, percent)` kết hợp **tất cả các bước trên**:

1. Parse input thành số
2. Tính tip
3. Tính tổng (bill + tip)
4. Format cả bill, tip và tổng thành tiền tệ
5. Trả về chuỗi tóm tắt:
   ```
   Tiền bill: 250.000 ₫
   Tip (10%): 25.000 ₫
   Tổng:      275.000 ₫
   ```

---

## Đáp án

### Phần 1 - Trắc nghiệm / Lý thuyết

**Câu 1:** A. `"XIN CHÀO"` - `trim()` cắt khoảng trắng đầu/cuối, `toUpperCase()` viết hoa toàn bộ.

**Câu 2:** B. `3` - `parseInt` đọc số từ đầu chuỗi, dừng khi gặp ký tự không phải số, bỏ qua phần còn lại.

**Câu 3:** Vì `==` tự động ép kiểu ngầm định trước khi so sánh, dẫn đến kết quả không như mong đợi (VD: `5 == "5"` là `true`). `===` so sánh cả giá trị và kiểu dữ liệu, an toàn hơn.

**Câu 4:** In ra `undefined`. Vì `return;` không kèm giá trị nên trả về `undefined`, và hàm dừng ngay tại `return` nên `console.log("Hello")` không bao giờ chạy.

**Câu 5:** A. `0` - `Number("")` ép chuỗi rỗng thành số, kết quả là `0`.

**Câu 6:** A (`0`), C (`null`), E (`undefined`), F (`NaN`). - `"false"` là chuỗi không rỗng nên truthy; `[]` là object nên truthy.

**Câu 7:**

- `"10" + 5` → `"105"` - toán tử `+` gặp string nên ưu tiên nối chuỗi, số 5 được ép thành `"5"`.
- `"10" - 5` → `5` - toán tử `-` chỉ dành cho số, JS ép `"10"` thành `10` rồi trừ.

---

### Phần 2 - Tìm lỗi & sửa

**Bài 1:**

- (a) Lỗi ở chỗ gọi `greet()` không truyền đối số.
- (b) Tham số `name` nhận `undefined`, hàm in ra `"Xin chào undefined"`.
- (c) Sửa: Gọi `greet("Nam")` hoặc thêm giá trị mặc định `function greet(name = "bạn")`.

```js
function greet(name) {
  console.log("Xin chào " + name);
}

greet("Nam"); // Sửa: truyền đối số
```

**Bài 2:**

- (a) Lỗi: `console.log("Done")` đặt sau `return`.
- (b) `return` kết thúc hàm ngay lập tức, dòng sau `return` không bao giờ chạy (dead code).
- (c) Sửa: đặt `console.log("Done")` trước `return` hoặc bỏ đi.

```js
function double(n) {
  console.log("Done");
  return n * 2;
}
```

**Bài 3:**

- (a) Dùng `+` với hai string, kết quả là `"53"` (nối chuỗi) thay vì `8`.
- (b) `+` ưu tiên nối chuỗi khi có string, không tự động ép sang number.
- (c) Sửa: dùng `Number()` hoặc `parseInt()`.

```js
let a = "5";
let b = "3";
console.log(Number(a) + Number(b)); // 8
```

**Bài 4:**

- (a) `text.toUpperCase()` trả về chuỗi mới nhưng không gán lại.
- (b) String là primitive, không thể thay đổi tại chỗ (immutable). `toUpperCase()` trả về chuỗi mới.
- (c) Sửa: gán kết quả về biến.

```js
let text = "javascript";
text = text.toUpperCase();
console.log(text); // "JAVASCRIPT"
```

**Bài 5:**

- (a) Hàm `calc(price, tax)` có 2 tham số nhưng chỉ truyền 1 đối số.
- (b) `tax` nhận `undefined`, `price + undefined` = `NaN`.
- (c) Sửa: thêm giá trị mặc định cho `tax`.

```js
function calc(price, tax = 10) {
  return price + tax;
}
console.log(calc(100)); // 110
```

---

### Phần 3 - Gợi ý lời giải

**Bài 1:**

```js
function greetUser(name, role) {
  return `Xin chào, tôi là ${name}, vai trò: ${role}`;
}
```

**Bài 2:**

```js
function removeSpaces(str) {
  return str.trim().split(/\s+/).join(" ");
}
```

Gợi ý: `.split(/\s+/)` tách chuỗi theo một hoặc nhiều khoảng trắng. Có thể dùng `.split(" ").filter(...)` nếu chưa học regex.

**Bài 3:**

```js
function sumFromString(a, b) {
  return Number(a) + Number(b);
}
```

Gợi ý: Có thể dùng `parseInt` hoặc `parseFloat` tuỳ nhu cầu.

**Bài 4:**

```js
function formatPrice(price) {
  return price.toFixed(2);
}
```

Gợi ý: `toFixed` trả về string. Nếu muốn trả về number, dùng `Number(price.toFixed(2))`.

**Bài 5:**

```js
let square = (n) => n ** 2;
```

Gợi ý: Bỏ `{}` và `return` vì arrow function với 1 câu lệnh có thể viết rút gọn.

**Bài 6:**

```js
function maskName(name) {
  return name
    .split(" ")
    .map((word) => {
      if (word.length <= 2) return word;
      return word[0] + "***" + word[word.length - 1];
    })
    .join(" ");
}
```

Gợi ý: Có thể điều chỉnh số dấu `*` sao cho output dễ đọc, hoặc dùng `slice` để lấy phần giữa.

---

### Phần 4 - Gợi ý lời giải

**Bước 1:**

```js
function parseBill(input) {
  return Number(input.replace(/[^\d]/g, ""));
}
```

**Bước 2:**

```js
function calcTip(bill, percent = 10) {
  return Number(((bill * percent) / 100).toFixed(2));
}
```

**Bước 3:**

```js
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
```

**Bước 4:**

```js
function showBillSummary(input, percent) {
  let bill = parseBill(input);
  let tip = calcTip(bill, percent);
  let total = bill + tip;

  return (
    `Tiền bill: ${formatCurrency(bill)}\n` +
    `Tip (${percent}%): ${formatCurrency(tip)}\n` +
    `Tổng:      ${formatCurrency(total)}`
  );
}
```

Gợi ý mở rộng:

- Xử lý trường hợp input không hợp lệ (chuỗi không chứa số nào) → trả về thông báo lỗi.
- Thêm tuỳ chọn chia tip cho nhiều người: `calcTipPerPerson(bill, percent, persons)`.
