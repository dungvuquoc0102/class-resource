// console.log(1);
// try {
//   // throw new Error("Có lỗi xảy ra");
//   console.log("Hello");
// } catch (error) {
//   console.log("Lỗi");
// } finally {
//   console.log("Hoàn thành");
// }
// // error -> ReferenceError.prototype -> Error.prototype
// console.log(3);

// const user = {
//   name: "Nguyễn Văn A",
//   age: 20,
// };

// const getInfo = function () {
//   console.log("Hello");
// };

// const arr = [1, 2, 3];

// Biến user lưu địa chỉ trỏ tới vùng nhớ chứa object
// Number
// String
// Null
// Undefined
// BigInt
// Symbol
// Boolean

// let x = 10;
// try {
//   x.filter();
// } catch (error) {
//   console.log(error);
// }
// const arr = new Array(-1);

// const encodedURI = encodeURI("http://127.0.0.1:5501/k20 /day24/index.html");
// console.log(encodedURI);
// console.log(decodeURI(encodedURI + "%%%"));

// let boolean = 10 < 3; // false

// if (boolean === true) {
//   console.log("Hello");
// }

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  info() {
    console.log(`Tên: ${this.name}, tuổi: ${this.age}`);
  }
}

const user1 = new User("Nguyễn Văn A", 20);
const user2 = new User("Nguyễn Thị B", 20);

class Staff extends User {
  #address;
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }
  showRank = () => {
    console.log(this);
  };
}

const staff1 = new Staff("Nguyễn Văn B", 20, "Nhân viên marketing");

staff1.showRank();

// Lập trình tuần tự và Lập trình hướng đối tượng
// - Tính đóng gói
// - Tính trừu tượng
// - Tính kế thừa
// - Tính đa hình

// const userName = "Nguyễn Văn A";
// const age = 20;

// const productName = "Sản phẩm 1";
// const price = 100000;

// const categories = ["Màn hình", "Bàn phím"];
