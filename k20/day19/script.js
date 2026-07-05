// ## 2: Properties and methods

// const user = {
//   name: "Vũ Quốc Dũng",
//   age: 30,
//   info: function () {
//     console.log(`Tên: ${user.name}, Tuổi: ${user.age}`);
//   },
//   address: {
//     city: "Hà Nội",
//     district: "Kiến Hưng",
//     street: "Văn Khê",
//   },
// };

// console.log(user.name);
// console.log(user["name"]);
// const keys = ["name", "age"];
// console.log(keys.map((key) => user[key]));

// user.language = "JavaScript";
// console.log(user);

// user.language = "TypeScript";
// console.log(user);

// delete user.language;
// console.log(user);

// console.log("age" in user);
// console.log("speak" in user);

// const keys2 = ["address", "city"];
// console.log(user[keys2[0]][keys2[1]]);

// user.info();
// user.info = function () {
//   console.log("My info...");
// };
// user.info();
// user.info2 = function () {
//   console.log("My info2...");
// };
// user.info2();
// delete user.info2;
// console.log(user);

// // Ex 1
// const user = { name: "Minh", age: 22, email: "minh@example.com" };
// console.log(`Tên: ${user.name}`);
// console.log(`Email: ${user.email}`);

// user.phone = "0901234567";
// console.log(user);

// user.age = 23;
// console.log(user);

// delete user.email;
// console.log(user);

// //Ex 2
// const car = { brand: "Toyota", year: 2020 };

// console.log("color" in car);
// console.log("brand" in car);

// // Ex 3
// const school = {
//   name: "Nguyễn Huệ",
//   address: { street: "123 Lê Lợi", city: "Hồ Chí Minh" },
// };

// console.log(`Tên trường: ${school.name}`);
// console.log(`Tên thành phố: ${school.address.city}`);

// ## 3: Display

// const user = {
//   name: "Vũ Quốc Dũng",
//   age: 30,
// };

// const num = 10;
// const stringNum = String(num);
// const stringUser = String(user);
// console.log(num);
// console.log(stringNum);
// console.log(stringUser);

// console.log(["name", "age"]);
// console.log([user.name, user.age]);

// console.log(JSON.stringify(user));
// console.log(JSON.parse(JSON.stringify(user)));

// console.log(Object.keys(user));
// console.log(Object.values(user));
// for (const key in user) {
//   console.log(key);
// }
// // [[key, value], [key, value], ...]
// // Destructuring
// for (const [key, value] of Object.entries(user)) {
//   console.log(`${key}: ${value}`);
// }

// const arrUser = [
//   ["name", "Vũ Quốc Dũng"],
//   ["age", 30],
// ];
// console.log(Object.fromEntries(arrUser));

// // const userName = user.name;
// // const userAge = user.age;

// // const { name, age } = user;
// // console.log(name);
// // console.log(age);

// const users = ["Nguyen Van A", "Tran Thi B"];
// const [user1, user2] = users;
// console.log(user1);
// console.log(user2);

// Ex 4
// const product = {
//   id: 1,
//   name: "Laptop",
// };
// console.log("Sản phẩm: " + product);
// console.log("Sản phẩm:", product);

// // Dấu `+` trong JS sẽ ép kiểu các giá trị sang chuỗi, mà `product`
// // là một object, nên khi ép sang chuỗi sẽ ra `[object Object]`.
// // Callback
// // - Là hàm
// // - Truyền vào một hàm khác
// console.log(JSON.stringify(product));
// console.log(JSON.stringify(product, null, 2));

// // Đối số thứ 2 dùng để biến đổi trước khi in ra
// // Đối số thứ 3 dùng để thêm khoảng trắng, dấu xuống dòng, giúp object in ra đẹp hơn

// // Ex 5
// const person = { name: "Hoa", age: 25, city: "Đà Nẵng" };

// for (const key in person) {
//   console.log(`${key}: ${person[key]}`);
// }

// ## 4. Basic this

// const user = {
//   name: "Vũ Quốc Dũng",
//   age: 27,
//   info: function () {
//     console.log(`Tên: ${this.name}, Tuổi: ${this.age}`);
//   },
// };
// user.info();

// function sum(a, b) {
//   console.log(this);
//   return a + b;
// }
// sum(1, 2);

console.log(this);

// ## 5. Constructors

// const user = {
//   name: "Vũ Quốc Dũng",
//   age: 27,
// };

// const user = new Object({
//   name: "Vũ Quốc Dũng",
//   age: 27,
// });

// function User(name, age, language) {
//   this.name = name;
//   this.age = age;
//   this.language = language;
//   this.address = "Việt Nam";
//   this.info = function () {
//     console.log(
//       `Tên: ${this.name}, Tuổi: ${this.age}, Ngôn ngữ: ${this.language}`,
//     );
//   };
// }

// const user1 = new User("Vũ Quốc Dũng", 27, "JavaScript");
// const user2 = new User("Hiếu Nguyễn", 22, "JavaScript");
// console.log(user1);
// user1.info();
// console.log(user2);

// User.prototype.learning = "Python";
// User.prototype.study = function () {
//   console.log(`${this.name} đang học ${this.learning}`);
// };

// user1.study();
// user2.study();

// console.log(user1.learning);
// console.log(user2.learning);

// const string = new String("Hello");
