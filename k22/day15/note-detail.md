# Buổi 15: DOM và xử lý sự kiện trong JavaScript

## DOM Tree và các đối tượng cơ bản

### Giới thiệu

DOM (Document Object Model) là cách trình duyệt biểu diễn tài liệu HTML thành cây các đối tượng. JavaScript có thể đọc và thay đổi cây này để cập nhật giao diện.

| Khái niệm   | Ý nghĩa                                                         |
| ----------- | --------------------------------------------------------------- |
| `Document`  | Đối tượng đại diện cho tài liệu; thường truy cập qua `document` |
| `Node`      | Tên gọi chung cho các nút trong cây DOM                         |
| `Element`   | Node đại diện cho thẻ HTML, ví dụ `div`, `button`, `input`      |
| `Text`      | Node chứa văn bản bên trong phần tử                             |
| `Attribute` | Thuộc tính gắn trên phần tử, ví dụ `id`, `class`, `href`        |

Đây là các khái niệm/đối tượng DOM, không phải danh sách kiểu dữ liệu nguyên thủy của JavaScript. Element là một loại Node. Thuộc tính không phải node con của phần tử trong cây như Text hay Element.

### Ví dụ

```html
<body>
  <section id="profile">
    <h1>Xin chào An</h1>
    <p>Học JavaScript DOM</p>
  </section>
</body>
```

Cây rút gọn, bỏ qua các Text node chứa khoảng trắng và xuống dòng:

```text
body
└── section#profile
    ├── h1
    │   └── Text: "Xin chào An"
    └── p
        └── Text: "Học JavaScript DOM"
```

`section` là cha của `h1` và `p`. Hai phần tử `h1` và `p` là anh em cùng cấp.

---

## Chọn phần tử DOM

### Giới thiệu

Muốn thao tác một phần tử, trước hết cần lấy được đối tượng đại diện cho phần tử đó.

| API                                       | Kết quả                           | Trường hợp sử dụng              |
| ----------------------------------------- | --------------------------------- | ------------------------------- |
| `document.getElementById("title")`        | Một element hoặc `null`           | Tìm nhanh theo id               |
| `document.getElementsByClassName("card")` | HTMLCollection, có thể rỗng       | Chọn nhiều phần tử theo class   |
| `document.getElementsByTagName("li")`     | HTMLCollection, có thể rỗng       | Chọn nhiều phần tử theo tên thẻ |
| `document.querySelector(".card")`         | Phần tử khớp đầu tiên hoặc `null` | Chọn bằng CSS selector          |
| `document.querySelectorAll(".card")`      | `NodeList`, có thể rỗng           | Chọn nhiều phần tử để duyệt     |

### Ví dụ chọn và cập nhật danh sách

```html
<h1 id="title">Sản phẩm</h1>
<ul id="products">
  <li class="product">Áo thun</li>
  <li class="product">Quần jeans</li>
</ul>
```

```js
const title = document.getElementById("title");
const list = document.querySelector("#products");
const products = list.querySelectorAll(".product");

title.textContent = "Sản phẩm nổi bật";

products.forEach((product, index) => {
  product.textContent = `${index + 1}. ${product.textContent}`;
});
```

Gọi `querySelectorAll` trên `list` giúp giới hạn phạm vi tìm kiếm trong danh sách đó.

### Khi nào dùng?

- `querySelector`: chọn form, ô tìm kiếm, nút mở menu.
- `querySelectorAll`: xử lý một nhóm tab, sản phẩm hoặc thông báo lỗi.
- `getElementById`: dùng khi phần tử đã có ID rõ ràng.

### Lưu ý

- Không tìm thấy một phần tử thì kết quả là `null`; truy cập `.textContent` trên `null` sẽ gây lỗi. Kiểm tra selector và thời điểm chạy script trước.
- `NodeList` từ `querySelectorAll` không phải Array, nhưng có `forEach`. Dùng `Array.from(...)` khi cần các phương thức như `map` hoặc `filter`.
- Danh sách từ `querySelectorAll` không tự thêm phần tử mới khi DOM thay đổi; cần truy vấn lại nếu muốn lấy danh sách mới.
- Nên sử dụng nhóm API trên thay cho việc học thêm `getElementsByClassName` và `getElementsByTagName`.

---

### Di chuyển giữa các phần tử

#### Giới thiệu

Không phải lúc nào cũng cần tìm lại từ `document`. Khi đã có một phần tử, có thể tìm cha, con hoặc tổ tiên gần nhất của nó.

