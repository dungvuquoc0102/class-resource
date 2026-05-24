# Day 11: Interactivity, Functions, Responsive Design, Dark Mode & Theme Variables

## CSS Property types — Interactivity

**Interactivity** cải thiện trải nghiệm người dùng bằng cách kiểm soát con trỏ, lựa chọn, cuộn trang, và các tương tác khác.

### 1. `cursor`: Hình dạng con trỏ chuột

**Cursor** thay đổi hình dạng con trỏ khi di chuyển qua các phần tử khác nhau.

```css
.element {
  cursor: auto; /* **mặc định** — con trỏ tự động */
  cursor: pointer; /* tay chỉ — cho các link, button */
  cursor: default; /* mũi tên bình thường */
  cursor: text; /* con trỏ chữ — cho input */
  cursor: move; /* lên xuống trái phải */
  cursor: not-allowed; /* cấm — cho disabled */
  cursor: wait; /* đồng hồ cát — chờ */
  cursor: help; /* dấu hỏi — trợ giúp */
  cursor: grab; /* bàn tay nhặt — có thể kéo */
  cursor: grabbing; /* bàn tay cầm — đang kéo */
  cursor: zoom-in; /* kính lúp + */
  cursor: zoom-out; /* kính lúp - */
  cursor: crosshair; /* chéo — chọn vị trí */
  cursor: progress; /* mũi tên + đồng hồ cát */
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
    cursor: pointer; /* tay chỉ */
    transition: background-color 0.3s;
  }

  .button:hover {
    background-color: #1d4ed8;
  }

  .disabled-button {
    background-color: #9ca3af;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .draggable-box {
    width: 100px;
    height: 100px;
    background-color: #ec4899;
    cursor: grab;
  }

  .draggable-box:active {
    cursor: grabbing;
  }

  .text-input {
    padding: 0.5rem;
    cursor: text;
  }

  .help-icon {
    cursor: help;
    color: #3b82f6;
    text-decoration: underline;
  }

  .zoom-area {
    cursor: zoom-in;
  }

  .zoom-area:active {
    cursor: zoom-out;
  }
</style>

<button class="button">Click me</button>
<button class="disabled-button" disabled>Disabled</button>
<div class="draggable-box">Drag me</div>
<input type="text" class="text-input" placeholder="Type..." />
<span class="help-icon">?</span>
<div class="zoom-area">Zoom area</div>
```

### 2. `pointer-events`: Phản ứng với sự kiện chuột

**Pointer-events** kiểm soát xem phần tử có phản ứng với sự kiện chuột hay không.

```css
.element {
  pointer-events: auto; /* **mặc định** — phản ứng với sự kiện */
  pointer-events: none; /* bỏ qua sự kiện chuột */
}
```

**Ví dụ:**

```html
<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto; /* cho phép click qua overlay */
  }

  .tooltip {
    background-color: black;
    color: white;
    padding: 0.5rem;
    border-radius: 0.25rem;
    pointer-events: none; /* không phản ứng với click */
  }

  .disabled-link {
    color: gray;
    text-decoration: none;
    pointer-events: none; /* link bị vô hiệu hóa */
    opacity: 0.6;
    cursor: not-allowed;
  }

  .interactive-card {
    padding: 1rem;
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .interactive-card:hover {
    background-color: #e5e7eb;
  }

  .interactive-card.loading {
    pointer-events: none;
    opacity: 0.6;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto; /* phải có để đóng modal */
  }
</style>

<div class="overlay">
  <div class="tooltip">Tooltip (không click được)</div>
</div>
<a href="#" class="disabled-link">Disabled Link</a>
<div class="interactive-card">Clickable card</div>
```

### 3. `user-select`: Chọn văn bản

**User-select** kiểm soát xem người dùng có thể chọn văn bản hay không.

```css
.element {
  user-select: auto; /* **mặc định** — chọn bình thường */
  user-select: none; /* không thể chọn */
  user-select: text; /* chọn như văn bản */
  user-select: all; /* chọn tất cả khi click */
}
```

**Ví dụ:**

