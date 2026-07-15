# Day 21: Advanced Objects

## Object object

- Object.assign
- Object.create
- Object.fromEntries
- Object.groupBy

- Object.defineProperty
- Object.defineProperties
- Object.getOwnPropertyDescriptor
- Object.getOwnPropertyDescriptors
- Object.getOwnPropertyNames
- Object.getPrototypeOf

- Object.preventExtensions
- Object.isExtensible
- Object.seal
- Object.isSealed
- Object.freeze
- Object.isFrozen

## Prototypes

- Intro
- Prototype chain
- Object.setPrototypeOf(obj, proto)
- hasOwnProperty()
- Object.hasOwn(obj, prop)

## Iterable

- Intro
- [Symbol.iterator]
- next()
- for...of, spread operator, Array.from()

## Exercises

- Exercise 1 (Object.groupBy): Cho mảng:

  ```js
  const products = [
    { name: "Áo thun", category: "Thời trang", price: 150000 },
    { name: "Laptop", category: "Điện tử", price: 15000000 },
    { name: "Quần jean", category: "Thời trang", price: 300000 },
    { name: "Tai nghe", category: "Điện tử", price: 500000 },
  ];
  ```

  - Dùng `Object.groupBy(...)` để nhóm sản phẩm theo `category`, in kết quả ra console.

- Exercise 2 (Object.defineProperty): Cho:

  ```js
  const user = { name: "An" };
  ```

  - Dùng `Object.defineProperty` thêm property `id` với giá trị `1001`, `writable: false`, `enumerable: false`.
  - Thử gán `user.id = 9999`, in `user.id` ra kiểm tra xem có đổi không.
  - Dùng `for...in` hoặc `console.log(user)` để kiểm tra `id` có xuất hiện không, giải thích vì sao.

- Exercise 3 (Object.defineProperties): Cho object rỗng `const product = {}`. Dùng `Object.defineProperties` định nghĩa cùng lúc:
  - `name` (`value: "Bàn phím"`, `writable: true`, `enumerable: true`)
  - `price` (`value: 500000`, `writable: true`, `enumerable: true`)
  - `discountedPrice` là getter tính `price * 0.9`

  In `product.discountedPrice` ra kiểm tra.

- Exercise 4 (getOwnPropertyDescriptor(s)): Dùng lại `product` ở Exercise 3.
  - Dùng `Object.getOwnPropertyDescriptor(product, "price")` in ra descriptor của `price`.
  - Dùng `Object.getOwnPropertyDescriptors(product)` in ra toàn bộ descriptor của `product`. So sánh 2 kết quả.

- Exercise 5 (getOwnPropertyNames vs Object.keys): Cho lại `user` ở Exercise 2 (đã có `id` với `enumerable: false`).
  - In `Object.keys(user)` và `Object.getOwnPropertyNames(user)` ra console, so sánh 2 kết quả và giải thích khác biệt.

- Exercise 6 (Cấu hình ứng dụng): Một ứng dụng load cấu hình lúc khởi động, các module sau đó có thể sửa giá trị hoặc xóa cấu hình đã lỗi thời, nhưng tuyệt đối không được vô tình thêm key mới (thường là do gõ nhầm tên biến, gây bug khó phát hiện vì JS không báo lỗi khi gán property lạ vào object thường).

  ```js
  const appConfig = {
    theme: "dark",
    fontSize: 16,
    language: "vi",
  };
  ```

  - Áp dụng đúng phương thức để khóa việc thêm property mới nhưng vẫn cho sửa/xóa property cũ.
  - Dùng phương thức nào để kiểm tra trạng thái khóa của object.

- Exercise 7 (Bản ghi phiên đăng nhập): Một object đại diện cho session của user, có cấu trúc cố định (không được thêm field lạ vào giữa chừng, không được xóa field bắt buộc), nhưng giá trị các field vẫn cần cập nhật liên tục trong lúc user hoạt động (VD: `lastActive`).

  ```js
  const session = {
    userId: 101,
    username: "minhle",
    role: "student",
    lastActive: Date.now(),
  };
  ```

  - Áp dụng đúng phương thức để khóa thêm/xóa property nhưng vẫn cho sửa giá trị.
  - Dùng phương thức nào để kiểm tra trạng thái khóa của object.

- Exercise 8 (Hằng số cấu hình toàn cục): Một object chứa các hằng số dùng xuyên suốt ứng dụng (API endpoint, giới hạn retry...), về nguyên tắc không bao giờ được thay đổi ở bất kỳ đâu trong runtime — mọi chỗ chỉ được đọc.

  ```js
  const APP_CONSTANTS = {
    API_BASE_URL: "https://api.example.com",
    MAX_RETRIES: 3,
    TIMEOUT_MS: 5000,
  };
  ```

  - Áp dụng đúng phương thức để khóa hoàn toàn: không thêm, không xóa, không sửa.
  - Dùng phương thức nào để kiểm tra trạng thái khóa của object.

