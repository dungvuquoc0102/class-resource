// var user = "Vu Quoc Dung";
// console.log(user);

// const username = "Vu Quoc Dung";
// // username = "Nguyen Van B";
// console.log(username);

// let age = 27;
// age = age + 1;
// console.log(age);

// let money = 1000;
// money += 1000;
// money /= 2;
// console.log(money);

// // Global scope
// let salaryTotal = 0;

// function calcSalary() {
//   // Function scope
//   let baseSalary = 1000;
// }

// if (true) {
//   // Block scope
//   let netSalary = 900;
// }

// {
//   // Block scope
//   var greeting = "Hello";
// }

// console.log(greeting);

// console.log(myClass);

// var myClass = "K20";
// let myClass2 = "K20";
// const myFirstClass3 = "K20";

// Kiểu number
const myNumber = 10;
const myFloat = 3.14;
const myNegativeNumber = -5;
const myInfinity = -1 / 0;
const myNaN = NaN;

console.log(myInfinity);

// Kiểu string
const myString1 = "var1";
const myString2 = "var2";
const myString3 = `
var3 ${myString1}
${myString2}
`;
console.log(myString3);

// Kiểu boolean
const isTrue = true;
const isFalse = false;

console.log(isTrue);
console.log(isFalse);

// Kiểu undefined và null
let myVar;
let myNullVar = null;
console.log(myVar);

// Kiểu object

// Kiểu object literal
const user = {
  name: "Vu Quoc Dung",
  age: 27,
  isStudent: false,
  address: {
    city: "Hanoi",
    country: "Vietnam",
  },
  coding: function () {
    console.log("Coding...");
  },
};

const user2 = {
  name: "Vu Quoc Dung",
  age: 27,
  isStudent: false,
  address: {
    city: "Hanoi",
    country: "Vietnam",
  },
};

// Property
console.log(user.name);

// Method
console.log(user.coding);

// Function
function coding() {
  console.log("Coding...");
}

// Kiểu array
const names = ["Hải", "Hùng", "Dũng", "Thiên", "Minh"];
console.log(names.length);

// Kiểu function
function sum(num1, num2) {
  let total = num1 + num2;
  console.log(total);
  total = total * 2;
  console.log(total);
  total = total * 3;
  console.log(total);
}

// 3, 5
// 4, 6
// 2, 7

sum(3, 5);
// function sum(3, 5) {
//   let total = 3 + 5;
//   console.log(total); // 8
//   total = total * 2; // 16
//   console.log(total); // 16
// }

sum(4, 6);
// function sum(4, 6) {
//   let total = 4 + 6;
//   console.log(total); // 10
//   total = total * 2; // 20
//   console.log(total); // 20
// }
