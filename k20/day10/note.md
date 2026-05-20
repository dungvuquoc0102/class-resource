# Day 10: Effect, Filter, Table, Transition & Animation, Transform

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

### 4. `caption`: Chú thích bảng

```html
<table>
  <caption>
    Danh sách người dùng
  </caption>
  <thead>
    <tr>
      <th>Tên</th>
      <th>Email</th>
    </tr>
  </thead>
</table>
```

```css
caption {
  caption-side: top; /* trên hoặc bottom */
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
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

  caption {
    caption-side: top;
    font-weight: bold;
    margin-bottom: 1rem;
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
  <caption>
    Danh sách người dùng
  </caption>
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

---

## CSS Property types — Transition và Animation

**Transition** tạo hiệu ứng mượt mà khi một property thay đổi, trong khi **Animation** tạo các chuỗi chuyển động phức tạp.

### Transition

**Transition** tạo hiệu ứng chuyển đổi mượt mà giữa hai trạng thái của một phần tử.

#### `transition-property`: Các property cần chuyển đổi

```css
.element {
  transition-property: color, background-color, transform;
  /* hoặc */
  transition-property: all; /* tất cả properties */
}
```

#### `transition-duration`: Thời gian chuyển đổi

```css
.element {
  transition-duration: 0.3s; /* 300 milliseconds */
  transition-duration: 0.3s, 0.5s, 0.2s; /* multiple properties */
}
```

#### `transition-timing-function`: Tốc độ chuyển đổi

```css
.element {
  transition-timing-function: linear; /* tốc độ đều */
  transition-timing-function: ease; /* chậm → nhanh → chậm (mặc định) */
  transition-timing-function: ease-in; /* chậm → nhanh */
  transition-timing-function: ease-out; /* nhanh → chậm */
  transition-timing-function: ease-in-out; /* chậm → nhanh → chậm */
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1); /* tùy chỉnh */
}
```

#### `transition-delay`: Trì hoãn chuyển đổi

```css
.element {
  transition-delay: 0.2s; /* chờ 200ms rồi mới chuyển đổi */
}
```

#### `transition`: Shorthand

```css
.element {
  transition: color 0.3s ease-in-out 0.1s;
  /* = transition-property: color;
     = transition-duration: 0.3s;
     = transition-timing-function: ease-in-out;
     = transition-delay: 0.1s;
  */

  transition: all 0.3s ease; /* tất cả properties, 300ms, ease */
}
```

**Ví dụ:**

```html
<style>
  .button {
    padding: 0.75rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .button:hover {
    background-color: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .box {
    width: 100px;
    height: 100px;
    background-color: #ec4899;
    transition:
      width 0.3s ease,
      background-color 0.5s ease;
  }

  .box:hover {
    width: 200px;
    background-color: #8b5cf6;
  }
</style>

<button class="button">Hover me</button>
<div class="box"></div>
```

### Animation

**Animation** tạo chuỗi chuyển động phức tạp bằng `@keyframes`.

#### `@keyframes`: Xác định các bước animation

```css
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0);
  }
}
```

#### `animation-name`: Tên animation

```css
.element {
  animation-name: slide-in;
}
```

#### `animation-duration`: Thời gian animation

```css
.element {
  animation-duration: 1s; /* 1 giây */
}
```

#### `animation-timing-function`: Tốc độ animation

```css
.element {
  animation-timing-function: ease-in-out;
}
```

#### `animation-delay`: Trì hoãn animation

```css
.element {
  animation-delay: 0.5s; /* chờ 500ms rồi mới bắt đầu */
}
```

#### `animation-iteration-count`: Số lần lặp

```css
.element {
  animation-iteration-count: 1; /* chạy 1 lần (mặc định) */
  animation-iteration-count: 3; /* chạy 3 lần */
  animation-iteration-count: infinite; /* lặp vô hạn */
}
```

#### `animation-direction`: Hướng animation

```css
.element {
  animation-direction: normal; /* từ 0% đến 100% (mặc định) */
  animation-direction: reverse; /* từ 100% đến 0% */
  animation-direction: alternate; /* 0% → 100% → 0% → ... */
  animation-direction: alternate-reverse; /* 100% → 0% → 100% → ... */
}
```

#### `animation-fill-mode`: Trạng thái trước/sau animation

```css
.element {
  animation-fill-mode: none; /* không giữ lại (mặc định) */
  animation-fill-mode: forwards; /* giữ trạng thái cuối cùng */
  animation-fill-mode: backwards; /* bắt đầu từ trạng thái đầu tiên */
  animation-fill-mode: both; /* cả hai */
}
```

#### `animation`: Shorthand

```css
.element {
  animation: bounce 1s ease-in-out 0.5s infinite alternate;
  /* = animation-name: bounce;
     = animation-duration: 1s;
     = animation-timing-function: ease-in-out;
     = animation-delay: 0.5s;
     = animation-iteration-count: infinite;
     = animation-direction: alternate;
  */
}
```

**Ví dụ:**

```html
<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(50px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }
  }

  .card {
    animation: fade-in 0.5s ease-in;
  }

  .card:nth-child(2) {
    animation: slide-up 0.5s ease-in 0.1s both;
  }

  .card:nth-child(3) {
    animation: slide-up 0.5s ease-in 0.2s both;
  }

  .loading {
    animation: pulse 1.5s ease-in-out infinite;
  }
