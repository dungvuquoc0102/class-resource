// "use strict";
// const person = {
//   name: "Alice",
//   age: 30,
// };

// const message = {
//   value: "Hello",
//   createdAt: "2026-09-12 07:15:00",
//   updatedAt: "2026-09-12 07:15:00",
//   to: "Alice",
//   from: "Bob",
// };

// const updatedMessage = {
//   value: "Hello",
//   createdAt: "2026-09-12 07:15:00",
//   updatedAt: "2026-09-12 07:20:00",
//   to: "Alice",
//   from: "Bob",
// };

// function calculate(...args) {
//   console.log(args);
//   // return args.reduce((sum, current) => sum + current, 0);
//   console.log("Hello");

//   // return (a + b + c) * 2;
// }

// console.log(calculate(1, 2, 3, 4, 5, 6));
// console.log(calculate(2, 4));
// console.log(calculate);

// console.log(sum(1, 2));
// // Declaration function
// function sum(a, b) {
//   return a + b;
// }

// console.log(sum2(1, 2));
// Expression function
// const sum2 = function (a, b) {
//   return a + b;
// };

// // Arrow function
// const sum3 = (a, b) => {
//   return a + b;
// };
// // const sum3 = (a, b) =>  a + b;
// // const sum3 = a =>  a + b;
// console.log(sum3(1, 2));

// // Anonymous function

// () => {
//   console.log("Hello");
// };

// // IIFE
// ((a, b) => {
//   console.log(a + b);
// })(1, 2);

// // Callback
// // 1. Là function
// // 2. Truyền vào hàm như một đối số

// const sum4 = (a, b) => {
//   return a + b;
// };

// const calculate = (callback) => {
//   return callback(1, 2);
// };

// console.log(calculate(sum4));

// // Viết hàm tính tiền điện: calcElecBill(consumption)
// // Đầu vào là số điện tiêu thụ (kWh)
// // Đầu ra là số tiền phải trả (VNĐ)
// // 1. 0 - 50 kWh: 1.500 VNĐ/kWh
// // 2. 51 - 100 kWh: 1.750 VNĐ/kWh
// // 3. 101 - 200 kWh: 2.000 VNĐ/kWh
// // 4. 201 - 300 kWh: 2.500 VNĐ/kWh
// // 5. 301 - 400 kWh: 2.750 VNĐ/kWh
// // 6. Trên 400 kWh: 3.000 VNĐ/kWh

// const calcElecBill = (consumption) => {
//   switch (true) {
//     case consumption <= 50:
//       return consumption * 1500;
//     case consumption <= 100:
//       return 50 * 1500 + (consumption - 50) * 1750;
//     case consumption <= 200:
//       return 50 * 1500 + 50 * 1750 + (consumption - 100) * 2000;
//     case consumption <= 300:
//       return 50 * 1500 + 50 * 1750 + 100 * 2000 + (consumption - 200) * 2500;
//     case consumption <= 400:
//       return (
//         50 * 1500 +
//         50 * 1750 +
//         100 * 2000 +
//         100 * 2500 +
//         (consumption - 300) * 2750
//       );
//     default:
//       return (
//         50 * 1500 +
//         50 * 1750 +
//         100 * 2000 +
//         100 * 2500 +
//         100 * 2750 +
//         (consumption - 400) * 3000
//       );
//   }
// };

// console.log(`${calcElecBill(352).toLocaleString("vi-VN")} VND`);
// console.log(`${calcElecBill(865).toLocaleString("vi-VN")} VND`);

// function calcElectricityBill(kWh) {
//   let soTien = 0;
//   if (kWh <= 50) {
//     soTien = kWh * 1.5;
//   } else if (kWh <= 100) {
//     soTien = 50 * 1.5 + (kWh - 50) * 1.75;
//   } else if (kWh <= 200) {
//     soTien = 50 * 1.5 + 50 * 1.75 + (kWh - 100) * 2;
//   } else if (kWh <= 300) {
//     soTien = 50 * 1.5 + 50 * 1.75 + 100 * 2 + (kWh - 200) * 2.5;
//   } else if (kWh <= 400) {
//     soTien = 50 * 1.5 + 50 * 1.75 + 100 * 2 + 100 * 2.5 + (kWh - 300) * 2.75;
//   } else {
//     soTien =
//       50 * 1.5 + 50 * 1.75 + 100 * 2 + 100 * 2.5 + 100 * 2.75 + (kWh - 400) * 3;
//   }
//   return soTien;
// }

// console.log(calcElectricityBill(352));
// console.log(calcElectricityBill(865));

// function price(a) {
//   let res = 0;
//   if (a < 0 || isNaN(a)) {
//     return "Du lieu ko hop le";
//   } else if (a <= 50) {
//     res += a * 1.5;
//   } else if (a <= 100) {
//     res += (a - 50) * 1.75 + 1.5 * 50;
//   } else if (a <= 200) {
//     res += (a - 100) * 2 + 50 * 1.75 + 1.5 * 50;
//   } else if (a <= 300) {
//     res += (a - 200) * 2.5 + 100 * 2 + 50 * 1.75 + 1.5 * 50;
//   } else if (a <= 400) {
//     res += (a - 300) * 2.75 + 100 * 2.5 + 100 * 2 + 50 * 1.75 + 1.5 * 50;
//   } else {
//     res +=
//       (a - 400) * 3 + 100 * 2.75 + 100 * 2.5 + 100 * 2 + 50 * 1.75 + 1.5 * 50;
//   }
//   return res * 1000;
// }

