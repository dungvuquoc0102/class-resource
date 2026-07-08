# Day 20: Advanced Objects

## Definitions

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

## Object object

- Object.assign
- Object.create
- Object.fromEntries
- Object.groupBy

- Object.defineProperty
- Object.defineProperties
- Object.getOwnPropertyDescriptor
- Object.getOwnPropertyDescriptors
- Object.getOwnPropertyNames
- Object.getPrototypeOf

- Object.preventExtensions
- Object.isExtensible
- Object.seal
- Object.isSealed
- Object.freeze
- Object.isFrozen

## Prototypes

- Intro
- Prototype chain
- Object.setPrototypeOf(obj, proto)
- hasOwnProperty()
- Object.hasOwn(obj, prop)

## Iterable

- Intro
- [Symbol.iterator]
- next()
- for...of, spread operator, Array.from()

## Exercises

### Phần 1 — Trắc nghiệm / Lý thuyết

1. (Definitions) Có mấy cách tạo object trong Javascript? Kể tên từng cách.

2. (this — arrow function) Đoạn code sau in ra gì? Giải thích tại sao.

   ```js
   const obj = {
     name: "Test",
     regular: function () {
       console.log(this.name);
     },
     arrow: () => {
       console.log(this.name);
     },
   };
   obj.regular();
   obj.arrow();
   ```

3. (Get / Set) Getter và Setter dùng để làm gì? Kể tên ít nhất một tình huống nên dùng getter thay vì property thường.

4. (Object methods) Giải thích sự khác nhau giữa `Object.freeze(obj)` và `Object.seal(obj)`.

5. (Prototypes) `Object.getPrototypeOf(obj)` và `ConstructorFunction.prototype` có giống nhau không? Giải thích.

6. (Iterable) `for...of` và `for...in` khác nhau như thế nào? Cho ví dụ mỗi loại dùng với Array và Object.

### Phần 2 — Tìm lỗi & sửa

Mỗi đoạn code yêu cầu: (a) chỉ ra vị trí lỗi, (b) giải thích cơ chế gây lỗi, (c) sửa lại.

1. (this + arrow)

   ```js
   const obj = {
     name: "Học viên",
     greet: () => {
       console.log("Xin chào " + this.name);
     },
   };
   obj.greet(); // Xin chào undefined
   ```

2. (Get / Set)

   ```js
   const user = {
     firstName: "Nguyễn",
     lastName: "Văn A",
     get fullName() {
       return firstName + " " + lastName;
     },
   };
   console.log(user.fullName);
   ```

3. (Object.freeze)

   ```js
   const config = Object.freeze({ theme: "dark", version: 1 });
   config.theme = "light";
   config.newKey = "value";
   console.log(config); // { theme: "dark", version: 1 }
   ```

4. (Prototype assignment)

   ```js
   function Animal(name) {
     this.name = name;
   }
   Animal.prototype.sayHi = function () {
     console.log("Hi from " + this.name);
   };

   const cat = new Animal("Mèo");
   Animal.prototype = {
     sayHi: function () {
       console.log("New hi");
     },
   };
   const dog = new Animal("Chó");

   cat.sayHi(); // ?
   dog.sayHi(); // ?
   ```

5. (Iterable)

   ```js
   const obj = { a: 1, b: 2, c: 3 };
   for (const x of obj) {
     console.log(x);
   }
   ```

### Phần 3 — Viết code atomic

1. (arrow + this + setTimeout) Viết object `counter` có `count = 0`, method `up()` dùng `setTimeout` với arrow function để sau 1 giây tăng `count` lên 1 và in ra giá trị mới. Gọi `counter.up()`.

2. (bind / call / apply) Viết hàm `introduce(greeting, punctuation)` in ra `"${greeting}, tôi là ${this.name}${punctuation}"`. Dùng `call` để gọi với context `{ name: "An" }`, greeting `"Xin chào"`, punctuation `"!"`.

3. (Getter / Setter) Viết object `thermometer` có `_celsius = 0`, getter `fahrenheit` trả về `_celsius * 9/5 + 32`, setter `fahrenheit(value)` chuyển đổi ngược lại và gán `_celsius`. Test: gán `fahrenheit = 212` rồi in `_celsius`.

