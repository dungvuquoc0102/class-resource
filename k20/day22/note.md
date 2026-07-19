# Day 22: Math, Date trong JavaScript

## Object Math

- Math.PI
- Math.E
- Math.SQRT2
- Math.SQRT1_2
- Math.LN2
- Math.LN10
- Math.LOG2E
- Math.LOG10E

- Math.round(x)
- Math.ceil(x)
- Math.floor(x)
- Math.trunc(x)

- Math.sign(x)

- Math.pow(x, y)
- Math.sqrt(x)
- Math.abs(x)
- Math.sin(x)
- Math.cos(x)
- Math.min()
- Math.max()
- Math.random()
- Math.log(x)
- Math.log2(x)
- Math.log10(x)

## Date Formats

- ISO Date ("YYYY-MM-DD", "YYYY-MM", "YYYY", "YYYY-MM-DDTHH:MM:SSZ")
- Short Date ("MM/DD/YYYY")
- Long Date ("Mar 25 2015", "25 Mar 2015", "January 25 2015")
- Date.parse(dateString)
- Date.now()

## Get Date Methods

- new Date()
- getFullYear()
- getMonth()
- getDate()
- getDay()
- getHours()
- getMinutes()
- getSeconds()
- getMilliseconds()
- getTime()
- Date.now()
- getUTCDate()
- getUTCFullYear()
- getUTCMonth()
- getUTCDay()
- getUTCHours()
- getUTCMinutes()
- getUTCSeconds()
- getUTCMilliseconds()
- getTimezoneOffset()

## Set Date Methods

- setDate(day)
- setFullYear(year [, month, day])
- setHours(hour [, min, sec, ms])
- setMilliseconds(ms)
- setMinutes(min [, sec, ms])
- setMonth(month [, day])
- setSeconds(sec [, ms])
- setTime(milliseconds)
- Compare Dates (>, <, >=, <=)

## Exercises

- Exercise 1 (Math.round vs Math.ceil vs Math.floor vs Math.trunc): Cho biến số thực `const price = 450.65;` và số thực âm `const negativePrice = -450.65;`.
- Dùng lần lượt cả 4 phương thức `Math.round`, `Math.ceil`, `Math.floor`, `Math.trunc` cho cả `price` và `negativePrice`, in kết quả ra console.
- Rút ra nhận xét về sự khác biệt giữa `Math.floor` và `Math.trunc` khi xử lý các số âm.

- Exercise 2 (Math.min & Math.max với mảng): Cho mảng điểm số sau:

```js
const scores = [45, 92, 18, 73, 55, 99, 4];
```

- Sử dụng `Math.min` và `Math.max` kết hợp với Spread Operator (`...`) để tìm điểm số thấp nhất và cao nhất trong mảng, in kết quả ra console.

- Exercise 3 (Math.random — Tạo số ngẫu nhiên trong khoảng):
- Viết một hàm `getRandomInt(min, max)` trả về một số nguyên ngẫu nhiên nằm trong khoảng từ `min` đến `max` (bao gồm cả `min` và `max`). Gợi ý: Kết hợp `Math.random()` và `Math.floor()`.
- Chạy thử hàm với khoảng từ `1` đến `10` mười lần để kiểm tra kết quả in ra console.

- Exercise 4 (Math.sin & Math.cos — Tính toán lượng giác):
- Hãy tính giá trị Sine của góc $90^\circ$ và Cosine của góc $0^\circ$ trong JavaScript.
- Sử dụng công thức chuyển đổi từ độ sang Radian ($\text{Radian} = \text{Độ} \times \frac{\pi}{180}$) trước khi truyền vào phương thức của đối tượng `Math` để đảm bảo kết quả chính xác (`Math.sin(90 * Math.PI / 180)`).

- Exercise 5 (Math.log & Luỹ thừa):
- Dùng `Math.log2()` để xác định xem cần nhân số 2 bao nhiêu lần để được `8` (`Math.log2(8)`).
- Dùng `Math.log10()` để xác định xem cần nhân số 10 bao nhiêu lần để được `1000` (`Math.log10(1000)`).
- Dùng `Math.pow()` để tính ngược lại xem kết quả vừa tìm được có chính xác hay không.