| API                         | Công dụng                                                                      |
| --------------------------- | ------------------------------------------------------------------------------ |
| `element.parentElement`     | Lấy phần tử cha trực tiếp, có thể là `null`                                    |
| `element.children`          | Lấy các phần tử con trực tiếp, không gồm Text node                             |
| `element.closest(selector)` | Tìm từ chính phần tử rồi đi lên tổ tiên, lấy phần tử khớp gần nhất hoặc `null` |

#### Ví dụ

```html
<ul id="cart">
  <li class="cart-item">
    <span>Áo thun</span>
    <div><button type="button" class="remove">Xóa</button></div>
  </li>
</ul>
```

```js
const button = document.querySelector(".remove");
const item = button.closest(".cart-item");

console.log(button.parentElement); // div chứa button
console.log(item); // li.cart-item
console.log(document.querySelector("#cart").children.length); // 1
```

### Khi nào dùng?

`closest` hữu ích khi cần tìm card hoặc dòng chứa nút vừa bấm, kể cả khi nút nằm sâu nhiều cấp. `children` phù hợp khi cần xem các phần tử con trực tiếp.

Không cần học riêng các API lấy phần tử đầu/cuối hoặc anh em ở buổi này; tra cứu khi gặp bài toán điều hướng cụ thể.

---

## Truy cập và thay đổi nội dung: `textContent` và `innerHTML`

### Giới thiệu

| API           | Cách hoạt động                            | Khi nào dùng?                                    |
| ------------- | ----------------------------------------- | ------------------------------------------------ |
| `textContent` | Đọc/ghi văn bản, không phân tích thẻ HTML | Tên sản phẩm, thông báo, dữ liệu người dùng nhập |
| `innerHTML`   | Đọc/ghi nội dung HTML bên trong phần tử   | Chèn cấu trúc HTML cố định do mình kiểm soát     |

### Ví dụ

```html
<p id="message"></p>
<div id="summary"></div>
```

```js
const message = document.querySelector("#message");
const summary = document.querySelector("#summary");

message.textContent = "<strong>Xin chào</strong>";
// Hiển thị nguyên văn cả các ký tự <strong>...</strong>

summary.innerHTML = "<strong>Giỏ hàng:</strong> 2 sản phẩm";
// Tạo phần tử strong, chữ "Giỏ hàng:" được in đậm
```

### Khi nào dùng?

Ưu tiên `textContent` khi chỉ cần thay chữ. Chỉ dùng `innerHTML` khi thực sự cần trình duyệt tạo cấu trúc HTML từ chuỗi.

### Lưu ý

- Không đưa trực tiếp dữ liệu từ input hoặc nguồn không tin cậy vào `innerHTML`, vì có thể tạo lỗ hổng XSS. Dùng `textContent` cho văn bản đó.
- Gán `innerHTML` thay thế các node con cũ. Listener gắn trực tiếp lên các node cũ không được chuyển sang node mới; tránh dùng `innerHTML += ...` để thêm mục tương tác.
- Gán `textContent` cũng thay nội dung con bằng văn bản; chọn đúng phần tử chứa chữ cần đổi.
- `innerText` phụ thuộc cách văn bản được hiển thị; chưa cần đào sâu trong buổi này.

---

## Truy cập và thay đổi thuộc tính

### Giới thiệu

HTML attribute là giá trị khai báo trên thẻ. DOM property là thuộc tính của đối tượng JavaScript đại diện cho phần tử. Hai khái niệm có liên quan nhưng không phải lúc nào cũng phản ánh cùng một giá trị.

| Cách thao tác                     | Trường hợp sử dụng                                   |
| --------------------------------- | ---------------------------------------------------- |
| `getAttribute`, `setAttribute`    | Đọc/ghi thuộc tính HTML, ví dụ `aria-label`          |
| `hasAttribute`, `removeAttribute` | Kiểm tra/xóa thuộc tính                              |
| `.src`, `.alt`, `.href`           | Cập nhật các thuộc tính thông dụng của ảnh, liên kết |
| `.value`, `.checked`, `.disabled` | Đọc/ghi trạng thái hiện tại của phần tử form         |
| `.dataset`                        | Đọc/ghi dữ liệu tùy chỉnh qua thuộc tính `data-*`    |

### Ví dụ

```html
<img id="avatar" src="avatar-default.png" alt="Ảnh mặc định" />
<input id="full-name" value="An" />
<button id="buy" type="button" data-product-id="42">Mua hàng</button>
```

