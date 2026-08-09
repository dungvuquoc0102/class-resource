# Day 29: Storage, Auth, Modules, Tools, Web component trong JavaScript

## Storage

### localStorage

- localStorage.setItem(key, value)
- localStorage.getItem(key)
- localStorage.removeItem(key)
- localStorage.clear()
- localStorage.key(index)
- localStorage.length

- localStorage.setItem(key, JSON.stringify(obj)) / JSON.parse(localStorage.getItem(key)) / '""'

### sessionStorage

- sessionStorage.setItem(key, value)
- sessionStorage.getItem(key)
- sessionStorage.removeItem(key)
- sessionStorage.clear()
- sessionStorage.key(index)
- sessionStorage.length

### Cookies

- document.cookie

## Auth

- Authentication
- Authorization
- Session
- JWT
- Access token
- Refresh token
- Register
- Login
- Logout
- Handle 401

## Modules

### Giới thiệu

- ES Modules (ESM) là cách chính thức chia nhỏ, tái sử dụng code trong JavaScript
- Mỗi file là một module riêng biệt, có scope riêng (không lộ ra global)
- Khi import thư viện như React, ta dùng cú pháp module để load chúng
- Trên trình duyệt dùng thẻ `<script type="module">`

### export

- Named export: `export const name = ...`, `export function sum() {}`
- Export một danh sách cuối file: `export { a, b, c }`
- Đổi tên khi export: `export { a as aliasA }`
- Default export: `export default function` / `export default { ... }`
- Export cả named lẫn default trong cùng module

### import

- Import default: `import name from "./module.js"`
- Import named: `import { a, b } from "./module.js"`
- Đổi tên khi import: `import { a as aliasA }`
- Import tất cả: `import * as lib from "./module.js"`
- Import kết hợp: `import name, { a } from "./module.js"`

### type="module"

- File có `import` / `export` được load như một module
- Luôn chạy ở strict mode (`"use strict"` tự động)
- `this` ở top-level là `undefined` (không giống script thường trỏ tới `window`)
- Load mặc định deferred (chờ DOM sẵn sàng)
- Bị ràng buộc bởi CORS: phải chạy qua server (Live Server, Vite, ...) thay vì mở thẳng từ `file://`

### Thiết kế module

- Giữ module nhỏ, một module một trách nhiệm (DRY, SRP)
- Giảm thiểu biến global
- Tránh circular dependency (module A import B, B import A)
- Chỉ `export` phần API công khai, phần còn lại ẩn trong module scope

### Dynamic import

- `import("./module.js")` trả về một Promise
- Cho phép load module theo nhu cầu (lazy load, code splitting)
- Hữu ích khi trang lớn, chỉ tải phần đang cần
- Kết hợp `await import()` trong async function

### Top-level await

- Trong module có thể dùng `await` ngay ở top-level, không cần bọc trong async function
- Ví dụ: `await fetch(...)` lấy dữ liệu trước khi đưa ra export
- Giúp code khởi tạo module ngắn gọn hơn

### CommonJS (nói qua)

- Cú pháp `require("./module.js")` và `module.exports`
- Dùng trong Node.js (cũ), cùng hệ sinh thái npm phía backend
- ESM dần trở thành chuẩn chính cho cả browser lẫn Node.js

## Tools

### Node.js

#### Giới thiệu

- Node.js là runtime JavaScript chạy bên ngoài trình duyệt (dựa trên V8 Engine)
- Cho phép chạy JS trên máy tính của mình và trên server
- Kèm theo npm (Node Package Manager) - quản lý thư viện / package

#### Cài đặt và kiểm tra

- Cài Node.js (LTS version)
- Kiểm tra: `node --version`, `npm --version`
- Mở REPL bằng cách gõ `node` trên terminal
- Chạy file: `node index.js`

#### npm

- `npm init -y` tạo file `package.json`
- `npm install <package>` cài thư viện, có thêm `-D` cho dev dependency
- `npm uninstall <package>` gỡ thư viện
- `npm run <script>` chạy script định nghĩa trong `package.json`
- `npx <command>` chạy package không cần cài lâu dài

#### package.json

