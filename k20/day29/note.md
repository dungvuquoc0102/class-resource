# Day 29: Storage, Auth, Modules, Tools, Web component trong JavaScript

## Storage

### Giới thiệu

- Web Storage API cho phép lưu dữ liệu ngay trong trình duyệt (client-side)
- Dữ liệu giới hạn trong cùng một origin (protocol + domain + port)
- Đọc / ghi đồng bộ, nhanh, dung lượng giới hạn khoảng 5MB
- Chỉ lưu được chuỗi (string); muốn lưu object / array phải dùng JSON

### localStorage

- Dữ liệu không có hạn sử dụng, tồn tại cho đến khi bị xóa thủ công hoặc khi đổi trình duyệt / máy
- Ghi dữ liệu với `localStorage.setItem(key, value)`
- Đọc dữ liệu với `localStorage.getItem(key)`
- Xóa 1 key với `localStorage.removeItem(key)`
- Xóa toàn bộ dữ liệu với `localStorage.clear()`
- Lọc theo index: `localStorage.key(index)`
- Số lượng key hiện có: `localStorage.length`
- Lưu object: `localStorage.setItem(key, JSON.stringify(obj))`
- Đọc lại: `JSON.parse(localStorage.getItem(key))`

### sessionStorage

- Cùng bộ API với `localStorage`
- Khác biệt: dữ liệu chỉ tồn tại trong phiên của tab; đóng tab là dữ liệu bị xóa
- Không chia sẻ giữa các tab; mỗi tab có một bản riêng
- Thích hợp cho dữ liệu tạm thời (giỏ hàng tạm, form draft, ...)

### So sánh localStorage và sessionStorage

- Thời gian sống: sessionStorage tồn tại trong tab, localStorage tồn tại lâu dài
- Dung lượng: đều là giới hạn khoảng 5MB mỗi origin
- Cách truy cập: hoàn toàn giống nhau

### Cookies

- Lưu tối đa 4KB
- Tự động gửi lên server với mỗi request
- Có thể đặt thời gian hết hạn (expires / max-age)
- Không nên dùng cho dữ liệu lớn, chỉ dùng cho token / phiên đăng nhập

## Authentication

### Giới thiệu

- Authentication là quá trình xác minh danh tính người dùng (bạn là ai)
- Authorization là quá trình kiểm tra quyền truy cập (bạn được làm gì)
- Cách cũ: lưu session trên server qua cookie
- Cách hiện đại: dùng token (thường là JWT) gửi kèm trong mỗi request
- Token giúp server không cần lưu trạng thái (stateless), dễ mở rộng

### JWT

- JWT (JSON Web Token) gồm 3 phần: header, payload, signature
- Signature đảm bảo token không bị sửa đổi (do server ký)
- Payload chứa thông tin như `userId`, `role`, thời gian hết hạn (`exp`)
- Dạng điển hình: `xxxxx.yyyyy.zzzzz`

### Access token

- Token ngắn hạn (thường 15 - 60 phút)
- Chứa thông tin người dùng và thời gian hết hạn
- Client gửi kèm trong mỗi request qua header `Authorization: Bearer <access_token>`
- Server không lưu lại, chỉ kiểm tra chữ ký

### Refresh token

- Token dài hạn (nhiều ngày đến vài tháng), dùng để xin access token mới
- Rủi ro thấp hơn vì chỉ gửi tới endpoint đổi token, không gửi trong các request thường
- Khi access token hết hạn, client gọi tới `/auth/refresh` kèm refresh token
- Server xác thực refresh token rồi trả về cặp token mới

### Flow đăng ký (Register)

- Client gửi `username` + `password` (và thông tin cần thiết) tới `POST /auth/register`
- Server tạo tài khoản, mã hóa mật khẩu (bcrypt, hash + salt)
- Server trả về như thông điệp và thường tạo sẵn token (đăng nhập luôn) hoặc redirect sang login

### Flow đăng nhập (Login)

- Client gửi `username`/`password` tới `POST /auth/login`
- Server xác minh mật khẩu; sai thì trả `401 Unauthorized`
- Đúng thì trả về `{ accessToken, refreshToken }`
- Client lưu cả 2 token vào `localStorage` (hoặc `sessionStorage`)

### Flow đăng xuất (Logout)

- Client xóa `accessToken` và `refreshToken` khỏi storage
- Nếu server hỗ trợ, gọi `POST /auth/logout` để thu hồi refresh token phía server
- Quay về trạng thái chưa đăng nhập (ẩn các phần chỉ cho user)

### Xử lý token hết hạn (401)

- Khi API trả về `401 Unauthorized` nghĩa token không còn hợp lệ
- Client gọi `/auth/refresh` với refresh token để lấy access token mới
- Lưu trữ token và luôn kèm header khi gọi API
- Token hết hạn và refresh hết hạn -> đưa người dùng về trang login

### Lưu token an toàn

- `localStorage` / `sessionStorage`: đơn giản nhưng dễ bị đọc nếu có lỗ hổng XSS
- HttpOnly cookie: chống XSS (JS không đọc được) nhưng cần xử lý CSRF
- Lựa chọn phù hợp theo mức độ bảo mật của dự án
- Không nhúng token vào URL, không ghi vào log, không lưu trên git

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
