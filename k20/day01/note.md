# Day 1: Định hướng Fullstack, Nền tảng Web & HTML cơ bản

## Định hướng học tập

### 1. Lộ trình Fullstack: Học gì và theo thứ tự nào?

Fullstack Developer là người có thể xây dựng cả phần giao diện người dùng (Frontend) lẫn phần xử lý phía máy chủ (Backend).

Lộ trình học theo thứ tự:

```
HTML -> CSS -> JavaScript -> TypeScript -> React -> Next.js -> Node.js + Express -> Database -> Deploy
```

Tại sao học theo thứ tự này?

- HTML là nền tảng - không có HTML thì không có gì để hiển thị
- CSS làm đẹp HTML - cần biết HTML trước mới style được
- JavaScript thêm logic - cần biết HTML/CSS trước mới thao tác DOM được
- React xây dựng trên JS - không biết JS thì React là hộp đen
- Next.js mở rộng React - cần React vững trước
- Backend học sau khi Frontend ổn định - hiểu rõ Client cần gì thì mới biết Server nên trả gì

> Nguyên tắc: Mỗi công nghệ xây dựng trên cái trước. Đừng nhảy cóc - hiểu nền tảng sẽ học mọi thứ nhanh hơn nhiều.

### 2. Phương pháp học lập trình hiệu quả

Cách học sai phổ biến:

- Xem video xong không thực hành -> Quên ngay
- Copy code mà không hiểu -> Không tự viết được
- Học lý thuyết quá nhiều trước khi thực hành
- Gặp lỗi là bỏ cuộc hoặc hỏi ngay mà không tự debug

Phương pháp hiệu quả:

1. Active Recall - Học chủ động:

```
Xem/Đọc -> Đóng tài liệu lại -> Tự nhớ lại -> Kiểm tra lại
```

2. Spaced Repetition - Ôn lại theo chu kỳ:

- Học xong -> Ôn sau 1 ngày -> Ôn sau 3 ngày -> Ôn sau 1 tuần

3. Build Something Real - Làm dự án thật:

- Đừng chỉ làm bài tập trong khóa học
- Clone một trang web thật (Google, Twitter, landing page yêu thích)
- Xây dựng công cụ bạn thực sự muốn dùng

4. Debug trước khi hỏi:

```
Gặp lỗi -> Đọc kỹ thông báo lỗi -> Google/AI -> Thử tự fix -> Nếu vẫn không được mới hỏi
```

> Quy tắc 20 phút: Tự debug ít nhất 20 phút trước khi hỏi. Quá trình tự tìm lỗi sẽ dạy bạn nhiều hơn khi có người cho đáp án ngay.

5. Dạy lại người khác:

- Giải thích một khái niệm cho người khác là cách tốt nhất để kiểm tra bạn có thực sự hiểu không
- Viết blog, ghi chú, comment code rõ ràng

## Kiến thức nền tảng Web

### 1. Web Frontend và Backend: Vai trò và sự khác biệt

Khi bạn mở Facebook, có hai phần làm việc cùng nhau:

| Aspect         | Frontend                          | Backend                                    |
| -------------- | --------------------------------- | ------------------------------------------ |
| Là gì          | Phần bạn nhìn thấy và tương tác   | Phần chạy trên máy chủ, xử lý dữ liệu      |
| Ngôn ngữ chính | HTML, CSS, JavaScript             | Node.js, Python, Java, Go...               |
| Ví dụ          | Nút Like, ảnh bìa, thanh tìm kiếm | Lưu bài đăng, kiểm tra mật khẩu, gửi email |
| Chạy ở đâu     | Trình duyệt của người dùng        | Máy chủ (server)                           |

Hình dung đơn giản:

```
Nhà hàng:
- Frontend = Phòng ăn: bàn ghế, menu, phục vụ bàn (những gì khách nhìn thấy)
- Backend = Bếp: đầu bếp, nguyên liệu, quy trình nấu (khách không thấy nhưng quan trọng)
```

### 2. HTML, CSS, JavaScript: 3 ngôn ngữ xây dựng web

Ba ngôn ngữ này hoạt động cùng nhau, mỗi cái một vai trò riêng:

```
HTML  -> Cấu trúc (Bộ xương)
CSS   -> Giao diện (Lớp da, quần áo)
JS    -> Hành vi  (Bộ não, cơ bắp)
```

Ví dụ thực tế - Một chiếc nút:

```html
<!-- HTML: Tạo ra cái nút -->
<button class="btn-like" id="likeBtn">❤️ Thích</button>
```

