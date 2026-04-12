# Day 2: Kiến thức Frontend nâng cao, HTML chuyên sâu & CSS cơ bản

## Kiến thức cần thiết để học Frontend tốt hơn

### 1. Emmet Abbreviation: Viết HTML/CSS nhanh hơn

Emmet là công cụ tích hợp sẵn trong VSCode, cho phép viết mã HTML/CSS nhanh bằng cú pháp rút gọn giống CSS Selector. Gõ xong nhấn `Tab` là tự động sinh ra cấu trúc HTML đầy đủ.

Một số ví dụ thường dùng:

```
Gõ:         ul>li*3
Kết quả:
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
```

```
Gõ:         div.container>h1+p
Kết quả:
            <div class="container">
              <h1></h1>
              <p></p>
            </div>
```

```
Gõ:         !
Kết quả:    Cấu trúc HTML5 đầy đủ (<!DOCTYPE html>, <head>, <body>...)
```

Bảng cú pháp Emmet hay dùng:

| Cú pháp | Ý nghĩa | Ví dụ |
|- | | |
| `>` | Phần tử con | `div>p` |
| `+` | Phần tử anh em | `h1+p` |
| `*` | Lặp lại | `li*5` |
| `.` | Thêm class | `div.box` |
| `#` | Thêm id | `div#main` |
| `{}` | Nội dung text | `p{Hello}` |
| `$` | Đánh số tự tăng | `li.item$*3` tạo item1, item2, item3 |

> Nguyên tắc: Cú pháp Emmet giống hệt CSS Selector. Đã biết CSS Selector thì học Emmet gần như không tốn công sức.

### 2. Định dạng ảnh trên Web

Mỗi định dạng ảnh có ưu nhược điểm riêng, chọn đúng định dạng giúp trang web tải nhanh hơn và hiển thị đẹp hơn.

| Định dạng | Đặc điểm                                                   | Nên dùng khi                         |
| --------- | ---------------------------------------------------------- | ------------------------------------ |
| JPEG      | Nén mất dữ liệu, file nhỏ, không hỗ trợ nền trong suốt     | Ảnh chụp, ảnh có nhiều màu sắc       |
| PNG       | Nén không mất dữ liệu, hỗ trợ nền trong suốt, file lớn hơn | Logo, icon, ảnh cần nền trong        |
| SVG       | Dạng vector (XML), không vỡ khi phóng to, file rất nhỏ     | Icon, logo, hình minh họa đơn giản   |
| GIF       | Hỗ trợ animation, tối đa 256 màu, file khá lớn             | Ảnh động đơn giản                    |
| WebP      | Nén tốt hơn JPEG/PNG, hỗ trợ trong suốt và animation       | Hầu hết trường hợp thay thế JPEG/PNG |
| Base64    | Mã hóa ảnh thành chuỗi text, nhúng thẳng vào HTML/CSS      | Ảnh nhỏ, tránh thêm HTTP request     |

a-z A-Z 0-9

> Xu hướng hiện tại: WebP đang dần thay thế JPEG và PNG vì cùng chất lượng nhưng file nhỏ hơn đáng kể. Khi xây dự án thực tế, ưu tiên dùng WebP.

### 3. Highlight Code với PrismJS

Khi xây dựng trang web có hiển thị code (blog kỹ thuật, tài liệu, portfolio...), cần làm nổi bật cú pháp để dễ đọc. PrismJS là thư viện JavaScript phổ biến làm việc này.

Cách dùng cơ bản:

```html
<!-- Thêm vào <head> -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css"
/>

<!-- Thêm vào </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>

<!-- Dùng trong HTML -->
<pre><code class="language-javascript">
  const name = "Fullstack";
  console.log(name);
</code></pre>
```

> Lưu ý: Bao giờ cũng dùng cặp thẻ `<pre><code>` chứ không dùng mình `<code>`. `<pre>` giữ nguyên khoảng trắng và xuống dòng, `<code>` xác định đây là đoạn code.

## HTML

### 1. Nhóm thẻ tự đóng (Void Elements)

Một số thẻ HTML không có nội dung bên trong nên không cần thẻ đóng:

```html
<br />
<!-- Ngắt dòng -->
<hr />
<!-- Đường kẻ ngang -->
<img />
<!-- Hình ảnh -->
<input />
<!-- Ô nhập liệu -->
<meta />
<!-- Metadata -->
<link />
<!-- Liên kết tài nguyên ngoài -->
```

