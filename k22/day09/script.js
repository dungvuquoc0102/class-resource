// let number = "number";
// let number2 = Symbol("id");

// console.log(number === number2);

// number = 10;
// number = 20;
// console.log(number);

// const pi = 3.14;
// console.log(pi);

// var pi = 3.14;

// var pi = 3.15;

// console.log(pi);

// number: 1, -1, 3.14,...
// string: "Hello", 'Hello', `Hello`,...
// boolean: true, false
// undefined: undefined
// null: null
// bigint: 1n, -1n, 10123123123123n
// symbol: Symbol('id'), Symbol('id')

// object: {name: "iPhone 18 Pro Max", price: 1299, color: "Red"}

// let a = 1;

// a = 2;

// let product = {
//   name: { name: "iPhone 18 Pro Max" },
//   price: 1299,
//   color: "Red",
// };
// let product2 = {
//   name: { name: "iPhone 18 Pro Max" },
//   price: 1299,
//   color: "Red",
// };
// console.log(product.name === product2.name);

// product = { name: "iPhone 17 Pro Max", price: 1199, color: "Orange" };

// console.log(product);

// console.log(typeof 1);
// console.log(typeof "Hello");
// console.log(typeof true);
// console.log(typeof undefined);
// console.log(typeof null);
// console.log(typeof 1n);
// console.log(typeof Symbol("id"));
// console.log(typeof {});

// let a = 1;
// const b = 1;

// console.log(a !== b);

// console.log(a + b);
// console.log(a - b);
// console.log(a * b);
// console.log(a / b);
// console.log(a % b);
// console.log(a ** b);
// console.log((a += 1) - 1); // a = 2

// console.log(a--); // a = 1
// console.log(++a);
// console.log((a = a - 1));
// console.log(a);

// a += 10; // a = a + 10
// a -= 10; // a = a - 10
// console.log(a);

// let value1 = undefined;
// let value2 = null;
// let value3 = "10";

// console.log(value1 && value2 && value3);
// console.log(value1 || value2 || value3);

// Falsy vs Truthy
// false
// 0, -0, 0n
// "", '', ``
// null
// undefined
// NaN
// document.all

// const value1 = null;
// const value2 = 2;

// console.log(value1 ?? value2);

// console.log(5 + Number("3"));

const point = 9;
// if (point >= 8) {
//   console.log("Điểm loại giỏi");
// } else {
//   console.log("Điểm chưa đạt loại giỏi");
// }
switch (true) {
  case point >= 8:
    console.log("Điểm loại giỏi");
    break;
  default:
    console.log("Điểm chưa đạt loại giỏi");
}

// if (point >= 8) {
//   console.log("Điểm loại giỏi");
// }

// if (point >= 8) {
//   console.log("Điểm loại giỏi");
// } else if (point >= 5) {
//   console.log("Điểm loại khá");
// } else {
//   console.log("Điểm loại trung bình");
// }

// let email = "";
// console.log(email ? "Email hợp lệ" : "Email không hợp lệ");

// const month = 2;
// switch (month) {
//   case 1:
//   case 2:
//   case 3:
//     console.log("Quý 1");
//     break;
//   case 4:
//   case 5:
//   case 6:
//     console.log("Quý 2");
//     break;
//   case 7:
//   case 8:
//   case 9:
//     console.log("Quý 3");
//     break;
//   case 10:
//   case 11:
//   case 12:
//     console.log("Quý 4");
//     break;
//   default:
//     console.log("Tháng không hợp lệ");
// }