```html
<style>
  .no-select {
    user-select: none; /* không thể chọn */
  }

  .copy-code {
    background-color: #1f2937;
    color: #10b981;
    padding: 1rem;
    border-radius: 0.5rem;
    font-family: monospace;
    user-select: all; /* chọn tất cả khi click */
    cursor: pointer;
  }

  .button-text {
    user-select: none; /* button text không chọn được */
  }

  .disclaimer {
    font-size: 0.875rem;
    color: #6b7280;
    user-select: text; /* chỉ chọn text */
  }

  .logo {
    user-select: none; /* logo không chọn */
    font-weight: bold;
    font-size: 1.5rem;
  }
</style>

<div class="logo">My Brand</div>
<button class="button-text">Click me</button>
<div class="no-select">Không thể chọn text này</div>
<pre class="copy-code">const greeting = "Hello World";</pre>
<p class="disclaimer">© 2024. All rights reserved.</p>
```

### 4. `scroll-behavior`: Hành vi cuộn trang

**Scroll-behavior** tạo cuộn mượt mà thay vì cuộn tức thời.

```css
html {
  scroll-behavior: auto; /* **mặc định** — cuộn tức thời */
  scroll-behavior: smooth; /* cuộn mượt mà */
}
```

**Ví dụ:**

```html
<style>
  html {
    scroll-behavior: smooth; /* toàn bộ trang cuộn mượt */
  }

  .section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .section:nth-child(1) {
    background-color: #dbeafe;
  }

  .section:nth-child(2) {
    background-color: #fecaca;
  }

  .section:nth-child(3) {
    background-color: #bbf7d0;
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .nav a {
    margin-right: 1rem;
    text-decoration: none;
    color: #3b82f6;
    cursor: pointer;
  }

  .nav a:hover {
    text-decoration: underline;
  }
</style>

<nav class="nav">
  <a href="#section1">Section 1</a>
  <a href="#section2">Section 2</a>
  <a href="#section3">Section 3</a>
</nav>

<section id="section1" class="section">Section 1</section>
<section id="section2" class="section">Section 2</section>
<section id="section3" class="section">Section 3</section>
```

### 5. `scroll-snap`: Snap khi cuộn

**Scroll-snap** gắn phần tử vào vị trí khi người dùng cuộn xong.

```css
.scroll-container {
  scroll-snap-type: x mandatory; /* x hoặc y, mandatory hoặc proximity */
}

.scroll-item {
  scroll-snap-align: center; /* start, center, end */
  scroll-snap-stop: always; /* always hoặc normal */
}
```

**Ví dụ:**

```html
<style>
  .carousel {
    display: flex;
    width: 100%;
    height: 500px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory; /* snap theo x axis */
  }

  .carousel-item {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  .carousel-item:nth-child(1) {
    background-color: #dbeafe;
  }

  .carousel-item:nth-child(2) {
    background-color: #fecaca;
  }

  .carousel-item:nth-child(3) {
    background-color: #bbf7d0;
  }

  .carousel-item:nth-child(4) {
    background-color: #fde047;
  }

  /* Vertical scroll snap */
  .vertical-scroll {
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
  }

  .vertical-section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
</style>

<div class="carousel">
  <div class="carousel-item">Slide 1</div>
  <div class="carousel-item">Slide 2</div>
  <div class="carousel-item">Slide 3</div>
  <div class="carousel-item">Slide 4</div>
</div>

<div class="vertical-scroll">
  <div class="vertical-section" style="background: #dbeafe;">Section 1</div>
  <div class="vertical-section" style="background: #fecaca;">Section 2</div>
  <div class="vertical-section" style="background: #bbf7d0;">Section 3</div>
</div>
```

---

## CSS Functions

**CSS Functions** là các hàm được sử dụng trong CSS properties để tính toán giá trị động.

### 1. `calc()`: Tính toán giá trị

**calc()** cho phép thực hiện phép toán trong CSS.

```css
.element {
  width: calc(100% - 20px); /* 100% trừ 20px */
  height: calc(100vh - 60px); /* chiều cao view trừ 60px */
  padding: calc(1rem + 2px); /* 1rem + 2px */
  margin: calc(var(--base-margin) * 2); /* dùng với biến */
}
```

**Ví dụ:**

