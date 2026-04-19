# Day 4: Inheritance, Specificity, Unit, Box Model, Display, Position

## Inheritance

### Ý tưởng

Một số thuộc tính (chủ yếu **chữ và màu chữ**) **kế thừa** giá trị từ phần tử **cha** xuống **con** — bạn ghi một lần ở `body` hoặc container, các phần tử bên trong thường “theo” luôn mà không cần lặp lại rule.

```html
<article class="post">
  <h2>Tiêu đề bài</h2>
  <p>
    Đoạn mở đầu. <span class="muted">Ghi chú nhỏ</span> trong cùng luồng chữ.
  </p>
</article>
```

```css
.post {
  color: #334155;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}
/* h2, p, span đều nhận color / font-family / line-height từ .post nếu không bị rule khác ghi đè */
.post .muted {
  color: #64748b; /* ghi đè riêng cho nhánh nhỏ */
}
```

### Thuộc tính “hộp” thường không kế thừa

`margin`, `padding`, `border`, `width`, `height`… **không** kế thừa — mỗi thẻ có hộp riêng. Con **không** tự mang kích thước/viền của cha.

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
.box p {
  margin: 0; /* reset margin mặc định của p, không “ăn” margin của .box */
}
```

### Bảng tham khảo nhanh (hay gặp)

| Nhóm             | Ví dụ thuộc tính                        | Kế thừa? (mặc định) |
| ---------------- | --------------------------------------- | ------------------- |
| Chữ / màu chữ    | `color`, `font-family`, `line-height`…  | Có                  |
| Hộp / kích thước | `margin`, `padding`, `border`, `width`… | Không               |
| Danh sách        | `list-style`                            | Có (lên con `li`)   |
| Ẩn hiện          | `visibility`                            | Có                  |

### `currentColor`

Nhiều chỗ (viền, `fill` SVG…) có thể dùng từ khóa **`currentColor`** — lấy đúng màu `color` đang hiệu lực trên phần tử. Tiện khi muốn icon/viền **đổi màu theo chữ** mà không lặp mã màu.

```html
<p class="note">Dòng chữ và viền cùng một màu.</p>
```

```css
.note {
  color: #b45309;
  border: 2px solid currentColor;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
}
```

### `inherit`, `initial`, `unset`, `revert`

```html
<div class="parent">
  <p class="child-border">Đoạn có viền kế thừa cha</p>
  <p class="child-reset">Đoạn reset màu về initial</p>
</div>
```

```css
.parent {
  border: 2px dashed #94a3b8;
  color: #0f172a;
}

.child-border {
  border: inherit; /* ép dùng cùng kiểu viền với cha (border không kế thừa mặc định) */
  padding: 0.5rem;
}

.child-reset {
  color: initial; /* về giá trị ban đầu của thuộc tính (không “bám” màu cha) */
}

/* unset: với thuộc tính kế thừa → như inherit; không kế thừa → như initial */
ul.clean {
  list-style: none;
  padding-left: unset;
}
```

```css
/* all: unset — xóa style từ cascade cho mọi thuộc tính (trừ direction, unicode-bidi); dùng cẩn thận */
button.raw {
  all: unset;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.25rem;
}
```

> **`revert`**: đưa thuộc tính về như thể **không có rule tự viết** — có thể quay lại style mặc định của trình duyệt (user agent). Khác `unset` ở chỗ còn tính đến lớp author/user agent.

---

## Specificity

### Khi nào cần nói tới specificity?

Khi **hai rule khác nhau** cùng đặt **cùng một property** cho **cùng một phần tử**, trình duyệt phải chọn **một giá trị thắng**. Thứ tự xét (đơn giản hóa):

1. **Declaration có `!important`** (vẫn có thể so sánh, nhưng dễ thành “cuộc chiến” — nên tránh lạm dụng).
2. **Nguồn** (inline trong HTML thường thắng file CSS nếu cùng độ ưu tiên khác).
3. **Specificity** của **selector** trong rule.
4. **Thứ tự xuất hiện** trong file: rule **sau** thắng nếu specificity **bằng nhau** (cascading).

### Cách đếm specificity (kiểu “(a, b, c)”)

- **a**: số lượng **ID** (`#header` → +1 mỗi ID).
- **b**: số lượng **class**, **pseudo-class** (`:hover`), **attribute** (`[type="email"]`).
- **c**: số lượng **element** và **pseudo-element** (`div`, `::before`).