```css
/* CSS: Làm nút trông đẹp */
.btn-like {
  background: #e0245e;
  color: white;
  border-radius: 20px;
  padding: 8px 16px;
}
```

```js
// JS: Nút có thể click được và đếm lượt thích
document.getElementById("likeBtn").addEventListener("click", function () {
  likeCount++;
  this.textContent = `❤️ ${likeCount} Thích`;
});
```

> Tương tự ngôi nhà: HTML là gạch tường (cấu trúc), CSS là sơn và nội thất (thẩm mỹ), JavaScript là điện, nước, cửa tự động (chức năng).

### 3. Mô hình Client-Server: Web hoạt động như thế nào?

Mọi tương tác trên web đều theo mô hình Request-Response:

```
[Người dùng] -> Nhập URL -> [Browser/Client]
                                  |
                            Gửi HTTP Request
                                  |
                            [Server]
                                  |
                            Xử lý request
                            Tìm dữ liệu
                                  |
                            Gửi HTTP Response
                                  |
                          [Browser/Client]
                                  |
                            Render HTML/CSS/JS
                                  |
                          [Người dùng thấy trang web]
```

HTTP Methods - Các loại yêu cầu:

| Method    | Dùng để     | Ví dụ                       |
| --------- | ----------- | --------------------------- |
| GET       | Lấy dữ liệu | Xem danh sách bài đăng      |
| POST      | Tạo mới     | Đăng bài, đăng ký tài khoản |
| PUT/PATCH | Cập nhật    | Sửa thông tin hồ sơ         |
| DELETE    | Xóa         | Xóa bình luận               |

HTTP Status Codes - Server trả lời gì:

```
2xx -> Thành công (200 OK, 201 Created)
3xx -> Chuyển hướng (301 Moved Permanently)
4xx -> Lỗi từ Client (404 Not Found, 401 Unauthorized)
5xx -> Lỗi từ Server (500 Internal Server Error)
```

### 4. IP, Domain, DNS: Trang web được tải ra sao?

IP Address - Địa chỉ thật của máy chủ:

- Mỗi máy tính/server trên internet có một địa chỉ IP duy nhất
- Ví dụ: `172.217.14.206` là IP của Google
- IPv4: `192.168.1.1` (4 nhóm số, 0–255)
- IPv6: `2001:0db8:85a3::0370:7334` (dài hơn, dùng để không hết địa chỉ)
  - `2001:0db8:85a3:0000:0000:0000:0370:7334`
  - NAT

Domain - Địa chỉ thân thiện với người dùng:

```
google.com  ->  dễ nhớ hơn  172.217.14.206
```

Cấu trúc URL:

```
https://blog.example.com/posts?id=1#section
  │        │       │       │   │      │
protocol subdomain domain path query fragment
```

DNS - Hệ thống dịch Domain sang IP:

DNS hoạt động như danh bạ điện thoại của internet:

```
Bạn gõ: google.com
                |
        DNS Lookup
                |
        Trả về: 172.217.14.206
                |
        Browser kết nối tới IP đó
                |
        Server Google phản hồi
```

Quá trình tải trang web đầy đủ:

```
1. Gõ "google.com" -> Enter
2. Browser hỏi DNS: "google.com là IP nào?"
3. DNS trả lời: "172.217.14.206"
4. Browser gửi GET request tới 172.217.14.206
5. Server Google nhận và xử lý
6. Server gửi lại HTML, CSS, JS
7. Browser render -> Bạn thấy trang Google
```

> Thú vị: Toàn bộ quá trình này xảy ra trong vòng dưới 1 giây.

### 5. Browser: Công cụ render website

Browser không chỉ là cửa sổ hiển thị - nó là một phần mềm phức tạp gồm nhiều engine:

```
Browser
├── Rendering Engine (Blink/WebKit/Gecko)
│   ├── Đọc HTML -> Tạo DOM Tree
│   ├── Đọc CSS -> Tạo CSSOM Tree
│   ├── DOM + CSSOM -> Render Tree
│   └── Vẽ lên màn hình
│
├── JavaScript Engine (V8/SpiderMonkey)
│   └── Thực thi code JavaScript
│
└── Network Layer
    └── Gửi/nhận HTTP requests
```

Quá trình render (Critical Rendering Path):

```
HTML -> Parse -> DOM Tree
CSS  -> Parse -> CSSOM Tree
              Render Tree
                Layout (Tính toán kích thước, vị trí)
                Paint (Vẽ pixels)
              Composite (Hiển thị)
```

DevTools - Công cụ của developer:

Nhấn `F12` hoặc chuột phải -> Inspect để mở DevTools:

| Tab         | Dùng để                         |
| ----------- | ------------------------------- |
| Elements    | Xem và sửa HTML/CSS trực tiếp   |
| Console     | Chạy JS, xem log, debug lỗi     |
| Network     | Theo dõi các request/response   |
| Sources     | Xem source code, đặt breakpoint |
| Performance | Phân tích tốc độ render         |

## HTML - Xương sống của website

### 1. Cấu trúc HTML và cách nhớ thẻ nhanh

Cấu trúc cơ bản của một file HTML:

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <!-- Metadata: Thông tin về trang, không hiển thị -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tiêu đề trang - hiển thị trên tab browser</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- Content: Nội dung hiển thị cho người dùng -->
    <h1>Tiêu đề chính</h1>
    <p>Đây là một đoạn văn.</p>

    <script src="script.js"></script>
  </body>
</html>
```

Giải thích từng phần:

| Phần                 | Vai trò                                                       |
| -------------------- | ------------------------------------------------------------- |
| `<!DOCTYPE html>`    | Khai báo đây là HTML5 - browser cần biết để parse đúng        |
| `<html lang="vi">`   | Bao toàn bộ trang, `lang` giúp screen reader đọc đúng giọng   |
| `<head>`             | Metadata: charset, title, link CSS - không hiển thị trực tiếp |
| `<body>`             | Tất cả nội dung người dùng thấy                               |
| `<script>` cuối body | Đặt JS cuối để HTML load xong mới chạy JS                     |

Cách nhớ thẻ nhanh - Nhóm theo chức năng:

```
VĂN BẢN
h1 -> h6   Tiêu đề (heading), h1 to nhất, h6 nhỏ nhất
p         Đoạn văn (paragraph)
span      Inline text - để style một đoạn nhỏ trong câu
strong    In đậm (quan trọng về mặt nghĩa)
em        In nghiêng (nhấn mạnh)
br        Xuống dòng (line break)

LIÊN KẾT & MEDIA
a         Liên kết (anchor) - href là URL đích
img       Hình ảnh - src là đường dẫn, alt là mô tả
video     Video
audio     Âm thanh

DANH SÁCH
ul        Danh sách không thứ tự (bullet points)
ol        Danh sách có thứ tự (1, 2, 3...)
li        Mục trong danh sách (dùng trong ul hoặc ol)

BẢNG
table     Bảng
tr        Hàng (table row)
th        Ô tiêu đề (table header)
td        Ô dữ liệu (table data)

FORM
form      Biểu mẫu
input     Ô nhập liệu (text, email, password, checkbox...)
button    Nút bấm
textarea  Ô nhập nhiều dòng
select    Dropdown
label     Nhãn cho input

CONTAINER (Không có nghĩa riêng, dùng để nhóm)
div       Block container
span      Inline container
```

Cú pháp thẻ:

```html
<!-- Thẻ có nội dung (thẻ đôi) -->
<tagname attribute="value">Nội dung</tagname>

<!-- Thẻ tự đóng (void elements) -->
<img src="photo.jpg" alt="Ảnh" />
<input type="text" />
<br />

<!-- Thẻ lồng nhau (nesting) - phải đóng đúng thứ tự -->
<ul>
  <li>Mục 1</li>
  <li>Mục 2</li>
</ul>
```

### 2. Semantic HTML: Các loại thẻ và nhóm thẻ

Semantic HTML = Dùng đúng thẻ có ý nghĩa thay vì dùng `div` cho tất cả.

Non-semantic (Tránh):

```html
<div class="header">...</div>
<div class="nav">...</div>
<div class="main-content">
  <div class="article">...</div>
  <div class="sidebar">...</div>
</div>
<div class="footer">...</div>
```

Semantic (Nên dùng):

```html
<header>...</header>
<nav>...</nav>
<main>
  <article>...</article>
  <aside>...</aside>
</main>
<footer>...</footer>
```

Các thẻ semantic quan trọng:

```
BỐ CỤC TRANG (Layout)
header      Phần đầu trang (logo, navigation, hero)
nav         Menu điều hướng
main        Nội dung chính (chỉ dùng 1 lần trong trang)
footer      Phần cuối trang (copyright, links)
aside       Nội dung phụ (sidebar, quảng cáo)
section     Một phần/chương của trang
article     Nội dung độc lập (bài viết, comment, sản phẩm)

NỘI DUNG
h1 -> h6    Tiêu đề theo cấp bậc
p           Đoạn văn
blockquote  Trích dẫn dài
figure      Container cho ảnh/video kèm caption
figcaption  Chú thích cho figure
time        Thời gian (có thể thêm datetime="2024-01-15")
address     Địa chỉ liên hệ
mark        Highlight văn bản

