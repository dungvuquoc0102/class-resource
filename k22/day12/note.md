# Day 12: Array, Math trong JavaScript

## 1. Array trong JavaScript

Array dùng để lưu danh sách dữ liệu. Đây là cấu trúc dữ liệu rất hay dùng khi làm web: danh sách sản phẩm, danh sách học viên, danh sách bài viết, giỏ hàng, menu...

### Khai báo mảng

```js
const numbers = [1, 2, 3, 4, 5];
const fruits = ["banana", "apple", "orange"];
const mixed = [1, "hello", true]; // dùng được nhưng không khuyến khích nếu dữ liệu không cùng kiểu
const emptyArr = [];
```

### Length và index

Index của mảng bắt đầu từ `0`.

```js
const fruits = ["banana", "apple", "orange"];

console.log(fruits.length); // 3
console.log(fruits[0]); // "banana"
console.log(fruits[1]); // "apple"
console.log(fruits[fruits.length - 1]); // "orange"
```

### Thêm và xóa phần tử

```js
const fruits = ["banana", "apple", "orange"];

fruits.push("mango"); // thêm cuối
fruits.pop(); // xóa cuối

fruits.unshift("kiwi"); // thêm đầu
fruits.shift(); // xóa đầu
```

Trong thực tế, `push`/`pop` hay dùng hơn `shift`/`unshift` vì thao tác ở cuối mảng thường nhanh và ít phải sắp xếp lại index.

### `splice`: thêm, xóa, thay thế giữa mảng

```js
const colors = ["đỏ", "xanh", "vàng", "tím"];

colors.splice(1, 1); // xóa 1 phần tử tại index 1
// ["đỏ", "vàng", "tím"]

colors.splice(1, 0, "hồng"); // thêm "hồng" tại index 1
// ["đỏ", "hồng", "vàng", "tím"]

colors.splice(2, 1, "cam"); // thay phần tử index 2 bằng "cam"
// ["đỏ", "hồng", "cam", "tím"]
```

### Duyệt mảng

```js
const fruits = ["banana", "apple", "orange"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

for (const fruit of fruits) {
  console.log(fruit);
}

fruits.forEach((fruit, index) => {
  console.log(index, fruit);
});
```

Lưu ý:

- `for` thường dùng khi cần index rõ ràng hoặc cần `break`/`continue`.
- `for...of` gọn khi chỉ cần value.
- `forEach` hay dùng khi muốn chạy một hành động với từng phần tử.

### Tìm kiếm trong mảng

```js
const items = ["bút", "sách", "vở", "thước", "bút"];

console.log(items.indexOf("sách")); // 1
console.log(items.lastIndexOf("bút")); // 4
console.log(items.includes("vở")); // true
console.log(items.includes("tẩy")); // false
```

Với mảng object, thường dùng `find`, `findIndex`, `some`, `every`.

```js
const users = [
  { id: 1, name: "An", active: true },
  { id: 2, name: "Bình", active: false },
  { id: 3, name: "Chi", active: true },
];

const user = users.find((user) => user.id === 2);
const userIndex = users.findIndex((user) => user.id === 2);
const hasInactiveUser = users.some((user) => user.active === false);
const allActive = users.every((user) => user.active === true);
```

### `filter`: lọc mảng

`filter` trả về mảng mới chỉ gồm các phần tử thỏa điều kiện.

```js
const scores = [45, 78, 90, 33, 62, 88];

const passedScores = scores.filter((score) => score >= 50);

console.log(passedScores); // [78, 90, 62, 88]
```

### `map`: biến đổi mảng

`map` trả về mảng mới, mỗi phần tử được biến đổi từ mảng cũ.

```js
const scores = [45, 78, 90];

const bonusScores = scores.map((score) => score + 5);

console.log(bonusScores); // [50, 83, 95]
```

`map` rất hay dùng để render UI.

```js
const users = ["Nam", "Lan", "Anh"];

const html = users.map((user) => `<li>${user}</li>`).join("");

document.querySelector("#student-list").innerHTML = html;
```

### Kết hợp `filter` và `map`

```js
const scores = [45, 78, 90, 33, 62, 88];

const result = scores
  .filter((score) => score >= 50)
  .map((score) => `Đạt ${score} điểm`);

console.log(result);
```

### Sắp xếp mảng

```js
const names = ["Nam", "Anh", "Lan", "Bình"];
names.sort();
console.log(names); // ["Anh", "Bình", "Lan", "Nam"]
```

Với số, phải truyền hàm so sánh.

```js
const nums = [5, 20, 1, 100, 3];

nums.sort(); // sai ý nghĩa số học: [1, 100, 20, 3, 5]
nums.sort((a, b) => a - b); // tăng dần
nums.sort((a, b) => b - a); // giảm dần
```