```js
const avatar = document.querySelector("#avatar");
const input = document.querySelector("#full-name");
const button = document.querySelector("#buy");

avatar.src = "avatar-an.png";
avatar.alt = "Ảnh đại diện của An";

button.setAttribute("aria-label", "Mua sản phẩm số 42");
console.log(button.getAttribute("aria-label"));
console.log(button.hasAttribute("aria-label")); // true
button.removeAttribute("aria-label");

input.value = "Bình";
console.log(input.value); // "Bình": giá trị hiện tại
console.log(input.getAttribute("value")); // "An": attribute ban đầu

console.log(button.dataset.productId); // "42"
button.dataset.productId = "99";
button.disabled = true;
```

### Khi nào dùng?

- Cập nhật ảnh đại diện, đường dẫn hoặc nhãn hỗ trợ tiếp cận.
- Vô hiệu hóa nút khi chưa đủ điều kiện thao tác.
- Gắn ID sản phẩm hoặc tên hành động lên nút để xử lý sự kiện.

### Lưu ý

- `data-product-id` tương ứng với `dataset.productId`; giá trị đọc được là chuỗi. Dùng `Number(...)` nếu cần tính toán với số.
- Với thuộc tính boolean như `disabled`, chỉ cần attribute tồn tại là có hiệu lực. `setAttribute("disabled", "false")` vẫn vô hiệu hóa nút; dùng `button.disabled = false` để bật lại.

---

## Thay đổi giao diện bằng `classList` và `style`

### Giới thiệu

Dùng `classList` để thay đổi trạng thái giao diện qua các class CSS đã định nghĩa.

| API                            | Công dụng                                                   |
| ------------------------------ | ----------------------------------------------------------- |
| `classList.add("active")`      | Thêm class                                                  |
| `classList.remove("active")`   | Xóa class                                                   |
| `classList.toggle("active")`   | Có thì xóa, chưa có thì thêm; trả về trạng thái sau khi đổi |
| `classList.contains("active")` | Kiểm tra class có tồn tại không                             |

### Ví dụ

```html
<style>
  .notice {
    padding: 12px;
    border: 1px solid #aaa;
  }
  .is-success {
    color: #166534;
    background-color: #dcfce7;
  }
</style>

<p id="notice" class="notice">Đã lưu thông tin</p>
```

```js
const notice = document.querySelector("#notice");

notice.classList.add("is-success");
console.log(notice.classList.contains("is-success")); // true
notice.classList.remove("is-success");
notice.classList.toggle("is-success"); // Thêm lại class

notice.style.marginTop = "16px";
```

### Khi nào dùng?

- `classList`: đánh dấu tab đang chọn, công việc hoàn thành, form có lỗi.
- `style`: gán giá trị riêng cần tính bằng JavaScript, ví dụ độ rộng thanh tiến trình.

### Lưu ý

- Ưu tiên class cho nhóm quy tắc CSS; không rải nhiều lệnh đổi màu, viền, nền trong JavaScript.
- `className = "..."` thay toàn bộ chuỗi class; `classList` tiện khi chỉ cần đổi một class.
- Thuộc tính style dùng camelCase, ví dụ `backgroundColor`. Giá trị cần đơn vị phải có đơn vị, ví dụ `"16px"`.
- Không gán object kiểu `element.style = { color: "red" }`; dùng `element.style.color = "red"`.

---

## Tạo, thêm và xóa phần tử

### Giới thiệu

`document.createElement` tạo phần tử nhưng chưa hiển thị nó trên trang. Cần chèn phần tử vào DOM bằng `append` hoặc `prepend`.

| API                            | Công dụng                 |
| ------------------------------ | ------------------------- |
| `document.createElement("li")` | Tạo một phần tử `li`      |
| `parent.append(child)`         | Thêm vào cuối phần tử cha |
| `parent.prepend(child)`        | Thêm vào đầu phần tử cha  |
| `element.remove()`             | Xóa phần tử khỏi DOM      |

### Ví dụ

```html
<ul id="tasks"></ul>
```

```js
const list = document.querySelector("#tasks");

const firstTask = document.createElement("li");
firstTask.textContent = "Ôn lại DOM";
list.append(firstTask);

const urgentTask = document.createElement("li");
urgentTask.textContent = "Nộp bài tập";
list.prepend(urgentTask);

firstTask.remove(); // Danh sách còn "Nộp bài tập"
```

### Khi nào dùng?

Thêm công việc, hiển thị sản phẩm từ dữ liệu hoặc xóa một dòng khỏi giỏ hàng.

### Lưu ý