So sánh như số: `(0, 1, 0)` thắng `(0, 0, 3)`.

| Selector                   | (a, b, c) | Ghi chú                    |
| -------------------------- | --------- | -------------------------- |
| `p`                        | (0, 0, 1) | 1 element                  |
| `.card p`                  | (0, 1, 1) | 1 class + 1 element        |
| `#app .card p`             | (1, 1, 1) | 1 id + 1 class + 1 element |
| `a:hover`                  | (0, 1, 1) | 1 pseudo-class + 1 element |
| `ul.menu > li:first-child` | (0, 1, 3) | class + 3 element/pseudo   |

### Ví dụ xung đột cụ thể

```html
<article id="intro" class="text">
  <p class="text">Đoạn trong article.</p>
</article>
```

```css
/* (0, 0, 1) */
p {
  color: gray;
}
/* (0, 1, 0) — thắng p */
.text {
  color: blue;
}
/* (1, 1, 1) — thắng .text */
#intro.text p {
  color: green;
}
```

Nếu thêm rule **cùng** `(1, 1, 1)` nhưng viết **sau**:

```css
#intro.text p {
  color: darkgreen;
}
```

→ `darkgreen` thắng vì **cùng specificity**, rule sau hơn.

### `:where()` giảm specificity

Selector trong **`:where()`** có **specificity = 0** — hay dùng để viết “reset nhẹ” không làm khó override sau này.

```css
:where(.prose) h2 {
  margin-top: 1.5em;
}
/* Độ cụ thể gần như chỉ là "h2 trong .prose" nhưng bản thân :where không cộng điểm */
```

### `!important` (chỉ khi thật sự cần)

```css
.alert {
  color: crimson !important;
}
```

Rule có `!important` thường thắng rule không có — nhưng nếu **cả hai** đều `!important`, vẫn so **specificity** rồi mới tới **thứ tự**. Dễ tạo chuỗi khó sửa — trong dự án component, ưu tiên **tăng specificity hợp lý** hoặc **tách class**.

---

## Đơn vị (Units)

### 1. Đơn vị tuyệt đối (Absolute)

| Đơn vị           | Ý nghĩa ngắn                                      |
| ---------------- | ------------------------------------------------- |
| `px`             | Pixel CSS — gần với “điểm ảnh logic” trên màn     |
| `pt`             | Point — hay gặp trong **in ấn** (1pt ≈ 1/72 inch) |
| `pc`             | Pica (1pc = 12pt)                                 |
| `in`, `cm`, `mm` | Inch / centimet / milimet — chủ yếu **print**     |

```css
@media print {
  @page {
    margin: 2cm;
  }
  body {
    font-size: 12pt;
  }
}
```

### 2. Đơn vị tương đối theo font: `%`, `em`, `rem`

| Đơn vị | Tính theo                                                                                        | Ví dụ dùng                                          |
| ------ | ------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| `%`    | **Cha** — tùy property (`width` thường theo chiều ngang cha; `font-size` theo **font-size cha**) | `width: 50%`, `font-size: 110%`                     |
| `em`   | **Font-size của chính phần tử** (trừ `font-size` dùng `em` thì hay tính theo cha)                | `padding: 0.75em` quanh nút — scale theo cỡ chữ nút |
| `rem`  | **Font-size của `html`**                                                                         | Toàn trang đồng bộ: `1rem` luôn cùng “mức gốc”      |

```html
<div class="scale-root">
  <p class="em-demo">Đoạn với padding theo em.</p>
</div>
```

```css
html {
  font-size: 100%;
} /* thường 16px */
.scale-root {
  font-size: 18px;
}
.em-demo {
  font-size: 1em; /* 18px — theo .scale-root */
  padding: 1em 1.25em; /* 18px / 22.5px — theo font-size của chính .em-demo */
  background: #f1f5f9;
  border-radius: 0.375rem;
}
```

```css
.card {
  width: min(100%, 28rem); /* rem theo html */
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}
```

### 3. Đơn vị viewport: `vw`, `vh`, `vmin`, `vmax`

- **`1vw`** = 1% chiều **ngang** viewport; **`1vh`** = 1% chiều **dọc**.
- **`vmin`**: nhỏ hơn trong hai cạnh viewport; **`vmax`**: lớn hơn — hữu ích cho typography/card “vừa khít mọi hướng”.

