# Day 16: String, Number, Array trong JavaScript

## Array: Duyệt và thao tác mảng

Array dùng để lưu danh sách dữ liệu. Đây là cấu trúc dữ liệu quan trọng nhất trong thực tế.

### Khai báo mảng

```js
let arr1 = []; // Mảng rỗng
let arr2 = [1, 2, 3, 4, 5]; // Mảng số
let arr3 = ["táo", "cam", "xoài"]; // Mảng chuỗi
let arr4 = [1, "hello", true, null]; // Mảng hỗn hợp (không khuyến khích)
let arr5 = new Array(5); // Tạo mảng 5 phần tử rỗng

// Lấy độ dài
arr2.length; // 5

// Truy cập phần tử (index bắt đầu từ 0)
arr3[0]; // "táo"
arr3[1]; // "cam"
arr3[arr3.length - 1]; // "xoài" - phần tử cuối
```

### Thêm và xóa phần tử

```js
let stack = ["a", "b", "c"];

// Thêm cuối
stack.push("d"); // ["a", "b", "c", "d"] - trả về độ dài mới 4

// Xóa cuối
stack.pop(); // "d" - mảng còn ["a", "b", "c"]

// Thêm đầu
stack.unshift("z"); // ["z", "a", "b", "c"] - trả về độ dài mới 4

// Xóa đầu
stack.shift(); // "z" - mảng còn ["a", "b", "c"]

// Thêm/xóa giữa: splice
let colors = ["đỏ", "xanh", "vàng", "tím"];
colors.splice(1, 1); // Xóa 1 phần tử tại index 1 → ["đỏ", "vàng", "tím"]
colors.splice(1, 0, "hồng"); // Thêm "hồng" tại index 1 → ["đỏ", "hồng", "vàng", "tím"]
colors.splice(2, 1, "cam"); // Thay thế: xóa 1 tại index 2, thêm "cam" → ["đỏ", "hồng", "cam", "tím"]
```

### Duyệt mảng

```js
let fruits = ["táo", "cam", "xoài"];

// for loop cổ điển
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// for...of (ES6)
for (let fruit of fruits) {
  console.log(fruit);
}

// forEach
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});
// 0: táo
// 1: cam
// 2: xoài
```

### Tìm kiếm trong mảng

```js
let items = ["bút", "sách", "vở", "thước", "sách"];

// indexOf - tìm vị trí đầu tiên
items.indexOf("sách"); // 1
items.indexOf("tẩy"); // -1 (không tìm thấy)

// lastIndexOf - tìm vị trí cuối cùng
items.lastIndexOf("sách"); // 4

// includes - kiểm tra tồn tại (true/false)
items.includes("vở"); // true
items.includes("tẩy"); // false

// find - tìm phần tử đầu tiên thỏa mãn
let numbers = [10, 25, 37, 42, 58];
let found = numbers.find((n) => n > 30); // 37

// findIndex - tìm vị trí đầu tiên thỏa mãn
let idx = numbers.findIndex((n) => n > 30); // 2

// some - kiểm tra có ít nhất 1 phần tử thỏa mãn
numbers.some((n) => n > 50); // true

// every - kiểm tra tất cả phần tử thỏa mãn
numbers.every((n) => n > 5); // true
```

### Lọc và biến đổi mảng

```js
let scores = [45, 78, 90, 33, 62, 88];

// filter - lọc theo điều kiện
let pass = scores.filter((s) => s >= 50);
// [78, 90, 62, 88]

// map - biến đổi từng phần tử
let doubled = scores.map((s) => s * 2);
// [90, 156, 180, 66, 124, 176]

// map thường dùng để render danh sách UI
let users = ["Nam", "Lan", "Anh"];
let lis = users.map((u) => `<li>${u}</li>`);
// ["<li>Nam</li>", "<li>Lan</li>", "<li>Anh</li>"]

// filter + map kết hợp
let result = scores.filter((s) => s >= 50).map((s) => `Đạt ${s} điểm`);
// ["Đạt 78 điểm", "Đạt 90 điểm", "Đạt 62 điểm", "Đạt 88 điểm"]
```

