// Chữa bài 2 buổi 19

// const customers = [
//   { id: 1, name: "John Doe", email: "john@example.com" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com" },
//   { id: 3, name: "Alice Johnson", email: "alice@example.com" },
//   { id: 4, name: "Bob Brown", email: "bob@example.com" },
//   { id: 5, name: "Charlie Green", email: "charlie@example.com" },
// ];

// const products = [
//   { id: 101, name: "Laptop", price: 1200 },
//   { id: 102, name: "Phone", price: 800 },
//   { id: 103, name: "Tablet", price: 500 },
//   { id: 104, name: "Smartwatch", price: 300 },
//   { id: 105, name: "Headphones", price: 150 },
// ];

// const orders = [
//   {
//     id: 1001,
//     customerId: 1,
//     items: [
//       { productId: 101, quantity: 2 },
//       { productId: 102, quantity: 1 },
//     ],
//   },
//   {
//     id: 1002,
//     customerId: 2,
//     items: [
//       { productId: 102, quantity: 1 },
//       { productId: 103, quantity: 3 },
//     ],
//   },
//   {
//     id: 1003,
//     customerId: 3,
//     items: [
//       { productId: 104, quantity: 5 },
//       { productId: 105, quantity: 2 },
//     ],
//   },
//   {
//     id: 1004,
//     customerId: 4,
//     items: [
//       { productId: 101, quantity: 1 },
//       { productId: 103, quantity: 2 },
//     ],
//   },
//   {
//     id: 1005,
//     customerId: 5,
//     items: [{ productId: 105, quantity: 10 }],
//   },
//   {
//     id: 1006,
//     customerId: 1,
//     items: [
//       { productId: 101, quantity: 1 },
//       { productId: 105, quantity: 3 },
//     ],
//   },
//   {
//     id: 1007,
//     customerId: 2,
//     items: [
//       { productId: 104, quantity: 2 },
//       { productId: 103, quantity: 1 },
//     ],
//   },
//   {
//     id: 1008,
//     customerId: 3,
//     items: [{ productId: 102, quantity: 2 }],
//   },
//   {
//     id: 1009,
//     customerId: 4,
//     items: [
//       { productId: 101, quantity: 1 },
//       { productId: 102, quantity: 1 },
//     ],
//   },
//   {
//     id: 1010,
//     customerId: 5,
//     items: [
//       { productId: 103, quantity: 4 },
//       { productId: 104, quantity: 3 },
//     ],
//   },
// ];

// function filterOrdersByCustomerId(customerId) {
//   return orders.filter((order) => order.customerId === customerId);
// }

// function calcOrderTotalSpent(order) {
//   return order.items.reduce((sum, item) => {
//     let product = products.find((product) => product.id === item.productId);
//     return sum + product.price * item.quantity;
//   }, 0);
// }

// function transformProductObject(item) {
//   const product = products.find((product) => product.id === item.productId);
//   delete item.productId;
//   item.name = product.name;
//   item.totalSpent = item.quantity * product.price;
//   return item;
// }

// function combineItems(itemsArr) {
//   const newArr = [];
//   itemsArr.forEach((items) => {
//     items.forEach((item) => {
//       const existingItem = newArr.find(
//         (newItem) => item.productId === newItem.productId,
//       );
//       if (!existingItem) {
//         newArr.push(item);
//       } else {
//         existingItem.quantity += item.quantity;
//       }
//     });
//   });
//   return newArr
//     .map(transformProductObject)
//     .sort((a, b) => b.totalSpent - a.totalSpent);
// }

// function getCustomerStatistics(customers, products, orders) {
//   // Tạo nên mảng kết quả
//   const result = customers.map((customer) => {
//     return {
//       id: customer.id,
//       name: customer.name,
//       totalSpent: filterOrdersByCustomerId(customer.id).reduce(
//         (result, order) => result + calcOrderTotalSpent(order),
//         0,
//       ),
//       products: combineItems(
//         filterOrdersByCustomerId(customer.id).map((order) => order.items),
//       ),
//     };
//   });
//   return result.sort((a, b) => b.totalSpent - a.totalSpent);
// }

// console.log(getCustomerStatistics(customers, products, orders));

// console.log(customers);
// console.log(products);
// console.log(orders);

// Object
// console.log(
//   Object.groupBy(
//     [
//       { name: "Nguyễn Văn A", className: "K19" },
//       { name: "Nguyễn Văn B", className: "K20" },
//       { name: "Nguyễn Thị C", className: "K20" },
//     ],
//     (item) => item.className,
//   ),
// );

// const user = {
//   name: "Nguyễn Văn A",
//   age: 22,
// };

// Object.defineProperty(user, "address", {
//   value: "Hà Nội",
// });
// Object.defineProperty(user, "info", {
//   get() {
//     return `${this.name} - ${this.age} - ${this.address}`;
//   },
//   set(value) {
//     const parts = value.split(" - ");
//     this.name = parts[0];
//     this.age = parseInt(parts[1]);
//     this.address = parts[2];
//   },
// });

// Object.defineProperties(user, {
//   className: {
//     value: "K20",
//     writable: true,
//   },
//   school: {
//     value: "ABC",
//     writable: true,
//   },
// });

// console.log(user);

// console.log(Object.getPrototypeOf(user));

