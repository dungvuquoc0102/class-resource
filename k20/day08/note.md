# Day 8: Grid, Z-index, Typography, Icon, Background

## CSS Layout — Grid: Container và Item properties

**Grid** (CSS Grid Layout) là một **hệ thống bố cục 2 chiều mạnh mẽ** — bạn định nghĩa **lưới hàng và cột**, sau đó sắp xếp các phần tử vào ô.

### Cơ bản: Container vs Item

```html
<style>
  .grid-container {
    display: grid;
    /* Container properties */
  }

  .grid-item {
    /* Item properties */
  }
</style>

<div class="grid-container">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
</div>
```

### Grid Container Properties

#### 1. `display: grid`

Kích hoạt Grid layout.

```css
.container {
  display: grid;
}
```

#### 2. `grid-template-columns`: Định nghĩa cột

```css
.container {
  display: grid;
  grid-template-columns: 200px 300px 150px; /* 3 cột cố định */
  grid-template-columns: 1fr 2fr 1fr; /* 3 cột bằng nhau (1:2:1) */
  grid-template-columns: repeat(3, 1fr); /* 3 cột bằng nhau */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* responsive */
}
```

**`fr` unit** = "fraction" — chia không gian theo tỷ lệ.

#### 3. `grid-template-rows`: Định nghĩa hàng

Tương tự `grid-template-columns`.

```css
.container {
  display: grid;
  grid-template-rows: 100px 200px auto; /* 3 hàng */
}
```

#### 4. `gap`: Khoảng cách

```css
.container {
  display: grid;
  gap: 1rem; /* khoảng cách đều */
  /* hoặc */
  gap: 1rem 2rem; /* row-gap: 1rem, column-gap: 2rem */
}
```

#### 5. `justify-items`: Căn chỉnh item theo trục ngang (cột)

| Giá trị   | Ý nghĩa            |
| --------- | ------------------ |
| `start`   | Sát trái           |
| `end`     | Sát phải           |
| `center`  | Giữa               |
| `stretch` | Căng ra (mặc định) |

```css
.container {
  display: grid;
  justify-items: center; /* căn giữa ngang */
}
```

#### 6. `align-items`: Căn chỉnh item theo trục dọc (hàng)

```css
.container {
  display: grid;
  align-items: center; /* căn giữa dọc */
}
```

#### 7. `justify-content`: Căn chỉnh lưới (ngang)

Tương tự Flexbox, nếu lưới nhỏ hơn container.

```css
.container {
  display: grid;
  width: 800px;
  grid-template-columns: repeat(3, 100px); /* 300px total < 800px */
  justify-content: space-between; /* căn chỉnh lưới */
}
```

#### 8. `align-content`: Căn chỉnh lưới (dọc)

```css
.container {
  display: grid;
  height: 600px;
  align-content: center; /* căn giữa lưới dọc */
}
```

#### 9. `grid-auto-flow`: Tự động flow items

| Giá trị  | Ý nghĩa                    |
| -------- | -------------------------- |
| `row`    | **Mặc định** — điền hàng   |
| `column` | Điền cột                   |
| `dense`  | Tối ưu không gian bỏ trống |

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: row;
}
```

### Grid Item Properties

#### 1. `grid-column`: Vị trí cột (start/end)

```css
.item {
  grid-column: 1 / 3; /* chiếm cột 1 đến 2 (không gồm 3) */
  /* hoặc */
  grid-column: 1 / span 2; /* bắt đầu từ 1, kéo dài 2 cột */
}
```

#### 2. `grid-row`: Vị trí hàng (start/end)

```css
.item {
  grid-row: 1 / 4; /* chiếm hàng 1 đến 3 */
}
```

#### 3. `grid-area`: Shorthand (row, column)

```css
.item {
  grid-area: 1 / 1 / 3 / 3; /* row-start, col-start, row-end, col-end */
}
```

#### 4. `justify-self`: Căn chỉnh riêng (ngang)

Override `justify-items`.

```css
.item {
  justify-self: end; /* sát phải */
}
```

#### 5. `align-self`: Căn chỉnh riêng (dọc)

Override `align-items`.

```css
.item {
  align-self: start; /* sát trên */
}
```

### Ví dụ thực tế: Dashboard layout

```html
<style>
  .dashboard {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr; /* 3 cột */
    grid-template-rows: auto 1fr auto; /* 3 hàng */
    gap: 1rem;
    min-height: 100vh;
    background-color: #f3f4f6;
  }

  .header {
    grid-column: 1 / -1; /* chiếm toàn bộ ngang */
    background-color: #1f2937;
    color: white;
    padding: 1rem 2rem;
  }

  .sidebar {
    grid-column: 1;
    grid-row: 2;
    background-color: white;
    padding: 1rem;
  }

  .main {
    grid-column: 2;
    grid-row: 2;
    background-color: white;
    padding: 2rem;
  }

  .sidebar-right {
    grid-column: 3;
    grid-row: 2;
    background-color: white;
    padding: 1rem;
  }

  .footer {
    grid-column: 1 / -1;
    background-color: #1f2937;
    color: white;
    padding: 1rem 2rem;
    text-align: center;
  }
