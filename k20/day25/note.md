# Day 25: DOM trong JavaScript

## 1. Định nghĩa (Definition)

- DOM (Document Object Model) là API cho phép JavaScript tương tác và thao tác với các phần tử HTML/XML trong trang web.
- DOM biểu diễn tài liệu dưới dạng một cây các đối tượng (DOM Tree) mà JavaScript có thể truy cập, thêm, sửa hoặc xóa.

## 2. Cấu trúc DOM Tree

### Các loại Node cơ bản:

- Element node: Các thẻ HTML (như `<div>`, `<p>`, `<h1>`).
- Attribute node: Các thuộc tính của thẻ (như `id`, `class`, `src`).
- Text node: Văn bản nằm bên trong thẻ HTML.

### Ví dụ cấu trúc HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <div id="container">
      <p class="text">Hello World</p>
    </div>
  </body>
</html>
```

### Biểu diễn cây DOM (DOM Tree):

```text
document
└── html
    ├── head
    │   └── title
    │       └── "My Page"
    └── body
        └── div#container
            └── p.text
                └── "Hello World"
```

## 3. Truy cập các phần tử DOM

- `document.getElementById()`: Tìm phần tử theo ID (trả về 1 phần tử hoặc `null`).

```javascript
let element = document.getElementById("container");
console.log(element); // <div id="container">...</div>
```

- `document.getElementsByClassName()`: Tìm các phần tử theo class (trả về `HTMLCollection`).

```javascript
let elements = document.getElementsByClassName("text");
console.log(elements[0]); // Phần tử đầu tiên có class "text"
```

- `document.getElementsByTagName()`: Tìm các phần tử theo tên thẻ (trả về `HTMLCollection`).

```javascript
let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs); // Tất cả thẻ <p>
```

- `document.querySelector()`: Tìm phần tử đầu tiên khớp với CSS Selector.

```javascript
let element = document.querySelector("#container");
let firstP = document.querySelector("p");
let textClass = document.querySelector(".text");
```

- `document.querySelectorAll()`: Tìm tất cả phần tử khớp với CSS Selector (trả về `NodeList`).

```javascript
let allP = document.querySelectorAll("p");
let allText = document.querySelectorAll(".text");
```

## 4. Thao tác với nội dung

- `innerHTML`: Lấy hoặc đặt cấu trúc HTML bên trong phần tử.

```javascript
let div = document.getElementById("container");
console.log(div.innerHTML); // "<p class="text">Hello World</p>"
div.innerHTML = "<h1>New Content</h1>";
```

- `textContent`: Lấy hoặc đặt nội dung văn bản thuần (bao gồm cả text bị ẩn bởi CSS).

```javascript
let p = document.querySelector("p");
console.log(p.textContent); // "Hello World"
p.textContent = "New text content";
```

- `innerText`: Lấy hoặc đặt văn bản hiển thị trên giao diện (tôn trọng styling ẩn/hiện).

```javascript
let p = document.querySelector("p");
p.innerText = "Visible text only";
```

- `outerHTML`: Lấy hoặc thay thế toàn bộ phần tử hiện tại cùng với nội dung bên trong nó.

```javascript
const element = document.getElementById("myDiv");
element.outerHTML = '<p class="new">Đây là paragraph mới</p>';
// Element div sẽ được thay thế hoàn toàn bằng element p
```

## 5. Thao tác với thuộc tính

### a. Sử dụng phương thức `getAttribute()` & `setAttribute()`

```javascript
let img = document.querySelector("img");
let src = img.getAttribute("src");
img.setAttribute("alt", "New alt text");
```

### b. Truy cập trực tiếp thuộc tính

```javascript
let input = document.querySelector("input");
console.log(input.value);
input.value = "New value";

console.log(input.id);
input.id = "newId";
```

### c. Kiểm tra và xóa thuộc tính (`hasAttribute()` & `removeAttribute()`)

```javascript
let element = document.querySelector("div");
if (element.hasAttribute("class")) {
  element.removeAttribute("class");
}
```

## 6. Thao tác với CSS

### a. Thay đổi CSS Inline (`element.style`)

```javascript
let element = document.getElementById("myDiv");
element.style.color = "red";
element.style.backgroundColor = "blue";
element.style.fontSize = "20px";
```

### b. Thay đổi thuộc tính Class (`className` & `classList`)

```javascript
let element = document.querySelector("div");

// Cập nhật chuỗi class bằng className
element.className = "new-class another-class";

// Các phương thức tiện ích với classList (Khuyến nghị)
element.classList.add("new-class"); // Thêm class
element.classList.remove("old-class"); // Xóa class
element.classList.toggle("active"); // Bật/tắt class
element.classList.contains("my-class"); // Kiểm tra class (trả về Boolean)
```

## 7. Tạo, thêm và xóa phần tử

### a. Tạo phần tử (`createElement`)

```javascript
let newDiv = document.createElement("div");
newDiv.textContent = "New div content";
newDiv.className = "new-div";
```

### b. Thêm phần tử (`appendChild`, `insertBefore`, `insertAdjacentHTML`)

```javascript
let container = document.getElementById("container");
let newP = document.createElement("p");
newP.textContent = "New paragraph";

