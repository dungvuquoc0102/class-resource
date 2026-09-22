# Day 13: Prototype, Classes, Date trong JavaScript

## 1. Prototype

- Prototype là cơ chế kế thừa trong JavaScript
  - Một object tạo ra từ một constructor function sẽ kế thừa các thuộc tính và phương thức từ `prototype` của constructor function đó.
- Chuỗi kế thừa:
  - Prototype là 1 object nên nó cũng có thể được tạo ra từ một constructor function khác, hoặc chính là constructor function Object

## 2. Classes

Class là cú pháp giúp tạo nhiều object cùng cấu trúc.

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  showInfo() {
    console.log(`Tên: ${this.name}, tuổi: ${this.age}`);
  }
}

const user1 = new User("Nguyễn Văn A", 20);
const user2 = new User("Nguyễn Thị B", 21);

user1.showInfo();
user2.showInfo();
```

### Kế thừa với `extends`

```js
class Staff extends User {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }

  showRole() {
    console.log(`${this.name} - ${this.role}`);
  }
}

const staff = new Staff("Nguyễn Văn C", 25, "Marketing");
staff.showInfo();
staff.showRole();
```

Lưu ý:

- `constructor` chạy khi gọi `new`.
- `this` trỏ tới object đang được tạo.
- Class con dùng `super(...)` để gọi constructor của class cha.
- Method trong class không cần viết từ khóa `function`.

## 3. Date

`Date` dùng để lưu và xử lý thời gian.

```js
const now = new Date();
console.log(now);
```

### Tạo Date thường dùng

```js
const date1 = new Date(); // thời điểm hiện tại
const date2 = new Date("2026-07-20T20:55:00+07:00"); // ISO có timezone
const date3 = new Date(2026, 6, 20); // 20/07/2026
```

Lưu ý quan trọng: tháng trong constructor dạng số bắt đầu từ `0`.

```js
new Date(2026, 0, 1); // 01/01/2026
new Date(2026, 6, 20); // 20/07/2026
```

### Get Date Methods hay dùng

| Method          | Kết quả                         |
| --------------- | ------------------------------- |
| `getFullYear()` | Năm                             |
| `getMonth()`    | Tháng, từ `0` đến `11`          |
| `getDate()`     | Ngày trong tháng                |
| `getDay()`      | Thứ trong tuần, `0` là Chủ Nhật |
| `getHours()`    | Giờ                             |
| `getMinutes()`  | Phút                            |
| `getSeconds()`  | Giây                            |
| `getTime()`     | Milliseconds từ `01/01/1970`    |

### Format ngày đơn giản

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

const date = new Date("2026-07-20T20:55:00+07:00");

const result = `${days[date.getDay()]}, ngày ${date.getDate()} tháng ${
  date.getMonth() + 1
} năm ${date.getFullYear()}`;

console.log(result);
```

### Set Date Methods hay dùng

```js
const deadline = new Date("2026-09-15");
deadline.setDate(deadline.getDate() + 7);

console.log(deadline);
```

`Date` tự xử lý nhảy tháng/năm. Ví dụ ngày 28 cộng thêm 10 ngày thì tự sang tháng tiếp theo.

### So sánh ngày

```js
const today = new Date();
const expiredAt = new Date("2100-01-14");

if (expiredAt > today) {
  console.log("Voucher còn hạn");
} else {
  console.log("Voucher đã hết hạn");
}
```

### Tính khoảng cách giữa 2 ngày

```js
function getDaysBetween(dateStr1, dateStr2) {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.round(Math.abs(date1.getTime() - date2.getTime()) / oneDay);
}

console.log(getDaysBetween("2026-09-15", "2026-09-20")); // 5
```
