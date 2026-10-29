// async function func1(): Promise<string> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Hello");
//     }, 1000);
//   });
// }

// function func2(num: number) {
//   return 2;
// }

// const arr: number[] = [1, 2, 3, 4, 5];

// arr.map((item) => item * 2);

// interface User {
//   name: string;
//   age: number;
// }

// const use1: User = {
//   name: "John",
//   age: 30,
// };

// const user2: User = {
//   name: "Jane",
//   age: 25,
// };

// interface Employee extends User {
//   salary: number;
// }

// interface User {
//   address: {
//     street: string;
//   };
// }

// const user3: User = {
//   name: "John",
//   age: 30,
//   address: {
//     street: "123 Main St",
//   },
// };
// interface Response1 {
//   status: number;
// }

// interface Response1 {
//   data: {
//     name: string;
//     age: number;
//   };
// }

// const response1 = {
//   status: 200,
//   data: {
//     name: "John",
//     age: 30,
//   },
// };

// function handleResponse(response: Response1) {
//   console.log(response.data.name);
// }

// handleResponse(response1);

// type User = {
//   name: string;
//   age: number;
// };

// const user: User = {
//   name: "John",
//   age: 30,
// };

// type NumberArray = number[];
// type StringNumberTuple = [string, number];

// type StringOrNumber = string | number | boolean;

// let value: StringOrNumber;

// value = "hello";
// value = 123;
// value = true;

// function printValue(value: StringOrNumber) {
//   if (typeof value === "string") {
//     console.log(value.length);
//   }
// }
// type SuccessResult = {
//   status: "Success";
//   data: string[];
// };

// type ErrorResult = {
//   status: "Error";
//   message: string;
// };

// type Result =
//   | {
//       status: "Success";
//       data: string[];
//     }
//   | {
//       status: "Error";
//       message: string;
//     };

// function showResult(result: Result) {
//   if (result.status === "Success") {
//     console.log(result.data);
//   } else {
//     console.log(result.message);
//   }
// }
// type StringNumberArray = (string | number)[];

// const array: StringNumberArray = ["hello", 123, "world", 456];

// type User = {
//   name: string;
//   age: number;
// };

// type Employee = User & {
//   salary: number;
// } & {
//   address: {
//     street: string;
//   };
// };

// const employee: Employee = {
//   name: "John",
//   age: 30,
//   salary: 50000,
//   address: {
//     street: "123 Main St",
//   },
// };

// type StringAndNumber = string & number;

// type Type2 = string & "hello";

// let value: null = null;
// let value2: undefined = undefined;

// let username: string | null = null;

// let value3: unknown = "hello";
// value3 = 123;

// if (typeof value3 === "string") {
//   console.log(value3.length);
// }

// function funcB(value: string) {
//   console.log(value);
// }

// const inputEl = document.querySelector(".greeting");

// if (inputEl instanceof HTMLInputElement) {
// }

// // if (inputEl) {
// //   console.log(inputEl.value);
// // }

// let value = "hello" as const;

// const user = {
//   name: "John",
//   age: 30,
// } as const;

const inputEl = document.querySelector(".greeting") as HTMLInputElement;
if (inputEl) {
  console.log(inputEl.value);
}