// // const a = prompt("So dien thang nay la: ");
// console.log("So tien phai tra: ", price(352));
// console.log("So tien phai tra: ", price(865));

// function caculateElectricBill(consumption) {
//   const consump = Number(consumption);
//   if (typeof consump !== "number") {
//     return "lỗi số tiền điện";
//   }
//   if (consump <= 50) {
//     return consump * 1.5;
//   }
//   if (consump <= 100) {
//     return 51 * 1.5 + (consump - 51) * 1.75;
//   }
//   if (consump <= 200) {
//     return 51 * 1.5 + 51 * 1.75 + (consump - 101) * 2;
//   }
//   if (consump <= 300) {
//     return 51 * 1.5 + 51 * 1.75 + 100 * 2 + (consump - 201) * 2.5;
//   }
//   if (consump <= 400) {
//     return 51 * 1.5 + 51 * 1.75 + 100 * 2 + 100 * 2.5 + (consump - 301) * 2.75;
//   } else {
//     return (
//       51 * 1.5 +
//       51 * 1.75 +
//       100 * 2 +
//       100 * 2.5 +
//       100 * 2.75 +
//       (consump - 401) * 3
//     );
//   }
// }

// const person = {
//   name: "Alice",
//   age: 30,
//   showInfo() {
//     console.log(`Name: ${this.name}, Age: ${this.age}`);
//   },
//   address: {
//     street: "123 Main St",
//     city: "Hanoi",
//     country: "Vietnam",
//   },
// };

// // Thuộc tính: key: value
// // Phương thức: key: function

// console.log(person.name);
// console.log(person.age);
// console.log(person.showInfo);

// // person.address = "123 Main St";
// // console.log(person);

// person.name = "Bob";
// console.log(person);

// delete person.age;
// console.log(person);

// console.log("age" in person);
// console.log("name" in person);
// console.log("showInfo" in person);

// console.log(person.address.street);

// console.log("Object person là: " + JSON.stringify(person));
// console.log(Object.keys(person));
// console.log(Object.values(person));

// const person2 = {
//   name: "Alice",
//   age: 30,
// };

// const person3 = new Object({
//   name: "Alice",
//   age: 30,
// });

// const Person = function (name, age, showInfo) {
//   this.name = name;
//   this.age = age;
//   this.showInfo = showInfo;
// };

// const person4 = new Person("Alice", 30, function () {
//   console.log(`Name: ${this.name}, Age: ${this.age}`);
// });
// console.log(person4);

// const person5 = new Person("Bob", 25, function () {
//   console.log(`Name: ${this.name}, Age: ${this.age}`);
// });
// console.log(person5);

// const source = {
//   name: "Alice",
//   age: 30,
// };

// const source2 = {
//   address: "123 Main St",
//   city: "Hanoi",
//   age: 25,
// };

// const target = Object.assign({ email: "alice@example.com" }, source, source2);
// console.log(target);

// const object1 = {
//   a: 1,
//   b: 2,
// };

// const object2 = Object.create(object1);
// console.log(object2.a);
// console.log(object2.b);

// // Entries: [["a", 1], ["b", 2]]

// const arr = [
//   ["a", 1],
//   ["b", 2],
// ];
// const obj = Object.fromEntries(arr);
// console.log(obj);

// // JS ES6: arrow function, spead
// // iOS 27

// const person6 = {
//   name: "Alice",
//   age: 30,
// };

// const person6Copy = person6;
// person6Copy.address = "123 Main St";
// console.log(person6Copy);
// console.log(person6);

// const person7 = {
//   ...person6,
//   address: "123 Main St",
// };

// const person8 = {
//   name2: "Alice",
//   age: 30,
//   showInfo: () => {
//     console.log(this);
//     console.log(`Name: ${this.name2}, Age: ${this.age}`);
//   },
// };
// console.log(this);

// // console.log(person8.name);
// // console.log(person8.age);
// // person8.showInfo();

// const func = person8.showInfo;
// func();

// const person9 = { ...person8 };
// console.log(person9.name);
// console.log(person9.age);
// person8.name = "Bob";
// // person9.name = "Charlie";
// person9.showInfo();

// this:
// 1. Nằm trong 1 object method thường thì
// - Gọi method như một function thường: this là window
// - Gọi method thông qua object: this là object đó
// 2. Nằm trong 1 arrow function thì this sẽ mượn this từ bên ngoài nó
// 3. Nằm trong 1 function thường thì this là window/undefined (strict mode)
// 4. Nằm ở global thì this là window

function sum(a, b) {
  console.log("Sum: ", a + b);
  console.log(this);
}
// console.log(this);

// const sum2 = sum.bind({ name: "Alice" });
// sum2();

sum.call({ name: "Alice" }, 1, 2);
sum.apply({ name: "Alice" }, [1, 2]);

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.showInfo = function () {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  };
}

const person10 = new Person("Alice", 30);

const person11 = {
  _name: "Bob",
  _age: 25,
  get name() {
    return this._name.toUpperCase();
  },
  set name(value) {
    if (value === "tenNhayCam") return;
    this._name = value;
  },
  setName: function (value) {
    this.name = value;
  },
};

console.log((person11.name = "tenNhayCam"));
console.log(person11.name);
