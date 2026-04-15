# Day 3: Cú pháp CSS — Selector, Reset, Kế thừa, Độ ưu tiên, Hàm & Đơn vị

## Cú pháp CSS

### 1. Rule

Một **rule** gồm **selector** (chọn phần tử) và **declaration block** (khối khai báo trong `{ }`).

```css
h1.title {
  color: navy;
  font-size: 1.5rem;
}
```

- **Selector:** `h1.title` — chọn các thẻ `<h1>` có class `title`.
- **Declaration block:** mọi dòng `property: value;` bên trong `{ }`.

#### Cú pháp CSS lồng (CSS Nesting)

Trình duyệt hiện đại hỗ trợ **viết rule bên trong rule** — selector con được gắn với selector cha, giống cách tổ chức trong Sass nhưng là CSS thuần. Ký hiệu `&` là **selector của phần tử cha** (dùng khi cần ghép class, pseudo-class, hoặc tránh nhầm ý).

```css
.card {
  padding: 1rem;
  border: 1px solid #e2e8f0;

  /* Tương đương .card .card__title { ... } */
  .card__title {
    margin: 0;
    font-size: 1.125rem;
  }

  /* Tương đương .card:hover { ... } */
  &:hover {
    box-shadow: 0 4px 12px rgb(15 23 42 / 0.12);
  }

  /* Tương đương .card:focus-within .card__link { ... } */
  &:focus-within .card__link {
    outline: 2px solid #2563eb;
  }
}
```

Viết tách (tương đương logic trên):

```css
.card {
  padding: 1rem;
  border: 1px solid #e2e8f0;
}
.card .card__title {
  margin: 0;
  font-size: 1.125rem;
}
.card:hover {
  box-shadow: 0 4px 12px rgb(15 23 42 / 0.12);
}
.card:focus-within .card__link {
  outline: 2px solid #2563eb;
}
```

> Lồng giúp file CSS **theo đúng khối component** — dễ đọc khi một nhóm style chỉ phục vụ một vùng giao diện. Khi build production, vẫn nên kiểm tra trình duyệt tối thiểu mà dự án hỗ trợ (CSS nesting đã có trên các bản Chrome/Safari/Firefox mới).

### 2. Declaration

Mỗi **declaration** là một cặp `property: value` kết thúc bằng `;`.

| Thành phần  | Ví dụ                 | Ý nghĩa                                |
| ----------- | --------------------- | -------------------------------------- |
| Property    | `color`               | Tên thuộc tính CSS (đã định nghĩa sẵn) |
| Value       | `navy` hoặc `#000080` | Giá trị hợp lệ cho thuộc đó            |
| Declaration | `color: navy;`        | Một dòng định dạng hoàn chỉnh          |

> Ghi nhớ: Sai tên property hoặc value không hợp lệ — rule đó thường bị browser bỏ qua, không báo lỗi như ngôn ngữ lập trình.

### 3. Selector

#### 3.1. Simple selectors

| Loại      | Ví dụ    | Ghi chú ngắn                                           |
| --------- | -------- | ------------------------------------------------------ |
| Element   | `p`, `a` | Chọn theo tên thẻ                                      |
| Class     | `.btn`   | Chọn theo class — cách dùng phổ biến trong CSS         |
| ID        | `#modal` | Độ ưu tiên cao; trong thực tế CSS thường ưu tiên class |
| Universal | `*`      | Mọi phần tử — hay dùng trong reset/border-box          |

Có thể kết hợp: `button.btn.primary` (thẻ `button` có cả hai class).

```html
<button id="submit" class="btn primary">Gửi</button>
```

```css
button {
  font: inherit;
}
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
.btn.primary {
  background: #2563eb;
  color: #fff;
}
#submit {
  /* chỉ nên dùng id khi thật sự cần độ ưu tiên hoặc hook JS */
  min-width: 8rem;
}
* {
  box-sizing: border-box;
}
```

#### 3.2. Combinators

| Ký hiệu        | Ví dụ     | Ý nghĩa                                  |
| -------------- | --------- | ---------------------------------------- |
| (khoảng trắng) | `nav a`   | Hậu duệ bất kỳ cấp                       |
| `>`            | `ul > li` | Con trực tiếp                            |
| `+`            | `h2 + p`  | Anh em liền kề ngay sau                  |
| `~`            | `h2 ~ p`  | Mọi anh em `p` cùng cấp phía sau `h2`    |
| `,`            | `h1, h2`  | Nhóm nhiều selector cùng một bộ khai báo |