4. (Object.assign — merge config) Viết code: `defaultConfig = { theme: "light", lang: "vi", showSidebar: true }`, `userConfig = { theme: "dark", lang: "en" }`. Dùng `Object.assign` tạo `finalConfig` với ưu tiên userConfig. In ra kiểm tra.

5. (Object.create) Tạo `parent = { species: "mammal", sound: "..." }`. Dùng `Object.create(parent)` tạo `child = { name: "Mèo" }`. In `child.species` và `child.name`. Kiểm tra `child.hasOwnProperty("species")`.

6. (Object.freeze — immutable constant) Định nghĩa `COLORS = Object.freeze({ primary: "#3498db", danger: "#e74c3c", success: "#2ecc71" })`. Thử gán `COLORS.primary = "#000"` và in `COLORS.primary`. Giải thích kết quả.

7. (Prototype — thêm method dùng chung) Viết hàm tạo `Vehicle(type)` gán `this.type = type`. Thêm method `describe()` vào `Vehicle.prototype` in ra `"Đây là phương tiện: " + this.type`. Tạo `car = new Vehicle("Ô tô")` và `bike = new Vehicle("Xe máy")`. Gọi `describe()` cho cả 2. Sau đó thêm method `honk()` vào prototype in ra `"Bíp bíp!"` và gọi `car.honk()`.

8. (Custom iterable — range) Tạo object `range = { from: 1, to: 5 }` có `[Symbol.iterator]` trả về iterator đếm từ `from` đến `to`. Dùng `for...of` in ra các số.

9. (Array.from + iterable) Cho `const str = "Hello"`. Dùng `Array.from(str)` chuyển thành mảng ký tự. Dùng `for...of` in từng ký tự kèm chỉ số (dùng `entries()` của mảng).

### Phần 4 — Bài tổng hợp / Capstone

**Product Manager — Quản lý danh sách sản phẩm**

Bước 1: Tạo hàm tạo `Product(name, price, category)` gán các property tương ứng.

Bước 2: Thêm method `getInfo()` vào `Product.prototype` in ra `"${name} - ${category} - ${price}đ"`.

Bước 3: Định nghĩa getter `discountedPrice` cho prototype (dùng `Object.defineProperty` hoặc getter trong class-like pattern) trả về `price * 0.9`.

Bước 4: Tạo mảng `inventory` chứa 3 sản phẩm:

- Laptop (15000000, Electronics)
- Áo thun (200000, Fashion)
- Cà phê (50000, Food)

Bước 5: Dùng `Object.assign({}, product, { quantity: 10 })` để tạo bản sao mỗi sản phẩm có thêm `quantity`. Lưu vào mảng `inventoryWithQuantity`.

Bước 6: Dùng `Object.freeze` trên từng sản phẩm của `inventory` gốc. Thử gán `inventory[0].price = 0` và kiểm tra xem giá có đổi không.

Bước 7: Dùng `for...of` duyệt `inventory` gốc và in `getInfo()` của từng sản phẩm.

Bước 8 (Mở rộng): Viết hàm `filterByCategory(products, category)` dùng `Array.from` và `Array.prototype.filter` để trả về mảng các sản phẩm thuộc danh mục `category`. Kiểm tra với category `"Fashion"`.

### Đáp án

#### Phần 1 — Trắc nghiệm / Lý thuyết

1. 4 cách:
   - Object literal: `const obj = {}`
   - `new Object()`: `const obj = new Object()`
   - Constructor function: `function T() {}` + `new T()`
   - `Object.create(proto)`: tạo object với prototype chỉ định

2. `obj.regular()` in `"Test"` — `this` trỏ đến `obj` vì regular function lấy `this` từ caller.
   `obj.arrow()` in giá trị của `this.name` ở scope ngoài object (global `name` hoặc `undefined` ở module) — arrow function không có `this` riêng, nó kế thừa `this` từ lexical scope (nơi nó được định nghĩa).

