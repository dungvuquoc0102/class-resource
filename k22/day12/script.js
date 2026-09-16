// Khai báo mảng
const numbers = [1, 2, "hello", 4, 5];
const numbers2 = new Array(5); // new String "", new Number 12, new Object {}
// console.log(numbers, numbers2);

const names = ["Hồ", "Hiếu", "Trọng", "Hoàng"];

// Truy cập
// console.log(numbers.length);
// console.log(numbers[2]);
// console.log(numbers[numbers.length - 1]);

// Thêm bớt phần tử

// - Thêm vào cuối mảng
// names.push("Huy");

// - Bớt ở cuối mảng
// names.pop();

// - Thêm vào đầu mảng
// names.unshift("Huy");

// - Bớt ở đầu mảng
// names.shift();

// - Thêm/bớt ở giữa mảng
// names.splice(1, 0, "Phương", "Quân");
// console.log(names);

// Duyệt mảng
const points = [7, 8, 9, 10];
let count = 0;
// for (let i = 0; i < points.length; i++) {
//   if (points[i] >= 9) {
//     count++;
//   }
// }

// for (let point of points) {
//   if (point >= 9) {
//     count++;
//   }
// }

// points.forEach((point) => {
//   if (point >= 9) {
//     count++;
//   }
// });
// console.log(count);

// Tìm kiếm

const errorPoints = [7, 8, null, undefined, 9, 10, null, undefined, 11];

// - Tìm index đầu tiên
const index = errorPoints.indexOf(null);
errorPoints.splice(index, 2);

// - Tìm index cuối cùng
const lastIndex = errorPoints.lastIndexOf(null);
errorPoints.splice(lastIndex, 2);
// console.log(errorPoints);

// - Tìm kiếm tồn tại
const emails = ["john@example.com", "jane@example.com", "bob@example.com"];
const isExist = emails.includes("john@example.com");
// console.log(isExist);

// - Tìm kiếm theo điều kiện
//   - Thỏa mãn ít nhất 1 điều kiện đúng
const pointOfUser1 = [7, 8, 9, 6];
const isExcellentUser = pointOfUser1.some((point) => {
  return point === 10;
});
// console.log(isExcellentUser);

//  - Thỏa mãn tất cả điều kiện đúng
const isGoodUser = pointOfUser1.every((point) => {
  return point >= 7;
});
// console.log(isGoodUser);

// - Tìm đúng phần tử thỏa mãn điều kiện
const usernames = ["john", "jane", "", "alice", ""];
const emptyUsername = usernames.find((username) => {
  return username === "";
});
// console.log(emptyUsername);

// - Tìm đúng index của phần tử thỏa mãn điều kiện
const emptyUsernameIndex = usernames.findIndex((username) => {
  return username === "";
});
// console.log(emptyUsernameIndex);

// Lọc
const products = [
  "iPhone 17",
  "iPhone 18",
  "Samsung Galaxy S23",
  "iPhone 19",
  "Samsung Galaxy S24",
];
const keyword = "iPhone";
const searchProducts = products.filter((product) => {
  return product.includes(keyword);
});
// console.log(searchProducts);

// Map
const scores = [3, 5, 7, 9];
const newScores = scores.map((score) => {
  return score * 2;
});
// console.log(newScores);

// Sắp xếp
// const products2 = [
//   { name: "iPhone 17", price: 2000 },
//   { name: "iPhone 18", price: 3000 },
//   { name: "Samsung Galaxy S23", price: 2500 },
// ];

// function sortProductBy(products, key, order = "asc") {
//   if (key === "name") {
//     if (order === "asc") {
//       products.sort((a, b) => {
//         if (a.name < b.name) return -1;
//         if (a.name > b.name) return 1;
//         return 0;
//       });
//     } else {
//       products.sort((a, b) => {
//         if (a.name < b.name) return 1;
//         if (a.name > b.name) return -1;
//         return 0;
//       });
//     }
//   }
//   if (key === "price") {
//   }
// }
const names2 = ["Hồ", "Hiếu", "Trọng", "Hoàng"];
const numbers3 = [1, 10, 2, 20];
// console.log(names2.sort()); // Sắp xếp theo bảng chữ cái
// console.log(numbers3.sort((a, b) => a - b));
// console.log(numbers3.sort((a, b) => b - a));

// Tách, nối, sao chép
// - Tách, sao chép
const numbers4 = [1, 2, 3, 4, 5];
// console.log(numbers4.slice(-3, -1));

// - Nối
const numbers5 = [6, 7, 8, 9, 10];
// console.log(numbers4.concat(numbers5));
// console.log(numbers4);
// console.log([...numbers4, ...numbers5]);

// - Mảng và chuỗi
//   - Chuyển mảng thành chuỗi
const names3 = ["Hồ", "Hiếu", "Trọng", "Hoàng"];
// console.log(names3.join("+"));

//   - Chuyển chuỗi thành mảng
const namesString = "Hồ+Hiếu+Trọng+Hoàng";
const namesArray = namesString.split("+");
// console.log(namesArray);

// Destructuring
const user = ["Hồ", 25, "Hanoi"];
// const name = user[0];
// const age = user[1];
// const address = user[2];
const [name, _, address] = user;
// console.log(name, address);

// const names4 = ["Hồ", "Hiếu", "Trọng", "Hoàng"];
// Viết hàm tìm kiếm các bạn học viên có tên chứa ít nhất 5 ký tự

// const findLongNames = (names) => {
//   const isLongName = (name) => {
//     return name.length >= 5;
//   };
//   const longNames = names.filter(isLongName);
//   return longNames;
// };

// console.log(findLongNames(names4));

// Object Math

// - Math.round() - Làm tròn số
console.log(Math.round(4.4));
// - Math.ceil() - Làm tròn lên
console.log(Math.ceil(13 / 5));
// - Math.floor() - Làm tròn xuống
console.log(
  "30 giờ bằng: " + Math.floor(30 / 24) + " ngày " + (30 % 24) + " giờ",
);
// - Math.trunc() - Cắt bỏ phần thập phân
console.log(Math.trunc(12341234.9123123) + "...");
// - Math.abs() - Trả về giá trị tuyệt đối
console.log(Math.abs(-10));
// - Math.min() - Trả về giá trị nhỏ nhất
console.log(Math.min(...[1, 2, 3, 4, 5]));
// - Math.max() - Trả về giá trị lớn nhất
console.log(Math.max(1, 2, 3, 4, 5));
// - Math.random() - Trả về số ngẫu nhiên từ 0 đến nhỏ hơn 1
console.log(Math.ceil(Math.random() * 100)); // min - max

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const box = document.querySelector(".box");
const button = document.querySelector("#random");

button.addEventListener("click", () => {
  const randomNumber = getRandomNumber(0, 4);
  const colors = ["red", "green", "blue", "yellow", "orange"];
  box.style.backgroundColor = colors[randomNumber];
});
// 5 |-----|
// 8 |-----|---|
