# Day 11: Function, Object trong JavaScript

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
  // code sau return sẽ không chạy
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

## Object trong JavaScript

### Introduction

### Properties and methods

- Access
- Add
- Change
- Delete
- Check if a property exists
- Nested objects

### Display

- [object Object]
- JSON.stringify()
- Display key and value

### Definitions

- Object literal
- new Object()
- Constructor function
- Object.assign(target, ...sources)
- Object.create(proto)
- Object.fromEntries(entries)

### this

- In object method
- In function
- In global
- In arrow function
- Bind, call, apply
- In constructor
- In class
- In event listener

### Get / Set

- Getter
- Setter

### Prototypes

- Intro
- Prototype chain

- Object
- Object literal: `{ name: "Lan", age: 24 }`
- Function: `function <name>() {...}`
- Array: `[1, 2, 3]`

function a() {
...
}

a.name