</style>

<div class="dashboard">
  <header class="header">Dashboard</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main">Main content</main>
  <aside class="sidebar-right">Right panel</aside>
  <footer class="footer">Footer</footer>
</div>
```

### Ví dụ thực tế: Responsive Grid

```html
<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  }

  .gallery-item {
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .gallery-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .gallery-content {
    padding: 1rem;
  }
</style>

<div class="gallery">
  <div class="gallery-item">
    <img src="image1.jpg" alt="Gallery item" class="gallery-image" />
    <div class="gallery-content">
      <h3>Item 1</h3>
    </div>
  </div>
  <!-- Thêm gallery items -->
</div>
```

---

## CSS Layout — Z-index: Layering elements

**Z-index** kiểm soát **thứ tự chồng lớp** (stacking order) của các phần tử. Các phần tử có `z-index` cao hơn sẽ **hiển thị trên** phần tử có `z-index` thấp hơn.

### Điều kiện sử dụng `z-index`

`z-index` **chỉ hoạt động** nếu phần tử có **`position`** là `relative`, `absolute`, `fixed`, hoặc `sticky`.

```css
.element {
  position: relative;
  z-index: 10; /* hoạt động */
}

.element-no-position {
  z-index: 10; /* KHÔNG hoạt động — mặc định position: static */
}
```

### Cơ bản

```css
.background {
  position: relative;
  z-index: 1; /* thấp nhất */
}

.middle {
  position: relative;
  z-index: 10; /* giữa */
}

.top {
  position: relative;
  z-index: 100; /* cao nhất */
}
```

### Stacking Context (Ngữ cảnh chồng lớp)

**Stacking context** là **bối cảnh độc lập** trong đó `z-index` được tính toán riêng.

**Tạo stacking context mới khi:**

- Phần tử có `position` khác `static` + `z-index` không phải `auto`
- Phần tử có `opacity` < 1
- Phần tử có `transform`, `filter`, `backdrop-filter`
- Phần tử là **flex container** hoặc **grid container** với `z-index` không phải `auto`

```css
.stacking-context {
  position: relative;
  z-index: 1;
  opacity: 0.9; /* tạo stacking context mới */
}
```

### Ví dụ: Modal overlay

```html
<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100; /* cao, hiển thị trên tất cả */
    display: none;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    z-index: 101; /* cao hơn overlay */
    display: none;
  }

  .modal.active {
    display: block;
  }

  .modal-overlay.active {
    display: block;
  }
</style>

<div class="modal-overlay" id="overlay"></div>
<div class="modal" id="modal">
  <h2>Modal Title</h2>
  <p>Modal content here</p>
  <button onclick="closeModal()">Close</button>
</div>

<script>
  function openModal() {
    document.getElementById("overlay").classList.add("active");
    document.getElementById("modal").classList.add("active");
  }

  function closeModal() {
    document.getElementById("overlay").classList.remove("active");
    document.getElementById("modal").classList.remove("active");
  }
</script>
```

### Ví dụ: Dropdown menu

```html
<style>
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #1f2937;
    padding: 1rem;
    z-index: 50; /* cao nhất */
  }

  .dropdown {
    position: relative;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: none;
    z-index: 51; /* cao hơn navbar */
  }

  .dropdown-menu.active {
    display: block;
  }

  .main-content {
    margin-top: 60px;
    z-index: 1; /* thấp nhất */
  }
</style>

<nav class="navbar">
  <div class="dropdown">
    <button onclick="toggleDropdown()">Menu</button>
    <div class="dropdown-menu" id="dropdownMenu">
      <a href="#item1">Item 1</a>
      <a href="#item2">Item 2</a>
      <a href="#item3">Item 3</a>
    </div>
  </div>
