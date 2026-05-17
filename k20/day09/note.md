# Day 9: Icon, Background, Effect, Filter, Table

## CSS Property types — Icon: Font Awesome, Lucide Icons

**Icons** giúp **truyền thông tin nhanh chóng** và cải thiện UX. Có 3 cách thêm icon:

1. **Icon fonts** (Font Awesome, Lucide Icons)
2. **SVG icons** (inline hoặc img)
3. **Image** (PNG, JPG)

### Font Awesome

**Font Awesome** là thư viện icon phổ biến nhất.

#### Setup

FontAwesome khuyến khích sử dụng **Font Awesome Kit** (thay vì CDN truyền thống) vì những lý do quan trọng:

1. **Tối ưu hiệu năng**: Chỉ tải các icon bạn thực sự dùng (thay vì hàng ngàn icon)
2. **Quản lý phiên bản tự động**: Có thể cập nhật phiên bản từ dashboard mà không sửa code
3. **Bảo mật tốt hơn**: Kiểm soát quyền truy cập tập trung

**Cách 1: Font Awesome Kit (Recommended)**

1. Vào https://fontawesome.com -> đăng nhập/tạo account
2. Vào "Kits" -> "Create a Kit" -> Copy mã script
3. Paste vào `<head>` của HTML:

```html
<!-- Font Awesome Kit -->
<script
  src="https://kit.fontawesome.com/YOUR_KIT_CODE.js"
  crossorigin="anonymous"
></script>
```

**Cách 2: NPM (nếu dùng project Node.js)**

```bash
npm install @fortawesome/fontawesome-free
```

Sau đó import trong file CSS:

```css
@import "@fortawesome/fontawesome-free/css/all.min.css";
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

Hết buổi 9

---

## CSS Property types — Effect

**Effects** tạo các hiệu ứng đặc biệt cho phần tử như bóng, độ trong suốt, và mặt nạ.

### 1. `box-shadow`: Bóng hộp

```css
.element {
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  /* offset-x | offset-y | blur-radius | color */

  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.1); /* multiple shadows */

  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2); /* inner shadow */
}
```

**Ví dụ thực tế:**

```html
<style>
  .card {
    padding: 2rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .card:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s;
  }

  .button {
    padding: 0.75rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
    cursor: pointer;
  }

  .button:active {
    box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.2);
  }
</style>

<div class="card">Card with shadow</div>
<button class="button">Click me</button>
```

### 2. `text-shadow`: Bóng chữ

```css
.text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  /* offset-x | offset-y | blur-radius | color */

  text-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.5),
    4px 4px 8px rgba(0, 0, 0, 0.3); /* multiple shadows */
}
```

**Ví dụ:**

```html
<style>
  .title {
    font-size: 2rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }

  .glowing-text {
    color: white;
    text-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
  }

  .neon-text {
    color: #00ff00;
    text-shadow:
      0 0 10px rgba(0, 255, 0, 0.8),
      0 0 20px rgba(0, 255, 0, 0.6);
  }
</style>

<h1 class="title">Tiêu đề với bóng</h1>
<h2 class="glowing-text">Chữ sáng</h2>
<h2 class="neon-text">Chữ Neon</h2>
```

### 3. `opacity`: Độ trong suốt

```css
.element {
  opacity: 1; /* **mặc định** — không trong suốt */
  opacity: 0.5; /* 50% trong suốt */
  opacity: 0; /* 100% trong suốt (ẩn hoàn toàn) */
}
```

**So sánh: `opacity` vs `background-color: rgba()`**

```css
.with-opacity {
  opacity: 0.5; /* làm mờ toàn bộ phần tử + con */
}