```html
<nav>
  <ul>
    <li><a href="/">Trang chủ</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
</nav>
<section>
  <h2>Tiêu đề</h2>
  <p>Đoạn ngay sau h2 — bị chọn bởi h2 + p.</p>
  <p>Đoạn thứ hai — không bị h2 + p.</p>
</section>
```

```css
/* Mọi thẻ a nằm trong nav (kể cả trong ul > li) */
nav a {
  color: #1d4ed8;
  text-decoration: none;
}
nav > ul {
  list-style: none;
  padding: 0;
}
/* Chỉ thẻ li là con trực tiếp của ul */
ul > li {
  margin-bottom: 0.25rem;
}
/* Chỉ đoạn p đứng liền sau h2 */
h2 + p {
  font-size: 1.05rem;
  color: #64748b;
}
h1,
h2,
h3 {
  font-family: "Inter", system-ui, sans-serif;
}
```

#### 3.3. Pseudo-classes

**Pseudo-class** chọn phần tử theo **trạng thái** hoặc **vị trí / điều kiện trong cây tài liệu** — không cần thêm class trong HTML. Viết **một dấu `:`**.

Có thể chia làm **hai nhóm**:

##### A. Interactive pseudo-classes

Áp style theo **hành vi** hoặc **trạng thái liên kết** (chuột, bàn phím, đã truy cập link…).

| Pseudo-class | Ý nghĩa (EN)               | Ghi chú ngắn                                                           |
| ------------ | -------------------------- | ---------------------------------------------------------------------- |
| `:hover`     | Mouse is over an element   | Khi con trỏ đang ở trên phần tử                                        |
| `:focus`     | Element has focus          | Ô nhập, nút… đang được focus (Tab / click)                             |
| `:active`    | Element is being activated | Khoảnh khắc đang nhấn (click xuống)                                    |
| `:link`      | Unvisited links            | Thẻ `<a href>` chưa được user “đã truy cập” trong phiên (theo browser) |
| `:visited`   | Visited links              | Link đã truy cập (màu mặc định thường bị browser hạn chế vì bảo mật)   |

```html
<a href="https://example.com">Link mẫu</a>
<button type="button">Nút</button>
<input type="text" placeholder="Ô nhập" />
```

```css
a:link {
  color: #2563eb;
}
a:visited {
  color: #7c3aed;
}
a:hover {
  text-decoration: underline;
}
a:active {
  color: #1d4ed8;
}
button:hover {
  filter: brightness(1.05);
}
button:active {
  transform: translateY(1px);
}
input:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

> Ngoài nhóm này còn nhiều pseudo-class tương tác / form khác (`:disabled`, `:checked`…) — sẽ dùng nhiều khi làm form nâng cao.

##### B. Structural pseudo-classes

Chọn phần tử dựa trên **vị trí** so với phần tử cha hoặc **ngôn ngữ** nội dung.

| Pseudo-class    | Ý nghĩa (EN)                      | Ghi chú ngắn                                                               |
| --------------- | --------------------------------- | -------------------------------------------------------------------------- |
| `:first-child`  | First child of a parent           | Con **đầu tiên** của cha (phải đúng loại thẻ nếu kết hợp `p:first-child`…) |
| `:last-child`   | Last child of a parent            | Con **cuối cùng** của cha                                                  |
| `:nth-child(n)` | The nth child of a parent         | Con thứ n, hoặc công thức `odd`, `2n+1`…                                   |
| `:lang()`       | Elements with a specific language | Phần tử có ngôn ngữ khớp (theo `lang` hoặc meta), ví dụ `:lang(vi)`        |

```html
<table>
  <tr>
    <th>Tên</th>
    <th>Giá</th>
  </tr>
  <tr>
    <td>Áo</td>
    <td>199k</td>
  </tr>
</table>
<ul class="steps">
  <li>Bước 1</li>
  <li>Bước 2</li>
  <li>Bước 3</li>
