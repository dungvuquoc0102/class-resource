// const string: string = "10";

// type string1 = string;

// // TLS: TypeScript Language Service
// console.log(string.length);

// const user: {
//   name: string;
//   age: number;
// } = {
//   name: "John",
//   age: 30,
//   abc: 123,
// };

// // Tailwind CSS -> compiler -> CSS -> browser chạy
// // TS -> compiler -> JS -> node chạy
// // tsc <- typescript <- npm <- node
// // tsx

// // tsc: dịch từ TS sang JS
// // tsx: chạy trực tiếp TS mà không cần dịch sang JS

// const A = {
//   name: "John",
//   age: 30,
// };

// interface A1 {
//   name: string;
//   age: number;
// }

// TS
// - Microsoft phát triển
// - TS = JS + type
// - Sử dụng tsc để dịch từ TS sang JS
// - Ưu điểm:
//   - Ngôn ngữ lập trình dùng nhiều nhất trên thế giới (GitHub)
//   - Kiểm tra được kiểu
//   - Định nghĩa được hình dạng của dữ liệu
//   - Hỗ trợ tốt OOP

// string
// let greeting = "Hello F8";
// greeting = "Hi F8";
// let a = new String("Hello F8");
// greeting = 123;

// number
// let age: number = 30;
// age = 40;
// age = "50";

// boolean
// let isActive: boolean = true;
// isActive = false;
// isActive = 1;

// bigint
// let bigintNumber: bigint = 123n;
// bigintNumber = 456n;
// bigintNumber = 789;

// literal types
// let a: "Hello F8" = "Hello F8";
// let b = 10;

// Object types

// let user: {
//   readonly name: string;
//   age: number;
//   isActive?: boolean;
//   address?: {
//     street: string;
//   };
// };

// user = {
//   name: "John",
//   age: 30,
// };

// // user.name = "Doe";
// user.age = 31;

// array

// const numbers: number[] = [1, 2, 3, 4, 5];
// const numbers: readonly number[] = [1, 2, 3, 4, 5];
// numbers[0] = 10;
// console.log(numbers);

// tuple

// const user: [string, number, boolean] = ["John", 30, true];
// // const [state, setState]: [boolean, (boolean) => void]= useState(true);

// // Function types
// // - parameter types
// // - return type: void, never
// // - optional parameters
// // - default parameters
// // - rest parameters
// // - function types
// function add(a: number, b?: string, c = 10, ...parameters: number[]) {
//   return a;
// }

// function loop(): never {
//   while (true) {
//     console.log("Hello");
//   }
// }

// function throwError(): never {
//   throw new Error("Something went wrong");
// }

// let func1: (a: number, b: number) => number;

// function func2() {
//   return arguments[0] + arguments[1];
// }

// func1 = func2;

// console.log(func1(1, 2));

// let func: (a: number, b: number) => number;
// func = (a: number) => a;

type CartItem = {
  readonly productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

type Currency = "VND";

type Cart = {
  cartId: string;
  currency: Currency;
  items: readonly CartItem[];
  couponCode?: string;
};

function addItem(cart: Cart, item: CartItem): Cart {
  if (
    item.quantity <= 0 ||
    item.unitPrice < 0 ||
    item.productId === "" ||
    item.name === ""
  ) {
    throw new Error("Invalid item");
  }

  const existedItem = cart.items.find((i) => i.productId === item.productId);

  if (existedItem) {
    existedItem.quantity += item.quantity;
    return {
      ...cart,
    };
  }
  return {
    ...cart,
    items: [...cart.items, item],
  };
}

function subTotal(cart: Cart): number {
  return cart.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
}

function discount(cart: Cart): number {
  if (cart.couponCode === "SALE10") {
    return Math.round(subTotal(cart) * 0.1);
  }
  return 0;
}

function shippingFee(cart: Cart) {
  if (subTotal(cart) >= 500_000) {
    return 0;
  }
  return 30_000;
}

function formatMoney(value: number) {
  return `${value.toLocaleString("vi-VN")}₫`;
}

function priceRange(cart: Cart): [number, number] {
  if (cart.items.length === 0) {
    throw new Error("Cart is empty");
  }
  const min = Math.min(...cart.items.map((item) => item.unitPrice));
  const max = Math.max(...cart.items.map((item) => item.unitPrice));

  return [min, max];
}

async function validateCoupon(code: string): Promise<boolean> {
  const response = await new Promise((resolve) => {
    const cleanCode = code.trim().toUpperCase();
    setTimeout(() => {
      if (cleanCode === "SALE10") {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
  return response as boolean;
}

function renderInvoice(cart: Cart) {
  let invoiceString = `
-----------------------------------------------------
|   Tên sản phẩm  | Số lượng | Đơn giá  | Thành tiền |
-----------------------------------------------------
${cart.items.map((item) => `| ${item.name}${" ".repeat(15 - item.name.length)} | ${item.quantity}${" ".repeat(8 - item.quantity.toString().length)} | ${formatMoney(item.unitPrice)}${" ".repeat(8 - formatMoney(item.unitPrice).length)} | ${formatMoney(item.unitPrice * item.quantity)}${" ".repeat(10 - formatMoney(item.unitPrice * item.quantity).length)} |`).join("\n-----------------------------------------------------\n")}
-----------------------------------------------------
| Tạm tính                              | ${formatMoney(subTotal(cart))}${" ".repeat(10 - formatMoney(subTotal(cart)).length)} |
-----------------------------------------------------
| Giảm giá                              | ${formatMoney(discount(cart))}${" ".repeat(10 - formatMoney(discount(cart)).length)} |
-----------------------------------------------------
| Phí vận chuyển                        | ${formatMoney(shippingFee(cart))}${" ".repeat(10 - formatMoney(shippingFee(cart)).length)} |
-----------------------------------------------------
| Tổng cộng                             | ${formatMoney(subTotal(cart) - discount(cart) + shippingFee(cart))}${" ".repeat(10 - formatMoney(subTotal(cart) - discount(cart) + shippingFee(cart)).length)} |
-----------------------------------------------------
  `;

  return invoiceString;
}

const cart: Cart = {
  cartId: "cart-1",
  currency: "VND",
  items: [],
  couponCode: "SALE10",
};

const newCart = addItem(cart, {
  productId: "product-1",
  name: "Áo thun",
  unitPrice: 200_000,
  quantity: 2,
});
const newCart2 = addItem(newCart, {
  productId: "product-2",
  name: "Quần jean",
  unitPrice: 500_000,
  quantity: 1,
});

console.log(renderInvoice(newCart2));