```html
<style>
  .container {
    width: calc(100% - 40px); /* 100% trừ padding */
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, calc((100% - 40px) / 3));
    gap: 20px;
    padding: 20px;
  }

  .grid-item {
    background-color: #3b82f6;
    padding: 1rem;
    border-radius: 0.5rem;
    color: white;
  }

  .header {
    height: calc(100vh - 300px); /* fullscreen trừ footer */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #dbeafe;
  }

  .sidebar {
    width: calc(25% - 20px); /* 25% trừ gap */
    margin-right: 20px;
    background-color: #f3f4f6;
    padding: 1rem;
  }

  .main {
    width: calc(75% - 20px);
    background-color: white;
  }

  .input {
    width: calc(100% - 40px - 50px); /* width trừ padding trừ button */
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
  }

  .button {
    width: 50px;
    padding: 0.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>

<div class="container">
  <div class="header">Header (100vh - 300px)</div>
  <div style="display: flex;">
    <div class="sidebar">Sidebar (25% - 20px)</div>
    <div class="main">Main (75% - 20px)</div>
  </div>
</div>

<div class="grid">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
</div>

<div style="padding: 1rem;">
  <input type="text" class="input" placeholder="Search..." />
  <button class="button">Go</button>
</div>
```

### 2. `var()`: Biến CSS

**var()** sử dụng biến CSS (CSS Custom Properties) được định nghĩa trước.

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #ec4899;
  --spacing: 1rem;
  --border-radius: 0.5rem;
}

.element {
  color: var(--primary-color);
  background-color: var(--secondary-color);
  padding: var(--spacing);
  border-radius: var(--border-radius);
}
```

**Ví dụ:**

```html
<style>
  :root {
    --primary: #3b82f6;
    --secondary: #ec4899;
    --success: #10b981;
    --danger: #ef4444;
    --warning: #f59e0b;
    --spacing: 1rem;
    --border-radius: 0.5rem;
    --font-size: 16px;
    --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  body {
    font-family: var(--font-family);
    font-size: var(--font-size);
    color: #1f2937;
  }

  .button {
    padding: var(--spacing);
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.3s;
  }

  .button-primary {
    background-color: var(--primary);
    color: white;
  }

  .button-primary:hover {
    opacity: 0.9;
  }

  .button-danger {
    background-color: var(--danger);
    color: white;
  }

  .button-success {
    background-color: var(--success);
    color: white;
  }

  .alert {
    padding: var(--spacing);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing);
  }

  .alert-danger {
    background-color: #fee2e2;
    color: var(--danger);
    border-left: 4px solid var(--danger);
  }

  .alert-success {
    background-color: #dcfce7;
    color: var(--success);
    border-left: 4px solid var(--success);
  }

  .alert-warning {
    background-color: #fef3c7;
    color: var(--warning);
    border-left: 4px solid var(--warning);
  }

  .card {
    background-color: white;
    border-radius: var(--border-radius);
    padding: var(--spacing);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="card">
  <h1>CSS Variables</h1>
  <button class="button button-primary">Primary Button</button>
  <button class="button button-danger">Danger Button</button>
  <button class="button button-success">Success Button</button>
</div>

<div class="alert alert-danger">Đây là thông báo lỗi</div>
<div class="alert alert-success">Đây là thông báo thành công</div>
<div class="alert alert-warning">Đây là thông báo cảnh báo</div>
```

### 3. `clamp()`: Giá trị tối thiểu, tối đa, tối ưu

**clamp()** đảm bảo giá trị nằm giữa min và max, với một giá trị ưa thích.

```css
.element {
  font-size: clamp(1rem, 2.5vw, 2rem);
  /* min | preferred | max */
  /* = font-size ít nhất 1rem, tối đa 2rem, ưa thích 2.5vw */

  width: clamp(250px, 80%, 1200px);
  /* width ít nhất 250px, tối đa 1200px, ưa thích 80% */
}
```

**Ví dụ:**

```html
<style>
  :root {
    --spacing-base: 1rem;
  }

  body {
    margin: 0;
    padding: clamp(0.5rem, 5vw, 2rem); /* padding responsive */
  }

  .title {
    font-size: clamp(1.5rem, 5vw, 3rem); /* responsive heading */
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: clamp(1rem, 3vw, 1.5rem); /* responsive subtitle */
    color: #6b7280;
    margin-bottom: 2rem;
  }

  .container {
    width: clamp(250px, 90%, 1200px); /* responsive width */
    margin: 0 auto;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(clamp(200px, 100%, 300px), 1fr)
    );
    gap: clamp(1rem, 3vw, 2rem);
  }

  .card {
    background-color: #f3f4f6;
    padding: clamp(1rem, 2vw, 2rem);
    border-radius: clamp(0.25rem, 1vw, 0.5rem);
  }

  .button {
    padding: clamp(0.5rem, 1vw, 1rem) clamp(1rem, 2vw, 2rem);
    font-size: clamp(0.875rem, 2vw, 1rem);
  }