```css
.hero-title {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}
.full-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw); /* căn full màn (cẩn thận scrollbar ngang) */
}
```

### 4. Ví dụ tổng hợp: khối responsive

```html
<section class="stats">
  <div class="stat"><strong>120</strong><span>Khách</span></div>
  <div class="stat"><strong>48h</strong><span>Giao hàng</span></div>
</section>
```

```css
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: clamp(1rem, 3vw, 2rem);
}
.stat {
  flex: 1 1 140px;
  min-width: 0;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}
.stat strong {
  display: block;
  font-size: 1.75rem;
  margin-bottom: 0.25rem;
}
.stat span {
  font-size: 0.875rem;
  color: #64748b;
}
```

---

## Property types — Layout: Box Model

**Property types** nhóm thuộc tính theo việc cần làm. Nhánh **Layout** bắt đầu bằng **Box Model**: cách trình duyệt tính **kích thước** và **khoảng cách** quanh nội dung.

| Vùng        | Thuộc tính chính                    | Ý nghĩa            |
| ----------- | ----------------------------------- | ------------------ |
| **Content** | `width`, `height`, `min-*`, `max-*` | Vùng đựng nội dung |
| **Padding** | `padding`, `padding-*`              | Đệm trong viền     |
| **Border**  | `border-*`, `border-radius`         | Viền               |
| **Margin**  | `margin`, `margin-*`                | Khoảng ngoài viền  |

### `box-sizing`

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

- **`content-box`** (mặc định cũ): `width`/`height` chỉ là **content** — `padding` + `border` **cộng ngoài**.
- **`border-box`**: `width`/`height` gồm **content + padding + border** — dự đoán tổng chiếm chỗ dễ hơn.

### Padding và Margin — cú pháp shorthand

```css
/* Một giá trị: cả bốn cạnh */
margin: 1rem;

/* Hai giá trị: (trên+dưới) (trái+phải) */
padding: 0.5rem 1rem;

/* Bốn giá trị: top → right → bottom → left (kim đồng hồ) */
margin: 1rem 2rem 1.5rem 2rem;

/* Hoặc tách từng cạnh */
padding-top: 1rem;
margin-inline: auto; /* trái+phải — logical property */
```

**Margin collapse** (chủ yếu **margin dọc** giữa hai **block** kề nhau): hai margin có thể **gộp** thành một (thường lấy **max**). Ví dụ hai `p` liền nhau: margin-bottom của p trên + margin-top của p dưới không cộng dồn 16+16 mà có thể chỉ còn 16px.

```html
<div class="stack">
  <p>Khối một</p>
  <p>Khối hai</p>
</div>
```

```css
.stack p {
  margin: 0 0 1rem;
}
.stack p:last-child {
  margin-bottom: 0;
} /* cách chủ động tránh “cảm giác” gap lạ do collapse */
```

**Margin âm** — kéo phần tử lệch về phía kia (dùng ít, dễ lệch layout):

```css
.pull-left {
  margin-left: -1rem;
}
```

### Border — giá trị và cú pháp chi tiết

Một viền đầy đủ gồm ba khía cạnh (có thể viết riêng hoặc gộp):

1. **`border-width`** — độ dày
2. **`border-style`** — kiểu nét
3. **`border-color`** — màu

#### `border-width`

| Giá trị    | Ý nghĩa                               |
| ---------- | ------------------------------------- |
| `thin`     | Mỏng (browser định nghĩa, thường 1px) |
| `medium`   | Mặc định nếu không ghi                |
| `thick`    | Dày hơn                               |
| `<length>` | Ví dụ `1px`, `2px`, `0.125rem`        |

```css
.rule-a {
  border-width: thin;
}
.rule-b {
  border-width: 2px 0; /* trên+dưới 2px, trái+phải 0 */
}
```

#### `border-style` (bắt buộc phải khác `none` mới thấy viền)

| Giá trị  | Ghi chú ngắn                              |
| -------- | ----------------------------------------- |
| `none`   | Không viền (mặc định nếu không set style) |
| `solid`  | Nét liền                                  |
| `dashed` | Gạch đứt                                  |
| `dotted` | Chấm                                      |
| `double` | Hai đường song song                       |
| `groove` | Hiệu ứng khắc (3D nhẹ, phụ thuộc màu)     |
| `ridge`  | Đối lập groove                            |
| `inset`  | Viền “lõm”                                |
| `outset` | Viền “lồi”                                |

