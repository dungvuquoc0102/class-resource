// const score = 10;
// if (score > 8) {
//   console.log("Bạn đạt học sinh giỏi!");
// }

// const score = 8;
// if (score > 8) {
//   console.log("Bạn đạt học sinh giỏi!");
// } else {
//   console.log("Bạn chưa đạt học sinh giỏi. Cố gắng lên nhé!");
// }

// let score = 5;
// if (score > 8) {
//   console.log("Bạn đạt học sinh giỏi!");
// } else if (score > 5) {
//   console.log("Bạn đạt học sinh khá!");
// } else if (score > 3) {
//   console.log("Bạn đạt học sinh trung bình!");
// } else {
//   console.log("Bạn chưa đủ điều kiện tốt nghiệp!");
// }

// let score = 5;
// switch (true) {
//   case score > 8:
//     console.log("Bạn đạt học sinh giỏi!");
//     break;
//   case score > 5:
//     console.log("Bạn đạt học sinh khá!");
//     break;
//   case score > 3:
//     console.log("Bạn đạt học sinh trung bình!");
//     break;
//   default:
//     console.log("Bạn chưa đủ điều kiện tốt nghiệp!");
// }

// let age = 20, status;
// if (age >= 18) {
//   status = "Trưởng thành";
// } else {
//   status = "Chưa đủ tuổi";
// }
// let age = 20;
// let status = age >= 18 ? "Trưởng thành" : "Chưa đủ tuổi";
// console.log(status);

// const day = "Thursday";
// switch (day) {
//   case "Monday":
//     console.log("Hôm nay là thứ Hai.");
//     break;
//   case "Tuesday":
//     console.log("Hôm nay là thứ Ba.");
//     break;
//   case "Wednesday":
//     console.log("Hôm nay là thứ Tư.");
//     break;
//   case "Thursday":
//     console.log("Hôm nay là thứ Năm.");
//     break;
//   case "Friday":
//     console.log("Hôm nay là thứ Sáu.");
//     break;
//   case "Saturday":
//     console.log("Hôm nay là thứ Bảy.");
//     break;
//   case "Sunday":
//     console.log("Hôm nay là thứ Chủ Nhật.");
//     break;
//   default:
//     console.log("Giá trị không phải là ngày trong tuần.");
// }

// const time = "8:30";
// switch (time) {
//   case "8:00":
//     console.log("Báo thức lúc 8:00.");
//   case "8:10":
//     console.log("Báo thức lúc 8:10.");
//   case "8:20":
//     console.log("Báo thức lúc 8:20.");
//   case "8:30":
//     console.log("Báo thức lúc 8:30.");
// }

// const month = 5;
// switch (month) {
//   case 1:
//   case 2:
//   case 3:
//     console.log("Quý 1");
//     break;
//   case 4:
//   case 5:
//   case 6:
//     console.log("Quý 2");
//     break;
//   case 7:
//   case 8:
//   case 9:
//     console.log("Quý 3");
//     break;
//   case 10:
//   case 11:
//   case 12:
//     console.log("Quý 4");
//     break;
//   default:
//     console.log("Invalid");
// }

// for (<câu lệnh khởi tạo>; <điều kiện dừng>; <bước nhảy>) {
//   // Code block
// }

// console.log(1);
// console.log(2);
// console.log(3);
// console.log(4);
// console.log(5);
// console.log(6);
// console.log(7);
// console.log(8);
// console.log(9);
// console.log(10);

// for (let i = 1; i <= 10; i++) {
//   if (i === 5) {
//     continue;
//   }
//   console.log(i);
// }

// Vòng lặp 1:
// let i = 1
// i <= 10
// console.log(i)
// i++

// Vòng lặp 2: i là 2
// i <= 10
// console.log(i)
// i++

// ...

// Vòng lặp 11: i là 11
// i <= 10 (false)
// Kết thúc vòng lặp

// while (condition) {
//   // Code block
// }

// let count = 1;
// while (true) {
//   console.log(count);
//   count++;
// }

// let count = 1;
// while (true) {
//   console.log(count);
//   if (count === 10) {
//     break;
//   }
//   count++;
// }

// do {
//   // Code block
// } while (condition);

// let count = 1;
// do {
//   console.log(count);
//   count++;
// } while (count < 0);

// Vòng lặp 1: Luôn có
// console.log(count);
// count++;

// Vòng lặp 2:
// count < 0 (false)
// Kết thúc vòng lặp

// let starString = "";
// for (let i = 1; i <= 10; i++) {
//   starString += "*";
//   console.log(starString);
// }

// let n = 10;
// let row = "";
// for (let i = 1; i <= n; i++) {
//   row = row + "*";
//   console.log(row);
// }

// let n = 10;
// let line = "";

// for (let i = 1; i <= n; i++) {
//   line = line + "*";
//   console.log(line);
// }

// const n = 10;
// let num1 = 0;
// let num2 = 1;
// let fibonacci = "0, 1";

// if (n === 1) {
//   console.log("0");
// } else if (n === 2) {
//   console.log("0, 1");
// } else {
//   for (let i = 3; i <= n; i++) {
//     fibonacci += ", " + (num1 + num2);
//     let temp = num1;
//     num1 = num2;
//     num2 = temp + num2;
//   }
//   console.log(fibonacci);
// }

let a = 1;
((b = 1), (s = ""), (n = 1));
if (n === 1) console.log(0);
else if (n === 2) {
  console.log(0 + ", " + 1);
} else if (n === 3) console.log(0 + ", " + 1 + ", " + 1);
else if (n > 3) {
  s = 0 + ", " + 1 + ", " + 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    s = s + ", " + c;
    a = b;
    b = c;
  }
}
console.log(s);
