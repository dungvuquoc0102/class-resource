# Day 7: Flexbox, Grid, Z-index

## Tag types — Table: table, tr, td, th, thead, tbody, tfoot, caption

Tag **table** dùng để hiển thị **dữ liệu bảng** — không dùng cho layout!

### Cấu trúc cơ bản

```html
<table border="1">
  <caption>
    Danh sách sản phẩm
  </caption>

  <thead>
    <tr>
      <th>STT</th>
      <th>Sản phẩm</th>
      <th>Giá</th>
      <th>Số lượng</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>1</td>
      <td>Laptop</td>
      <td>15,000,000đ</td>
      <td>5</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Chuột</td>
      <td>250,000đ</td>
      <td>25</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Bàn phím</td>
      <td>500,000đ</td>
      <td>10</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td colspan="2"><strong>Tổng</strong></td>
      <td colspan="2"><strong>15,750,000đ</strong></td>
    </tr>
  </tfoot>
</table>
```

| Tag         | Mục đích                      |
| ----------- | ----------------------------- |
| `<table>`   | Container bảng                |
| `<caption>` | Tiêu đề bảng (tuỳ chọn)       |
| `<thead>`   | Phần đầu (header rows)        |
| `<tbody>`   | Phần thân (data rows)         |
| `<tfoot>`   | Phần chân (summary, total, …) |
| `<tr>`      | Hàng (table row)              |
| `<th>`      | Ô tiêu đề (table header)      |
| `<td>`      | Ô dữ liệu (table data)        |

### Thuộc tính hữu ích

| Thuộc tính | Tác dụng                                                    |
| ---------- | ----------------------------------------------------------- |
| `colspan`  | Ghép nhiều cột                                              |
| `rowspan`  | Ghép nhiều hàng                                             |
| `scope`    | Chỉ rõ `row`, `col`, `rowgroup`, `colgroup` (accessibility) |

Yêu cầu:
Xây dựng bảng theo hình ảnh có sẵn sử dụng các thẻ: `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<caption>`, `<tr>`, `<td>`, `<th>` và các thuộc tính `colspan`, `rowspan` nếu cần.

### Ví dụ nâng cao: Bảng phức tạp

```html
<table>
  <caption>
    Kết quả bán hàng theo quý
  </caption>

  <thead>
    <tr>
      <th rowspan="2">Quý</th>
      <th colspan="2">Q1</th>
      <th colspan="2">Q2</th>
    </tr>
    <tr>
      <th>Doanh số</th>
      <th>Lợi nhuận</th>
      <th>Doanh số</th>
      <th>Lợi nhuận</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Thành phố A</td>
      <td>100</td>
      <td>25</td>
      <td>120</td>
      <td>30</td>
    </tr>
    <tr>
      <td>Thành phố B</td>
      <td>85</td>
      <td>20</td>
      <td>95</td>
      <td>22</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td><strong>Tổng cộng</strong></td>
      <td><strong>185</strong></td>
      <td><strong>45</strong></td>
      <td><strong>215</strong></td>
      <td><strong>52</strong></td>
    </tr>
  </tfoot>
</table>
```

**CSS để bảng đẹp:**

```css
table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

caption {
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
}

th,
td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}

thead {
  background-color: #f8f9fa;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f1f3f5;
}

tbody tr:hover {
  background-color: #e7f5ff;
}

tfoot {
  background-color: #f8f9fa;
  font-weight: bold;
}
```

---

## Tag types — Graphic: canvas, svg

### `<canvas>`: Vẽ đồ hoạ động

`<canvas>` cho phép **vẽ hình ảnh 2D/3D bằng JavaScript** — rất linh hoạt nhưng cần code.

```html
<!-- Canvas basic -->
<canvas id="myCanvas" width="400" height="300">
  Trình duyệt không hỗ trợ canvas.
</canvas>

<script>
  // Lấy canvas context
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // Vẽ hình chữ nhật
  ctx.fillStyle = "#3b82f6";
  ctx.fillRect(50, 50, 150, 100);

  // Vẽ vòng tròn
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(300, 150, 50, 0, 2 * Math.PI);
  ctx.fill();

  // Vẽ chữ
  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 24px Arial";
  ctx.fillText("Hello Canvas!", 50, 280);

  // Vẽ đường
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(350, 250);
  ctx.stroke();
</script>
```

**Ưu điểm Canvas:**

- Mạnh mẽ cho animation, game, vẽ tự do.
- Rendering nhanh (bitmap).

**Nhược điểm:**

- Cần JavaScript để vẽ.
- Kết quả là hình ảnh (khó thay đổi sau).
- SEO không tốt.