```css
.swatches span {
  display: inline-block;
  width: 4rem;
  height: 2rem;
  margin-right: 0.5rem;
  vertical-align: middle;
  border-width: 3px;
  border-color: #334155;
}
.swatches .s-solid {
  border-style: solid;
}
.swatches .s-dashed {
  border-style: dashed;
}
.swatches .s-dotted {
  border-style: dotted;
}
```

#### `border-color`

Màu bình thường: tên (`red`), hex (`#e2e8f0`), `rgb()`, `hsl()`, **`transparent`**, **`currentColor`**.

```css
.callout {
  color: #1e40af;
  border: 2px solid currentColor;
}
```

#### Shorthand `border` và từng cạnh

```css
/* border: width style color */
.card {
  border: 1px solid #e2e8f0;
}

/* Chỉ một cạnh */
.card-accent {
  border-left: 4px solid #2563eb;
}

/* Tách đủ ba dòng cho một cạnh */
.divider-top {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #cbd5e1;
}
```

#### `border-radius`

Bo góc — một giá trị áp cả bốn góc; bốn giá trị theo thứ tự **top-left → top-right → bottom-right → bottom-left**.

```css
.pill {
  border-radius: 999px;
}
.rounded {
  border-radius: 0.5rem;
}
.blob {
  /* elip: góc TL / TR / BR / BL — mỗi góc có thể là elip nếu có dấu / */
  border-radius: 1rem 2rem 1rem 2rem / 2rem 1rem 2rem 1rem;
}
```

> **Lưu ý**: `border` shorthand reset **cả** width, style, color trên cạnh đó — nếu chỉ muốn đổi màu, dùng `border-color` hoặc `border-*-color` để không vô tình đổi độ dày/kiểu.

### Width, height và overflow

```css
.thumb {
  display: block;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 0.375rem;
}
.text-box {
  max-height: 8rem;
  overflow: auto; /* thanh cuộn khi nội dung dài */
}
```

### Outline (không làm lệch flow như margin/border trong đo đạc “chỗ đứng”)

```css
input:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

---

Hết buổi 4

---

## Property types — Layout: Display

`display` quyết định **phần tử tham gia layout** thế nào: khối full dòng, nằm trong dòng chữ, hay biến mất khỏi flow.

| Giá trị        | Hành vi                                                                             |
| -------------- | ----------------------------------------------------------------------------------- |
| `block`        | Chiếm một “hàng” trong flow block; `width`/`height` có hiệu lực đầy đủ              |
| `inline`       | Trong dòng; `width`/`height` bị bỏ qua; margin/padding dọc không đẩy dòng như block |
| `inline-block` | Trên một dòng như inline nhưng có hộp — `width`/`height`, padding dọc ổn định       |
| `none`         | Không tạo hộp — **không chiếm chỗ** (khác `visibility: hidden` vẫn chiếm chỗ)       |

```html
<nav class="demo-nav">
  <a href="#">Link A</a>
  <a href="#">Link B</a>
</nav>
<p>
  Inline
  <span class="pill">inline-block</span>
  và
  <span class="tag">inline</span>
  trên cùng dòng.
</p>
```

```css
.demo-nav a {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  margin-right: 0.25rem;
  background: #f1f5f9;
  border-radius: 0.25rem;
  text-decoration: none;
  color: #0f172a;
}
.pill {
  display: inline-block;
  padding: 0.15em 0.55em;
  border-radius: 999px;
  background: #e0e7ff;
}
.tag {
  display: inline;
  background: #fef3c7;
}
```

```css
/* display: none — bỏ khỏi layout; visibility: hidden — vẫn giữ chỗ */
.panel[hidden] {
  display: none;
}
.panel.is-faded {
  visibility: hidden;
}
```

---

## Property types — Layout: Position

`position` chọn **cách đặt hộp** so với vị trí “bình thường” trong document và (với vài mode) so với **khối tham chiếu** (viewport, cha đã `position`, …).

| Giá trị    | Ý nghĩa ngắn                                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `static`   | Mặc định — đặt theo flow; `top`/`right`/`bottom`/`left` **không** tác dụng                                                    |
| `relative` | Vẫn **giữ chỗ** trong flow; lệch so với vị trí ban đầu bằng `top`/`left`/…                                                    |
| `absolute` | **Rời flow**; căn theo **containing block** (thường là tổ tiên `position` khác `static` gần nhất, hoặc viewport nếu không có) |
| `fixed`    | Rời flow; căn theo **viewport** (trừ trường hợp ancestor tạo containing block đặc biệt) — hay dùng cho header/bar cố định     |
| `sticky`   | Như `relative` đến một ngưỡng cuộn, sau đó “dính” như `fixed` trong khối cha                                                  |

Kèm theo: **`top`**, **`right`**, **`bottom`**, **`left`** (giá trị length, %, `auto`…) và **`z-index`** để xếp lớp khi chồng nhau.

### `static` và `relative`

```html
<div class="flow">
  <div class="box a">A</div>
  <div class="box b offset">B (relative lệch)</div>
  <div class="box c">C</div>
