# Day 5: Display, Position, Flexbox, Grid, Z-index

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

Hết buổi 5

---

## Property types — Layout: Flexbox

**Flexbox** bố trí phần tử theo **một trục chính** (hàng hoặc cột) — rất phù hợp: navbar, căn giữa, phân bổ cột, card xếp hàng, footer “đẩy” xuống đáy màn hình.

### Bật flex: container

```css
.row {
  display: flex; /* con trực tiếp = flex items */
}
```

- **`flex-direction`**: `row` (mặc định) | `row-reverse` | `column` | `column-reverse` — hướng trục chính.
- **`flex-wrap`**: `nowrap` | `wrap` | `wrap-reverse` — xuống dòng khi hết chỗ.
- **Shorthand `flex-flow`**: `flex-direction` + `flex-wrap`.

### Căn chỉnh theo trục chính và trục phụ (container)

| Thuộc tính                       | Tác dụng (gợi ý)                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| `justify-content`                | Căn trên **trục chính** — `start`, `end`, `center`, `space-between`, `space-around`… |
| `align-items`                    | Căn trên **trục phụ** (một hàng hình) — `stretch`, `flex-start`, `center`…           |
| `align-content`                  | Khi **wrap** nhiều hàng — khoảng cách **giữa các hàng** (trục phụ)                   |
| `gap` / `row-gap` / `column-gap` | Khoảng cách **giữa** các item, không tính lề ngoài cùng                              |

```html
<nav class="nav-bar">
  <a class="logo" href="#">Brand</a>
  <div class="links">
    <a href="#">Sản phẩm</a>
    <a href="#">Liên hệ</a>
  </div>
  <button type="button" class="cta">Mua</button>
</nav>
```

```css
.nav-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  padding: 0.75rem 1.25rem;
  background: #0f172a;
  color: #f8fafc;
}
.nav-bar .links {
  display: flex;
  gap: 1rem;
}
.nav-bar a {
  color: inherit;
  text-decoration: none;
}
.cta {
  margin-left: auto; /* nếu muốn đẩy nút: kết hợp với order hoặc bố cục 3 vùng */
  padding: 0.4rem 0.9rem;
  border-radius: 0.25rem;
  border: 0;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
}
```

### Flex items (từng con)

| Thuộc tính    | Ý nghĩa ngắn                                                                             |
| ------------- | ---------------------------------------------------------------------------------------- |
| `flex-grow`   | Hệ số “giãn” khi còn dư trục chính (mặc định `0` = không giãn)                           |
| `flex-shrink` | Hệ số “co” khi thiếu chỗ (mặc định `1`)                                                  |
| `flex-basis`  | Kích thước cơ sở trước khi grow/shrink — `auto`, `0`, `200px`…                           |
| **`flex`**    | Shorthand: `flex-grow` `flex-shrink` `flex-basis` — thường gặp `flex: 1` (chiếm phần dư) |
| `align-self`  | Căn riêng item trên trục phụ — ghi đè `align-items`                                      |
| `order`       | Số thứ tự hiển thị (mặc định 0) — tăng số thì xê sau                                     |

**Ví dụ: card bằng nhau trong hàng, cho phép wrap**

```html
<section class="card-row">
  <article class="card">
    <h3>A</h3>
    <p>Nội dung A</p>
  </article>
  <article class="card">
    <h3>B</h3>
    <p>Nội dung B dài hơn.</p>
  </article>
  <article class="card">
    <h3>C</h3>
    <p>Nội dung C</p>
  </article>
</section>
```

```css
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card-row .card {
  flex: 1 1 12rem; /* tối thiểu ~12rem, giãn đều, co khi cần */
  min-width: 0; /* tránh tràn text trong flex child */
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #fff;
}
```

**Căn giữa (theo cả 2 trục trong container có chiều rõ ràng):**

```css
.center-box {
  display: flex;
  min-height: 12rem;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
}
```

---

## Property types — Layout: Grid

**Grid** bố trí theo **hai trục** (hàng × cột) — phù hợp: layout tổng thể, gallery ảnh, dashboard, form 2 cột.

### Bật grid và định hàng cột (container)

```css
.layout {
  display: grid;
  grid-template-columns: 12rem 1fr 1fr; /* cột 1 cố định, 2-3 co giãn */
  grid-template-rows: auto 1fr auto;
  gap: 1rem; /* tương đương row-gap + column-gap */
  min-height: 100vh;
}
```

| Thuộc tính                          | Ghi chú                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `grid-template-columns`             | Cột: `1fr 1fr`, `repeat(3, minmax(0, 1fr))`, v.v.                         |
| `grid-template-rows`                | Hàng                                                                      |
| `grid-template-areas`               | Vẽ “sơ đồ” tên vùng — gán tên bằng `grid-area` ở con                      |
| `justify-items` / `align-items`     | Căn **ô** (cả grid) theo 2 trục — thường dùng `place-items: center`       |
| `justify-content` / `align-content` | Căn **cả lưới** trong vùng container khi còn dư (track nhỏ hơn container) |

**Đơn vị hữu ích**

- **`fr`**: phần còn lại (sau min/max) chia đều.
- **`minmax(a, b)`**: tối thiểu a, tối đa b — hay dùng `minmax(0, 1fr)` để cell không bị nội dung “phình”.
- **`repeat(12, 1fr)`** hoặc `repeat(auto-fit, minmax(10rem, 1fr))` — gallery responsive tự tạo cột vừa màn hình.