// const user = {
//   name: "Nguyễn Văn A",
//   age: 22,
// };

// Object.preventExtensions(user);

// user.address = "Hà Nội";
// console.log(Object.isExtensible(user));

// Object.seal(user);

// user.address = "Hà Nội";
// delete user.age;
// user.name = "Nguyễn Văn B";

// console.log(Object.isSealed(user));
// console.log(user);

// Object.freeze(user);

// user.address = "Hà Nội";
// delete user.age;
// user.name = "Nguyễn Văn B";

// console.log(Object.isFrozen(user));
// console.log(user);

// function User(name, age) {
//   this.name = name;
//   this.age = age;
// }

// User.prototype.address = "Hà Nội";

// const user = new User("Nguyễn Văn A", 22);

// user kế thừa, hay là con của User.prototype

// const user = {
//   name: "Nguyễn Văn A",
//   age: 22,
// };

// Object.prototype.abc = "abc";

// console.log(user.abc);

// const symbolValue = Symbol("hello");

// Symbol.prototype.abc = "abc";

// console.log(symbolValue.abc);

// string sẽ kế thừa String.prototype kế thừa Object.prototype kế thừa null
// number sẽ kế thừa Number.prototype
// boolean sẽ kế thừa Boolean.prototype
// array sẽ kế thừa Array.prototype
// object sẽ kế thừa Object.prototype
// bigint sẽ kế thừa BigInt.prototype
// symbol sẽ kế thừa Symbol.prototype
// function sẽ kế thừa Function.prototype

// Array.prototype.map = function (callback) {
//   console.log(this.length);
//   const arr = [];
//   for (let i = 0; i < this.length; i++) {
//     arr.push(callback(this[i], i));
//   }
//   return arr;
// };

// const user = {
//   name: "Nguyễn Văn A",
//   age: 22,
// };

// Object.setPrototypeOf(user, {
//   abc: "abc",
// });

// Object.prototype.xyz = "xyz";

// // console.log(user.hasOwnProperty("xyz"));
// console.log(Object.hasOwn(user, "xyz"));

// console.log(Object.getPrototypeOf(Object.prototype));

// const user = Object.create({
//   xyz: "xyz",
// });

// console.log(user);

// Ex 02

// const user = { name: "An" };

// Object.defineProperty(user, "id", {
//   value: 1001,
// });
// user.id = 9999;
// console.log(user);

// for (const key in user) {
//   console.log(key);
// }

// console.log(Object.keys(user));

// Ex 03

const product = {};

Object.defineProperties(product, {
  name: {
    value: "Bàn phím",
    writable: true,
    enumerable: true,
  },
  price: {
    value: 500000,
    writable: true,
    enumerable: true,
  },
  discountedPrice: {
    get() {
      return this.price * 0.9;
    },
  },
});

// console.log(product.discountedPrice);

// Ex 04

// console.log(Object.getOwnPropertyDescriptor(product, "price"));
// console.log(Object.getOwnPropertyDescriptors(product));

// console.log(Object.getOwnPropertyNames(product));
// console.log(Object.keys(product));

// Ex 05

// const appConfig = {
//   theme: "dark",
//   fontSize: 16,
//   language: "vi",
// };

// Object.preventExtensions(appConfig);

// appConfig.fontSize = 18;
// delete appConfig.language;
// appConfig.debug = true;
// console.log(appConfig);

// console.log(Object.isExtensible(appConfig));

// Ex 06
// const session = {
//   userId: 101,
//   username: "minhle",
//   role: "student",
//   lastActive: Date.now(),
// };

// Object.seal(session);

// console.log(session);

// setTimeout(() => {
//   session.lastActive = Date.now();
//   session.tempFlag = true;
//   delete session.role;

//   console.log(session);
// }, 1000);

// Ex 07

// const APP_CONSTANTS = {
//   API_BASE_URL: "https://api.example.com",
//   MAX_RETRIES: 3,
//   TIMEOUT_MS: 5000,
// };

// Object.freeze(APP_CONSTANTS);

// APP_CONSTANTS.MAX_RETRIES = 10;
// delete APP_CONSTANTS.TIMEOUT_MS;
// APP_CONSTANTS.NEW_FLAG = true;

// console.log(APP_CONSTANTS);
// console.log(Object.isFrozen(APP_CONSTANTS));

// Ex 09

// function Product(name, price) {
//   this.name = name;
//   this.price = price;
// }
// Product.prototype.getInfo = function () {
//   return `Tên: ${this.name}, Giá: ${this.price}`;
// };
// const keyboard = new Product("Aula F75", 1000000);
// const speaker = new Product("JBL Z10", 1500000);
// console.log(keyboard.getInfo());
// console.log(speaker.getInfo());

// // Object cha
// console.log(Object.getPrototypeOf(keyboard)); // Product.prototype
// console.log(Object.getPrototypeOf(speaker)); // Product.prototype

// // Object ông
// console.dir(Object.getPrototypeOf(Product.prototype)); // Object.prototype

// // Object cụ
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(Product.prototype))); // null

// Các iterable: Array, String

// const points = [10, 20, 30, 40, 50];
// const points = {
//   0: 10,
//   1: 20,
//   2: 30,
//   3: 40,
//   4: 50,
// };
const points = "10, 20, 30, 40, 50";
// for (const point of points) {
//   console.log(point);
// }