Sắp xếp object theo thuộc tính:

```js
const products = [
  { name: "Táo", price: 15000 },
  { name: "Cam", price: 8000 },
  { name: "Xoài", price: 20000 },
];

products.sort((a, b) => a.price - b.price);
```

### Tách, nối và sao chép mảng

```js
const arr = [10, 20, 30, 40, 50];

console.log(arr.slice(1, 3)); // [20, 30]
console.log(arr.slice(2)); // [30, 40, 50]
console.log(arr.slice()); // clone mảng
```

```js
const a = [1, 2];
const b = [3, 4];

const c = a.concat(b);
const d = [...a, ...b];
```

### `join` và `split`

```js
const tags = ["js", "array", "method"];

console.log(tags.join(", ")); // "js, array, method"
console.log("banana, apple, orange".split(", ")); // ["banana", "apple", "orange"]
```

### Destructuring mảng

```js
const point = [10, 20, 30];

const [x, y, z] = point;
console.log(x); // 10
console.log(y); // 20

const [first, ...rest] = point;
console.log(first); // 10
console.log(rest); // [20, 30]
```

Kết hợp với `split`:

```js
const email = "nguyenvana@gmail.com";
const [username, domain] = email.split("@");
```

### Mảng là object, so sánh theo tham chiếu

```js
const arrA = [1, 2];
const arrB = [1, 2];

console.log(arrA === arrB); // false

const arrC = arrA;
console.log(arrC === arrA); // true
```

Clone mảng đúng cách:

```js
const clone1 = arrA.slice();
const clone2 = [...arrA];
const clone3 = Array.from(arrA);
```

### Bài tập Array

1. Viết hàm `sumArray(arr)` nhận mảng số, trả về tổng các phần tử.
2. Viết hàm `findMax(arr)` tìm số lớn nhất trong mảng, không dùng `Math.max`.
3. Viết hàm `filterEven(arr)` trả về mảng chỉ gồm số chẵn.
4. Viết hàm `reverseArray(arr)` trả về mảng đảo ngược, không dùng `reverse`.
5. Viết hàm `removeDuplicates(arr)` xóa phần tử trùng, chỉ giữ lại 1 lần.
6. Cho mảng sản phẩm, dùng `filter` lấy sản phẩm có giá trên `100000`.
7. Cho mảng sản phẩm, dùng `map` render thành danh sách `<li>Tên sản phẩm - Giá</li>`.

## 2. Math trong JavaScript

`Math` là object có sẵn, dùng để tính toán. Không cần `new Math()`.

### Method thường dùng

| Method           | Ý nghĩa                              | Ví dụ                      |
| ---------------- | ------------------------------------ | -------------------------- |
| `Math.round(x)`  | Làm tròn tới số nguyên gần nhất      | `Math.round(4.6)` -> `5`   |
| `Math.ceil(x)`   | Làm tròn lên                         | `Math.ceil(4.1)` -> `5`    |
| `Math.floor(x)`  | Làm tròn xuống                       | `Math.floor(4.9)` -> `4`   |
| `Math.trunc(x)`  | Cắt phần thập phân                   | `Math.trunc(4.9)` -> `4`   |
| `Math.abs(x)`    | Trị tuyệt đối                        | `Math.abs(-10)` -> `10`    |
| `Math.min(...)`  | Số nhỏ nhất                          | `Math.min(2, 5, 1)` -> `1` |
| `Math.max(...)`  | Số lớn nhất                          | `Math.max(2, 5, 1)` -> `5` |
| `Math.pow(a, b)` | Lũy thừa                             | `Math.pow(2, 3)` -> `8`    |
| `Math.sqrt(x)`   | Căn bậc hai                          | `Math.sqrt(16)` -> `4`     |
| `Math.random()`  | Số ngẫu nhiên từ `0` đến nhỏ hơn `1` | `0 <= x < 1`               |

### `floor` và `trunc` với số âm

```js
console.log(Math.floor(-4.9)); // -5
console.log(Math.trunc(-4.9)); // -4
```

`floor` luôn làm tròn xuống phía nhỏ hơn. `trunc` chỉ cắt phần thập phân.

### Tìm min/max trong mảng

```js
const scores = [45, 92, 18, 73, 55, 99, 4];

console.log(Math.min(...scores)); // 4
console.log(Math.max(...scores)); // 99
```

`...scores` là spread operator: biến mảng thành danh sách argument.

### Random số nguyên trong khoảng

```js
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomInt(1, 10));
```

Ứng dụng: mã OTP, random màu, random phần tử, game đơn giản.