### Sắp xếp mảng

```js
// sort với string (theo alphabet)
let names = ["Nam", "Anh", "Lan", "Bình"];
names.sort();
// ["Anh", "Bình", "Lan", "Nam"]

// sort với số - cần truyền hàm so sánh
let nums = [5, 20, 1, 100, 3];
nums.sort(); // Sai! [1, 100, 20, 3, 5] - sort theo string

nums.sort((a, b) => a - b); // Tăng dần: [1, 3, 5, 20, 100]
nums.sort((a, b) => b - a); // Giảm dần: [100, 20, 5, 3, 1]

// Sắp xếp object theo thuộc tính
let products = [
  { name: "Táo", price: 15000 },
  { name: "Cam", price: 8000 },
  { name: "Xoài", price: 20000 },
];
products.sort((a, b) => a.price - b.price);
// [{ name: "Cam", price: 8000 }, { name: "Táo", price: 15000 }, { name: "Xoài", price: 20000 }]

// reverse - đảo ngược mảng
nums.reverse();
```

### Tách, nối và sao chép

```js
// slice - tách mảng con (không làm thay đổi mảng gốc)
let arr = [10, 20, 30, 40, 50];
arr.slice(1, 3); // [20, 30] (start, end - end không bao gồm)
arr.slice(2); // [30, 40, 50]
arr.slice(); // [10, 20, 30, 40, 50] - clone mảng

// concat - nối mảng
let a = [1, 2];
let b = [3, 4];
a.concat(b); // [1, 2, 3, 4]

// Spread operator - cách hiện đại
let c = [...a, ...b]; // [1, 2, 3, 4]
let d = [0, ...a, 2.5, ...b]; // [0, 1, 2, 2.5, 3, 4]
```

### Nối mảng thành chuỗi và ngược lại

```js
// join - nối mảng thành chuỗi
let tags = ["js", "array", "method"];
tags.join(", "); // "js, array, method"
tags.join(""); // "jsarraymethod"

// split - tách chuỗi thành mảng (đã học ở phần String)
"hello world".split(" "); // ["hello", "world"]
```

---

Hết buổi 16

---

### Destructuring mảng

```js
let point = [10, 20, 30];

let [x, y, z] = point;
console.log(x); // 10
console.log(y); // 20

// Bỏ qua phần tử
let [first, , third] = point;
// first = 10, third = 30

// Lấy phần tử đầu và phần còn lại (rest)
let [head, ...rest] = point;
// head = 10, rest = [20, 30]

// Kết hợp với split - hay dùng khi parse dữ liệu
let email = "nguyenvana@gmail.com";
let [username, domain] = email.split("@");
// username = "nguyenvana", domain = "gmail.com"
```

### Mảng lồng nhau (nested array)

```js
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

matrix[0][1]; // 2
matrix[2][2]; // 9

// Duyệt mảng 2 chiều
for (let row of matrix) {
  for (let cell of row) {
    console.log(cell);
  }
}
```

### Một số lưu ý quan trọng

```js
// push/pop nhanh hơn shift/unshift (shift/unshift phải re-index)
// Sử dụng theo tư duy stack: push/pop ở cuối

// Tham chiếu - mảng là object, so sánh theo tham chiếu
let arrA = [1, 2];
let arrB = [1, 2];
arrA === arrB; // false (khác ô nhớ)

let arrC = arrA;
arrC === arrA; // true (cùng tham chiếu)

// Clone đúng cách
let clone1 = arrA.slice();
let clone2 = [...arrA];
let clone3 = Array.from(arrA);

// Mảng giả (array-like) - arguments, NodeList, HTMLCollection
// Muốn dùng map/filter thì chuyển thành mảng trước:
// Array.from(nodeList) hoặc [...nodeList]
```

### Bài tập Array