- Exercise 6 (Date Input — Khởi tạo các định dạng): Khởi tạo 4 thực thể `Date` khác nhau từ các chuỗi sau và dùng `console.log()` in chúng ra:
- Định dạng ISO đầy đủ: `"2015-03-25T12:00:00Z"`
- Định dạng ISO rút gọn: `"2015-03"`
- Định dạng Short Date: `"03/25/2015"`
- Định dạng Long Date: `"Mar 25 2015"`
- Quan sát và giải thích sự khác biệt về múi giờ (Time Zones) in ra trên console giữa định dạng có đuôi `Z` và múi giờ mặc định của trình duyệt.

- Exercise 7 (Date.parse — Chuyển đổi chuỗi ngày):
- Dùng `Date.parse("March 21, 2012")` để chuyển đổi chuỗi ngày thành số mili-giây tính từ mốc January 1, 1970.
- Dùng số mili-giây vừa nhận được truyền vào constructor `new Date(msec)` để tạo đối tượng Date mới. In thực thể đó ra để kiểm tra.

- Exercise 8 (Get Date Methods — Hiển thị thứ bằng tiếng Việt): Cho một mảng tên các thứ trong tuần:

```js
const days = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];
```

- Khởi tạo một đối tượng thời gian hiện tại (`new Date()`).
- Sử dụng phương thức `getDay()` lấy ra chỉ số ngày trong tuần, ánh xạ vào mảng trên và in ra màn hình chuỗi có dạng: `"Hôm nay là: Thứ..."`.

- Exercise 9 (Get/Set Date Methods — Tính toán ngày tương lai): Một học viên đăng ký khóa học vào ngày `"January 01, 2025"`. Thời hạn hoàn thành khóa học là cộng thêm đúng 50 ngày.
- Khởi tạo đối tượng Date với ngày trên. Dùng `setDate()` kết hợp `getDate() + 50` để cộng thêm ngày.
- In ngày hết hạn ra console. Giải thích cơ chế tự động xử lý khi nhảy tháng/năm của đối tượng Date trong JavaScript.

- Exercise 10 (Date.now — Tính toán số năm):
- Sử dụng phương thức static `Date.now()` để lấy số mili-giây hiện tại kể từ mốc 1/1/1970.
- Viết các biến quy đổi thời gian: `minute = 1000 * 60`, `hour = minute * 60`, `day = hour * 24`, `year = day * 365`.
- Tính toán và in ra màn hình tổng số năm đã trôi qua kể từ mốc `1970/01/01` cho tới nay bằng cách làm tròn `Math.round(Date.now() / year)`.

- Exercise 11 (Compare Dates — Kiểm tra hạn voucher): Cho đoạn code so sánh thời gian sau:

```js
const today = new Date();
const someday = new Date();
someday.setFullYear(2100, 0, 14); // January 14, 2100
```

- Viết cấu trúc điều kiện `if...else` so sánh `someday` và `today`.
- Nếu `someday > today`, in ra `"Today is before January 14, 2100."`, ngược lại in ra `"Today is after January 14, 2100."`.

- Exercise 12 (Bài tập tổng hợp — Tính khoảng cách giữa hai mốc ngày): Viết hàm `getDaysBetween(dateStr1, dateStr2)` nhận vào 2 chuỗi ngày tháng bất kỳ hợp lệ.
- Hàm này sẽ tính toán và trả về chính xác số ngày chênh lệch giữa 2 mốc thời gian đó (kết quả là số nguyên dương).
- Gợi ý: Quy đổi cả 2 về dạng mili-giây bằng `getTime()`, lấy hiệu trị tuyệt đối (`Math.abs`), sau đó chia cho số mili-giây của một ngày ($1000 \times 60 \times 60 \times 24$) rồi làm tròn bằng `Math.round()`.
- Test hàm với: `getDaysBetween("2015-03-25", "2015-04-05")`.

Sau khi hoàn thành cả 12 bài, viết vài dòng tổng kết: tóm tắt lại các lưu ý quan trọng về cách hoạt động tĩnh của `Math`, quy tắc đếm tháng từ `0-11` của `Date`, và cơ chế tự nhảy ngày tháng thông minh khi sử dụng nhóm phương thức `set`.
