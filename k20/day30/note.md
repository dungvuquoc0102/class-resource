# Day 30: Modules, Tools

## Modules

### Giới thiệu

- ES Modules (ESM) là cách chính thức chia nhỏ, tái sử dụng code trong JavaScript
- Mỗi file là một module riêng biệt, có scope riêng (không lộ ra global)
- Khi import thư viện như React, ta dùng cú pháp module để load chúng
- Trên trình duyệt dùng thẻ `<script type="module">`

### import / export

- Named
  - Export:
    - `export const name = ...`
    - `export function sum() {}`
    - `export { a, b, c }`
    - `export { a as aliasA }`
  - Import:
    - `import { a, b } from "./module.js"`
    - `import { a as aliasA }`
- Default
  - Export:
    - `export default function`
    - `export default { ... }`
  - Import:
    - `import name from "./module.js"`

- Kết hợp
  - Import named + default:
    - `import name, { a, b } from "./module.js"`
  - Import tất cả: `import * as lib from "./module.js"`

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

### CommonJS

- Cú pháp `require("./module.js")` và `module.exports`
- Dùng trong Node.js, cùng hệ sinh thái npm phía backend
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