</ul>
<p lang="vi">Đoạn tiếng Việt.</p>
```

```css
tr:first-child th {
  border-bottom: 2px solid #cbd5e1;
}
.steps li:nth-child(odd) {
  background: #f1f5f9;
}
.steps li:nth-child(3) {
  font-weight: 700;
}
.steps li:last-child {
  border-bottom: none;
}
:lang(vi) {
  color: red;
}
```

> Còn nhóm **cấu trúc theo loại thẻ** hay dùng: `:nth-of-type(n)`, `:first-of-type`… (khác `:nth-child` khi trong cùng cha có nhiều loại thẻ lẫn nhau).

> Pseudo-class viết **một dấu `:`**. (Một số pseudo-class cũ cho phép viết `::` nhưng thống nhất dùng `:` cho pseudo-class.)

#### 3.4. Pseudo-elements

**Pseudo-element** nhắm vào **một vùng cụ thể** của phần tử hoặc **nội dung sinh ra** — không có thẻ HTML tương ứng. Chuẩn hiện tại dùng **hai dấu `::`** (cú pháp cũ một dấu `:` với `::before` vẫn được browser hiểu).

Có thể chia làm **hai loại**:

##### A. Text pseudo-elements

Tạo kiểu cho **một phần văn bản** bên trong phần tử (dòng đầu, chữ cái đầu).

| Pseudo-element   | Ý nghĩa (EN)                       | Ghi chú ngắn                                                           |
| ---------------- | ---------------------------------- | ---------------------------------------------------------------------- |
| `::first-line`   | Style the **first line** of text   | Chỉ áp dụng cho phần tử **block**; dòng đầu phụ thuộc độ rộng màn hình |
| `::first-letter` | Style the **first letter** of text | Thường dùng cho drop cap (chữ cái đầu lớn)                             |

```html
<p class="lead">
  Đoạn mở đầu có thể dài nhiều dòng. Dòng đầu tiên có thể tô màu hoặc in đậm
  khác các dòng sau.
</p>
```

```css
.lead::first-line {
  color: #0f172a;
  font-weight: 600;
}
.lead::first-letter {
  float: left;
  font-size: 2.75em;
  line-height: 1;
  margin-right: 0.15em;
  font-weight: 700;
  color: #2563eb;
}
```

##### B. Content pseudo-elements

Chèn hoặc tô kiểu **nội dung tạo bởi CSS** hoặc **phần UI đặc thù** (marker list, vùng chọn, nền dialog…).

| Pseudo-element | Ý nghĩa (EN)                         | Ghi chú ngắn                                    |
| -------------- | ------------------------------------ | ----------------------------------------------- |
| `::before`     | Insert content **before** an element | Cần `content` (có thể `""`) để tạo hộp giả      |
| `::after`      | Insert content **after** an element  | Tương tự `::before`                             |
| `::marker`     | Style **list item markers**          | Bullet / số của `<li>`, `::marker { color }`…   |
| `::selection`  | Style **user-selected** text         | Màu nền/chữ khi user bôi đen (chú ý contrast)   |
| `::backdrop`   | Style **dialog backdrop**            | Nền mờ phía sau `<dialog>` khi mở `showModal()` |

```html
<blockquote class="quote">Học đi đôi với hành.</blockquote>
<ul class="tasks">
  <li>Việc 1</li>
  <li>Việc 2</li>
</ul>
```

```css
.quote::before {
  content: "“";
  color: #94a3b8;
}
.quote::after {
  content: "”";
  color: #94a3b8;
}

ul.tasks li::marker {
  color: #2563eb;
  font-weight: 700;
}

::selection {
  background: #bfdbfe;
  color: #0f172a;
}
```

Ví dụ `::backdrop` (cần `<dialog>` và JS `showModal()` — chỉ minh họa):

```html
<dialog id="dlg">
  <p>Nội dung hộp thoại</p>
  <form method="dialog"><button>Đóng</button></form>