</div>
```

```css
.flow {
  padding: 1rem;
  background: #f8fafc;
}
.box {
  width: 5rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background: #cbd5e1;
  margin-bottom: 0.5rem;
}
.box.offset {
  position: relative;
  top: 0.5rem; /* đẩy xuống so với chỗ đứng gốc */
  left: 2rem; /* đẩy sang phải */
  background: #93c5fd;
}
/* B vẫn “giữ chỗ” gốc trong flow — C không kéo lên sát A */
```

### `absolute` — huy hiệu trên thẻ

```html
<article class="product">
  <span class="badge">-20%</span>
  <img
    src="https://picsum.photos/seed/p1/320/200"
    alt="Sản phẩm"
    width="320"
    height="200"
  />
  <h3>Áo thun</h3>
</article>
```

```css
.product {
  position: relative; /* tạo containing block cho con absolute */
  max-width: 20rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}
.product img {
  display: block;
  width: 100%;
  height: auto;
}
.badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #dc2626;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  z-index: 1;
}
```

### `fixed` — thanh công cụ dưới màn hình (demo)

```html
<header class="topbar">Thanh cố định (fixed)</header>
<main class="page">
  <p>Nội dung dài… cuộn xuống, thanh trên vẫn dính mép viewport.</p>
</main>
```

```css
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0.75rem 1rem;
  background: rgb(15 23 42 / 0.92);
  color: #f8fafc;
}
.page {
  padding: 4rem 1rem 2rem; /* chừa chỗ cho topbar */
  min-height: 150vh;
}
```

### `sticky` — tiêu đề cột “dính” khi cuộn

```html
<div class="sticky-wrap">
  <aside>
    <h4 class="sticky-head">Mục lục</h4>
    <ul>
      <li>Mục 1</li>
      <li>Mục 2</li>
      <li>Mục 3</li>
    </ul>
  </aside>
  <div class="long">
    <p>Nội dung chính rất dài…</p>
  </div>
</div>
```

```css
.sticky-wrap {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  max-width: 40rem;
}
.sticky-wrap aside {
  flex: 0 0 10rem;
}
.sticky-head {
  position: sticky;
  top: 3.5rem; /* dưới topbar fixed giả định ~3.5rem */
  margin: 0 0 0.5rem;
  padding: 0.25rem 0;
  background: #fff;
}
.long {
  flex: 1;
  min-height: 120vh;
}
```

> **`z-index`** chỉ tạo thứ tự lớp trong **cùng một ngữ cảnh xếp chồng** (stacking context). Cha có `transform`, `opacity` < 1, `filter`… có thể tạo context mới — khi đó con `z-index: 9999` vẫn không “vượt” ra ngoài cha nếu cha nằm dưới lớp khác.

---

## Tóm tắt buổi học

1. **Inheritance**: biết thuộc tính nào kế thừa; `currentColor`; `inherit` / `initial` / `unset` / `all: unset` / `revert`.
2. **Specificity**: đếm (a,b,c); cùng điểm thì rule sau thắng; `:where()` giảm điểm; hạn chế `!important`.
3. **Đơn vị**: `px`, `pt`…; `%`, `em`, `rem`; `vw`/`vh`/`vmin`/`vmax` — chọn đúng ngữ cảnh và ví dụ layout.
4. **Box Model**: `box-sizing`; padding/margin shorthand và margin collapse; **border** đầy đủ width/style/color, shorthand, `border-radius`; overflow; outline.
5. **Display**: `block` / `inline` / `inline-block` / `none` và khác `visibility: hidden`.
6. **Position**: `static`, `relative`, `absolute`, `fixed`, `sticky` với `top`/`left`/… và `z-index` — ví dụ badge, topbar, sticky heading.