</nav>

<div class="main-content">
  <h1>Main content</h1>
</div>

<script>
  function toggleDropdown() {
    document.getElementById("dropdownMenu").classList.toggle("active");
  }
</script>
```

### Bảng so sánh: Flexbox vs Grid vs Position+Z-index

| Tính năng           | Flexbox             | Grid                   | Position+Z-index      |
| ------------------- | ------------------- | ---------------------- | --------------------- |
| **Chiều**           | 1 chiều (hàng/cột)  | 2 chiều (hàng+cột)     | Free (absolute/fixed) |
| **Trường hợp dùng** | Nav, toolbar, form  | Dashboard, gallery     | Modal, popup, overlay |
| **Responsive**      | Tốt với `flex-wrap` | Tốt với `auto-fit`     | Cần media query       |
| **Z-index**         | Không cần           | Không cần              | Quan trọng            |
| **Độ phức tạp**     | Trung bình          | Cao (nhiều thuộc tính) | Thấp                  |

---

## CSS Property types — Typography

**Typography** kiểm soát **cách hiển thị chữ**, bao gồm font, kích thước, độ đậm, chiều cao dòng, và màu sắc.

### 1. `font-family`: Chọn font chữ

```css
.text {
  font-family: Arial, Helvetica, sans-serif;
  /* font-family: "Font Name", generic family */
  /* Browser sử dụng font đầu tiên có sẵn */
}
```

**Generic font families:**

| Giá trị      | Ví dụ                          |
| ------------ | ------------------------------ |
| `serif`      | Times New Roman, Georgia       |
| `sans-serif` | Arial, Helvetica, Verdana      |
| `monospace`  | Courier New, Consolas, Monaco  |
| `cursive`    | Comic Sans MS, Brush Script MT |
| `fantasy`    | Impact, Palatino Linotype      |

**Web fonts (Google Fonts, Adobe Fonts):**

```html
<!-- Link từ Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:ital@0;1&display=swap"
  rel="stylesheet"
/>

<style>
  .heading {
    font-family: "Roboto", sans-serif;
  }

  .body {
    font-family: "Open Sans", sans-serif;
  }
</style>
```

### 2. `font-size`: Kích thước chữ

```css
.text {
  font-size: 16px;
  /* hoặc */
  font-size: 1rem; /* 1rem = 16px (mặc định) */
  font-size: 1.5em; /* 1.5em = 1.5 × parent */
  font-size: clamp(1rem, 5vw, 3rem); /* responsive */
}
```

**Relative units (recommended):**

| Unit  | Ý nghĩa                                   |
| ----- | ----------------------------------------- |
| `em`  | Tương đối với font-size của parent        |
| `rem` | Tương đối với font-size của root (html)   |
| `%`   | Tương đối với font-size của parent (%)    |
| `vw`  | Tương đối với viewport width (responsive) |

### 3. `font-weight`: Độ đậm

```css
.text {
  font-weight: 400; /* normal */
  font-weight: 700; /* bold */
  font-weight: normal; /* 400 */
  font-weight: bold; /* 700 */
  font-weight: lighter; /* tương đối với parent */
  font-weight: bolder; /* tương đối với parent */
}
```

rgb(255, 255, 255)
**Giá trị thông dụng:**

| Giá trị | Ý nghĩa |
| ------- | ------- |
| 400     | Normal  |
| 700     | Bold    |

### 4. `line-height`: Chiều cao dòng

```css
.text {
  line-height: 1.5; /* 1.5 × font-size */
  line-height: 1.5rem; /* cố định 1.5rem */
  line-height: 150%; /* 150% của font-size */
}
```

**Quy tắc:**

- `line-height` >= 1.5 → dễ đọc hơn
- `line-height: 1.2` → compact (heading)
- `line-height: 1.6` → relaxed (body text)

### 5. `letter-spacing`: Khoảng cách chữ

```css
.text {
  letter-spacing: 0.05em; /* tăng khoảng cách */
  letter-spacing: -0.02em; /* giảm khoảng cách */
  letter-spacing: 2px; /* cố định */
}
```

### 6. `text-align`: Căn chỉnh chữ

```css
.text {
  text-align: left; /* **mặc định** */
  text-align: right;
  text-align: center;
  text-align: justify; /* căn đều 2 bên */
}
```

### 7. `color`: Màu sắc

```css
.text {
  color: red; /* tên màu */
  color: #ff0000; /* hex */
  color: rgb(255, 0, 0); /* RGB */
  color: rgba(255, 0, 0, 0.5); /* RGBA (với transparency) */
  color: hsl(0, 100%, 50%); /* HSL */
  color: hsla(0, 100%, 50%, 0.5); /* HSLA */
}
```

**Màu sắc thông dụng:**

```css
/* Grayscale */
color: black; /* #000 */
color: white; /* #fff */
color: gray; /* #808080 */
color: silver; /* #c0c0c0 */