</dialog>
```

```css
dialog::backdrop {
  background: rgb(15 23 42 / 0.5);
}
```

> `::before` và `::after` **bắt buộc** có `content` (có thể là `content: ""`) nếu bạn muốn tạo hộp để vẽ border, icon… — không có `content` thì pseudo-element không hiển thị.

#### 3.5. Attribute selectors

| Cú pháp             | Ý nghĩa                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `[attr]`            | Có thuộc tính `attr` (bất kỳ giá trị)                                                                      |
| `[attr="value"]`    | Giá trị **khớp chính xác**                                                                                 |
| `[attr~=value]`     | `value` là **một từ** trong danh sách cách khoảng trắng (như class)                                        |
| `[attr \|="value"]` | Giá trị **bằng đúng** `value` **hoặc** bắt đầu bằng `value` rồi tới `-` (chuẩn cho `lang`: `vi`, `vi-VN`…) |
| `[attr^="value"]`   | Giá trị thuộc tính **bắt đầu** bằng chuỗi `value`                                                          |
| `[attr$="value"]`   | Giá trị thuộc tính **kết thúc** bằng chuỗi `value`                                                         |
| `[attr*="value"]`   | Giá trị thuộc tính **chứa** chuỗi `value` ở bất kỳ đâu                                                     |

> Cú pháp đầy đủ là `[attr|="value"]` (một dấu `|` trước dấu `=`) — chọn phần tử có thuộc tính `attr` với giá trị **khớp đúng** `value` hoặc **bắt đầu bằng** `value` và theo sau là dấu `-` (ví dụ `lang="en"` và `lang="en-US"`).

```html
<input type="text" placeholder="Tên" />
<input type="email" placeholder="Email" required />
<a href="/doc.pdf" download>Tài liệu PDF</a>
```

```css
/* Có thuộc tính required */
input[required] {
  border-left: 3px solid #f59e0b;
}
input[type="email"] {
  border-color: #22c55e;
}
a[download] {
  font-weight: 600;
}
[class~="tag"] {
  /* khớp khi class chứa từ "tag" trong danh sách cách khoảng trắng, ví dụ class="post tag featured" */
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  background: #e2e8f0;
}
```

Ví dụ thêm cho `|=`, `^=`, `$=`, `*=`:

```html
<p lang="vi">Đoạn tiếng Việt.</p>
<p lang="vi-VN">Đoạn theo mã vùng.</p>
<a href="https://example.com">Ngoài site</a>
<a href="/noi-bo">Trong site</a>
<a href="/files/bao-cao.pdf">Tải PDF</a>
<a href="/page?utm_source=email">Link có query</a>
<button class="btn btn-primary">Gửi</button>
```

```css
/* lang="vi" hoặc lang="vi-VN" (bắt đầu bằng vi rồi gạch ngang) */
[lang|="vi"] {
  font-family: "Be Vietnam Pro", system-ui, sans-serif;
}

/* Link ngoài — href bắt đầu bằng https:// */
a[href^="https://"] {
  color: #2563eb;
}
/* File PDF — href kết thúc bằng .pdf */
a[href$=".pdf"]::after {
  content: " (PDF)";
  font-size: 0.85em;
  color: #64748b;
}
/* class chứa chuỗi btn (ví dụ btn, btn-primary, toolbar-btn) */
[class*="btn"] {
  cursor: pointer;
}
```

---

## Reset CSS

**Mặc định, mọi thẻ HTML đều đã có sẵn một lớp style** do trình duyệt áp vào — không cần bạn viết CSS vẫn thấy chữ đậm ở `h1`, bullet ở `ul`, gạch chân ở `a`, khoảng cách quanh `body`… Đó là **user agent stylesheet**: mỗi loại thẻ gắn với các **declaration** mặc định (margin, font-size, display…). Nhờ vậy trang trắng vẫn “có hình”, nhưng **Chrome, Firefox, Safari** có thể **lệch nhau** vài pixel hoặc vài quy tắc — nên ta cần **reset** hoặc **normalize** để làm **điểm xuất phát thống nhất** trước khi viết style riêng.

Hai hướng phổ biến:

1. **Reset “mạnh”** — xóa gần hết margin/padding mặc định (ví dụ Eric Meyer’s reset — phiên bản cũ hay được nhắc).
2. **Normalize** — **không xóa hết** mà **chỉnh** chỗ các browser xử lý khác nhau, giữ các giá trị đọc được (file `normalize.css`).

### Ví dụ: dùng Normalize qua CDN

Trong `<head>`, link file normalize **trước** file CSS của bạn để sau cùng bạn vẫn ghi đè được:

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
/>
<link rel="stylesheet" href="styles.css" />
```