Lưu ý quan trọng về `<br />`:

```html
<!-- Đúng: Dùng <br /> để xuống dòng trong nội dung văn bản -->
<p>Nguyễn Văn A<br />Hà Nội, Việt Nam</p>

<!-- Sai: Dùng <br /> để tạo khoảng trống giữa các phần tử -->
<h1>Tiêu đề</h1>
<br />
<br />
<p>Đoạn văn</p>
```

> Để tạo khoảng cách giữa các phần tử, dùng CSS (`margin`, `padding`) thay vì nhồi `<br />`.

### 2. HTML Entity

HTML Entity là cách viết các ký tự đặc biệt trong HTML. Một số ký tự như `<`, `>`, `&` có ý nghĩa đặc biệt trong HTML nên không thể viết trực tiếp.

Một số entity hay dùng:

| Entity   | Ký tự                        | Dùng khi                                           |
| -------- | ---------------------------- | -------------------------------------------------- |
| `&nbsp;` | Khoảng trắng không ngắt dòng | Tạo khoảng trắng cố định, không bị browser gộp lại |
| `&lt;`   | `<`                          | Hiển thị ký tự `<` trong nội dung                  |
| `&gt;`   | `>`                          | Hiển thị ký tự `>` trong nội dung                  |
| `&amp;`  | `&`                          | Hiển thị ký tự `&` trong nội dung                  |
| `&copy;` | ©                            | Ký hiệu bản quyền                                  |

```html
<!-- Dùng &nbsp; để giữ khoảng trắng -->
<p>Xin&nbsp;chào</p>
<!-- "Xin chào" không bao giờ bị xuống dòng giữa hai từ này -->

<!-- Dùng entity để hiển thị ký tự HTML trong nội dung -->
<p>Thẻ &lt;p&gt; dùng để viết đoạn văn.</p>
<!-- Hiển thị: Thẻ <p> dùng để viết đoạn văn. -->
```

### 3. Attribute (Thuộc tính HTML)

Attribute cung cấp thông tin bổ sung cho thẻ HTML, viết trong thẻ mở theo cú pháp `tên="giá trị"`.

```html
<html lang="vi">
  <!--        ↑ tên thuộc tính   ↑ giá trị -->
</html>
```

Phân loại attribute:

**Global Attributes** — Dùng được trên bất kỳ thẻ HTML nào:

```html
<p lang="en">This is English.</p>
<div title="Thông tin thêm khi hover chuột">Hover vào đây</div>
<span id="unique-id">Mỗi id chỉ xuất hiện một lần trên trang</span>
<p class="highlight">Class có thể dùng nhiều lần</p>
```

**Element-specific Attributes** — Chỉ có ý nghĩa trên một số thẻ nhất định:

```html
<!-- href chỉ dùng cho thẻ <a> -->
<a href="https://google.com">Đến Google</a>

<!-- src và alt chỉ dùng cho thẻ <img> -->
<img src="photo.jpg" alt="Mô tả ảnh cho screen reader và khi ảnh lỗi" />
```

> Cách tra cứu attribute: Tìm Google với từ khóa `attribute href HTML` hoặc truy cập **htmlreference.io** — trang tài liệu HTML trực quan, dễ tra cứu.

### 4. Thẻ Block và Thẻ Inline

Hiểu rõ block và inline giúp tránh nhiều lỗi layout khó hiểu sau này.

**Block tags:**

```
- Luôn bắt đầu ở dòng mới
- Chiếm toàn bộ chiều ngang của phần tử cha
- Browser tự thêm khoảng cách trên/dưới (margin mặc định)
- Ví dụ: <div>, <p>, <h1>–<h6>, <ul>, <ol>, <li>, <header>, <section>...
```

**Inline tags:**

```
- Không bắt đầu dòng mới, nằm cùng dòng với nội dung xung quanh
- Chỉ chiếm đúng không gian của nội dung bên trong
- Ví dụ: <span>, <a>, <strong>, <em>, <img>, <input>...
```

```html
<!-- Minh họa sự khác nhau -->
<p>Đây là đoạn văn. <strong>Từ này in đậm</strong> nhưng vẫn cùng dòng.</p>

<div>Div 1 - chiếm cả dòng</div>
<div>Div 2 - tự xuống dòng mới</div>
```