.with-rgba {
  background-color: rgba(255, 0, 0, 0.5); /* chỉ nền */
}
```

**Ví dụ:**

```html
<style>
  .image {
    width: 200px;
    opacity: 1;
  }

  .image:hover {
    opacity: 0.7;
    transition: opacity 0.3s;
  }

  .disabled-button {
    padding: 0.75rem 1.5rem;
    opacity: 0.6;
    cursor: not-allowed;
  }

  .tooltip {
    background-color: black;
    color: white;
    padding: 0.5rem;
    border-radius: 0.25rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  .element:hover .tooltip {
    opacity: 1;
    pointer-events: auto;
  }
</style>

<img src="photo.jpg" class="image" alt="Photo" />
<button class="disabled-button">Disabled</button>
```

### 4. `mask`: Mặt nạ

```css
.element {
  mask-image: url("#mask-svg");
  mask-image: linear-gradient(to right, transparent, black);
  mask-size: 100% 100%;
  mask-position: center;
  mask-repeat: no-repeat;
}
```

**Ví dụ:**

```html
<style>
  .masked-image {
    width: 200px;
    height: 200px;
    background-image: url("photo.jpg");
    background-size: cover;
    -webkit-mask-image: radial-gradient(circle, black, transparent);
    mask-image: radial-gradient(circle, black, transparent);
  }

  .fade-out {
    width: 100%;
    height: 200px;
    background: linear-gradient(to right, red, yellow, green);
    -webkit-mask-image: linear-gradient(to right, black, transparent);
    mask-image: linear-gradient(to right, black, transparent);
  }
</style>

<div class="masked-image"></div>
<div class="fade-out"></div>
```

---

## CSS Property types — Filter

**Filter** áp dụng các hiệu ứng đồ họa như làm mờ, thay đổi độ sáng, tương phản, v.v.

### Các loại filter

```css
.element {
  filter: blur(5px); /* làm mờ */
  filter: brightness(150%); /* tăng độ sáng */
  filter: contrast(150%); /* tăng tương phản */
  filter: grayscale(100%); /* chuyển sang xám */
  filter: hue-rotate(90deg); /* xoay màu */
  filter: invert(100%); /* đảo ngược màu */
  filter: opacity(50%); /* độ trong suốt */
  filter: saturate(150%); /* tăng độ bão hòa */
  filter: sepia(100%); /* tế bào sepia */
  filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3)); /* bóng */
}
```

### 1. `blur`: Làm mờ

```css
.blur {
  filter: blur(5px);
}

.blur-heavy {
  filter: blur(10px);
}
```

### 2. `brightness`: Độ sáng

```css
.brighter {
  filter: brightness(150%); /* tăng 50% */
}

.darker {
  filter: brightness(50%); /* giảm xuống 50% */
}
```

### 3. `contrast`: Tương phản

```css
.high-contrast {
  filter: contrast(150%);
}

.low-contrast {
  filter: contrast(50%);
}
```

### 4. `grayscale`: Chuyển sang xám

```css
.grayscale-full {
  filter: grayscale(100%);
}

.grayscale-half {
  filter: grayscale(50%);
}
```

### 5. `hue-rotate`: Xoay màu

```css
.hue-rotate {
  filter: hue-rotate(90deg); /* xoay 90 độ */
}
```

### 6. `invert`: Đảo ngược màu

```css
.inverted {
  filter: invert(100%);
}

.inverted-half {
  filter: invert(50%);
}
```

### 7. `saturate`: Độ bão hòa

```css
.saturated {
  filter: saturate(200%);
}

.desaturated {
  filter: saturate(0%);
}
```

### 8. `sepia`: Sepia tone

```css
.sepia {
  filter: sepia(100%);
}
```

### 9. `drop-shadow`: Bóng thả

```css
.shadow {
  filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
}
```

### Kết hợp nhiều filter

```css
.combined {
  filter: blur(2px) brightness(110%) contrast(120%);
}

