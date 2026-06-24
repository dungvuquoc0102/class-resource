// Object

// Object 1: Object literal
// const user = {
//   fullname: "Vu Quoc Dung",
//   age: 27,
//   address: "Ha Noi",
// };

// // Object 2: Array
// const fruits = ["banana", "apple", "orange"];

// // Array

// const numbers = [1, 2, 3, 4, 5];
// const names = new Array("Alice", "Bob", "Charlie");
// const emptyArr = new Array(5);

// console.log(numbers.length);
// console.log(names[names.length - 1]);
// console.log(emptyArr); // [ , , , , ]

// Thêm và xóa phần tử trong mảng

// const numbers = [1, 2, 3, 4, 5];

// // numbers.push(6);
// // numbers.pop();

// // numbers.unshift(0);
// // numbers.shift();
// delete numbers[1];

// console.log(numbers);

// console.log(numbers[1]);

// Duyệt mảng

const numbers = [1, 3, 5, 7, 9];

// for (let i = 0; i < numbers.length; i++) {
//   console.log(numbers[i]);
// }

// for (const number of numbers) {
//   console.log(number);
// }

// function sum(num1, num2) {}

// const sum = (num1, num2) => {};

// numbers.forEach((_, index) => {
//   // console.log("Giá trị", number);
//   console.log("Số thứ tự", index);
// });

// Tìm kiếm phần tử trong mảng

let items = ["bút", "sách", "vở", "thước", "bút"];

// let users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Charlie" },
// ];

// console.log(items.indexOf("bút"));
// console.log(items.lastIndexOf("bút"));
// console.log(items.indexOf("tẩy"));

// console.log(items.includes("bút"));
// console.log(users.includes({ id: 1, name: "Alice" }));

// console.log(
//   items.findIndex((item) => {
//     if (item === "vở") {
//       return true;
//     }
//     return false;
//   }),
// );

// console.log(
//   items.some((item) => {
//     if (item === "vở") {
//       return true;
//     }
//     return false;
//   }),
// );
// console.log(
//   items.every((item) => {
//     if (item.length >= 2) {
//       return true;
//     }
//     return false;
//   }),
// );

// Lọc và biến đổi các phần tử trong mảng

// let scores = [45, 78, 90, 33, 62, 88];

// Lọc các điểm số lớn hơn 50

// console.log(
//   scores.filter((score, index) => {
//     if (score > 50) {
//       return true;
//     }
//     return score > 50;
//   }),
// );

// Cộng thêm 5 mỗi điểm

// console.log(
//   scores.map((score) => {
//     return score + 5;
//   }),
// );

// const students = [
//   {
//     avatar:
//       "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     score: 45,
//   },
//   {
//     avatar:
//       "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     score: 78,
//   },
//   {
//     avatar:
//       "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     score: 90,
//   },
// ];

// const studentCards = students
//   .map((student) => {
//     return `
//     <div>
//       <img style="width: 100px; height: 100px;" src="${student.avatar}" alt="Avatar" />
//       <p>Điểm: ${student.score}</p>
//     </div>
//   `;
//   })
//   .join("");

// document.querySelector("#student-list").innerHTML = studentCards;

// let names = ["Nam", "Anh", "Lan", "Bình"];

// console.log(names.sort());

// const nums = [5, 20, 1, 100, 3];ß
// const nums2 = nums.map((num) => {
//   return num;
// });

// // Sắp xếp mảng số theo thứ tự tăng dần
// console.log(
//   nums2.sort((a, b) => {
//     return a - b;
//   }),
// );

// // Sắp xếp mảng số theo thứ tự giảm dần
// console.log(
//   nums2.sort((a, b) => {
//     return b - a;
//   }),
// );

// console.log(nums.reverse());
// console.log(nums);

// Tách, nối và sao chép các phần tử trong mảng

const fruits = ["banana", "apple", "orange", "mango", "kiwi"];

// console.log(fruits.slice(1, 4));
// console.log(fruits.slice(1));
// console.log(fruits.slice(-3, -1));
// console.log(fruits.slice().sort());
// console.log(fruits);

// fruits.splice(2, 1, "grape", "pear");
// fruits.splice(2, 0, "grape");
// fruits.splice(3, 1);

// const fruits2 = ["grape", "pear"];
// const newFruits = fruits.concat(fruits2);
// console.log(newFruits);

// Nối mảng thành chuỗi và ngược lại

console.log("Danh sách các loại trái cây:");
console.log(fruits.join(", "));

const fruitsString = "banana, apple, orange, mango, kiwi";
const fruitsArray = fruitsString.split(", ");
console.log(fruitsArray);
