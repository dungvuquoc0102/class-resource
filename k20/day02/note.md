# Day 2: HTML

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
