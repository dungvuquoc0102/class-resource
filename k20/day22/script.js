// Built-in object
// console.log(Math.SQRT1_2); // Căn bậc 2 của 1/2
// console.log(Math.LN2); // Logarit tự nhiên của 2
// console.log(Math.E ** Math.LN10); // Logarit tự nhiên của 10 loge(10)
// console.log(Math.LOG2E);

// const number = 4.9999;

// console.log(Math.round(number));
// console.log(Math.ceil(number));
// console.log(Math.floor(number));
// console.log(Math.trunc(number));

// console.log(Math.sign(number));

// const a = 4;
// const b = 3;

// console.log(Math.pow(a, b));
// console.log(Math.sqrt(a));
// console.log(Math.abs(a));
// console.log(Math.sin((45 * Math.PI) / 180)); // radian = degree * Math.PI / 180
// console.log(Math.min(1, 2, 5, -10));
// console.log(Math.max(1, 2, 5, -10));

// const points = [10, 20, 30, 40, 50];
// Spead operator
// Có mảng: [10, 20, 30]
// Lấy mảng và chuyển thành danh sách: 10, 20, 30
// console.log(Math.min(1, 2, 5, -10));

// Rest operator
// Có danh sách: a, b, c
// Lấy danh sách và chuyển thành mảng: [a, b, c]

// console.log(Math.max(...points));

// console.log(Math.floor(Math.random() * 10) + 1); // Random ra 1 số từ 0 tới nhỏ hơn 1
// console.log(Math.floor(Math.random() * 11));
// 0 -> 9.9999
// floor(0 -> 9.9999) => 0 -> 9
// + 1 => 1 -> 10

// console.log(Math.log(10));
// console.log(Math.log2(8));
// console.log(Math.log10(10000));

// const date = new Date("2026-05-10T10:20:30+07:00");
// const date = new Date("Jul 15 2026");

// console.log(date); // Hiển thị múi giờ của máy tính

console.dir(Date.parse("1970-01-01T00:00:01Z"));
// Số miniseconds từ 1970-01-01T00:00:00Z đến thời điểm truyền vào
console.log(Date.now());