1. **Tính tổng mảng**: Viết hàm `sumArray(arr)` nhận mảng số, trả về tổng các phần tử.  
   `sumArray([1, 2, 3, 4, 5])` → `15`

2. **Tìm số lớn nhất**: Viết hàm `findMax(arr)` tìm số lớn nhất trong mảng (không dùng Math.max).  
   `findMax([3, 7, 2, 9, 5])` → `9`

3. **Lọc số chẵn**: Viết hàm `filterEven(arr)` trả về mảng chỉ gồm số chẵn.  
   `filterEven([1, 2, 3, 4, 5, 6])` → `[2, 4, 6]`

4. **Đảo ngược mảng**: Viết hàm `reverseArray(arr)` trả về mảng đảo ngược (không dùng `reverse()`).  
   `reverseArray([1, 2, 3])` → `[3, 2, 1]`

5. **Xóa phần tử trùng**: Viết hàm `removeDuplicates(arr)` xóa các phần tử trùng nhau, chỉ giữ lại 1 lần.  
   `removeDuplicates([1, 2, 2, 3, 1, 4, 3])` → `[1, 2, 3, 4]`

6. **Gộp mảng không trùng**: Viết hàm `mergeUnique(arr1, arr2)` gộp 2 mảng và loại bỏ trùng.  
   `mergeUnique([1, 2, 3], [2, 3, 4])` → `[1, 2, 3, 4]`

7. **Nhóm sản phẩm theo danh mục**: Cho mảng sản phẩm, viết hàm `groupByCategory(products)` trả về object với key là danh mục.
   ```js
   let products = [
     { name: "Táo", category: "Trái cây" },
     { name: "Bánh mì", category: "Bánh" },
     { name: "Cam", category: "Trái cây" },
   ];
   // Kết quả:
   // {
   //   "Trái cây": ["Táo", "Cam"],
   //   "Bánh": ["Bánh mì"]
   // }
   ```

---

Hết buổi 16

```

```

## String: Xử lý chuỗi trong thực tế

Chuỗi (string) là kiểu dữ liệu được dùng nhiều nhất khi làm việc với dữ liệu từ người dùng, API, hay hiển thị nội dung.

### Template literals - nội suy chuỗi

Thay vì cộng chuỗi bằng `+`, dùng backtick `` ` `` để nhúng biến:

```js
let name = "Nam";
let age = 22;

// Cộng chuỗi
console.log("Tôi tên là " + name + ", " + age + " tuổi");

// Template literals
console.log(`Tôi tên là ${name}, ${age} tuổi`);
```

```js
// Tính toán trong ${}
let a = 5,
  b = 10;
console.log(`${a} + ${b} = ${a + b}`); // "5 + 10 = 15"

// Multi-line
let html = `
  <div>
    <h1>Hello ${name}</h1>
  </div>
`;
```

### Các method xử lý chuỗi thường gặp

```js
let str = "  Hello World, Xin chào!  ";

// Cắt khoảng trắng
str.trim(); // "Hello World, Xin chào!"
str.trimStart(); // "Hello World, Xin chào!  "
str.trimEnd(); // "  Hello World, Xin chào!"

// Chuyển đổi hoa/thường
str.toLowerCase(); // "  hello world, xin chào!  "
str.toUpperCase(); // "  HELLO WORLD, XIN CHÀO!  "
```

```js
// Tìm kiếm trong chuỗi
let text = "Học JavaScript tại lớp K20";

text.indexOf("JavaScript"); // 4
text.includes("K20"); // true
text.startsWith("Học"); // true
text.endsWith("K20"); // true

// Cắt chuỗi
text.slice(4, 14); // "JavaScript" (start, end)
text.slice(4); // "JavaScript tại lớp K20"
text.substring(4, 14); // "JavaScript"

// Thay thế
text.replace("JavaScript", "JS"); // "Học JS tại lớp K20"
// Thay toàn bộ
text.replaceAll("a", "A"); // "Học JAvAScript tại lớp K20"
```

### Tách và nối chuỗi

```js
// CSV -> Array
let csv = "táo, cam, xoài, chuối";
let fruits = csv.split(", ");
// ["táo", "cam", "xoài", "chuối"]