Quy tắc lồng thẻ quan trọng:

```html
<!-- SAI: Không lồng thẻ block vào trong thẻ inline -->
<span>
  <div>Nội dung</div>
</span>

<!-- ĐÚNG: Thẻ inline nằm trong thẻ block -->
<div>
  <span>Nội dung</span>
</div>
```

> Kiểm tra xem một thẻ là block hay inline: vào **htmlreference.io**, tìm thẻ đó và xem phần "display" mặc định của nó.

### 5. Kiểm tra tài liệu HTML hợp lệ

Dùng **validator.w3.org** để kiểm tra HTML của bạn có đúng chuẩn không. Dán code vào hoặc nhập URL trang web, công cụ sẽ báo lỗi và cảnh báo cụ thể.

Tại sao cần validate HTML? HTML sai cú pháp vẫn có thể hiển thị được trên browser vì browser tự sửa lỗi — nhưng mỗi browser sửa theo cách khác nhau, dẫn đến hiển thị không nhất quán.

## CSS – Tạo kiểu cho trang web

### 1. CSS là gì?

CSS (Cascading Style Sheets) dùng để định dạng giao diện HTML: màu sắc, font chữ, kích thước, bố cục, hiệu ứng...

Cú pháp cơ bản:

```css
selector {
  property: value;
}

h2 {
  color: red;
}
```

### 2. Ba cách viết CSS

**Inline** — Viết trực tiếp trong thẻ HTML:

```html
<h1 style="color: red; font-size: 24px;">Tiêu đề</h1>
```

Ưu điểm: Áp dụng ngay lập tức, ưu tiên cao. Nhược điểm: Khó bảo trì, không tái sử dụng được.

**Internal** — Viết trong thẻ `<style>` trong `<head>`:

```html
<head>
  <style>
    h2 {
      color: red;
    }
  </style>
</head>
```

Chỉ có hiệu lực trong file HTML đó, không dùng được cho trang khác.

**External** — Viết trong file `.css` riêng, liên kết vào HTML:

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

Dùng được cho nhiều trang, dễ bảo trì — đây là cách được dùng phổ biến nhất trong thực tế.

**Thứ tự ưu tiên (từ thấp đến cao):**

```
External / Internal (cái viết sau trong file HTML sẽ ghi đè cái trước)
    ↓
Inline (style="..." trong thẻ HTML)
    ↓
!important (mạnh nhất, tránh lạm dụng)
```

### 3. Kế thừa trong CSS

**3.1. Một số thuộc tính tự động kế thừa từ phần tử cha:**

```html
<div style="color: red;">
  <p>Hello</p>
</div>
<!-- Thẻ <p> hiển thị màu đỏ vì kế thừa color từ <div> cha -->
```

**3.2. Dùng từ khóa `inherit` để ép kế thừa:**

```html
<section style="border: 1px solid black;">
  <div style="border: inherit;">Lorem ipsum</div>
</section>
<!-- Thẻ <div> kế thừa border từ <section> cha -->
```

**3.3. Không phải thuộc tính nào cũng kế thừa tự động:**

Các thuộc tính như `margin`, `padding`, `border` không kế thừa — mỗi phần tử phải tự khai báo riêng.

> Cách nhớ: Các thuộc tính liên quan đến **văn bản** (color, font-size, font-family...) thường kế thừa. Các thuộc tính liên quan đến **bố cục và hộp** (margin, padding, border, width...) thường không kế thừa.

### 4. CSS Mặc định

Browser áp dụng CSS mặc định cho từng loại thẻ:

```
Thẻ Block  ->  mặc định có display: block
Thẻ Inline ->  mặc định có display: inline
```

Sau này khi học CSS nâng cao, bạn có thể thay đổi giá trị này — ví dụ: biến một thẻ `<span>` (inline) thành `display: block`, hoặc biến `<div>` thành `display: inline`.

### 5. CSS Selectors

**Selector theo tên thẻ (element):**

```css
h1 {
  /* Chọn tất cả thẻ <h1> */
}
```

**Selector theo id:**

```css
#para {
  /* Chọn phần tử có id="para" */
}
```