.photo-effect {
  filter: saturate(150%) contrast(110%) brightness(90%);
}
```

### Ví dụ thực tế: Hover effects

```html
<style>
  .gallery-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    cursor: pointer;
    transition: filter 0.3s;
  }

  .gallery-image:hover {
    filter: brightness(110%) contrast(120%);
  }

  .gallery-image.bw {
    filter: grayscale(100%);
  }

  .gallery-image.bw:hover {
    filter: grayscale(0%);
  }

  .dark-mode-image {
    filter: invert(1);
  }

  .blur-on-hover {
    filter: blur(0px);
  }

  .blur-on-hover:hover {
    filter: blur(5px);
  }
</style>

<img src="photo.jpg" class="gallery-image" alt="Gallery" />
<img src="photo.jpg" class="gallery-image bw" alt="Gallery B&W" />
<img src="photo.jpg" class="dark-mode-image" alt="Dark mode" />
```

---

## CSS Property types — Table

**Table styling** cải thiện trình bày bảng HTML, bao gồm viền, khoảng cách, căn chỉnh, và hover effects.

### HTML cơ bản

```html
<table>
  <thead>
    <tr>
      <th>Tiêu đề 1</th>
      <th>Tiêu đề 2</th>
      <th>Tiêu đề 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
  </tbody>
</table>
```

### 1. `border-collapse`: Gộp viền

```css
table {
  border-collapse: collapse; /* gộp viền */
  /* border-collapse: separate; (mặc định) — tách viền */
}
```

### 2. `border-spacing`: Khoảng cách viền

```css
table {
  border-spacing: 10px; /* khoảng cách 10px */
  border-spacing: 10px 5px; /* width height */
}
```

### 3. `table-layout`: Bố cục bảng

```css
table {
  table-layout: auto; /* **mặc định** — tính toán chiều rộng tự động */
  table-layout: fixed; /* chiều rộng cố định, nhanh hơn */
}
```

### Ví dụ thực tế: Styled table

```html
<style>
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    text-align: left;
  }

  thead {
    background-color: #1f2937;
    color: white;
  }

  th {
    padding: 12px;
    font-weight: 600;
    text-align: left;
  }

  td {
    padding: 10px 12px;
    border-bottom: 1px solid #e5e7eb;
  }

  tbody tr:hover {
    background-color: #f3f4f6;
    cursor: pointer;
  }

  tbody tr:nth-child(even) {
    background-color: #f9fafb;
  }

  tbody tr:nth-child(even):hover {
    background-color: #ede9fe;
  }

  .status-active {
    background-color: #dcfce7;
    color: #166534;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
  }

  .status-inactive {
    background-color: #fee2e2;
    color: #7f1d1d;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
</style>

<table>
  <thead>
    <tr>
      <th>Tên</th>
      <th>Email</th>
      <th>Trạng thái</th>
      <th>Hành động</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nguyễn Văn A</td>
      <td>a@example.com</td>
      <td><span class="status-active">Hoạt động</span></td>
      <td><button>Edit</button></td>
    </tr>
    <tr>
      <td>Trần Thị B</td>
      <td>b@example.com</td>
      <td><span class="status-inactive">Không hoạt động</span></td>
      <td><button>Edit</button></td>
    </tr>
  </tbody>
</table>
```

### 4. Responsive table

```html
<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  @media (max-width: 768px) {
    table {
      font-size: 12px;
    }

    td,
    th {
      padding: 8px 6px;
    }

    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      margin-bottom: 15px;
      border: 1px solid #e5e7eb;
    }

    td {
      position: relative;
      padding-left: 50%;
    }

    td:before {
      content: attr(data-label);
      position: absolute;
      left: 6px;
      font-weight: 600;
    }
  }
</style>

<table>
  <thead>
    <tr>
      <th>Tên</th>
      <th>Email</th>
      <th>Điểm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Tên">Nguyễn Văn A</td>
      <td data-label="Email">a@example.com</td>
      <td data-label="Điểm">9.5</td>
    </tr>
  </tbody>
</table>
```