</style>

<div class="container">
  <h1 class="title">Responsive Typography with clamp()</h1>
  <p class="subtitle">Heading size adjusts based on viewport</p>

  <div class="grid">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
  </div>

  <button class="button">Click me</button>
</div>
```

---

## Responsive Design

**Responsive Design** đảm bảo website hoạt động tốt trên mọi kích thước màn hình từ mobile đến desktop.

### 1. Mobile-first: Tư duy thiết kế responsive

**Mobile-first** có nghĩa là thiết kế cho mobile trước, sau đó mở rộng cho desktop.

```css
/* Mobile-first approach */

/* Mobile styles (default — không cần media query) */
body {
  font-size: 16px;
  padding: 1rem;
}

.container {
  width: 100%;
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr; /* một cột trên mobile */
}

/* Tablet — từ 768px trở lên */
@media (min-width: 768px) {
  body {
    font-size: 18px;
    padding: 2rem;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr); /* hai cột trên tablet */
  }
}

/* Desktop — từ 1024px trở lên */
@media (min-width: 1024px) {
  body {
    font-size: 20px;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr); /* ba cột trên desktop */
  }
}

/* Large desktop — từ 1440px trở lên */
@media (min-width: 1440px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .grid {
    grid-template-columns: repeat(4, 1fr); /* bốn cột trên large desktop */
  }
}
```

### 2. Media Queries và Breakpoints

**Breakpoints** là các kích thước màn hình nơi layout thay đổi.

**Breakpoints phổ biến:**

- **Mobile**: 0 - 576px
- **Tablet**: 576px - 768px
- **Small Desktop**: 768px - 992px
- **Large Desktop**: 992px - 1200px
- **Extra Large**: 1200px+

```css
/* Responsive design với media queries */

.hero {
  height: 300px; /* mobile */
}

.title {
  font-size: 1.5rem; /* mobile */
}

@media (min-width: 576px) {
  /* Tablet landscape */
  .hero {
    height: 400px;
  }

  .title {
    font-size: 2rem;
  }
}

@media (min-width: 768px) {
  /* Tablet và up */
  .hero {
    height: 500px;
  }

  .title {
    font-size: 2.5rem;
  }
}

@media (min-width: 1024px) {
  /* Small desktop */
  .hero {
    height: 600px;
  }

  .title {
    font-size: 3rem;
  }
}