3. Getter cho phép tính toán giá trị khi đọc, Setter cho phép validation/xử lý khi gán. Tình huống nên dùng: tính `fullName` từ `firstName` + `lastName`, hoặc kiểm tra giá trị hợp lệ trước khi gán (VD: nhiệt độ không dưới -273).

4. `Object.freeze(obj)`: không thêm, không sửa, không xóa property nào. `Object.seal(obj)`: không thêm, không xóa, nhưng vẫn sửa được giá trị property existing. `Object.isFrozen` vs `Object.isSealed`.

5. Không hoàn toàn giống:
   - `Object.getPrototypeOf(obj)` tham chiếu đến prototype thực tế của object (thường là `ConstructorFunction.prototype`).
   - `ConstructorFunction.prototype` là object prototype mà các instance mới (tạo bằng `new`) sẽ được gán làm prototype.
   - Nếu gán lại `ConstructorFunction.prototype = {...}` sau khi đã tạo instance, instance cũ vẫn dùng prototype cũ.

6. `for...of` duyệt **values** của iterable (Array, String, Map...). `for...in` duyệt **keys** (property names) của object — kể cả key kế thừa từ prototype. Với Array: `for...of` cho value, `for...in` cho index (string). Object thì không dùng `for...of` được (không iterable), `for...in` duyệt tên key.

#### Phần 2 — Tìm lỗi & sửa

1. (a) Lỗi ở dòng `greet: () => { console.log("Xin chào " + this.name); }`.
   (b) Arrow function không có `this` riêng. `this` trong arrow lấy từ lexical scope bên ngoài — ở đây là global/module, không phải `obj`. Nên `this.name` là `undefined`.
   (c) Sửa: dùng regular function.

   ```js
   greet: function () { console.log("Xin chào " + this.name); }
   // hoặc
   greet() { console.log("Xin chào " + this.name); }
   ```

2. (a) Lỗi ở dòng `return firstName + " " + lastName;` — thiếu `this.`.
   (b) `firstName` và `lastName` là property của object `user`, cần truy cập qua `this.firstName` và `this.lastName`. Viết không có `this` thì JS tìm biến cùng tên trong scope (không tìm thấy → ReferenceError hoặc undefined ở strict mode).
   (c) Sửa:

   ```js
   get fullName() { return this.firstName + " " + this.lastName; }
   ```

3. (a) Lỗi ở dòng `config.theme = "light"` và `config.newKey = "value"`.
   (b) `Object.freeze` làm object không thể thêm, sửa, xóa property. Ở strict mode sẽ throw TypeError; ở non-strict thì silently fail — giá trị vẫn giữ nguyên.
   (c) Muốn cho phép thay đổi, không dùng freeze, hoặc tạo object mới:

   ```js
   const config = { theme: "dark", version: 1 };
   // hoặc dùng spread
   const newConfig = { ...config, theme: "light" };
   ```

4. (a) `cat.sayHi()` in `"Hi from Mèo"`. `dog.sayHi()` in `"New hi"`.
   (b) `Animal.prototype` được gán lại bằng object mới **sau khi** `cat` đã tạo. `cat.__proto__` vẫn tham chiếu prototype cũ (có `sayHi` cũ). `dog` được tạo **sau khi** gán lại nên `dog.__proto__` tham chiếu prototype mới.
   (c) Gán lại `.prototype` không ảnh hưởng đến instance đã tồn tại — mỗi instance giữ tham chiếu đến prototype lúc nó được tạo.

5. (a) `TypeError: obj is not iterable`.
   (b) Object literal không implement iterable protocol (không có `Symbol.iterator`). `for...of` chỉ hoạt động với iterable.
   (c) Sửa: dùng `for...in` để duyệt key, hoặc dùng `Object.keys/values/entries`:
   ```js
   for (const key in obj) console.log(obj[key]);
   // hoặc
   for (const [k, v] of Object.entries(obj)) console.log(v);
   ```

#### Phần 3 — Viết code atomic

_Gợi ý lời giải — không phải đáp án duy nhất._

1. ```js
   const counter = {
     count: 0,
     up() {
       setTimeout(() => {
         this.count++;
         console.log(this.count);
       }, 1000);
     },
   };
   counter.up();
   ```

