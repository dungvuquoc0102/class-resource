// const number = 10;
// const number1 = -10;
// const number2 = 10.33;
// const number3 = -10.33;
// const number4 = 123e2; // 123 * (10 ** 2)

// const number5 = 123456789123456; // 15 chữ số
// const number6 = 9907199254740994234; // 16 chữ số
// console.log(number6);

// const number7 = 0.1;
// const number8 = 0.2;
// console.log(number7 + number8); // 0.30000000000000004

// 64 bit để biểu diễn số (kiểu number)
// 1 bit: dấu
// 11 bit: mũ
// 52 bit: phần thập phân

// 12345 -> 1.2345 * (10 ** 4) -> (+ / -) a x 10 ^ b
// 1 x 10 ^ 10 -> 10000000000

// 2 ^ 53 - 1 = 9007199254740991 -> có 16 chữ số

// Có n bit để biểu diễn số, thì số lớn nhất có thể biểu diễn là 2 ^ n - 1

// 0.1 -> nhị phân: 0.00011001100110011001100110011001100110011001100110011...
// 0.2 -> nhị phân: 0.0011001100110011001100110011001100110011001100110011...
// 0.1 + 0.2 -> nhị phân: 0.0100110011001100110011001100110011001100110011001100110011...
// -> 0.30000000000000004

// let x = "100";
// let y = NaN;

// console.log(x / y); // 10
// console.log(x * y); // 1000
// console.log(x - y); // 90

// console.log(x + y); // 100NaN

// console.log(Number.isNaN(10));
// console.log(Number.isNaN("10"));
// console.log(Number.isNaN("abc"));
// console.log(Number.isNaN(NaN));

// console.log(0x10);

// const number = 80.123456789;
// const number = Number("8123");
// console.log(number);

// console.log(number.valueOf()); // 8123
// console.log(number.toExponential(5));

// toFixed(n): làm tròn số thập phân đến n chữ số sau dấu chấm thập phân, trả về chuỗi
// const prices = [1000.157, 59.9797, 1.1];
// // Kỳ vọng kết quả: [1000.16, 59.98, 1.10]
// console.log(
//   prices.map((price) => {
//     return Number(price.toFixed(2));
//   }),
// );

// toPrecision(n): làm tròn số đến n chữ số có nghĩa, trả về chuỗi
// const number = 123.456789;
// const number1 = 1234.56789;
// console.log(number.toPrecision(5));
// console.log(number1.toPrecision(5));

// console.log(parseInt("10")); // 10
// console.log(parseInt(10.5)); // 10
// console.log(parseInt("10 years")); // 10

// console.log(parseFloat("10.33"));
// console.log(parseFloat("10.33 hello"));
// console.log(parseFloat("hello"));

// console.log(Number.isInteger(10));
// console.log(Number.isNaN(NaN));
// console.log(Number.isFinite(Infinity));
// console.log(Number.isSafeInteger(9007199254740992));

// -5, -4, -3, -2, -1, 0, 1, 1.00000... 2, 3, 4, 5

// console.log(Number.MAX_SAFE_INTEGER);
// console.log(Number.POSITIVE_INFINITY);
// console.log(Number.NEGATIVE_INFINITY);

// function sum(num1 = 1, num2 = 2) {
//   return num1 + num2;
// }

// const result1 = sum;
// const result2 = sum(5, 10);

// console.log(result1);
// console.log(result2);

// function checkAge(age) {
//   if (age < 18) {
//     console.log("Too young");
//     return;
//   }
//   console.log("Access granted");
// }
// const age = 17;
// checkAge(age);

// Declaration function
// function name() {}
// function name() {}

// Expression function
// const name = function () {};

// Arrow function
// const name = () => {};

// Anonymous function
// function () {}
// () => {}

// IIFE (Immediately Invoked Function Expression)
//   (function () {
//     console.log("Hello");
//   },
// )();

const prices = [100, 200, 300];
const total = prices.reduce((acc, cur) => {
  // Logic
  return prev + curr;
}, 0);

console.log(total);

// const order = [
//   {
//     name: "Iphone 17 Pro Max",
//     price: 1000,
//   },
//   {
//     name: "Macbook Pro M5 Pro 48GB 1TB",
//     price: 3000,
//   },
//   {
//     name: "Airpods Pro 3",
//     price: 800,
//   },
// ];

// const total = order.reduce((prev, curr) => {
//   return prev + curr.price;
// }, 0);

// console.log(total);

// Lần 1:
// Có đối số thứ 2: 0
// (0, 100) => {
//   return 0 + 100;
// }
// // Kết quả: 100

// // Lần 2:
// // Lấy kết quả lần 1 làm prev: 100
// (100, 200) => {
//   return 100 + 200;
// }
// // Kết quả: 300

// // Lần 3:
// // Lấy kết quả lần 2 làm prev: 300
// (300, 300) => {
//   return 300 + 300;
// }
// // Kết quả: 600

// console.log(total);
