# Day 19: Tổng quan, Cấu trúc dự án, Component, JSX, Render dữ liệu, Styling trong React

## Tổng quan & Tư duy lập trình

- React là thư viện JavaScript xây dựng giao diện người dùng (UI), phát triển bởi Meta
- So sánh Impetative Programming (DOM thuần) vs Declarative Programming (React)
- Architecture: Tư duy Component-based (chia nhỏ, tái sử dụng và đóng gói UI)
- Virtual DOM (DOM ảo) & Reconciliation: Thuật toán Diffing so sánh sự khác biệt để tối ưu cập nhật Real DOM
- Luồng dữ liệu một chiều (Unidirectional Data Flow)

## Khởi tạo & Cấu trúc dự án React với Vite

- Khởi tạo project: `npm create vite@latest my-react-app -- --template react`
- Luồng thực thi chi tiết: `index.html` > `src/main.jsx` > `ReactDOM.createRoot()` > `App.jsx`
- Phân tích cấu trúc file & thư mục:
- `public/`: Chứa file tĩnh (favicon, asset không qua bundler)
- `src/assets/`: Chứa ảnh/media import trực tiếp bằng ES Module
- `src/main.jsx`: Điểm nhập (Entry point) khởi chạy ứng dụng
- `src/App.jsx`: Root Component chính

- Chế độ `<React.StrictMode>`: Tự động chạy double-render ở môi trường Dev để phát hiện side-effects

## Component

- Function Component là một hàm JavaScript được React sử dụng để tạo giao diện. Hàm này trả về một React Node (có thể là JSX, string, number, null, array...).
- Tên Component **phải viết hoa chữ cái đầu** (PascalCase) để phân biệt với thẻ HTML

## JSX (JavaScript XML) & Rules

- JSX không phải là HTML, mà là cú pháp mở rộng (Syntactic Sugar)
- Babel/SWC biên dịch JSX về `React.createElement(type, props, ...children)`
- Các quy tắc bắt buộc trong JSX:
  - **Cú pháp host/React element giống HTML**: `<div>`, `<span>`, `<p>`, v.v. (React element tự định nghĩa phải viết hoa chữ cái đầu)
  - **Single Root Element**: Dùng phần tử bọc duy nhất hoặc Fragment (`<>...</>`)
  - **Closing Tags**: Bắt buộc đóng tất cả các thẻ (kể cả Self-closing: `<img />`, `<input />`, `<br />`)
  - **CamelCase Naming**: Thuộc tính đổi thành camelCase (`className`, `htmlFor`, `tabIndex`, `onClick`) và nhận giá trị JS bằng `{}` (ví dụ: `style={{ color: 'red' }}`)
  - **JS Expression In JSX**: Nhúng biểu thức JS trong ngoặc `{}` (Lưu ý: Boolean, `null`, `undefined` không render ra UI)

## Render dữ liệu: Conditional & List Rendering

- Render có điều kiện (Conditional Rendering):
  - Toán tử ba ngôi (Ternary Operator): `condition ? <ComponentA/> : <ComponentB/>`
  - Toán tử logic AND: `condition && <Component/>`
  - _Cảnh báo bẫy render số 0_: Tránh dùng `items.length && <List/>` > Đổi sang `items.length > 0 && <List/>`

- Render danh sách (List Rendering):
  - Sử dụng hàm `.map()` để biến đổi mảng dữ liệu thành danh sách thẻ JSX
  - Bắt buộc khai báo thuộc tính `key` ở phần tử ngoài cùng trong `.map()`
  - Tầm quan trọng của `key`: Giúp React nhận diện phần tử bị thêm, sửa, xóa để tối ưu Virtual DOM
  - Lý do không nên lấy `index` của mảng làm `key` khi danh sách có biến đổi thứ tự

## Styling

- Import CSS thuần vào Component (`import './Button.css'`)
- CSS Modules: Tránh trùng lặp CSS Scope giữa các Component (`import styles from './Button.module.css'`)
- Dynamic Class Names: Kết hợp template string để bật/tắt class dựa theo logic (`className={`btn ${isActive ? 'active' : ''}`}`)
- Tailwind CSS: Sử dụng utility-first framework để viết CSS trực tiếp trong className (`className="bg-blue-500 text-white p-2 rounded"`)