- `append` và `prepend` nhận node hoặc chuỗi văn bản; chuỗi không được phân tích thành HTML.
- Chèn một node đang tồn tại sang vị trí khác sẽ di chuyển node đó, không tạo bản sao.

---

## DOM Events và `addEventListener`

### Giới thiệu

Event là sự kiện phát sinh khi người dùng hoặc trình duyệt thực hiện một hành động. Listener là hàm được gọi khi sự kiện xảy ra.

```js
element.addEventListener("click", handleClick);
```

Truyền function `handleClick`, không viết `handleClick()` vì cách đó gọi hàm ngay lúc đăng ký.

### Ví dụ nút đếm

```html
<button id="counter" type="button">Đã bấm 0 lần</button>
```

```js
const button = document.querySelector("#counter");
let count = 0;

function handleClick() {
  count += 1;
  button.textContent = `Đã bấm ${count} lần`;
}

button.addEventListener("click", handleClick);

// Khi không còn muốn xử lý sự kiện này:
// button.removeEventListener("click", handleClick);
```

### Khi nào dùng?

Xử lý nút bấm, nhập dữ liệu, gửi form và các thao tác tương tác khác. Ưu tiên `addEventListener` để tách phần xử lý khỏi HTML.

### Các sự kiện cần dùng trong buổi này

| Event           | Thời điểm xảy ra                               | Ứng dụng                                |
| --------------- | ---------------------------------------------- | --------------------------------------- |
| `click`         | Kích hoạt nút/phần tử                          | Thêm, xóa, bật/tắt                      |
| `input`         | Người dùng thay đổi giá trị ô nhập             | Tìm kiếm, đếm ký tự                     |
| `change`        | Người dùng xác nhận thay đổi; tùy loại control | Chọn danh mục, checkbox                 |
| `submit`        | Form được gửi                                  | Kiểm tra và lấy dữ liệu                 |
| `keydown`       | Nhấn phím                                      | Xử lý Escape, phím tắt                  |
| `focus`, `blur` | Nhận/mất focus                                 | Hiện gợi ý, kiểm tra sau khi rời ô nhập |

### Lưu ý

- Gỡ listener phải dùng đúng function đã đăng ký và cùng giá trị `capture` nếu có thiết lập.
- Gán `.value` bằng JavaScript không tự phát sinh sự kiện `input`.
- Bài này dùng `defer` để chờ HTML sẵn sàng. `DOMContentLoaded` cũng phục vụ việc khởi tạo sau khi HTML được phân tích; không cần kết hợp cả hai cho các ví dụ này.
- Bỏ qua inline handler như `onclick="..."` và các nhóm sự kiện clipboard, pointer chuyên sâu trong buổi này.

---

## Event object: `target`, `currentTarget`, `preventDefault`

### Giới thiệu

Trình duyệt truyền event object vào listener để cung cấp thông tin về sự kiện.

| Thành phần               | Ý nghĩa                                                    |
| ------------------------ | ---------------------------------------------------------- |
| `event.type`             | Tên sự kiện                                                |
| `event.target`           | Phần tử nơi sự kiện phát sinh trong ví dụ DOM thông thường |
| `event.currentTarget`    | Phần tử đang chạy listener này                             |
| `event.preventDefault()` | Ngăn hành vi mặc định nếu sự kiện cho phép hủy             |

### Ví dụ phân biệt `target` và `currentTarget`

```html
<button id="save" type="button"><span>Lưu thông tin</span></button>
```

```js
const button = document.querySelector("#save");

button.addEventListener("click", (event) => {
  console.log(event.type); // "click"
  console.log(event.target); // span nếu bấm đúng vào chữ trong span
  console.log(event.currentTarget); // Luôn là button trong listener này
});
```

### Khi nào dùng?

- `target`: xác định mục vừa được bấm trong danh sách.
- `currentTarget`: thao tác phần tử đang gắn listener, dù người dùng bấm vào icon hay chữ bên trong.
- `preventDefault`: tự xử lý form mà không để trình duyệt gửi form và điều hướng. Xem ví dụ ngay bên dưới.

---

## Đọc và xử lý dữ liệu form

### Giới thiệu

Đọc giá trị hiện tại của `input`, `textarea`, `select` qua `.value`. Với checkbox, dùng `.checked` để biết có được chọn hay không.

Lắng nghe `submit` trên form để xử lý cả bấm nút gửi lẫn gửi bằng bàn phím.

### Ví dụ form đăng ký

