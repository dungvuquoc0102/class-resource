const names = ["Anh Hồ", "Huong Tra", "Khải Hồ"];
for (let i = 0; i < names.length; i++) {
  // console.log(names[i]);
}
// console.log("Anh Hồ");
// console.log("Huong Tra");
// console.log("Khải Hồ");

let i = 0;
while (i > 10) {
  console.log("Hello");
  // i++;
}

// do {
//   console.log("Hello");
//   // i++;
// } while (i > 10);

// const numbers = [1, 2, 3, 4, 5];

// for (let number of numbers) {
//   console.log(number);
// }

// for (let i in numbers) {
//   console.log(i);
// }

// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
// let k = 1;
// let string = "";
// for (let i = 1; i <= 2; i++) {
//   if (i <= 5) {
//     for (let j = 1; j < 11; j++) {
//       string += i + " x " + j + " = " + i * j + "\n";
//     }
//   }
//   for (let j = 1; j < 11; j++) {
//     string += i + " x " + j + " = " + i * j + "\n";
//   }
// }
// console.log(string);

// let string = "";
// for (let k = 1; k <= 6; k += 5) {
//   for (let i = 1; i <= 10; i++) {
//     for (let j = k; j <= k + 4; j++) {
//       string +=
//         (i === 10 ? "10" : i + " ") +
//         " x " +
//         j +
//         " = " +
//         (String(i * j).length === 2 ? i * j : i * j + " ") +
//         "    ";
//     }
//     string += "\n";
//   }
//   string += "\n";
// }
// string += "\n";
// for (let i = 1; i <= 10; i++) {
//   for (let j = 6; j <= 10; j++) {
//     string +=
//       (i === 10 ? "10" : i + " ") +
//       " x " +
//       j +
//       " = " +
//       (String(i * j).length === 2 ? i * j : i * j + " ") +
//       "    ";
//   }
//   string += "\n";
// }
// console.log(string);

// console.log(" " + "  " + " * " + "  " + " ");
// console.log(" " + " *" + " * " + "* " + " ");
// console.log("*" + " *" + " * " + "* " + "*");

// let string = "";
// let value = 5;
// for (let i = 1; i <= value; i += 2) {
//   string +=
//     "   ".repeat((value - i) / 2) +
//     "*  ".repeat(i) +
//     "   ".repeat((value - i) / 2) +
//     "\n\n";
// }
// console.log(string);

// let name1 = ["The", "Aa", "hi"];
// let a = 1;
// let string1 = "";
// for (let k = 0; k < 9; k++) {
//   for (let i = 1; i < 11; i++) {
//     {
//       for (let j = 1; j < 11; j++) {
//         if (j == a) {
//           string1 += `${i} x ${j} = ${i * j} \t\t`;
//         }
//       }
//     }
//   }
//   a++;
//   string1 = string1 + "\n";
// }
// console.log(string1);

const productName1 = 5;
const productName2 = 3;
const productName3 = `\t${productName1}${productName2}`;

console.log(productName1);
console.log(productName2);
console.log(productName3.length);

const product = {
  name: "Macbook Pro M6 Pro",
  price: 2999,
  showInfo: function () {},
};

console.log(product.name);

const greeting = "Hello Hello, How are you?";
const greeting2 = new String("Hello");
console.log(greeting.length);
console.log(typeof greeting2);

// auto boxing
// string -> string.<thuộc-tính/phương-thức> -> new String(string).<thuộc-tính/phương-thức> -> value -> string

// 1 ký tự tiếng Việt tương đương với 1.5 token
// 100 ký tự tiếng Việt tương đương với 150 token / 1_000_000 * 0.14 * 26_000

console.log(greeting.toUpperCase());
console.log(greeting.toLowerCase());
console.log(greeting.trim());
console.log(greeting.includes("Hell o", 3));
console.log(greeting.startsWith("  Hell o"));
console.log(greeting.endsWith("Hell o  "));
console.log(greeting.indexOf("Hell o"));
console.log(greeting.replace("Hell o", "Hi"));
console.log(greeting.replaceAll("Hell o", "Hi"));
const words = greeting.split(" ");
let string = "";

for (let word of words) {
  if (word[word.length - 1] === "," || word[word.length - 1] === "?") {
    string += word.replace(",", "").replace("?", "") + " ";
  } else {
    string += word + " ";
  }
}

console.log(string.trim().split(" "));
console.log((greeting[0] = "I"));
console.log(greeting);

const number1 = -10;
const number2 = -10.3;
const number3 = -10e2; // 10 x 10^2

const number4 = 0.1; // 0101001001
const number5 = 0.2; // 0011001100

console.log((number4 * 10 + number5 * 10) / 10 === 0.3);

console.log(Number.MAX_SAFE_INTEGER);
console.log(typeof Infinity);
console.log(typeof -Infinity);
console.log(typeof NaN);
console.log(Number.isNaN(NaN));
console.log(Number.isFinite(10));
console.log(Number.isInteger(10.5));
console.log(Number.isSafeInteger(8_000_000_000_000_000));

console.log(Number("10"));
console.log(parseInt("10.5"));
console.log(parseFloat("10"));
console.log(+"10");
console.log((10.555555).toFixed(2));

let a = "10";

a = a + 1;
// a++;

console.log(a);