> Lưu ý: Không nên dùng id để viết CSS. ID nên được dành cho JavaScript. Trong CSS, hãy dùng class.

**Selector theo class:**

```css
.heading {
  /* Chọn tất cả phần tử có class="heading" */
}
```

Đây là cách phổ biến nhất để viết CSS trong thực tế.

**Selector \* (universal):**

```css
* {
  /* Chọn tất cả phần tử HTML */
  box-sizing: border-box; /* Hay dùng để reset CSS */
}
```

> Quy ước đặt tên: Đặt tên class có ý nghĩa, dễ hiểu. Ví dụ `.btn-primary` tốt hơn `.xanh-to`, `.user-card` tốt hơn `.box1`.

### 6. CSS Combinators (Bộ kết hợp)

Combinator cho phép chọn phần tử dựa trên quan hệ với phần tử khác:

| Combinator               | Ví dụ     | Ý nghĩa                                       |
| ------------------------ | --------- | --------------------------------------------- |
| `>` (con trực tiếp)      | `div > p` | Thẻ `<p>` là con **trực tiếp** của `<div>`    |
| ` ` (dấu cách - hậu duệ) | `div p`   | Thẻ `<p>` nằm **bên trong** `<div>` (mọi cấp) |
| `,` (nhóm)               | `h1, h2`  | Chọn tất cả `<h1>` **và** `<h2>`              |
| `+` (anh em liền kề)     | `h1 + h2` | Thẻ `<h2>` ngay **liền sau** `<h1>`           |
| `~` (anh em phía sau)    | `h1 ~ h2` | Tất cả `<h2>` cùng cấp phía **sau** `<h1>`    |

```css
/* Ví dụ thực tế */
nav > ul > li {
} /* li trực tiếp trong ul trực tiếp trong nav */
.card p {
} /* Mọi <p> nằm trong phần tử có class="card" */
h1,
h2,
h3 {
} /* Áp dụng cùng style cho h1, h2, h3 */
```

### 7. Box Model

Mọi phần tử HTML đều là một hình chữ nhật gồm 4 lớp từ trong ra ngoài:

```
┌──────────────────────────────┐
│           Margin             │
│  ┌────────────────────────┐  │
│  │        Border          │  │
│  │  ┌──────────────────┐  │  │
│  │  │     Padding      │  │  │
│  │  │  ┌────────────┐  │  │  │
│  │  │  │  Content   │  │  │  │
│  │  │  └────────────┘  │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

| Thành phần | Vai trò                                            |
| ---------- | -------------------------------------------------- |
| Content    | Nội dung thực tế (text, ảnh...)                    |
| Padding    | Khoảng cách giữa nội dung và viền                  |
| Border     | Viền bao quanh phần tử                             |
| Margin     | Khoảng cách bên ngoài viền, đẩy phần tử khác ra xa |

**Margin Collapse** — Hiện tượng gộp margin dọc:

```
Hai phần tử cạnh nhau theo chiều dọc, cùng có margin-top/bottom
-> Không cộng lại, mà lấy giá trị lớn hơn.

Ví dụ:
<p style="margin-bottom: 20px">Đoạn 1</p>
<p style="margin-top: 30px">Đoạn 2</p>
-> Khoảng cách thực tế giữa hai đoạn là 30px, không phải 50px.
```

> Margin collapse chỉ xảy ra theo chiều dọc (top/bottom), không xảy ra theo chiều ngang (left/right).

### 8. Cách viết giá trị cho margin, padding, border

**Margin và padding** có thể viết tắt theo số lượng giá trị:

```css
margin: 10px; /* 4 phía đều là 10px */
margin: 10px 20px; /* top/bottom: 10px | right/left: 20px */
margin: 10px 20px 15px; /* top: 10px | right/left: 20px | bottom: 15px */
margin: 10px 15px 20px 25px; /* top: 10px | right: 15px | bottom: 20px | left: 25px */
```

> Cách nhớ thứ tự 4 giá trị: Theo chiều kim đồng hồ — **T**op → **R**ight → **B**ottom → **L**eft (viết tắt: TRouBLe).

**Border** cần thêm style và color:

```css
border: 10px solid green;
/*      width  style  color */
```

Các giá trị style border thường dùng: `solid` (liền), `dashed` (nét đứt), `dotted` (chấm), `none` (không viền).