// 1. Thêm vào cuối container
container.appendChild(newP);

// 2. Thêm vào trước một phần tử khác
let firstChild = container.firstElementChild;
container.insertBefore(newP, firstChild);

// 3. Chèn chuỗi HTML linh hoạt bằng insertAdjacentHTML
let element = document.querySelector("div");
element.insertAdjacentHTML("beforebegin", "<p>Before div</p>"); // Phía trước thẻ
element.insertAdjacentHTML("afterbegin", "<p>Start of div</p>"); // Bên trong, ở đầu
element.insertAdjacentHTML("beforeend", "<p>End of div</p>"); // Bên trong, ở cuối
element.insertAdjacentHTML("afterend", "<p>After div</p>"); // Phía sau thẻ
```

### c. Xóa phần tử (`removeChild` & `remove`)

```javascript
let parent = document.querySelector("div");
let child = document.querySelector("p");

// Cách cũ: Xóa qua phần tử cha
parent.removeChild(child);

// Cách mới: Tự xóa chính nó (Khuyến nghị)
child.remove();
```

## 8. Làm việc với Form & Events

### a. Truy cập Form

```javascript
// Theo ID
let form = document.getElementById("myForm");

// Theo Name
let formByName = document.forms["myForm"];
let formByName2 = document.forms.myForm;

// Theo Index
let firstForm = document.forms[0]; // Form đầu tiên trong trang

// Theo QuerySelector
let formByQuery = document.querySelector("#myForm");
```

### b. Truy cập các phần tử trong Form (Form Elements)

```javascript
let form = document.getElementById("myForm");

// Theo Name
let nameInput = form.elements["username"];
let passwordInput = form.elements.password;

// Theo Index
let firstInput = form.elements[0];

// Theo QuerySelector
let emailInput = form.querySelector("#email");
```

### c. Thao tác với Text Input

```javascript
// Lấy / Đặt giá trị
console.log(textInput.value);
textInput.value = "New value";

// Lấy / Đặt placeholder
console.log(textInput.placeholder);
textInput.placeholder = "Enter your name";

// Focus / Blur
textInput.focus(); // Đặt con trỏ chuột vào ô input
textInput.blur(); // Bỏ con trỏ chuột khỏi ô input
```

### d. Lắng nghe sự kiện Submit (Form Event)

```javascript
let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn hành vi load lại trang mặc định

  // Xử lý dữ liệu Form
  let formData = new FormData(form);
  console.log("Form submitted!");

  // Hoặc gửi form bằng code khi cần:
  // form.submit();
});
```

## 9. Thực hành: Xây dựng TodoApp

### Các bước thực hiện:

1. Bước 1: Tạo giao diện form HTML và danh sách hiển thị.
2. Bước 2: Lấy các phần tử form và danh sách thông qua DOM.
3. Bước 3: Bắt sự kiện `submit`, thêm dữ liệu vào mảng JavaScript.
4. Bước 4: Xóa dữ liệu cũ trong ô input và tự động `focus()` lại ô nhập.
5. Bước 5: Chuyển đổi dữ liệu trong mảng thành danh sách các thẻ HTML (`<li>`).
6. Bước 6: Đẩy danh sách HTML vừa tạo vào cây DOM.

### Ví dụ hoàn chỉnh:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Todo List</title>
  </head>
  <body>
    <form id="todo-form">
      <input type="text" id="todo-input" placeholder="Enter task..." />
      <button type="submit">Add</button>
    </form>
    <ul id="todo-list"></ul>

    <script>
      const todoForm = document.getElementById("todo-form");
      const todoInput = document.getElementById("todo-input");
      const todoList = document.getElementById("todo-list");
      const tasks = [];

      todoForm.onsubmit = function (event) {
        event.preventDefault();

        // Kiểm tra input không rỗng
        if (todoInput.value.trim() === "") return;

        tasks.unshift({ name: todoInput.value, completed: false }); // Thêm công việc mới vào đầu mảng
        todoInput.value = ""; // Xóa dữ liệu cũ
        todoInput.focus(); // Set focus lại vào ô input

        renderTasks();
      };

      function renderTasks() {
        const html = tasks
          .map(
            (task) => `
            <li>
              ${task.name}
              <i class="${
                task.completed
                  ? "fa-solid fa-square-check"
                  : "fa-regular fa-square"
              }"></i>
              <button class="edit">
                <i>Edit</i>
              </button>
              <button class="delete">
                <i>Delete</i>
              </button>
            </li>
          `,
          )
          .join("");

        todoList.innerHTML = html;
      }
    </script>
  </body>
</html>
```
