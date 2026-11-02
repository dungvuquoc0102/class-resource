// function processValue(a: string | number) {
//   if (typeof a === "string") {
//     console.log(a.length);
//   } else {
//     console.log(a.toFixed(2));
//   }
// }

// function showDate(date: Date | string) {
//   if (date instanceof Date) {
//     console.log(date.toISOString());
//   } else {
//     console.log(new Date(date).toISOString());
//   }
// }

// class Product1 {
//   title = "Product 1";
//   price = 100;

//   getPrice() {
//     return this.price;
//   }
// }

// const product1 = new Product1();

// if (product1 instanceof Product1) {
//   console.log(product1.getPrice());
// }

// type Product = {
//   name: string;
//   price: number;
// };

// function isProduct(product: unknown): product is Product {
//   const p = product as Product;
//   return true;
// }

// let a = { name: "Laptop" };
// let b = { name: "Laptop", price: 1000 };

// if (isProduct(a)) {
//   console.log(a.name);
//   console.log(a.price);
// } else {
//   console.log("Not a product");
// }

// function isString(value: unknown): value is string {
//   return typeof value === "string";
// }

// function processData(data: unknown) {}

// function sum<T1, T2>(a: T1, b: T2) {
//   return true;
// }
// // type position
// // value position

// sum<number, string>(1, "2");

// let a: "1" = "1";

// const func1 = <T>(a: T) => {
//   return a;
// };

// interface Product<T> {
//   id: T;
//   name: string;
//   price: number;
// }

// type StringProduct = Product<string>;
// type NumberProduct = Product<number>;

// type Product2<T> = {
//   id: T;
//   name: string;
//   price: number;
// };

// type StringProduct2 = Product2<string>;

// const product: StringProduct2 = {
//   id: 1,
//   name: "Laptop",
//   price: 1000,
// };

// class Product3<T> {
//   getId(id: T) {
//     return id;
//   }
// }

// interface ApiResponse<T> {
//   data: T;
//   status: number;
// }

// async function request<T>(url: string) {
//   const res = await fetch(url);
//   const data = await res.json();
//   return data as T;
// }

// type User = {
//   id: number;
//   name: string;
//   email: string;
// };

// (async () => {
//   const data = await request<User[]>("https://api.example.com/users");
//   console.log(data.);

// })();

// DOM types

// EventTarget
// Node
// Element
// HTMLElement
// HTMLInputElement
// HTMLButtonElement
// HTMLAnchorElement
// HTMLFormElement
// HTMLDivElement

// const inputElement = document.querySelector(".greeting");

// if (inputElement) {
//   if (inputElement instanceof HTMLInputElement) {
//     console.log(inputElement.value);
//   }
// }

// inputElement?.addEventListener("input", (event) => {
//   const target = event.target;

//   if (!(target instanceof HTMLInputElement)) return;

//   console.log(target.value);
// });

// type Order = {
//   id: number;
//   status: "pending" | "shipped" | "delivered" | "canceled";
// };

// function cancelOrder(order: Order) {
//   if (order.status === "pending") {
//     order.status = "canceled";
//   } else {
//     console.log("Can't cancel order");
//   }
// }

// class Order {
//   constructor(
//     private id: number,
//     private status: "pending" | "shipped" | "delivered" | "canceled",
//   ) {}

//   cancel() {
//     if (this.status === "pending") {
//       this.status = "canceled";
//     } else {
//       console.log("Can't cancel order");
//     }
//   }
// }

class BankAccount {
  constructor(private balance: number) {}

  deposit(amount: number) {
    this.balance += amount;
  }

  withdraw(amount: number) {
    if (amount > this.balance) {
      console.log("Insufficient funds");
      return;
    }
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }
}

const account = new BankAccount(1000); // Tại tài khoản có sẵn $1000
account.deposit(500); // Tài khoản nạp $500
account.withdraw(200); // Tài khoản rút $200
console.log(account.getBalance()); // Số dư tài khoản là $1300

let balance = 1000;

// function deposit(amount: number) {
//   balance += amount;
// }

// function withdraw(amount: number) {
//   if (amount > balance) {
//     console.log("Insufficient funds");
//     return;
//   }
//   balance -= amount;
// }

// function getBalance() {
//   return balance;
// }

// deposit(500);
// withdraw(200);

// console.log(getBalance()); // 1300

// access modifier: public, private, protected
// interface
// abstract class

// interface Animal {
//   name: string;
//   sound: () => void;
// }

// const cat: Animal = {
//   name: "Mèo",
//   sound() {
//     console.log("Meo");
//   },
// };

interface Payment {
  isOnlinePayment(): boolean;
}

interface Payment2 {
  showCertificate(): void;
}

abstract class Order {
  constructor(
    private id: number,
    private status: "pending" | "paid" | "shipped" | "canceled",
  ) {}

  abstract payment(): void;

  changeStatus(status: "pending" | "paid" | "shipped" | "canceled") {
    this.status = status;
  }

  showStatus() {
    console.log(`Order ${this.id} is ${this.status}`);
  }
}

class SePayOrder extends Order implements Payment, Payment2 {
  isOnlinePayment(): boolean {
    return true;
  }

  showCertificate(): void {
    console.log("Certificate");
  }

  payment(): void {
    console.log("Pay with Sepay");
    this.changeStatus("paid");
  }
}

class VNPayOrder extends Order {
  payment(): void {
    console.log("Pay with VNPay");
    this.changeStatus("paid");
  }
}

const order1 = new SePayOrder(1, "pending");
order1.payment();
order1.showStatus();

const order2 = new VNPayOrder(2, "pending");
order2.payment();
order2.showStatus();

class User {
  constructor(
    private id: number,
    private name: string,
    private age: number,
  ) {}

  showInfo() {
    console.log(`User ${this.id}: ${this.name}, ${this.age} years old`);
  }
}

class Employee extends User {
  constructor(
    id: number,
    name: string,
    age: number,
    private salary: number,
  ) {
    super(id, name, age);
  }

  override showInfo() {
    console.log("Child ShowInfo");
  }

  showSalary() {
    console.log(`Salary: ${this.salary}`);
  }

  showValue(value: string): string;
  showValue(value: number): number;

  showValue(value: string | number) {
    if (typeof value === "string") {
      return `String: ${value}`;
    } else {
      return value * 2;
    }
  }
}

const employee = new Employee(1, "John Doe", 30, 5000);
employee.showInfo();
employee.showSalary();

// Tính đa hình
// - Tính ghi đè (overriding)
// - Tính nạp chồng (overloading)

const employee2 = new Employee(2, "Jane Doe", 25, 6000);
console.log(employee2.showValue("Hello")); // String: Hello
console.log(employee2.showValue(10)); // 20
