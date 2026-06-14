// let fullname = "Vu Quoc Dung";
// let age = 30;
// console.log(typeof fullname);
// console.log(typeof age);
// console.log(typeof undefined);
// console.log(typeof null);
// console.log(typeof true);
// console.log(typeof Symbol("id"));
// console.log(typeof 123n);

// console.log(typeof {});
// console.log(typeof [1, 2, 3]);
// console.log(typeof function sum() {});

// console.log(typeof (typeof 123));
// typeof 123 -> "number"
// typeof "number" -> "string"

// function sum(a, b) {
//   if (typeof a !== "number" || typeof b !== "number") {
//     return "Error: Cả hai tham số phải là số!";
//   }
//   return a + b;
// }
// console.log(typeof localStorage);

// console.log(10 === 10);
// console.log("hello" === "hello");
// console.log(false === false);
// console.log({ name: "Alice" } === { name: "Alice" });
// console.log(null === null);
// console.log(NaN === NaN);

// let a = 1;
// console.log((a -= 1));
// console.log(a);

// console.log(3 > 5);

// console.log(!false);

// const name = "Vu Quoc Dung";
// console.log(name ?? "Chưa có tên");

// const name = null;
// name && console.log(name);

console.log(false ? "Đúng" : "Sai" ? "Thật" : "Giả");
// value1 ? value2 : value3
// false  ? "Đúng" : ...     -> ...
// "Sai"  ? "Thật"  : "Giả"  -> "Thật"