@media (min-width: 1440px) {
  /* Large desktop */
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Orientation queries */
@media (orientation: landscape) {
  .video {
    width: 100vw;
    height: 100vh;
  }
}

/* Max-width queries */
@media (max-width: 767px) {
  .desktop-only {
    display: none; /* ẩn trên mobile */
  }
}

/* Device pixel ratio */
@media (min-device-pixel-ratio: 2) {
  /* retina display */
  .logo {
    background-image: url("logo@2x.png");
  }
}
```

### Ví dụ thực tế: Build responsive layout

```html
<style>
  :root {
    --primary: #3b82f6;
    --spacing: 1rem;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
    background-color: #f9fafb;
  }

  .header {
    background-color: white;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo {
    font-weight: bold;
    font-size: 1.5rem;
    color: var(--primary);
  }

  .nav {
    display: none; /* ẩn trên mobile */
    gap: 2rem;
  }

  .nav a {
    color: #1f2937;
    text-decoration: none;
    transition: color 0.3s;
  }

  .nav a:hover {
    color: var(--primary);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }

  .hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem 1rem;
    border-radius: 0.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .hero h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .hero p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .card h3 {
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  .footer {
    background-color: #1f2937;
    color: white;
    padding: 2rem 1rem;
    text-align: center;
  }

  /* Tablet và up */
  @media (min-width: 768px) {
    .nav {
      display: flex;
    }

    .hero h1 {
      font-size: 2.5rem;
    }

    .hero p {
      font-size: 1.125rem;
    }

    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Desktop và up */
  @media (min-width: 1024px) {
    .header {
      padding: 1.5rem;
    }

    .hero {
      padding: 4rem 2rem;
    }

    .hero h1 {
      font-size: 3rem;
    }

    .grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .card {
      padding: 2rem;
    }
  }
</style>

<header class="header">
  <div class="header-content">
    <div class="logo">Brand</div>
    <nav class="nav">
      <a href="#">Home</a>
      <a href="#">Features</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </div>
</header>

<div class="container">
  <section class="hero">
    <h1>Welcome to Responsive Design</h1>
    <p>This layout adapts to different screen sizes</p>
  </section>

  <section class="grid">
    <div class="card">
      <h3>Feature 1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="card">
      <h3>Feature 2</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="card">
      <h3>Feature 3</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </section>
</div>

<footer class="footer">
  <p>&copy; 2024 Your Brand. All rights reserved.</p>
</footer>
```

---

## Dark Mode

**Dark Mode** cung cấp giao diện tối cho người dùng, tiết kiệm pin và dễ chịu hơn vào ban đêm.

### Sử dụng `prefers-color-scheme`

```css
/* Light mode (mặc định) */
body {
  background-color: white;
  color: #1f2937;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1f2937;
    color: white;
  }
}
```

### Ví dụ thực tế: Dark mode

```html
<style>
  :root {
    --bg: white;
    --text: #1f2937;
    --border: #e5e7eb;
    --card-bg: #f3f4f6;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #1f2937;
      --text: white;
      --border: #374151;
      --card-bg: #374151;
    }
  }

  body {
    background-color: var(--bg);
    color: var(--text);
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .card {
    background-color: var(--card-bg);
    border: 1px solid var(--border);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .button {
    background-color: #3b82f6;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .button:hover {
    background-color: #1d4ed8;
  }

  .input {
    width: 100%;
    padding: 0.75rem;
    background-color: var(--card-bg);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
  }
</style>

<div class="card">
  <h2>Dark Mode Example</h2>
  <p>Toggle dark mode in your system settings to see the change.</p>
  <input type="text" class="input" placeholder="Type something..." />
  <button class="button">Submit</button>
</div>
```

---

Hết buổi 11

---

## Theme Variable

**Theme Variable** cho phép tạo theme toàn cục bằng cách sử dụng CSS Custom Properties.

### Khai báo theme

```css
:root {
  /* Colors */
  --primary: #3b82f6;
  --secondary: #ec4899;
  --success: #10b981;
  --danger: #ef4444;
  --warning: #f59e0b;
  --info: #06b6d4;
  --light: #f3f4f6;
  --dark: #1f2937;
  --text: #1f2937;
  --text-light: #6b7280;
  --bg: white;
  --border: #e5e7eb;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Font sizes */
  --font-xs: 0.75rem;
  --font-sm: 0.875rem;
  --font-base: 1rem;
  --font-lg: 1.125rem;
  --font-xl: 1.25rem;
  --font-2xl: 1.5rem;
  --font-3xl: 1.875rem;

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);

  /* Font family */
  --font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "Menlo", "Monaco", monospace;

  /* Transitions */
  --transition: all 0.3s ease;
}

/* Dark mode theme */
@media (prefers-color-scheme: dark) {
  :root {
    --text: white;
    --text-light: #d1d5db;
    --bg: #1f2937;
    --border: #374151;
    --light: #374151;
  }
}
```

### Sử dụng theme variables

```html
<style>
  :root {
    --primary: #3b82f6;
    --spacing: 1rem;
    --radius: 0.5rem;
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
  }

  body {
    font-family: system-ui;
    color: var(--text, #1f2937);
    background-color: var(--bg, white);
  }

  .button {
    padding: var(--spacing);
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow);
  }

  .button:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  .card {
    background-color: white;
    padding: var(--spacing);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    margin-bottom: var(--spacing);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing);
  }
</style>

<div class="container">
  <h1>Theme Variables Example</h1>
  <div class="grid">
    <div class="card">
      <h3>Card 1</h3>
      <p>Using CSS theme variables</p>
      <button class="button">Click me</button>
    </div>
    <div class="card">
      <h3>Card 2</h3>
      <p>Easy to customize globally</p>
      <button class="button">Click me</button>
    </div>
    <div class="card">
      <h3>Card 3</h3>
      <p>Change theme in one place</p>
      <button class="button">Click me</button>
    </div>
  </div>
</div>
```
