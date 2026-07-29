# Day 25: DOM trong JavaScript

## Definition

## DOM Tree

### Data types

- Document
- Node
- Element
- Attribute
- Text

## Select DOM elements

- document.getElementById()
- document.getElementsByClassName()
- document.getElementsByTagName()
- document.querySelector()
- document.querySelectorAll()

- element.parentElement
- element.children
- element.firstElementChild
- element.lastElementChild
- element.previousElementSibling
- element.nextElementSibling
- element.closest()

## Manipulate DOM elements

- innerHTML
- textContent
- innerText

- outerHTML
- outerText

### Manipulate DOM attribute nodes

- element.getAttribute()
- element.setAttribute()
- element.hasAttribute()
- element.removeAttribute()

### Manipulate style DOM attribute nodes

- element.style
- element.style.camelCaseAttribute
- element.className
- element.classList.add()
- element.classList.remove()
- element.classList.toggle()
- element.classList.contains()

## Create DOM element

- document.createElement()
- document.createAttribute()
- document.createTextNode()
- document.createDocumentFragment()
- element.append
- element.prepend
- element.insertAdjacentHTML

## Delete DOM element

- parent.removeChild(child);
- child.remove();

## Exercise

### Xây dựng TodoApp:

- Tạo giao diện form HTML và danh sách hiển thị.
- Lấy các phần tử form và danh sách thông qua DOM.
- Bắt sự kiện `submit`, thêm dữ liệu vào mảng JavaScript.
- Xóa dữ liệu cũ trong ô input và tự động `focus()` lại ô nhập.
- Chuyển đổi dữ liệu trong mảng thành danh sách các thẻ HTML (`<li>`).
- Đẩy danh sách HTML vừa tạo vào cây DOM.