- `name`, `version` định nghĩa thông tin project
- `scripts`: các lệnh viết tắt (`dev`, `build`, `test`, ...)
- `dependencies`: thư viện chạy trong production
- `devDependencies`: công cụ chỉ dùng lúc phát triển (Vite, ESLint, ...)

### Vite

#### Giới thiệu

- Vite là build tool / dev server hiện đại cho frontend
- Hỗ trợ ES Modules, Hot Module Replacement (HMR) - cập nhật nhanh mà không cần reload
- Tạo project với template: `npm create vite@latest` (vanilla, react, vue, ...)
- Cấu trúc project: `index.html`, `src/`, `package.json`, `vite.config.js`

#### Các lệnh

- `npm install` cài dependencies
- `npm run dev` chạy dev server (thường port 5173)
- `npm run build` bundle production ra thư mục `dist/`
- `npm run preview` xem thử bản build
- Deploy thư mục `dist/` lên hosting (GitHub Pages, Netlify, ...)

#### Vì sao dùng Vite

- Nhờ Hot Module Replacement, sửa code và xem kết quả ngay mà không cần reload
- Import thẳng CSS, JS, ảnh qua ES Modules như import code JavaScript
- Chạy nhanh hơn việc nạp từng file bằng Live Server
- Sẽ dùng Vite chính thức từ buổi sau (React / TypeScript)

## Web component (Optional)

### Giới thiệu

- Web Components là chuẩn trình duyệt cho phép tự tạo thẻ HTML riêng tái sử dụng
- Gồm 3 công nghệ: Custom Elements, Shadow DOM, HTML Template

### Custom Elements

- Tạo thẻ mới: `customElements.define("my-element", class MyElement extends HTMLElement {...})`
- Tên bắt buộc có dấu gạch ngang: `my-element`, `app-card`, ...
- Lifecycle:
  - `connectedCallback()`: chạy khi element được thêm vào document
  - `disconnectedCallback()`: chạy khi element bị gỡ khỏi document
  - `attributeChangedCallback(name, oldValue, newValue)`: chạy khi attribute theo dõi thay đổi
  - `static observedAttributes`: khai báo danh sách attribute cần theo dõi

### Shadow DOM

- `this.attachShadow({ mode: "open" | "closed" })`
- CSS / DOM bên trong bị cô lập, không bị ảnh hưởng bởi style bên ngoài
- Giúp đóng gói (encapsulation) giao diện của component

### HTML Template

- Thẻ `<template>` lưu HTML chưa hiển thị cho đến khi được dùng
- `template.content.cloneNode(true)` tạo bản sao để render vào shadow DOM

### Ví dụ đơn giản

- Tạo `<my-card>` render ra thẻ card có style riêng
- Sử dụng trong HTML: `<my-card title="Hello"></my-card>`

## Practice

### Bài 1: Theme toggle

- Nút bấm chuyển giữa 2 theme (dark / light)
- Lưu lựa chọn vào `localStorage`
- Khi mở lại trang, đọc từ localStorage để áp dụng theme trước đó

### Bài 2: Lưu TodoApp (nối tiếp Day 25)

- Lấy TodoApp đã làm ở Day 25
- Khi submit thêm todo mới thì lưu lại danh sách vào `localStorage`
- Khi load trang, đọc danh sách từ localStorage và render ra
- Xóa todo thì cũng cập nhật lại localStorage

### Bài 3: Cài Node.js + chạy thử Vite

- Cài Node.js (LTS)
- Tạo thư mục dự án, chạy `npx vite@latest` tạo project vanilla
- Bấm `npm run dev` mở browser, sửa file và xem kết quả (Hot Reload)
- Chạy `npm run build`, tiến hành `npm run preview`

### Bài 4: Login mô phỏng bằng token

- Xây dựng form đăng nhập giả lập (không cần server thật)
- Nhập username / password, kiểm tra sai đúng trong `localStorage`
- Đúng thì tạo `accessToken` và `refreshToken` giả (chuỗi ngẫu nhiên có `exp`), lưu vào `localStorage`
- Hiển thị trạng thái đã đăng nhập; nút đăng xuất xóa token khỏi storage
- Mô phỏng 1 request giả chỉ thành công khi có access token hợp lệ (gọi tới refresh khi 401)
