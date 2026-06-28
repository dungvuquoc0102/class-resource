// Syntax
// Guide style
// If else, truthy - falsy, switch case
// Loop: for, while, do while
// Data types: string, number, boolean, null, undefined, bigint, symbol, object
// Array (Object)
// String, Number, Function (Object)

// const name0 = "John";
// const name1 = "John";
// const name2 = 'Jo"hn';
// const name3 = `Jo'h"n`;
// const name4 = "Jo\vhn";

// const name5 = new String("John");
// const name6 = new String("John");
// console.log(name1 === name5);
// console.log(name5 === name6);

// Độ dài chuỗi
const name = "John Doe";

// console.log(name.length);

// Phương thức truy xuất ký tự trong chuỗi
// console.log(name.at(-1));
// console.log(name.charAt(-1));
// console.log(name[-1]);
// console.log(name.charCodeAt(0));
// console.log(name.codePointAt(0));

// Phương thức truy xuất chuỗi con
// console.log(name.slice(-3));
// console.log(name.substring(-1, 4));
// console.log(name.substr(5, 2));

// Phương thức tìm kiếm trong chuỗi
// console.log(name.indexOf("o", 5));
// console.log(name.lastIndexOf("o", 5));
// console.log(name.search(/O/));
// console.log(name.includes("n", 5));
// const arr = name.match(/o/);
// console.log(arr);
// const arrs = name.matchAll("o");
// console.log(
//   arrs.forEach((item) => {
//     console.log(item);
//   }),
// );
// console.log(name.startsWith("Do", 5));
// console.log(name.endsWith("hn", 4));

// Phương thức nối chuỗi
// console.log(name.concat(", ", "Jane"));

// Phương thức làm đầy chuỗi
// const number = "0987";
// console.log(number.padStart(5, "0"));
// console.log(number.padEnd(10, "*"));

// Phương thức khác
// console.log(name.trim());
// console.log(name.trimStart());
// console.log(name.trimEnd());
// console.log(name.toLowerCase());
// console.log(name.toUpperCase());
// console.log(name.split("e"));
// console.log(name.replace(/o/g, "a"));
// console.log(name.replaceAll("o", "a"));

// Bài 1
const paragraph = `Mình từng tích hợp OpenAI API vào một app nội bộ, chạy ngon 2 tháng đầu. Tháng thứ 3, hóa đơn tăng gấp đôi vì context window dài hơn mình ước tính. Đó là lúc mình nhận ra: chọn API không phải chỉ là "cái nào xịn hơn" - mà là cái nào phù hợp với use case và ngân sách của bạn.

Hiện tại có 3 nhà cung cấp đang chiếm phần lớn thị phần AI API cho developer: OpenAI (GPT-4o, o1), Anthropic (Claude 3.5 Sonnet/Haiku), và Google (Gemini 1.5 Pro/Flash). Ba cái tên này xuất hiện trong hầu hết mọi tech stack khi team muốn thêm AI vào sản phẩm web.

Bài này mình sẽ không nói "API X tốt nhất" vì không có câu trả lời chung. Thay vào đó, mình sẽ đi qua từng tiêu chí mà dev web thực sự cần quan tâm: chất lượng đầu ra, context window, multimodal, và chi phí triển khai.`;
// 1. Bỏ hết xuống dòng
// 2. "AI" -> "XXX"

// console.log(paragraph.replaceAll("\n\n", " ").replaceAll("AI", "XXX"));
// console.log("Lo\n\nrem");

// Bài 2
const fullname = "nguyen thi c";
// "Nguyen Van A"
// fullname
//   .split(" ")
//   .map((item) => {
//     return item[0].toUpperCase() + item.slice(1);
//   })
//   .join(" ");

console.log(
  fullname
    .trim()
    .split(/\s+/g)
    .map((word) => word.at(0).toUpperCase().concat(word.slice(1).toLowerCase()))
    .join(" "),
);
