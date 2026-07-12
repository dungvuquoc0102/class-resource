# Day 20: Advanced Objects

## Definitions

- Object literal
- new Object()
- Constructor function
- Object.assign(target, ...sources)
- Object.create(proto)
- Object.fromEntries(entries)

## this

- In object method
- In function
- In global
- In arrow function
- Bind, call, apply
- In constructor
- In class
- In event listener

## Get / Set

- Getter
- Setter

## Exercises

markdown# Day 20: Advanced Objects

## 1. Definitions

- Object literal
- new Object()
- Constructor function
- Object.assign(target, ...sources)
- Object.create(proto)
- Object.fromEntries(entries)

## 2. This

- In arrow function
- Bind, call, apply
- In constructor
- In class
- In event listener

## 3. Get / Set

- Getter
- Setter

## 4. Exercises

- Exercise 1 (3 cách tạo object): Cho 3 cách viết sau, tạo ra object giống nhau `{ name: "Lan", age: 24 }`:

```js
// Cách 1: Object literal
const obj1 = { name: "Lan", age: 24 };

// Cách 2: new Object()
const obj2 = new Object();
obj2.name = "Lan";
obj2.age = 24;

// Cách 3: Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const obj3 = new Person("Lan", 24);
```

- So sánh `obj1`, `obj2`, `obj3` bằng `console.log` và `typeof`. Giải thích khi nào nên dùng cách nào (object đơn lẻ, cấu hình, hay nhiều instance cùng cấu trúc).

- Exercise 2 (Object.assign): Cho:

```js
const defaultSettings = { theme: "light", layout: { columns: 2 } };
const userSettings = { theme: "dark" };
const finalSettings = Object.assign({}, defaultSettings, userSettings);
```

- In `finalSettings` ra kiểm tra.
- Đổi `finalSettings.layout.columns = 5`. In `defaultSettings.layout.columns` ra xem có bị ảnh hưởng không. Giải thích tại sao (shallow copy).

- Exercise 3 (Object.create): Cho:

```js
const animalProto = {
  describe() {
    return `${this.name} is a ${this.type}`;
  },
};

const dog = Object.create(animalProto);
dog.name = "Milo";
dog.type = "Dog";
```

- Gọi `dog.describe()`. In ra kết quả.
- Dùng `Object.getPrototypeOf(dog)` để kiểm tra prototype của `dog` có phải `animalProto` không.
- Kiểm tra `dog.hasOwnProperty("describe")` — giải thích tại sao `false`.

- Exercise 4 (Object.fromEntries): Cho:

```js
const entries = [
  ["id", 1],
  ["name", "Laptop"],
  ["price", 15000000],
];
```

- Dùng `Object.fromEntries(entries)` để chuyển thành object. In kết quả ra console.
- Dùng `Object.entries()` để chuyển ngược object đó về lại mảng entries, xác nhận khớp với `entries` ban đầu.

- Exercise 5 (Arrow function vs regular function — this): Cho:

```js
const counter = {
  count: 0,
  incrementNormal: function () {
    setTimeout(function () {
      this.count++;
      console.log("Normal:", this.count);
    }, 100);
  },
  incrementArrow: function () {
    setTimeout(() => {
      this.count++;
      console.log("Arrow:", this.count);
    }, 100);
  },
};

counter.incrementNormal();
counter.incrementArrow();
```

- Chạy code trên, giải thích tại sao `incrementNormal` không tăng đúng `count` nhưng `incrementArrow` thì có. `this` trong mỗi trường hợp đang trỏ tới đâu?

- Exercise 6 (call / apply): Cho:

```js
const person1 = { name: "An" };
const person2 = { name: "Bình" };

function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}
```

- Dùng `introduce.call(person1, "Hello", "!")` và `introduce.apply(person2, ["Hi", "."])`.
- Giải thích khác biệt cách truyền tham số giữa `call` và `apply`.

- Exercise 7 (bind): Cho:

```js
const user = {
  name: "Chi",
  greet() {
    console.log(`Xin chào, tôi là ${this.name}`);
  },
};

setTimeout(user.greet, 100);
```

- Chạy code trên, giải thích tại sao `this.name` bị `undefined`.
- Sửa lại bằng cách dùng `.bind(user)` để `setTimeout` gọi đúng `this`. In kết quả ra kiểm tra.

- Exercise 8 (this trong constructor function): Viết hàm tạo `Product(name, price)` gán `this.name`, `this.price` và method `getInfo()` in ra `"${name} - ${price}đ"`. Tạo `p1 = new Product("Chuột", 200000)`. Gọi `p1.getInfo()`. Thử gọi `Product("Bàn phím", 500000)` (không dùng `new`), in `this` ra xem điều gì xảy ra và giải thích tại sao.

- Exercise 9 (this trong class): Viết lại `Product` ở Exercise 8 bằng ES6 `class` (constructor + method `getInfo()`). Tạo `p2 = new Product("Màn hình", 3000000)`. Gọi `p2.getInfo()`. So sánh cú pháp class với constructor function — chỗ nào giống, chỗ nào khác về mặt `this`.

- Exercise 10 (this trong event listener): Cho đoạn JS:

```javascript
const btn = document.getElementById("myBtn");
btn.addEventListener("click", function () {
  console.log(this);
});
btn.addEventListener("click", () => {
  console.log(this);
});
```

- Click nút, quan sát 2 dòng log. Giải thích tại sao `this` trong function thường là chính element `btn`, còn trong arrow function lại khác.

- Exercise 11 (Getter): Cho:

```js
const user = {
  firstName: "Nguyễn",
  lastName: "An",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};
```

- Truy cập `user.fullName` (không gọi như hàm, không có `()`). In kết quả ra console. Giải thích khác biệt giữa getter và method thường.

- Exercise 12 (Setter): Cho:

```js
const account = {
  _balance: 0,
  get balance() {
    return this._balance;
  },
  set balance(value) {
    if (value < 0) {
      console.log("Số dư không được âm!");
      return;
    }
    this._balance = value;
  },
};
```

- Gán `account.balance = 500000`. In `account.balance` ra kiểm tra.
- Gán `account.balance = -100`. Quan sát kết quả, giải thích vai trò của setter trong việc validate dữ liệu.

- Exercise 13 (Bài tổng hợp — Quản lý tài khoản ngân hàng): Viết `class BankAccount`:
  - Constructor nhận `owner`, `initialBalance` (mặc định `0`), lưu số dư vào private field `#balance`.
  - Getter `balance` trả về `#balance` (không cho set trực tiếp).
  - Method `deposit(amount)`: nếu `amount <= 0` thì log lỗi, ngược lại cộng vào `#balance`.
  - Method `withdraw(amount)`: nếu `amount > #balance` thì log "Số dư không đủ", ngược lại trừ đi.
  - Method `getStatement()` in ra `"Chủ tài khoản: ${owner} - Số dư: ${balance}đ"`.
  - Tạo `acc = new BankAccount("Minh", 1000000)`.
  - Dùng `setTimeout` để giả lập giao dịch trễ: gọi `acc.deposit(200000)` sau 1 giây — dùng `.bind(acc)` để đảm bảo `this` đúng bên trong `setTimeout`.
  - Sau đó gọi `acc.getStatement()` để in kết quả cuối cùng.