/* Primary colors */
color: red;
color: green;
color: blue;

/* Extended colors */
color: tomato;
color: orange;
color: skyblue;
color: lightgreen;
```

### Ví dụ thực tế: Blog post styling

```html
<style>
  body {
    font-family: "Georgia", serif;
    font-size: 16px;
    line-height: 1.7;
    color: #333;
  }

  h1 {
    font-family: "Roboto", sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
    text-align: justify;
  }

  strong,
  .highlight {
    font-weight: 700;
    color: #d97706; /* orange */
  }

  em {
    font-style: italic;
    color: #6b7280; /* gray */
  }

  code {
    font-family: "Courier New", monospace;
    font-size: 0.875rem;
    background-color: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
</style>

<article>
  <h1>Typography in CSS</h1>
  <p>
    <strong>Typography</strong> is the art of arranging text in a visually
    appealing way. It includes font selection, size, weight, and spacing.
  </p>
  <h2>Font Families</h2>
  <p>Choose fonts that are readable and match your design aesthetic.</p>
  <code>font-family: "Roboto", sans-serif;</code>
</article>
```

---

Hết buổi 8

---

## CSS Property types — Icon: Font Awesome, Lucide Icons

**Icons** giúp **truyền thông tin nhanh chóng** và cải thiện UX. Có 3 cách thêm icon:

1. **Icon fonts** (Font Awesome, Lucide Icons)
2. **SVG icons** (inline hoặc img)
3. **Image** (PNG, JPG)

### Font Awesome

**Font Awesome** là thư viện icon phổ biến nhất.

#### Setup

```html
<!-- CDN link -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>

<!-- hoặc NPM -->
<!-- npm install @fortawesome/fontawesome-free -->
```

#### Sử dụng

```html
<!-- Solid icons (mặc định) -->
<i class="fas fa-heart"></i>
<i class="fas fa-star"></i>
<i class="fas fa-user"></i>
<i class="fas fa-shopping-cart"></i>

<!-- Regular icons -->
<i class="far fa-heart"></i>
<i class="far fa-star"></i>

<!-- Light icons -->
<i class="fal fa-heart"></i>

<!-- Duotone icons (Pro only) -->
<i class="fad fa-heart"></i>

<!-- Brand icons -->
<i class="fab fa-facebook"></i>
<i class="fab fa-twitter"></i>
<i class="fab fa-github"></i>
<i class="fab fa-google"></i>
```

#### Styling Font Awesome icons

```html
<style>
  .icon {
    font-size: 2rem;
    color: #3b82f6;
    margin: 0 0.5rem;
  }

  .icon:hover {
    color: #1d4ed8;
    transform: scale(1.2);
    transition: all 0.3s;
  }

  .icon-lg {
    font-size: 3rem;
  }

  .icon-sm {
    font-size: 1rem;
  }

  .icon-spin {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<i class="fas fa-heart icon"></i>
<i class="fas fa-spinner icon-spin icon-lg"></i>
```

#### Ví dụ: Button với icon

```html
<style>
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
  }

  .btn:hover {
    background-color: #1d4ed8;
  }

  .btn-icon {
    font-size: 1.2rem;
  }
</style>

<button class="btn">
  <i class="fas fa-download btn-icon"></i>
  Download
</button>

<button class="btn">
  <i class="fas fa-trash btn-icon"></i>
  Delete
</button>

<button class="btn">
  <i class="fas fa-edit btn-icon"></i>
  Edit
</button>
```

### Lucide Icons

**Lucide Icons** là thư viện icon hiện đại, minimal, có thiết kế đơn giản.

#### Setup

```html
<!-- CDN -->
<script src="https://cdn.jsdelivr.net/npm/lucide@latest"></script>

<!-- hoặc NPM -->
<!-- npm install lucide -->
```

#### Sử dụng

```html
<!-- SVG icons (inline) -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="lucide lucide-heart"
>
  <path
    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  ></path>
</svg>

<!-- với Lucide JS library -->
<i data-lucide="heart"></i>
<i data-lucide="star"></i>
<i data-lucide="user"></i>
<i data-lucide="shopping-cart"></i>

<script>
  lucide.createIcons();
</script>
```

#### Styling Lucide icons

```html
<style>
  .lucide {
    width: 24px;
    height: 24px;
    color: #3b82f6;
    stroke-width: 2;
  }

  .lucide:hover {
    color: #1d4ed8;
    transform: scale(1.2);
    transition: all 0.3s;
  }

  .lucide-lg {
    width: 48px;
    height: 48px;
  }
</style>

<i data-lucide="heart" class="lucide"></i>
<i data-lucide="star" class="lucide lucide-lg"></i>
```

#### So sánh: Font Awesome vs Lucide

| Tính năng        | Font Awesome | Lucide   |
| ---------------- | ------------ | -------- |
| **Số icon**      | 6000+        | 500+     |
| **Style**        | Solid, light | Minimal  |
| **Kích thước**   | Nặng (CDN)   | Nhẹ      |
| **Responsive**   | Tốt          | Tốt      |
| **Customizable** | Có           | Có (SVG) |

---

## CSS Property types — Background

**Background** kiểm soát nền của phần tử, bao gồm màu sắc, hình ảnh, lặp lại, vị trí, kích thước, và attachment.

### 1. `background-color`: Màu nền

```css
.element {
  background-color: #3b82f6;
  background-color: rgba(59, 130, 246, 0.5); /* với transparency */
}
```

### 2. `background-image`: Hình ảnh nền

```css
.element {
  background-image: url("background.jpg");
  background-image: linear-gradient(to right, #3b82f6, #1d4ed8);
  background-image: radial-gradient(circle, #3b82f6, #1d4ed8);
}
```

**Gradient examples:**

```css
/* Linear gradient */
.linear {
  background-image: linear-gradient(90deg, red, yellow, green);
  background-image: linear-gradient(
    45deg,
    rgba(255, 0, 0, 0.5),
    rgba(0, 0, 255, 0.5)
  );
}

/* Radial gradient */
.radial {
  background-image: radial-gradient(circle, white, lightgray);
}

/* Conic gradient */
.conic {
  background-image: conic-gradient(red, yellow, green, blue, red);
}
```

### 3. `background-repeat`: Lặp lại hình ảnh

```css
.element {
  background-repeat: repeat; /* **mặc định** — lặp 2 chiều */
  background-repeat: repeat-x; /* lặp ngang */
  background-repeat: repeat-y; /* lặp dọc */
  background-repeat: no-repeat; /* không lặp */
  background-repeat: round; /* lặp và scale để vừa */
  background-repeat: space; /* lặp với khoảng cách đều */
}
```

### 4. `background-position`: Vị trí hình ảnh

```css
.element {
  background-position: top left;
  background-position: center;
  background-position: 50% 50%; /* center center */
  background-position: 100px 50px; /* tính từ trái trên */
}
```

### 5. `background-size`: Kích thước hình ảnh

```css
.element {
  background-size: auto; /* **mặc định** — kích thước gốc */
  background-size: 100px 200px; /* cố định width height */
  background-size: 50%; /* 50% width của container */
  background-size: cover; /* phủ toàn container, có thể cắt */
  background-size: contain; /* hiển thị toàn bộ, có thể có khoảng trống */
}
```

### 6. `background-attachment`: Cố định nền khi scroll

```css
.element {
  background-attachment: scroll; /* **mặc định** — scroll với content */
  background-attachment: fixed; /* cố định, không scroll */
  background-attachment: local; /* scroll với content + box */
}
```

### 7. `background`: Shorthand

```css
.element {
  background: #3b82f6 url("image.jpg") no-repeat center / cover;
  /* = background-color: #3b82f6;
     = background-image: url("image.jpg");
     = background-repeat: no-repeat;
     = background-position: center;
     = background-size: cover;
  */
}
```

### Ví dụ thực tế: Hero section

```html
<style>
  .hero {
    height: 500px;
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("hero-image.jpg");
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  }

  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .hero p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
</style>

<section class="hero">
  <div>
    <h1>Welcome to Our Website</h1>
    <p>Discover amazing content and services</p>
    <button>Learn More</button>
  </div>
</section>
```

---

Hết buổi 8