### `<svg>`: Vector graphics (XML-based)

`<svg>` là **XML markup** cho hình ảnh vector — có thể style bằng CSS, animate bằng JS.

```html
<!-- SVG inline -->
<svg width="200" height="200" viewBox="0 0 200 200">
  <!-- Rectangle -->
  <rect
    x="20"
    y="20"
    width="160"
    height="160"
    fill="#e0e7ff"
    stroke="#4f46e5"
    stroke-width="2"
  />

  <!-- Circle -->
  <circle cx="100" cy="100" r="50" fill="#fbbf24" />

  <!-- Text -->
  <text x="100" y="110" text-anchor="middle" font-size="16" fill="#1f2937">
    SVG
  </text>

  <!-- Line -->
  <line x1="20" y1="20" x2="180" y2="180" stroke="#10b981" stroke-width="2" />

  <!-- Polygon (ngôi sao) -->
  <polygon points="100,10 40,198 190,78 10,78 160,198" fill="#f87171" />
</svg>

<!-- SVG from file -->
<img src="logo.svg" alt="Logo" />

<!-- SVG background image (CSS) -->
<div style="background-image: url('icon.svg');"></div>
```

**SVG với CSS styling:**

```html
<style>
  .svg-icon circle {
    fill: #3b82f6;
    transition: fill 0.3s;
  }

  .svg-icon:hover circle {
    fill: #1d4ed8;
  }
</style>

<svg class="svg-icon" width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" />
  <text x="50" y="55" text-anchor="middle" fill="white" font-size="24">+</text>
</svg>
```

**SVG animation (SMIL):**

```html
<svg width="200" height="200">
  <!-- Hình chữ nhật chuyển động -->
  <rect x="0" y="75" width="50" height="50" fill="#ef4444">
    <animate
      attributeName="x"
      from="0"
      to="150"
      dur="2s"
      repeatCount="indefinite"
    />
  </rect>

  <!-- Vòng tròn xoay -->
  <circle cx="100" cy="100" r="30" fill="#3b82f6">
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 100 100"
      to="360 100 100"
      dur="3s"
      repeatCount="indefinite"
    />
  </circle>
</svg>
```

| Yếu tố            | Canvas                      | SVG                                  |
| ----------------- | --------------------------- | ------------------------------------ |
| **Type**          | Raster (bitmap)             | Vector                               |
| **Scaling**       | Mất chất lượng khi phóng to | Scales perfectly                     |
| **DOM**           | Không (chỉ Canvas element)  | Có (từng element có thể query/style) |
| **Styling**       | Chủ yếu code JS             | CSS + JS animation                   |
| **Performance**   | Tốt cho animation, game     | Tốt cho biểu đồ, icon, logo          |
| **SEO**           | Không tốt                   | Tốt hơn (nội dung text nếu có)       |
| **Accessibility** | Cần ARIA + fallback         | Tốt hơn với text + labels            |

**Khi nào dùng:**

- **Canvas**: game, animation phức tạp, real-time drawing.
- **SVG**: icon, logo, biểu đồ, animated illustration.

---

## CSS Layout — Flexbox: Container và Item properties

**Flexbox** (Flexible Box Layout) là một **hệ thống bố cục mạnh mẽ** cho phép sắp xếp các phần tử theo một hoặc hai chiều (hàng hoặc cột), với khả năng điều chỉnh khoảng cách, căn chỉnh, và kích thước tự động.

### Cơ bản: Container vs Item

