// Object literal -> đối tượng
// Array -> danh sách
// Map -> danh sách với nhiều tính năng
function greeting(name) {
  console.log(`Hello ${name}`);
}
const arr = [
  [greeting, 1],
  ["user2", 2],
  ["user3", 3],
];

const arr3 = {
  user1: 1,
  user2: 2,
  user3: 3,
};

console.log(arr3.user2);

const arr2 = [
  { name: "user1", id: 1 },
  { name: "user2", id: 2 },
  { name: "user3", id: 3 },
];

// Tìm kiếm
// console.log(arr.find((user) => user[1] === 2));

// // Sửa
// const findUser = arr.find((user) => user[1] === 2);
// if (findUser) {
//   findUser[0] = "user2-updated";
// }
// console.log(arr);

// // Xóa
// const newArr = arr.filter((user) => user[1] !== 2);
// console.log(newArr);

const map = new Map(arr);

// map.set("user1", 1);
// map.set("user2", 2);
// map.set("user3", 3);

// Tìm kiếm
console.log(map.get("user2"));
console.log(map.get(greeting));

// Sửa
// map.set("user2", 22);
// console.log(map.get("user2"));

// // Xóa
// map.delete("user2");
// console.log(map.get("user2"));

// // Thêm
// map.set("user4", 4);
// console.log(map.get("user4"));

// // Xóa tất cả
// map.clear();
// console.log(map.size);

// // Duyệt
// for (const [name, id] of map) {
//   console.log(name, id);
// }

// map.forEach((id, name) => {
//   console.log(name, id);
// });

// console.log(map);

// const set = new Set([1, 2, 3, 4, 4, 4, 5]);

// // Thêm
// set.add(5);
// console.log(set);

// // Tìm kiếm
// console.log(set.has(5));

// // Xóa
// set.delete(5);
// console.log(set);

// // Xóa tất cả
// set.clear();
// console.log(set.size);

const symbol1 = Symbol("id");
const product1 = {
  name: "iPhone Due",
  [symbol1]: 1000,
  1: "one",
};

// key:
//    ✅ number, string
//    ❌ symbol
// value:
//    ✅ string, number, boolean, null, array, JSON object
//    ❌ undefined, bigint, symbol, function,...

const json = JSON.stringify(product1); // Chuyển object sang string
console.log(json);

const product2 = JSON.parse(json); // Chuyển string sang object
console.log(product2.price);

console.log(1);

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = "MyError";
  }

  showMesssage() {
    console.log(this.message);
  }
}

try {
  // console.log(productName);
  // const productName = "Samsung ZFold 8";

  // const a = 10;
  // a();

  throw new MyError("This is an error");

  console.log("After error");
} catch (error) {
  console.dir(error); // error -> ReferenceError, TypeError -> Error -> Object -> null
  // Hiển thị ra 1 toast thông báo lỗi
  error.showMesssage();
} finally {
  console.log("Hello");
}

console.log(2);
let a = 10;
function greeting2(name) {
  let a = 20;
  a++;
  console.log(a);
}

// if (true) {
//   var a = 20;
// }

// {
//   var a = 30;
// }

greeting2();
greeting2();

function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const innerFunc = outer();
innerFunc();
innerFunc();
innerFunc();
// innerFunc = null;

const innerFunc2 = outer();
innerFunc2();
innerFunc2();
innerFunc2();

const categories = [
  {
    id: 1,
    name: "Điện thoại",
    children: [
      {
        id: 3,
        name: "Điện thoại chơi game",
        children: [
          {
            id: 5,
            name: "Điện thoại chơi game giá rẻ",
          },
        ],
      },
      {
        id: 4,
        name: "Điện thoại gập",
      },
    ],
  },
  {
    id: 2,
    name: "Máy tính",
  },
];

const flattedCategories = [];

function makeFlattedCategories(categories) {
  for (const category of categories) {
    flattedCategories.push(category);
    if (category.children) {
      makeFlattedCategories(category.children);
    }
  }
}

makeFlattedCategories(categories);

console.log(flattedCategories);

const content = document.querySelector("div");
console.log((content.style.color = "red"));
