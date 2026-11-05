import { type User2, User3 } from "./child";

let username = "Vu Quoc Dung";

console.log(typeof username); // "string"

// type position
// value position

type MyType = typeof username; // string

let user = {
  name: "Vu Quoc Dung",
  age: 20,
};

console.log(typeof user); // "object"

type User = typeof user;

type KeyOfUser = keyof User; // "name" | "age"

const age: "age" = "age";
type MyString = User["age"]; // string
let a: MyString = "hello";

function getValue<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

type OptionalUser = Partial<User>;

type RecordUser = Record<string, number>;

let recordUser: RecordUser = {
  name: 20,
  age: 30,
  email: 40,
};

type Status = "success" | "error" | "loading";

type StatusObject = Record<Status, string>;

let statusObject: StatusObject = {
  success: "Thành công",
  error: "Lỗi",
  loading: "Đang tải",
};

type Order = "pending" | "shipped" | "delivered";

function showValue(value1: string, value2: number) {
  console.log(value1, value2);

  type ParameterType = Parameters<typeof showValue>; // [string, number]
  let params: ParameterType = ["Hello", 20];
  showValue(...params);
}

type Flags<T> = {
  [K in keyof T]: boolean;
};

type Product = { id: number; name: string; price: number };
type ProductFlags = Flags<Product>;

type MyOptional<T> = {
  [K in keyof T]?: T[K];
};

type ProductOptional = MyOptional<Product>;

let n: boolean = true;
type StringOrNumber = string | number;

let m: StringOrNumber = n; // string extends StringOrNumber

type A = boolean extends StringOrNumber ? "true" : "false";

type Parameters2<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type Size = "sm" | "md";
type Button = `btn-${Size}`; // "btn-sm" | "btn-md"

let button1: Button = "btn-sm";
let button2: Button = "btn-md";

let user2: User2 = {
  name: "Vu Quoc Dung",
  age: 20,
};

const user3 = new User3("Vu Quoc Dung", 20);
let user4: User3 = user3; // Kiểu User3
type B = typeof User3; // Kiểu của User3
let C: B = User3;
