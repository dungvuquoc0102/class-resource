function Product(name, price) {
  this._name = name;
  this.price = price;
}

Product.prototype.abc = 10;

Product.prototype.getInfo = function () {
  return `${this.name} - ${this.price}`;
};

Product.prototype = {
  ...Product.prototype,
  get name() {
    return this._name;
  },
  set name(value) {
    this._name = value;
  },
};

// Object.setPrototypeOf(Product.prototype, {
//   get name() {
//     return this._name;
//   },
// });

const iPhone18 = new Product("iPhone 18", 1299);
const samsung26 = new Product("Samsung 26", 1299);

console.log(iPhone18);

const points = [40, 100, 1, 5, 25, 10];

Array.prototype.map2 = function (callback) {
  const array = [];
  for (let i = 0; i < this.length; i++) {
    array.push(callback(this[i]));
  }
  return array;
};
// array -> Array.prototype -> Object.prototype -> null

const doublePoints = points.map((point) => point * 2);
console.log(doublePoints);

// OOP -> Tư duy để lập trình (Đóng gói, trừu tượng, kế thừa, đa hình - ghi đè/nạp chồng)
// Function constructor
// Class trong JS
// Class trong TS

class User {
  #address = "Hà Nội";

  constructor(name, age) {
    this._name = name;
    this.age = age;
  }

  showInfo() {
    // console.log(`Tên: ${this.name}, tuổi: ${this.age}`);
    console.log(this);
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get address() {
    return "Address: " + this.#address;
  }

  set address(value) {
    if (value.length < 5) {
      throw new Error("Địa chỉ phải có ít nhất 5 ký tự");
    }
    this.#address = value;
  }
}

const user1 = new User("Alice", 30);

console.log(user1.name);
console.log(user1.age);
console.log(user1.address);
const func = user1.showInfo;
console.log(func);
func();

user1.address = "Hanoi";

class Staff extends User {
  constructor(name, age, salary) {
    super(name, age);
    this.salary = salary;
  }

  showInfo() {
    console.log("Show info");
  }

  showSalary() {
    super.showInfo();
    // console.log(`Lương: ${this.salary}`);
  }
}

const staff1 = new Staff("Bob", 25, 5000);

// staff1.showSalary();

// const now = new Date();
const date1 = new Date(2026, 8, 19, 21, 30, 0, 500);
const date2 = new Date("2026-09-30T07:00:00+02:00");

console.dir(date1);
console.dir(date2);

console.log(date1.getFullYear());
console.log(date1.getMonth() + 1);
console.log(date1.getDate());
console.log(date1.getDay());
console.log(date1.getHours());
console.log(date1.getMinutes());
console.log(date1.getSeconds());
console.log(date1.getMilliseconds());

console.log(date1.setDate(date1.getDate() + 7));
console.log(date1);

//21:42:30 19/09/2026
// const now2 = new Date();
// const hours = now2.getHours();
// const minutes = now2.getMinutes();
// const seconds = now2.getSeconds();

// const date = now2.getDate();
// const month = now2.getMonth() + 1;
// const year = now2.getFullYear();

// const fillZero = (num) => (num < 10 ? `0${num}` : num);

// console.log(
//   `${fillZero(hours)}:${fillZero(minutes)}:${fillZero(seconds)} ${fillZero(date)}/${fillZero(month)}/${year}`,
// );

// const now = new Date();
// console.log(
//   `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
// );

const now = new Date();
const hours = String(now.getHours()).padStart(2, "0");
const minute = String(now.getMinutes()).padStart(2, "0");
const second = String(now.getSeconds()).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const month = String(now.getMonth() + 1).padStart(2, "0");
const year = now.getFullYear();
const formatDay = `${hours}:${minute}:${second} ${day}/${month}/${year}`;
console.log(formatDay);