Normalize (bản 8.x) làm những việc tiêu biểu như: chuẩn hóa `line-height` trên `html`, sửa hiển thị `article`/`section` trong IE cũ (lịch sử), đồng bộ `margin` trên `h1` trong các ngữ cảnh lồng nhau, làm `img` không vượt khung, v.v. Một vài dòng **mang tính minh họa** (ý tưởng tương tự normalize — không cần học thuộc từng dòng):

```css
html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}
body {
  margin: 0;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
img {
  border-style: none;
  max-width: 100%;
  height: auto;
}
```

### Ví dụ tối giản thường tự viết thêm (reset “tại chỗ” + box-sizing)

Nhiều dự án vừa dùng normalize, vừa thêm vài dòng toàn cục:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}
```

> Nguyên tắc: Reset / normalize không thay thế **design system** — chỉ là nền ổn định. Tránh copy cả file dài mà không biết rule nào đang sửa hành vi gì.

---

---

---

## Inheritance

Một số thuộc tính (chủ yếu **typography** và **màu chữ**) **kế thừa** từ phần tử cha xuống con:

```html
<article class="post">
  <h2>Tiêu đề</h2>
  <p>Đoạn văn <span>nhấn mạnh</span> bên trong.</p>
</article>
```

```css
.post {
  color: #334155;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}
/* Không cần ghi color lại trên h2, p, span — chúng kế thừa từ .post */
```

Thuộc tính kiểu **hộp** (`margin`, `padding`, `border`, `width`…) **không** kế thừa mặc định — mỗi phần tử có “hộp” riêng.

```html
<section class="box">
  <p>Đoạn trong section</p>
</section>
```

```css
.box {
  margin: 2rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}
/* Thẻ <p> KHÔNG tự có margin/padding/border của .box — nếu cần phải ghi riêng cho p */
.box p {
  margin: 0;
}
```

### `inherit`, `initial`, `unset` — ví dụ cụ thể

```html
<div class="parent">
  <p class="child">Đoạn con</p>
</div>
```

```css
.parent {
  border: 2px solid #94a3b8;
  color: #0f172a;
}

/* border không kế thừa — ép con cũng dùng viền giống cha */
.child {
  border: inherit;
}

/* Đưa color về mặc định của thuộc tính (thường là đen tùy browser), không theo cha */
.reset-color {
  color: initial;
}

/* Kế thừa hoặc hủy tùy loại thuộc tính — tiện khi ghi đè trong component */
.mixed {
  all: unset; /* reset mạnh; còn unset từng thuộc tính: ví dụ margin: unset; */
}
```

Ví dụ nhỏ chỉ dùng `unset` cho một thuộc tính:

```css
ul.reset-list {
  list-style: none;
  padding: unset; /* padding không kế thừa → unset ≈ initial (về 0) */
}
ul.reset-list li {
  color: unset; /* color thường kế thừa → unset ≈ inherit */
}
```

---

## Specificity

Khi **nhiều rule** cùng áp vào một phần tử, trình duyệt tính **độ cụ thể** của selector. Quy ước đếm (đơn giản hóa):

| Nhóm                           | Ví dụ                      | Điểm (quan niệm)                 |
| ------------------------------ | -------------------------- | -------------------------------- |
| Inline style                   | `style="..."`              | Cao nhất trong các loại selector |
| ID                             | `#header`                  | Mạnh hơn class                   |
| Class, pseudo-class, attribute | `.btn`, `:hover`, `[type]` | Mạnh hơn element                 |
| Element, pseudo-element        | `div`, `::before`          | Thấp hơn class                   |

Ví dụ so sánh nhanh:

```css
p {
  color: gray;
} /* element */
.text {
  color: blue;
} /* class thắng element */
#intro.text {
  color: green;
} /* id + class thắng .text */
```

Thứ tự khi **cùng specificity**: rule viết **sau** trong CSS (cùng nguồn) sẽ ghi đè rule trước — đó là phần “**Cascading**” trong Cascading Style Sheets.

> Tránh lạm dụng `!important` để “thắng” mọi thứ — sẽ khó bảo trì. Ưu tiên tăng specificity hợp lý hoặc tách class/module rõ ràng.

---

## Hàm trong CSS: `calc()`, `var()`, `clamp()`

### 1. `var()` — Biến CSS (Custom Properties)

Khai báo biến (thường đặt ở `:root` để dùng toàn trang):

```css
:root {
  --color-primary: #2563eb;
  --space: 1rem;
}

.card {
  color: var(--color-primary);
  padding: var(--space);
}
```

Có thể chỉ định **fallback**: `var(--chua-co, 16px)`.

### 2. `calc()` — Tính toán giá trị

Cộng trừ các đơn vị khác loại trong một biểu thức (nhớ khoảng trắng quanh `+` và `-`):

```css
.sidebar {
  width: calc(100% - 2rem);
}
```

### 3. `clamp()` — Giới hạn trong khoảng

`clamp(min, preferred, max)` — giá trị thực tế nằm giữa `min` và `max`, ưu tiên `preferred` khi có thể.

```css
h1 {
  font-size: clamp(1.25rem, 2vw + 1rem, 2.5rem);
}
```

> Ba hàm này thường dùng cùng nhau: `var()` cho token thiết kế, `calc()` và `clamp()` cho responsive mượt mà không cần media query dày đặc.

---

## Đơn vị (Units)

### 1. Đơn vị tuyệt đối (Absolute)

| Đơn vị                       | Ghi chú ngắn                                                                     |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `px`                         | Pixel CSS — đơn vị phổ biến nhất trên màn hình                                   |
| `cm`, `mm`, `in`, `pt`, `pc` | Chủ yếu dùng cho **in ấn** (print) hoặc tài liệu; trên màn hình ít dùng hơn `px` |

> Trên web responsive, layout chính thường ưu tiên đơn vị **tương đối**; `px` vẫn rất hữu ích cho border, shadow, chi tiết nhỏ.

### 2. Đơn vị tương đối (Relative)

| Đơn vị      | Tính theo                                                     | Ghi chú                                                |
| ----------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| `%`         | Phần tử cha (tùy thuộc property)                              | Rộng phổ biến cho width                                |
| `em`        | Font-size của **chính phần tử** (hoặc cha nếu liên quan font) | Dễ “chồng” khi lồng nhiều cấp                          |
| `rem`       | Font-size của **gốc** (`html`)                                | Ổn định, hay dùng cho typography và spacing toàn trang |
| `vw` / `vh` | Một phần **viewport** (1vw = 1% chiều ngang viewport)         | Hữu ích cho full-screen, typography fluid              |

```css
html {
  font-size: 100%;
} /* thường ~16px mặc định */
body {
  font-size: 1rem;
  padding: 0 4vw;
}
```

> Quy ước hay gặp: đặt `font-size` gốc trên `html`, dùng `rem` cho hầu hết kích thước chữ và spacing; dùng `em` khi muốn thành phần con scale theo font của chính component đó.

---

## Tóm tắt buổi học

1. **Rule** = selector + khối declaration; biết **CSS nesting** (`&`, rule lồng rule). **Pseudo-class**: nhóm **tương tác** (`:hover`, `:focus`, `:link`…) và nhóm **cấu trúc cây** (`:first-child`, `:nth-child`, `:lang()`…). **Pseudo-element**: nhóm **chữ** (`::first-line`, `::first-letter`) và nhóm **nội dung / UI phụ** (`::before`, `::after`, `::marker`, `::selection`, `::backdrop`). Thêm combinator, attribute selector.
2. **Reset CSS** để đồng nhất nền giữa browser — hiểu reset mình đang dùng.
3. **Inheritance** giải thích vì sao chữ đổi màu ở `body` mà `p` cũng đổi; biết `inherit` / `initial` / `unset` để kiểm soát.
4. **Specificity** quyết định rule nào thắng khi xung đột — ưu tiên cấu trúc class rõ ràng hơn là `!important`.
5. **`var()`, `calc()`, `clamp()`** là bộ công cụ hiện đại cho token, layout và chữ responsive.
6. Chọn **đơn vị** đúng ngữ cảnh: `px` cho chi tiết; `rem`/`%`/`vw`/`vh` cho layout và typography linh hoạt.