```html
<style>
  .flex-container {
    display: flex;
    /* Container properties */
  }

  .flex-item {
    /* Item properties */
  }
</style>

<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

### Flexbox Container Properties

#### 1. `display: flex`

Kích hoạt Flexbox layout.

```css
.container {
  display: flex; /* kích hoạt flexbox */
}
```

#### 2. `flex-direction`: Hướng chính (main axis)

| Giá trị          | Ý nghĩa                            |
| ---------------- | ---------------------------------- |
| `row`            | **Mặc định** — chiều ngang (L → R) |
| `row-reverse`    | Chiều ngang ngược (R → L)          |
| `column`         | Chiều dọc từ trên xuống (T → B)    |
| `column-reverse` | Chiều dọc từ dưới lên (B → T)      |

```css
.container {
  display: flex;
  flex-direction: row; /* hoặc column */
}
```

#### 3. `justify-content`: Căn chỉnh theo main axis

| Giá trị         | Ý nghĩa                        |
| --------------- | ------------------------------ |
| `flex-start`    | **Mặc định** — sát đầu         |
| `flex-end`      | Sát cuối                       |
| `center`        | Giữa                           |
| `space-between` | Khoảng cách đều, viền sát mép  |
| `space-around`  | Khoảng cách đều, viền cách mép |
| `space-evenly`  | Khoảng cách và viền đều nhau   |

```css
.container {
  display: flex;
  justify-content: center; /* căn giữa */
}
```

#### 4. `align-items`: Căn chỉnh theo cross axis

| Giá trị      | Ý nghĩa                 |
| ------------ | ----------------------- |
| `flex-start` | Sát đầu cross axis      |
| `flex-end`   | Sát cuối cross axis     |
| `center`     | Giữa cross axis         |
| `stretch`    | **Mặc định** — căng ra  |
| `baseline`   | Căn chỉnh theo baseline |

```css
.container {
  display: flex;
  align-items: center; /* căn giữa dọc */
  height: 300px;
}
```

#### 5. `flex-wrap`: Xuống dòng khi hạn chế

| Giá trị        | Ý nghĩa               |
| -------------- | --------------------- |
| `nowrap`       | **Mặc định** — 1 dòng |
| `wrap`         | Xuống dòng            |
| `wrap-reverse` | Xuống dòng ngược      |

```css
.container {
  display: flex;
  flex-wrap: wrap; /* cho phép xuống dòng */
  width: 400px;
}
```

#### 6. `gap`: Khoảng cách giữa các item

```css
.container {
  display: flex;
  gap: 20px; /* khoảng cách 20px */
  /* hoặc */
  gap: 20px 30px; /* row-gap: 20px, column-gap: 30px */
}
```

#### 7. `align-content`: Căn chỉnh các dòng (khi `flex-wrap: wrap`)

Tương tự `justify-content` nhưng cho **nhiều dòng**.

```css
.container {
  display: flex;
  flex-wrap: wrap;
  height: 500px;
  align-content: space-between; /* căn chỉnh các dòng */
}
```

### Flexbox Item Properties

#### 1. `flex-basis`: Kích thước cơ sở

```css
.item {
  flex-basis: 200px; /* kích thước ban đầu */
}
```

#### 2. `flex-grow`: Tỷ lệ phát triển

Định nghĩa item sẽ lấy bao nhiêu không gian thừa.

```css
.item {
  flex-grow: 1; /* chia đều không gian thừa */
}

.item.featured {
  flex-grow: 2; /* lấy gấp đôi */
}
```

#### 3. `flex-shrink`: Tỷ lệ co lại

```css
.item {
  flex-shrink: 1; /* **mặc định** — co lại khi cần */
}
```

#### 4. `flex`: Tắt (shorthand)

Kết hợp `flex-grow`, `flex-shrink`, `flex-basis`.

```css
.item {
  flex: 1; /* flex: 1 1 0; — grow=1, shrink=1, basis=0 */
  flex: 1 0 200px; /* grow=1, shrink=0, basis=200px */
}
```

#### 5. `align-self`: Căn chỉnh riêng

Override `align-items` của container.

```css
.item {
  align-self: flex-end; /* căn riêng item này */
}
```

#### 6. `order`: Thứ tự sắp xếp

```css
.item {
  order: 1; /* **mặc định: 0** */
}

.item.first {
  order: -1; /* hiển thị trước tất cả */
}
```

### Ví dụ thực tế: Navigation bar

```html
<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1f2937;
    padding: 1rem 2rem;
    gap: 1rem;
  }

  .navbar-logo {
    font-weight: bold;
    color: white;
    flex-basis: auto;
  }

  .navbar-menu {
    display: flex;
    gap: 1.5rem;
    flex: 1; /* lấy không gian thừa */
    justify-content: center;
  }

  .navbar-menu a {
    color: white;
    text-decoration: none;
  }

  .navbar-actions {
    display: flex;
    gap: 1rem;
  }

  .navbar-actions button {
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>

<nav class="navbar">
  <div class="navbar-logo">Logo</div>
  <div class="navbar-menu">
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#services">Services</a>
  </div>
  <div class="navbar-actions">
    <button>Login</button>
    <button>Sign up</button>
  </div>
</nav>
```

### Ví dụ thực tế: Card grid với Flexbox

```html
<style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }

  .card {
    flex: 0 1 300px; /* không grow, co được, basis 300px */
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
  }

  .card-title {
    font-weight: bold;
    font-size: 1.25rem;
  }

  .card-button {
    align-self: flex-start;
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>

<div class="card-container">
  <div class="card">
    <img src="image.jpg" alt="Card image" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">Card Title</h3>
      <p>Card description goes here.</p>
      <button class="card-button">Learn more</button>
    </div>
  </div>
  <!-- Thêm card khác -->
</div>
```

---

Hết buổi 7

---

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

Hết buổi 7