```html
<div class="page-grid">
  <header class="site-header">Header</header>
  <aside class="sidebar">Side</aside>
  <main class="content">Main</main>
  <footer class="site-footer">Footer</footer>
</div>
```

```css
.page-grid {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  grid-template-columns: 14rem 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "head head"
    "side main"
    "foot foot";
  min-height: 100vh;
  max-width: 72rem;
  margin-inline: auto;
}
.site-header {
  grid-area: head;
  padding: 0.75rem 1rem;
  background: #0f172a;
  color: #f8fafc;
  border-radius: 0.375rem;
}
.sidebar {
  grid-area: side;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 0.375rem;
}
.content {
  grid-area: main;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
}
.site-footer {
  grid-area: foot;
  padding: 0.75rem;
  text-align: center;
  color: #64748b;
}
@media (max-width: 40rem) {
  .page-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "head"
      "main"
      "side"
      "foot";
  }
}
```

### Grid items (từng con)

- **`grid-column`**: ví dụ `1 / 3` (bắt đầu / kết thúc line), `span 2` (ghép 2 cột).
- **`grid-row`**: tương tự theo hàng.
- Shorthand: **`grid-area`**: tên từ `template-areas` **hoặc** `row-start / col-start / row-end / col-end`.
- **`place-self`**: căn bản thân item trong ô (`align-self` + `justify-self`).

**Gallery: `auto-fit` + `minmax`**

```html
<div class="gallery">
  <figure class="g-item">
    <div class="ph"></div>
    <figcaption>1</figcaption>
  </figure>
  <figure class="g-item">
    <div class="ph"></div>
    <figcaption>2</figcaption>
  </figure>
  <figure class="g-item">
    <div class="ph"></div>
    <figcaption>3</figcaption>
  </figure>
</div>
```

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
}
.g-item {
  margin: 0;
  text-align: center;
}
.g-item .ph {
  aspect-ratio: 4 / 3;
  background: #cbd5e1;
  border-radius: 0.375rem;
}
```

---

## Z-index: Layering elements

Lớp bài **Position** đã dùng `z-index` với `absolute`/`fixed`. Ở đây tổng hợp cách “xếp lớp” ổn định khi dùng **Flexbox, Grid, overlay, modal**.

### `z-index` hoạt động khi nào?

- Chỉ với phần tử **có** `position` khác `static` **hoặc** nằm trong context flex/grid khi tạo stacking context, hoặc dùng một số thuộc tính tạo context (xem dưới).
- Số càng lớn càng nằm **gần** mắt (trừ khi cùng context và so specificity khác hệ).

### Thế nào là **stacking context** (ngữ cảnh xếp chồng)?

- Gốc thường thấy: phần tử có `position: relative/absolute/fixed/sticky` **và** `z-index` khác `auto`.
- **Flex/Grid** item với `z-index` (kể cả `0`) cũng tạo context riêng cho cây con.
- **Opacity** < 1, **`transform`**, **`filter`**, **`isolation: isolate`**, (và vài thuộc tính khác) cũng có thể tạo **context mới** — mọi `z-index` bên trong **chỉ** so sánh với anh chị em trong cùng context, không vượt “ra ngoài” từng lớp cha.

### Cách dùng thực tế

1. **Tầng ứng dụng thống nhất** (dễ tìm khi sửa):
   - Base content: `0`
   - Dropdown, tooltip: `10`–`20`
   - Sticky header: `30`
   - Modal backdrop: `40`, modal: `50` (hoặc tương đương).

2. Tránh tăng `z-index` bù vô tận. Nếu modal “bị dưới” vì bố đặt `transform`, cân nhắc: đưa modal ra cùng cấp `body` (portal), **hoặc** `isolation: isolate` có chủ đích trên từng vùng.

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgb(0 0 0 / 0.45);
}
.modal {
  position: fixed;
  z-index: 50;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: min(100% - 2rem, 24rem);
  padding: 1.5rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}
```

3. **Flex item chồng nhau (trùng vùng)**: tăng `z-index` trên con muốn nằm trên (thường cùng parent flex).

> Khi gỡ bài toán lớp: kiểm tra chuỗi cha — ai có `opacity`, `transform`, `filter`, `z-index` — sắp xếp từ ngoài vào.

---

## Tóm tắt buổi học

1. Display: `block` / `inline` / `inline-block` / `none` — khác `visibility: hidden`.
2. Position: `static`, `relative`, `absolute`, `fixed`, `sticky` với offset và ví dụ badge, topbar, sticky; `z-index` gắn với từng chế độ.
3. Flexbox (container + item): hướng trục, `justify-content` / `align-items` / `align-content`, `gap`; trên từng con — `flex` (grow/shrink/basis), `align-self`, `order` — ứng dụng card, căn giữa.
4. Grid (container + item): cột hàng, `fr` / `minmax` / `repeat` / `auto-fit`, vùng `template-areas`; trên từng con — vị trí cột hàng, `place-self` — layout trang, gallery.
5. Z-index và stacking: tầng số, ngữ cảnh xếp chồng, overlay/modal, tránh “đua” số; quan hệ với `transform` / `opacity` / flex-grid item.
