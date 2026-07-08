// const user = {};
// const user = new Object({});
// function User(name) {
//   this.name = name;
// }
// const user = new User();

// const userArr = [
//   { name: "Nguyễn Văn A", age: 20 },
//   {
//     language: "JavaScript",
//   },
//   {
//     skill: "Soft Skill",
//   },
// ];
// console.log(
//   Object.assign(
//     {},
//     { name: "Nguyễn Văn A", age: 20 },
//     {
//       language: "JavaScript",
//     },
//     {
//       skill: "Soft Skill",
//     },
//   ),
// );
// const newUser = Object.create({
//   name: "Nguyễn Văn A",
//   age: 20,
// });
// console.log(newUser.name);
// console.log(newUser.age);
// const arr = [
//   ["name", "Nguyễn Văn A"],
//   ["age", 20],
// ];
// console.log(Object.fromEntries(arr));

// - this trong function thường xác định qua cách gọi:
//   - Gọi trực tiếp thì this trỏ tới window
//   - Gọi qua object thì this trỏ tới object đó
// - this trong arrow function không có, xác định qua cách viết:
//   - Nó mượn this từ context bên ngoài

// const address = {
//   city: "Hà Nội",
//   street: "Nguyễn Trãi",
//   getAddress: function () {
//     console.log(this);
//   },
// };

// const user = {
//   name: "Nguyễn Văn A",
//   age: 20,
//   intro: function () {
//     // console.log(this);
//     this.address.getAddress();
//     const func2 = function () {
//       // console.log(this);
//     };
//     func2();
//   },
//   address: address,
// };

// user.intro();
// const func = user.address.getAddress;
// func();

// function greeting (a, b) {
//   console.log(this);
//   console.log("hello");
//   console.log(a, b);
// };

const newGreeting = greeting.bind({ say: "Hi" });
newGreeting(1, 2);
greeting.call({ say: "Hi" }, ...[1, 2]);
greeting.apply({ say: "Hi" }, [1, 2]);

// const user1 = {
//   name: "Nguyễn Văn A",
//   age: 20,
//   intro: function () {
//     console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi`);
//   },
// };

// const user2 = {
//   name: "Nguyễn Văn B",
//   age: 30,
// };

// user1.intro.call(user2);

// const arr = [1, 2, 3, 4, 5];

const user = {
  name: "Nguyễn Văn A",
  age: 20,
  points: [10, 20, 30],
  intro: function () {
    console.log(this);

    this.points.forEach(
      function (point) {
        console.log(`${this.name} có ${point} điểm`);
      }.bind(this),
    );
  },
};

user.intro.bind(user)();

// function User(name, age) {
//   this.name = name;
//   this.age = age;
// }

// const user1 = new User("Nguyễn Văn A", 20);
// console.log(user1);

const user = {
  name: "Nguyễn Văn A",
  age: 20,
  get upperName() {
    return this.name.toUpperCase();
  },
  set upperName(value) {
    this.name = value.toUpperCase();
  },
};

// console.log(user.getUpperCaseName());

user.upperName = "Nguyễn Văn B";
console.log(user.name);

const thermometer = {
  _celsius: 0,
  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32;
  },
  set fahrenheit(value) {
    this._celsius = ((value - 32) * 5) / 9;
  },
};

thermometer.fahrenheit = 212;
console.log(thermometer._celsius);
