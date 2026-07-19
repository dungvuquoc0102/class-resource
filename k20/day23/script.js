// console.log(new Date());

// Ngày 20 tháng 7 năm 2026
// const date = new Date(2026, 6, 20); // Tháng trong JavaScript bắt đầu từ 0 (0 = tháng 1, 1 = tháng 2, ..., 6 = tháng 7)
// console.log(Date.parse(date));
// |-----------------------> now     Date.now()
// |--------10/10/2020               Date.parse(date)

// const date = new Date();

// console.log(date.getFullYear());
// console.log(date.getMonth()); // 0 -> 11 [1, 2,..., 12]
// console.log(date.getDate());
// console.log(date.getHours());
// console.log(date.getMinutes());
// console.log(date.getSeconds());
// console.log(date.getMilliseconds());
// console.log(date.getTime());
// console.log(date.getDay()); // 0 -> 6 [ Chủ Nhật, Thứ 2, Thứ 3, Thứ 4, Thứ 5, Thứ 6, Thứ 7]

// console.log(date.getUTCFullYear());
// console.log(date.getUTCMonth()); // 0 -> 11 [1, 2,..., 12]
// console.log(date.getUTCDate());
// console.log(date.getUTCHours());
// console.log(date.getUTCMinutes());
// console.log(date.getUTCSeconds());
// console.log(date.getUTCMilliseconds());

// console.log(date.getTimezoneOffset());

// const date = new Date("2026-07-20T20:55:00+07:00");

// console.log(
//   `Bây giờ là ${date.getHours()} giờ ${date.getMinutes()} phút ${date.getSeconds()},${date.getDay() == 0 ? " Chủ nhật" : ` Thứ ${date.getDay() + 1}`} ngày ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`,
// );

// Cho đoạn code
// const date = new Date("...+07:00");
// const days = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
// function getDayName(dayIndex) {
//   const days = [
//     "Chủ Nhật",
//     "Thứ 2",
//     "Thứ 3",
//     "Thứ 4",
//     "Thứ 5",
//     "Thứ 6",
//     "Thứ 7",
//   ];
//   return days[dayIndex];
// }
// console.log(
//   `Bây giờ là ${date.getHours()} giờ ${date.getMinutes()} phút ${date.getSeconds()} giây, ${getDayName(date.getDay())} ngày ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`,
// );
// In ra: Bây giờ là ... giờ ... phút ... giây, Thứ .../Chủ Nhật ngày ... tháng ... năm ...

// const date = new Date();

// const futureDate = new Date(Date.now() + 3600 * 1000); // 1 giờ sau

// console.log(futureDate);

// date.setFullYear(2025);
// date.setMonth(10);
// date.setDate(15);
// date.setHours(10);
// date.setMinutes(30);
// date.setSeconds(45);
// date.setMilliseconds(500);
// date.setTime(Date.now() - 60 * 60 * 1000);
// console.log(date);

// const a = 10; // -> Global scope

// function greeting() {
//   const string = "Hello"; // -> Function scope
//   // console.log(string);
//   console.log(a);
// }
// greeting();

// if (true) {
//   const b = 20;
//   // console.log(b);
// }

// for (let i = 0; i < 5; i++) {
//   // console.log(i);
// }

// while (true) {
//   break;
// }

// {
//   var d = 40; // -> Function scope
//   const c = 30; // -> Block scope
//   console.log(a);
// }
// console.log(d);

// function test() {
//   a = 10;
// }
// test();

// console.log(a);

let a = 10;
{
  var b = 20;
  {
    const c = 30;
    {
      function test() {
        let d = 40;
        {
          console.log(c);
        }
      }
    }
  }
  test();
}

console.dir(new Date("2026-07-20T20:55:00+07:00").getTime());

console.log(
  Temporal.Instant.from("2026-07-20T20:55:00+07:00").epochMilliseconds,
);
console.log(Temporal.Now.instant());