// Array -> String
fruits.join(" | "); // "táo | cam | xoài | chuối"
```

### Xử lý tên, email thực tế

```js
// Viết hoa chữ cái đầu mỗi từ
function capitalize(str) {
  return str
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

capitalize("  nguyễn văn A  "); // "Nguyễn Văn A"

// Ẩn bớt email
function maskEmail(email) {
  let [name, domain] = email.split("@");
  return name.slice(0, 3) + "***@" + domain;
}

maskEmail("nguyenvana@gmail.com"); // "ngu***@gmail.com"
```

### Bài tập String

1. **Chuẩn hóa họ tên**: Viết hàm `normalizeName(name)` nhận chuỗi họ tên, xoá khoảng trắng thừa, viết hoa chữ đầu mỗi từ, và trả về chuẩn.  
   `normalizeName("  nguyễN   vĂN   a  ")` → `"Nguyễn Văn A"`

2. **Rút gọn tên**: Viết hàm `shortName(fullName)` chỉ giữ lại họ và tên, bỏ tên đệm.  
   `shortName("Nguyễn Văn Anh")` → `"Nguyễn Anh"`

3. **Kiểm tra email**: Viết hàm `isValidEmail(email)` kiểm tra email hợp lệ (có `@`, có domain, không có khoảng trắng).  
   `isValidEmail("test@gmail.com")` → `true`, `isValidEmail("test @gmail.com")` → `false`

4. **Đếm ký tự**: Viết hàm `countChar(str, char)` đếm số lần xuất hiện của `char` trong `str`.  
   `countChar("javascript", "a")` → `2`

5. **Ẩn số điện thoại**: Viết hàm `maskPhone(phone)` ẩn 4 số giữa, chỉ hiện 3 số đầu và 2 số cuối.  
   `maskPhone("0987654321")` → `"098*****21"`

---

## Number: Format số và tiền tệ

Làm việc với số trong thực tế thường cần định dạng theo vùng miền, làm tròn, hiển thị tiền tệ.

### Các method hữu ích

```js
// Làm tròn
let price = 123.4567;

price.toFixed(2); // "123.46" - làm tròn 2 chữ số thập phân, trả về string
price.toFixed(0); // "123"
Math.round(price); // 123
Math.floor(price); // 123
Math.ceil(price); // 124

// Chuyển về số
Number("123.45"); // 123.45
parseInt("123.45"); // 123
parseFloat("123.45"); // 123.45
+"123.45"; // 123.45 (cách ngắn)
```

### Intl.NumberFormat - Format số chuyên nghiệp

`Intl.NumberFormat` là API có sẵn trong trình duyệt/NodeJS dùng để format số theo locale.

```js
// Format số với dấu phân cách
let n = 1234567.89;

new Intl.NumberFormat("vi-VN").format(n);
// "1.234.567,89"

new Intl.NumberFormat("en-US").format(n);
// "1,234,567.89"
```

### Format tiền tệ

```js
let price = 2500000;

new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
}).format(price);
// "2.500.000 ₫"

new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(price);
// "$2,500,000.00"

new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
}).format(price);
// "¥2,500,000"
```

### Format phần trăm

```js
let rate = 0.857;

new Intl.NumberFormat("vi-VN", {
  style: "percent",
  maximumFractionDigits: 1,
}).format(rate);
// "85,7%"
```

### Xử lý giá trị nhập từ input

```js
// Xoá ký tự không phải số, giữ lại số
function parseCurrency(input) {
  return Number(input.replace(/[^\d]/g, ""));
}

parseCurrency("1.234.567₫"); // 1234567
parseCurrency("$2,500.00"); // 250000

// Hiển thị giá dạng rút gọn
function formatCompact(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

formatCompact(2500000); // "2.5M"
formatCompact(12500); // "12.5K"
```

---