CODE
code        Inline code
pre         Khối code (giữ nguyên khoảng trắng)
kbd         Phím bàn phím (Ctrl, Enter...)
```

Ví dụ thực tế - Trang blog:

```html
<body>
  <header>
    <img src="logo.png" alt="Logo" />
    <nav>
      <ul>
        <li><a href="/">Trang chủ</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h1>Tiêu đề bài viết</h1>
      <time datetime="2024-01-15">15 tháng 1, 2024</time>

      <p>Nội dung bài viết...</p>

      <figure>
        <img src="photo.jpg" alt="Mô tả ảnh" />
        <figcaption>Chú thích ảnh</figcaption>
      </figure>

      <blockquote>
        <p>"Câu trích dẫn hay"</p>
      </blockquote>
    </article>

    <aside>
      <h2>Bài viết liên quan</h2>
      <!-- ... -->
    </aside>
  </main>

  <footer>
    <p>© 2024 Blog của tôi</p>
    <address>
      Liên hệ: <a href="mailto:me@example.com">me@example.com</a>
    </address>
  </footer>
</body>
```

Tại sao dùng Semantic HTML?

1. SEO tốt hơn - Google hiểu cấu trúc trang, xếp hạng cao hơn
2. Accessibility - Screen reader đọc đúng cho người khiếm thị
3. Dễ maintain - Code tự giải thích mình làm gì
4. CSS/JS dễ viết hơn - Selector rõ ràng: `nav a` thay vì `.header-div-menu a`

### 3. Class vs ID: Khi nào dùng gì?

ID - Định danh duy nhất:

```html
<!-- Mỗi ID chỉ xuất hiện 1 lần trong toàn trang -->
<header id="main-header">...</header>
<section id="about">...</section>
<form id="login-form">...</form>
```

```css
/* CSS: Dùng # */
#main-header {
  background: #333;
}
```

```js
// JS: Thường dùng ID để chọn element cụ thể
document.getElementById("login-form");
document.querySelector("#main-header");
```

Class - Nhóm các element cùng style:

```html
<!-- Class có thể dùng nhiều lần, một element có thể có nhiều class -->
<button class="btn btn-primary">Đăng nhập</button>
<button class="btn btn-secondary">Hủy</button>
<p class="text-muted small">Chú thích nhỏ</p>
```

```css
/* CSS: Dùng . */
.btn {
  padding: 8px 16px;
  border-radius: 4px;
}

.btn-primary {
  background: blue;
  color: white;
}

.btn-secondary {
  background: gray;
}
```

So sánh trực tiếp:

| | ID | Class |
| | | -- |
| Ký hiệu CSS | `#ten-id` | `.ten-class` |
| Xuất hiện trong trang | 1 lần duy nhất | Nhiều lần |
| Một element | Chỉ 1 ID | Nhiều class |
| Dùng cho | Element đặc biệt, unique | Nhóm element tương tự |
| CSS specificity | Cao hơn | Thấp hơn |
| JS | `getElementById()` | `getElementsByClassName()` |

Quy tắc thực tế:

```html
<!--  ĐÚNG: ID cho phần tử unique -->
<header id="site-header">
  <!--  ĐÚNG: Class cho các phần tử tương tự -->
  <nav class="main-nav">
    <a class="nav-link active" href="/">Trang chủ</a>
    <a class="nav-link" href="/about">Giới thiệu</a>
    <a class="nav-link" href="/contact">Liên hệ</a>
  </nav>
</header>

<!--  ĐÚNG: Một element có nhiều class -->
<button class="btn btn-large btn-primary">Mua ngay</button>

<!--  SAI: Dùng ID nhiều lần -->
<p id="description">Đoạn 1</p>
<p id="description">Đoạn 2</p>
<!-- Browser chỉ nhận diện ID đầu tiên -->
```

Khi nào dùng cái nào - Quy tắc đơn giản:

```
Câu hỏi: "Có phần tử nào khác giống hệt cái này không?"
- CÓ -> Dùng class
- KHÔNG -> Có thể dùng ID

Câu hỏi: "JS có cần tìm chính xác element này không?"
- CÓ -> Dùng ID (hoặc data attribute)
- KHÔNG -> Dùng class
```

> Thực tế trong dự án lớn: Nhiều team/framework (như Tailwind, CSS Modules, BEM) hầu như không dùng ID cho CSS. ID thường chỉ dùng cho JavaScript và anchor links (`href="#section"`). Hãy ưu tiên class khi viết CSS.
