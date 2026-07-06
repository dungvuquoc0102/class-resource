# Day 19: Basic Objects

## 1. Introduction

## 2. Properties and methods

- Access
- Add
- Change
- Delete
- Check if a property exists
- Nested objects

## 3. Display

- [object Object]
- JSON.stringify()
- Display key and value

## 4. Basic this

- In object method
- In function
- In global

## 5. Constructors

- Properties
- Methods

## 6. Exercises

- Exercise 1: Cho object `const user = { name: "Minh", age: 22, email: "minh@example.com" }`.
  - (Access) In ra tên và email của user.
  - (Add) Thêm thuộc tính `phone` với giá trị `"0901234567"`. In object ra kiểm tra.
  - (Change) Sửa `age` thành `23`. In ra để kiểm tra.
  - (Delete) Xóa thuộc tính `email` bằng từ khóa `delete`. In object ra kiểm tra.

- Exercise 2 (Check): Cho `const car = { brand: "Toyota", year: 2020 }`. Kiểm tra `"color" in car` và `"brand" in car`. In kết quả ra console.

- Exercise 3 (Nested objects): Cho object:

  ```js
  const school = {
    name: "Nguyễn Huệ",
    address: { street: "123 Lê Lợi", city: "Hồ Chí Minh" },
  };
  ```

  In ra tên trường và tên thành phố.

- Exercise 4 : Cho đoạn code sau:

  ```js
  const product = { id: 1, name: "Laptop" };
  console.log("Sản phẩm: " + product);
  console.log("Sản phẩm:", product);
  ```

  - ([object Object]) Giải thích tại sao dòng đầu ra `[object Object]`

  - (JSON.stringify): In `JSON.stringify(product)` ra console. Thử thêm `JSON.stringify(product, null, 2)`, xem kết quả in ra và giải thích.

- Exercise 5 (Display key và value): Cho `const person = { name: "Hoa", age: 25, city: "Đà Nẵng" }`. Dùng `for...in` in ra từng cặp `"key: value"`.

- Exercise 6 (this trong object method): Tạo object `dog` với `name: "Milo"` và method `bark()` in ra `"Woof! I'm " + this.name`. Gọi `dog.bark()`.

- Exercise 7 (this trong function): Chạy đoạn code dưới đây, `this` trong hàm thường ở non-strict mode là gì?

  ```js
  function showThis() {
    console.log(this);
  }
  showThis();
  ```

- Exercise 8 (this trong global): Ở global scope, non-strict mode, in `console.log(this)`. Nhận được gì? So sánh khi chạy browser vs Node.js.

- Exercise 9 (Constructor properties): Viết hàm tạo `Person(name, age)` gán `name`, `age` vào `this`. Tạo `p1 = new Person("An", 20)` và `p2 = new Person("Bình", 22)`. In ra tên và tuổi của cả 2.

- Exercise 10 (Constructor methods): Viết hàm tạo `Animal(name, sound)` gán `this.name`, `this.sound` và method `makeSound()` in ra `"${this.name} says ${this.sound}"`. Tạo `cat = new Animal("Mèo", "Meo")` và `dog = new Animal("Chó", "Gâu")`. Gọi `makeSound()` cho cả 2.

- Exercise 11 (Bài tổng hợp — Quản lý học viên): Viết hàm tạo `Student(name, age)` với `this.scores = []`, method `addScore(score)`, `getAverage()`, `getInfo()` in ra `"Học viên ${name} - ${age} tuổi - Điểm TB: ${average}"`. Tạo mảng `classroom` chứa 3 học viên: "An" (18), "Bình" (19), "Chi" (20). Thêm điểm cho mỗi người (ít nhất 3 điểm). Dùng vòng lặp in thông tin toàn lớp.