```html
<form id="register-form">
  <label for="full-name">Họ tên</label>
  <input id="full-name" name="fullName" required />

  <label for="course">Khóa học</label>
  <select id="course" name="course">
    <option value="javascript">JavaScript</option>
    <option value="react">React</option>
  </select>

  <label>
    <input id="newsletter" name="newsletter" type="checkbox" />
    Nhận thông báo khóa học
  </label>

  <button type="submit">Đăng ký</button>
</form>
<p id="result" role="status"></p>
```

```js
const form = document.querySelector("#register-form");
const nameInput = document.querySelector("#full-name");
const newsletter = document.querySelector("#newsletter");
const result = document.querySelector("#result");

nameInput.addEventListener("input", () => {
  result.textContent = `Đã nhập ${nameInput.value.length} ký tự`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = nameInput.value.trim();

  if (fullName === "") {
    result.textContent = "Vui lòng nhập họ tên, không chỉ nhập khoảng trắng";
    nameInput.focus();
    return;
  }

  const formData = new FormData(form);
  const course = formData.get("course");
  const wantsNewsletter = newsletter.checked;

  result.textContent = `${fullName} đã chọn ${course}. Nhận thông báo: ${wantsNewsletter ? "Có" : "Không"}.`;
  form.reset();
});
```

### Khi nào dùng?

Form đăng ký, đăng nhập, tìm kiếm, thêm sản phẩm hoặc thêm công việc. Dùng `FormData` khi cần gom các trường theo thuộc tính `name`.

### Lưu ý

- Ví dụ chỉ xử lý trong trình duyệt, chưa lưu hay gửi dữ liệu đến server.
- `required` dùng validation của trình duyệt; input chỉ có khoảng trắng vẫn cần kiểm tra thêm bằng `trim` như trên.
- `FormData` lấy các control phù hợp có `name`; bỏ qua control `disabled` và checkbox không được chọn.
- `.value` thường là chuỗi, kể cả input số; chuyển kiểu và kiểm tra khi cần tính toán.
- `reset()` đưa các trường về giá trị mặc định, không phải lúc nào cũng làm rỗng toàn bộ form.
- Nút trong form không dùng để gửi phải đặt `type="button"`.

---

## Event bubbling và event delegation

### Giới thiệu

Với sự kiện có bubbling như `click`, sau khi xử lý ở phần tử đích, sự kiện tiếp tục đi lên các phần tử tổ tiên.

```text
Bấm vào span trong nút xóa:
span -> button -> li -> ul -> ... -> document -> window
```

Event delegation tận dụng cơ chế này: gắn một listener lên phần tử cha, rồi dựa vào `event.target` để xác định phần tử con cần xử lý.

### Ví dụ xóa sản phẩm

```html
<ul id="products">
  <li data-product-id="1">
    Áo thun
    <button type="button" data-action="remove"><span>Xóa</span></button>
  </li>
  <li data-product-id="2">
    Quần jeans
    <button type="button" data-action="remove"><span>Xóa</span></button>
  </li>
</ul>
```

```js
const list = document.querySelector("#products");

list.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest('button[data-action="remove"]');
  if (!button || !list.contains(button)) return;

  const item = button.closest("li[data-product-id]");
  if (!item || item.parentElement !== list) return;

  console.log("Xóa sản phẩm:", item.dataset.productId);
  item.remove();
});
```

`closest` giúp tìm đúng button ngay cả khi bấm vào `span` bên trong. Kiểm tra phần tử cha giúp giới hạn thao tác vào các mục trực tiếp của danh sách đang xử lý.

### Khi nào dùng delegation?

| Nên dùng                                                | Chưa cần dùng                                |
| ------------------------------------------------------- | -------------------------------------------- |
| Danh sách có nhiều nút cùng hành vi                     | Một nút độc lập                              |
| Phần tử con được thêm sau khi trang đã chạy             | Giao diện nhỏ, listener trực tiếp đã rõ ràng |
| Xử lý thao tác trên bảng, giỏ hàng, danh sách công việc | Sự kiện không bubbling cần cách xử lý riêng  |

Listener nằm ở `ul` nên vẫn xử lý được các mục được thêm vào sau này.

### Phân biệt các cơ chế dễ nhầm

- `preventDefault()` ngăn hành vi mặc định, không ngăn bubbling.
- `stopPropagation()` ngăn sự kiện tiếp tục lan truyền; không cần dùng trong ví dụ này và không nên gọi mặc định vì có thể làm listener ở cha không nhận được sự kiện.
- Luồng sự kiện còn có capturing, đi từ ngoài vào phần tử đích trước giai đoạn bubbling.
- Không phải mọi sự kiện đều bubbling; ví dụ `focus` và `blur` không bubbling như `click`.