- Exercise 9 (Prototype chain — Intro)
  Cho đoạn code sau:

  ```js
  function Product(name, price) {
    this.name = name;
    this.price = price;
  }
  ```

  - Tạo phương thức chung cho tất cả các sản phẩm `getInfo()` trả về chuỗi `"Tên: <name>, Giá: <price>"`.
  - Tạo sản phẩm `"Bàn phím"` với giá `1000000`, sản phẩm `"Loa"` với giá `1500000`, gọi `getInfo()` trên cả 2 sản phẩm, in ra console.
  - Tìm kiếm object cha mà các sản phẩm kể trên kế thừa, in ra console.
  - Tìm kiếm object cha của object cha vừa tìm được kế thừa, in ra console. Object tìm được còn kế thừa object nào nữa không?

- Exercise 10 (Object.setPrototypeOf)
  Cho đoạn code sau:

  ```js
  const greeter = {
    greet() {
      return `Xin chào, tôi là ${this.name}`;
    },
  };

  const student1 = { name: "Hoa" };
  const student2 = { name: "An" };
  student1.greet();
  student2.greet();
  ```

  - Sửa lại một cách tối ưu để chương trình trên không lỗi nữa.

- Exercise 11 (hasOwnProperty vs for...in): Dùng lại `student` đã setPrototypeOf ở Exercise 8.
  - Dùng `for...in` in ra tất cả property/method mà vòng lặp duyệt qua (sẽ thấy cả `greet` dù nó nằm ở prototype).
  - Trong vòng lặp đó, thêm điều kiện `student.hasOwnProperty(key)` để chỉ in property "của riêng" `student`. So sánh kết quả trước/sau khi thêm điều kiện.``

- Exercise 12 (Object.hasOwn vs hasOwnProperty)
  Cho:

  ```js
  const obj = Object.create(null);
  obj.name = "Test";
  ```

  - Thử gọi `obj.hasOwnProperty("name")` — quan sát lỗi xảy ra, giải thích tại sao (gợi ý: `obj` không kế thừa từ `Object.prototype`).
  - Sửa lại bằng `Object.hasOwn(obj, "name")`, xác nhận chạy đúng không lỗi. Giải thích tại sao `Object.hasOwn` an toàn hơn.

- Exercise 13 (Iterable — Intro)
  Cho:

  ```js
  const arr = [10, 20, 30];
  const str = "abc";
  ```

  - Dùng `for...of` duyệt qua `arr` và `str`, in từng phần tử.
  - Thử dùng `for...in` duyệt qua `arr`, so sánh kết quả in ra với `for...of` (gợi ý: `for...in` in ra index dạng string, không phải giá trị).

- Exercise 14 (Tự viết Symbol.iterator + next()): Viết object `range` có khả năng duyệt từ `start` đến `end`:

```js
const range = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};
```

- Không dùng `for...of`, gọi thủ công: lấy iterator bằng `range[Symbol.iterator]()`, sau đó gọi `.next()` liên tục (VD 6 lần) và in từng kết quả `{ value, done }` ra console để hiểu cơ chế bên dưới.

- Exercise 15 (for...of, spread, Array.from trên custom iterable): Dùng lại `range` ở Exercise 14.
  - Dùng `for...of` duyệt qua `range`, in từng giá trị.
  - Dùng spread operator `[...range]` để chuyển thành mảng, in ra kiểm tra.
  - Dùng `Array.from(range)` để chuyển thành mảng, so sánh kết quả với cách dùng spread.

- Exercise 16 (Bài tổng hợp — Bộ sưu tập chỉ đọc): Viết object `createCollection(items)` trả về 1 object `collection` với yêu cầu:
  - `collection` có property `items` chứa mảng `items` truyền vào, nhưng được định nghĩa qua `Object.defineProperty` với `writable: false` (không cho gán lại mảng khác) và `enumerable: false` (ẩn khỏi `for...in`/`Object.keys`).
  - `collection` có `[Symbol.iterator]` để duyệt qua từng phần tử trong `items` bằng `for...of`.
  - Sau khi tạo `collection`, gọi `Object.freeze(collection)` để khóa toàn bộ.
  - Test:
    - `const c = createCollection(["A", "B", "C"])`
    - `for...of` duyệt qua `c`, in từng phần tử.
    - `[...c]` để chuyển thành mảng mới, in ra kiểm tra.
    - Thử `c.items = []` (gán lại) — xác nhận không có tác dụng, giải thích tại sao (kết hợp cả `writable: false` và `freeze`).