2. ```js
   function introduce(greeting, punctuation) {
     console.log(`${greeting}, tôi là ${this.name}${punctuation}`);
   }
   introduce.call({ name: "An" }, "Xin chào", "!");
   // Hoặc dùng apply: introduce.apply({ name: "An" }, ["Xin chào", "!"]);
   ```

3. ```js
   const thermometer = {
     _celsius: 0,
     get fahrenheit() {
       return (this._celsius * 9) / 5 + 32;
     },
     set fahrenheit(value) {
       this._celsius = ((value - 32) * 5) / 9;
     },
   };
   thermometer.fahrenheit = 212;
   console.log(thermometer._celsius); // 100
   ```

4. ```js
   const defaultConfig = { theme: "light", lang: "vi", showSidebar: true };
   const userConfig = { theme: "dark", lang: "en" };
   const finalConfig = Object.assign({}, defaultConfig, userConfig);
   console.log(finalConfig); // { theme: "dark", lang: "en", showSidebar: true }
   ```

5. ```js
   const parent = { species: "mammal", sound: "..." };
   const child = Object.create(parent);
   child.name = "Mèo";
   console.log(child.species); // "mammal" (kế thừa)
   console.log(child.name); // "Mèo" (riêng)
   console.log(child.hasOwnProperty("species")); // false
   ```

6. ```js
   const COLORS = Object.freeze({
     primary: "#3498db",
     danger: "#e74c3c",
     success: "#2ecc71",
   });
   COLORS.primary = "#000";
   console.log(COLORS.primary); // "#3498db" — không đổi, silently fail
   ```

7. ```js
   function Vehicle(type) {
     this.type = type;
   }
   Vehicle.prototype.describe = function () {
     console.log("Đây là phương tiện: " + this.type);
   };
   const car = new Vehicle("Ô tô");
   const bike = new Vehicle("Xe máy");
   car.describe();
   bike.describe();
   Vehicle.prototype.honk = function () {
     console.log("Bíp bíp!");
   };
   car.honk();
   ```

8. ```js
   const range = {
     from: 1,
     to: 5,
     [Symbol.iterator]() {
       let current = this.from;
       const end = this.to;
       return {
         next() {
           if (current <= end) return { value: current++, done: false };
           return { done: true };
         },
       };
     },
   };
   for (const n of range) console.log(n); // 1 2 3 4 5
   ```

9. ```js
   const str = "Hello";
   const arr = Array.from(str);
   console.log(arr); // ["H", "e", "l", "l", "o"]
   for (const [i, ch] of arr.entries()) {
     console.log(i, ch);
   }
   ```

#### Phần 4 — Bài tổng hợp / Capstone

_Gợi ý lời giải — không phải đáp án duy nhất._

```js
// Bước 1: Constructor
function Product(name, price, category) {
  this.name = name;
  this.price = price;
  this.category = category;
}

// Bước 2: Method getInfo
Product.prototype.getInfo = function () {
  console.log(`${this.name} - ${this.category} - ${this.price}đ`);
};

// Bước 3: Getter discountedPrice
Object.defineProperty(Product.prototype, "discountedPrice", {
  get() {
    return this.price * 0.9;
  },
  enumerable: false,
});

// Bước 4: Tạo inventory
const inventory = [
  new Product("Laptop", 15000000, "Electronics"),
  new Product("Áo thun", 200000, "Fashion"),
  new Product("Cà phê", 50000, "Food"),
];

// Bước 5: Clone + thêm quantity
const inventoryWithQuantity = inventory.map((p) =>
  Object.assign({}, p, { quantity: 10 }),
);

// Bước 6: Freeze từng sản phẩm gốc
inventory.forEach((p) => Object.freeze(p));
inventory[0].price = 0;
console.log(inventory[0].price); // 15000000 (không đổi)

// Bước 7: Duyệt for...of
for (const p of inventory) {
  p.getInfo();
}

// Bước 8: Lọc theo danh mục
function filterByCategory(products, category) {
  return Array.from(products).filter((p) => p.category === category);
}
const fashionItems = filterByCategory(inventoryWithQuantity, "Fashion");
console.log(fashionItems);
```