</style>

<div class="card">Card 1</div>
<div class="card">Card 2</div>
<div class="card">Card 3</div>
<div class="loading">Loading...</div>
```

### So sánh: Transition vs Animation

| Tính năng         | Transition      | Animation         |
| ----------------- | --------------- | ----------------- |
| **Kích hoạt**     | hover, JS       | tự động           |
| **Số bước**       | 2 (start → end) | nhiều             |
| **Lặp lại**       | Không           | Có                |
| **Chi tiết**      | Đơn giản        | Phức tạp          |
| **Khi nào dùng?** | Hover, focus    | Looping, phức tạp |

---

## CSS Property types — Transform

**Transform** thay đổi hình dáng, kích thước, vị trí của phần tử mà không ảnh hưởng đến document flow.

### Các loại transform

```css
.element {
  transform: translate(10px, 20px); /* dịch chuyển */
  transform: rotate(45deg); /* xoay */
  transform: scale(1.5); /* phóng to */
  transform: skew(10deg, 20deg); /* xiên */
  transform: translate3d(10px, 20px, 30px); /* 3D dịch chuyển */
}
```

### 1. `translate()`: Dịch chuyển

```css
.element {
  transform: translateX(50px); /* dịch phải 50px */
  transform: translateY(30px); /* dịch xuống 30px */
  transform: translate(50px, 30px); /* dịch phải 50px, xuống 30px */
  transform: translate3d(50px, 30px, 20px); /* 3D dịch chuyển */
}
```

**Ví dụ:**

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: #3b82f6;
    transition: transform 0.3s;
  }

  .box:hover {
    transform: translate(20px, -10px);
  }
</style>

<div class="box"></div>
```

### 2. `rotate()`: Xoay

```css
.element {
  transform: rotate(45deg); /* xoay 45 độ (2D) */
  transform: rotateX(45deg); /* xoay quanh trục X (3D) */
  transform: rotateY(45deg); /* xoay quanh trục Y (3D) */
  transform: rotateZ(45deg); /* xoay quanh trục Z (3D) = rotate() */
  transform: rotate3d(1, 1, 0, 45deg); /* xoay theo vector 3D */
}
```

**Ví dụ:**

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: #ec4899;
    transition: transform 0.3s;
  }

  .box:hover {
    transform: rotate(45deg);
  }

  .card {
    width: 150px;
    height: 100px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    transition: transform 0.3s;
  }

  .card:hover {
    transform: rotateY(360deg);
  }
</style>

<div class="box"></div>
<div class="card"></div>
```

### 3. `scale()`: Phóng to/thu nhỏ

```css
.element {
  transform: scale(1.5); /* phóng to 150% */
  transform: scaleX(2); /* phóng to ngang 200% */
  transform: scaleY(0.5); /* thu nhỏ dọc 50% */
  transform: scale(2, 0.5); /* phóng ngang, thu dọc */
}
```

**Ví dụ:**

```html
<style>
  .button {
    padding: 0.75rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .button:hover {
    transform: scale(1.1);
  }

  .button:active {
    transform: scale(0.95);
  }
</style>

<button class="button">Click me</button>
```

### 4. `skew()`: Xiên

```css
.element {
  transform: skew(10deg); /* xiên 10 độ (cả 2 chiều) */
  transform: skewX(20deg); /* xiên ngang 20 độ */
  transform: skewY(15deg); /* xiên dọc 15 độ */
  transform: skew(20deg, 15deg); /* xiên ngang 20, dọc 15 */
}
```

**Ví dụ:**

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: #10b981;
    transition: transform 0.3s;
  }

  .box:hover {
    transform: skew(10deg, 5deg);
  }
</style>

<div class="box"></div>
```

### 5. 3D Transform

```css
.container {
  perspective: 1000px; /* khoảng cách nhìn 3D */
}

.element {
  transform: translate3d(10px, 20px, 30px);
  transform: rotateX(45deg) rotateY(30deg);
  transform: scale3d(1.2, 1.2, 1);
}
```

**Ví dụ: Flip card**

```html
<style>
  .container {
    perspective: 1000px;
    width: 150px;
    height: 200px;
  }

  .card {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  .container:hover .card {
    transform: rotateY(180deg);
  }

  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .front {
    background-color: #3b82f6;
    color: white;
  }

  .back {
    background-color: #ec4899;
    color: white;
    transform: rotateY(180deg);
  }
</style>

<div class="container">
  <div class="card">
    <div class="front">Front</div>
    <div class="back">Back</div>
  </div>
</div>
```

### `transform-origin`: Điểm tâm của transformation

```css
.element {
  transform-origin: center; /* (mặc định) */
  transform-origin: top left;
  transform-origin: 50% 50%;
  transform: rotate(45deg); /* xoay từ tâm */
}
```
