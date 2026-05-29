# TAILWIND CSS

1. Giới thiệu
2. Cài đặt
3. Các khái niệm chính

## 1. GIỚI THIỆU

### 1.1 Tailwind CSS là gì và tại sao nên dùng năm 2026?

- Triết lý "utility-first" - viết style trực tiếp trong HTML/JSX thay vì viết file CSS riêng
- So sánh với Bootstrap, CSS thuần, CSS Modules
- Upgrade Tailwind v4: dùng CSS native (cascade layers, CSS variables, container queries, P3 colors), không cần `tailwind.config.js` nữa

### 1.2 Điều kiện để học Tailwind CSS hiệu quả

- Nắm chắc kiến thức về HTML/CSS
- Sẵn sàng thay đổi mindset: từ viết CSS sang "compose class"

## 2. CÀI ĐẶT

### 2.1 Cài đặt với Vite + React (cách phổ biến nhất 2026)

```
npm create vite@latest my-app -- --template react
npm install tailwindcss @tailwindcss/vite
```

Trong `vite.config.js` thêm plugin, trong `index.css` thêm:

```css
@import "tailwindcss";
```

Chạy `npm run dev` -> giải thích tại sao v4 không cần file config phức tạp

### 2.2 Cài đặt với Next.js (dành cho ai theo hướng fullstack)

```
npx create-next-app@latest
```

Next.js tích hợp sẵn Tailwind, chỉ cần chọn "Yes" khi được hỏi

### 2.3 Cài đặt với HTML thuần (cho người mới hoàn toàn)

Dùng CDN:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

CDN nên dùng để học, production thì cần build proper

### 2.4 Cấu hình editor

- Cài extension **Tailwind CSS IntelliSense** trên VS Code
- Giải thích tại sao extension này quan trọng: autocomplete, hover preview, linting

## 3. CÁC KHÁI NIỆM CHÍNH

### 3.1 - Chuyển đổi CSS truyền thống sang Tailwind

Phần này giải thích toàn bộ cú pháp CSS truyền thống tương ứng với class Tailwind như thế nào — từ selector, kế thừa, độ ưu tiên, đơn vị, reset CSS, đến từng nhóm property.

#### 3.1.1 - Selectors: Sự khác biệt cốt lõi

Điểm khác biệt quan trọng nhất giữa CSS truyền thống và Tailwind là cách chọn phần tử:

- **CSS truyền thống:** Một selector có thể nhắm đến nhiều phần tử cùng lúc:

```css
/* Chọn tất cả p bên trong .card */
.card p {
  color: gray;
}

/* Chọn tất cả li:first-child */
li:first-child {
  font-weight: bold;
}

/* Chọn input[type="email"] */
input[type="email"] {
  border-color: blue;
}
```

- **Tailwind:** Mỗi class chỉ áp dụng trực tiếp lên một phần tử duy nhất mà class đó được đặt vào. Không có khái niệm "selector chọn nhiều phần tử từ xa" như CSS truyền thống.

```html
<!-- Phải thêm class vào từng phần tử riêng lẻ -->
<p class="text-gray-500">...</p>
<li class="first:font-bold">...</li>
<input class="focus:border-blue-500" type="email" />
```

**Các loại selector CSS và cách chuyển sang Tailwind:**

_Simple selectors:_

- Tag selector (`p`, `div`, `h1`): Dùng `@layer base` để style global, hoặc thêm class vào từng element
- Class selector (`.card`): Tương đương một class Tailwind bất kỳ
- ID selector (`#header`): Không khuyến khích trong Tailwind — nên dùng class thay thế

_Pseudo-classes:_

- `:hover` -> `hover:` variant: `hover:bg-blue-500`
- `:focus` -> `focus:` variant: `focus:outline-none`
- `:active` -> `active:` variant: `active:scale-95`
- `:disabled` -> `disabled:` variant: `disabled:opacity-50`
- `:checked` -> `checked:` variant: `checked:bg-blue-500`
- `:required` -> `required:` variant: `required:border-red-500`
- `:invalid` / `:valid` -> `invalid:` / `valid:`
- `:placeholder-shown` -> `placeholder-shown:`
- `:focus-within` -> `focus-within:`
- `:focus-visible` -> `focus-visible:`
- `:visited` -> `visited:`

_Pseudo-elements:_

- `::before` -> `before:` prefix: `before:content-['*'] before:text-red-500`
- `::after` -> `after:` prefix: `after:content-[''] after:block`
- `::placeholder` -> `placeholder:` prefix: `placeholder:text-gray-400`
- `::selection` -> `selection:` prefix: `selection:bg-yellow-200`
- `::first-line` -> `first-line:`
- `::marker` -> `marker:` (style bullet points của list)
- `::file-selector-button` -> `file:` prefix cho input[type="file"]

_Attribute selectors:_

- `[dir="rtl"]` -> dùng `rtl:` variant cho Right-to-Left layout
- `[open]` -> `open:` variant (cho `<details open>`)
- `[disabled]` -> `disabled:` variant
- Attribute selectors tùy chỉnh -> dùng arbitrary variants: `[data-active]:bg-blue-500`

_Combinators:_

- Descendant (`.parent .child`): Không có equivalent trực tiếp. Dùng `group/peer` hoặc thêm class trực tiếp vào phần tử con
- Child combinator (`.parent > .child`): Dùng arbitrary variants: `[&>li]:pl-4`
- General sibling (`~`): Dùng `peer` modifier
- Adjacent sibling (`+`): Dùng `peer` modifier với `peer-[...]`

#### 3.1.2 - Kế thừa (Inheritance) trong Tailwind

- CSS truyền thống: một số property kế thừa tự động từ cha xuống con (`color`, `font-size`, `font-family`,...).

- Tailwind không thay đổi quy tắc kế thừa CSS — quy tắc kế thừa vẫn hoạt động như bình thường:

```html
<!-- color và font-size sẽ kế thừa xuống các thẻ con -->
<div class="text-base text-gray-700">
  <p>Văn bản này tự động màu gray-700</p>
  <span>Và span này cũng vậy</span>
</div>
```

#### 3.1.3 - Độ ưu tiên (Specificity) trong Tailwind

- CSS truyền thống: specificity gây ra nhiều conflict — ID > class > tag, inline style > stylesheet. Để override phải dùng `!important` hoặc tăng độ specificity (thêm class, thêm tag,...).

- Tailwind dùng **CSS Cascade Layers** để giải quyết hoàn toàn vấn đề specificity:

```css
@layer theme, base, components, utilities;
```

Thứ tự ưu tiên từ thấp đến cao: `theme` -> `base` -> `components` -> `utilities`

**Hệ quả thực tế:**

- Utility class luôn thắng component class -> `rounded-none` sẽ override `.card { border-radius: ... }`
- Dùng prefix `!`: `!text-red-500` -> `color: red !important`

#### 3.1.4 - Đơn vị (Units) trong Tailwind

Tailwind dùng hệ spacing scale mặc định: **1 unit = 0.25rem = 4px** (giả sử root font-size = 16px).

| Tailwind class | CSS tương đương    | px   |
| -------------- | ------------------ | ---- |
| `p-1`          | `padding: 0.25rem` | 4px  |
| `p-2`          | `padding: 0.5rem`  | 8px  |
| `p-4`          | `padding: 1rem`    | 16px |
| `p-8`          | `padding: 2rem`    | 32px |
| ...            | ...                | ...  |

**Các đơn vị đặc biệt:**

- `full` -> `100%`
- `screen` -> `100vw` hoặc `100vh`
- `px` -> pixel tuyệt đối: `w-px` = `width: 1px`
- `auto` -> `margin: auto`
- `1/2`, `1/3`, `2/3`... -> phần trăm: `w-1/2` = `width: 50%`
- `fit` -> `width: fit-content`
- `min`, `max` -> `width: min-content`, `width: max-content`

**Arbitrary values** — khi giá trị không có trong scale mặc định:

```html
<div class="w-[327px]">
  <!-- width: 327px -->
  <div class="mt-[10.5px]">
    <!-- margin-top: 10.5px -->
    <div class="text-[#ff6600]">
      <!-- color: #ff6600 -->
      <div class="top-[calc(100%-2rem)]">
        <!-- calc() -->
        <div class="bg-[var(--brand)]"><!-- CSS variable --></div>
      </div>
    </div>
  </div>
</div>
```

#### 3.1.5 - Reset CSS (Preflight)

- CSS truyền thống: cần dùng CSS reset (normalize.css, reset.css) để xóa bỏ style mặc định của trình duyệt, tránh lỗi layout không mong muốn.

- Tailwind tự động inject **Preflight** — một CSS reset dựa trên `modern-normalize`:
  - `box-sizing: border-box` cho tất cả element
  - `margin: 0` cho tất cả element
  - `h1–h6` không còn font-size/font-weight mặc định -> phải tự thêm class
  - `button`, `input`, `select`, `textarea` không có border/padding/background mặc định
  - `img` là `display: block` thay vì `inline`
  - `a` không có màu/underline mặc định

Override Preflight bằng `@layer base`:

```css
@layer base {
  h1 {
    @apply text-3xl font-bold;
  }
  a {
    @apply text-blue-600 underline;
  }
}
```

#### 3.1.6 - Nhóm Property và Class tương ứng

**Layout:**

| CSS                    | Tailwind          |
| ---------------------- | ----------------- |
| `display: flex`        | `flex`            |
| `display: grid`        | `grid`            |
| `display: none`        | `hidden`          |
| `display: inline-flex` | `inline-flex`     |
| `position: relative`   | `relative`        |
| `position: absolute`   | `absolute`        |
| `position: fixed`      | `fixed`           |
| `position: sticky`     | `sticky`          |
| `z-index: 10`          | `z-10`            |
| `overflow: hidden`     | `overflow-hidden` |
| `aspect-ratio: 16/9`   | `aspect-video`    |
| `aspect-ratio: 1/1`    | `aspect-square`   |

**Typography:**

| CSS                                                              | Tailwind            |
| ---------------------------------------------------------------- | ------------------- |
| `font-size: 1rem`                                                | `text-base`         |
| `font-size: 0.875rem`                                            | `text-sm`           |
| `font-size: 1.25rem`                                             | `text-xl`           |
| `font-weight: 700`                                               | `font-bold`         |
| `font-weight: 500`                                               | `font-medium`       |
| `line-height: 1.5`                                               | `leading-normal`    |
| `letter-spacing: 0.05em`                                         | `tracking-wide`     |
| `text-align: center`                                             | `text-center`       |
| `text-transform: uppercase`                                      | `uppercase`         |
| `text-decoration: underline`                                     | `underline`         |
| `white-space: nowrap`                                            | `whitespace-nowrap` |
| `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` | `truncate`          |
| `-webkit-line-clamp: 3` (multi-line truncate)                    | `line-clamp-3`      |
| `text-wrap: balance`                                             | `text-balance` (v4) |
| `text-wrap: pretty`                                              | `text-pretty` (v4)  |

**Background & Colors:**

| CSS                                                | Tailwind                           |
| -------------------------------------------------- | ---------------------------------- |
| `background-color: #3b82f6`                        | `bg-blue-500`                      |
| `background-color: rgba(59,130,246,0.5)`           | `bg-blue-500/50`                   |
| `background-image: linear-gradient(to right, ...)` | `bg-gradient-to-r from-... to-...` |
| `background-size: cover`                           | `bg-cover`                         |
| `background-position: center`                      | `bg-center`                        |
| `background-repeat: no-repeat`                     | `bg-no-repeat`                     |
| `color: #6b7280`                                   | `text-gray-500`                    |

**Effects & Filters:**

| CSS                                 | Tailwind                                       |
| ----------------------------------- | ---------------------------------------------- |
| `box-shadow: ...`                   | `shadow-md`, `shadow-lg`, `shadow-xl`          |
| `opacity: 0.5`                      | `opacity-50`                                   |
| `filter: blur(4px)`                 | `blur`                                         |
| `filter: blur(8px)`                 | `blur-md`                                      |
| `filter: brightness(1.25)`          | `brightness-125`                               |
| `filter: grayscale(100%)`           | `grayscale`                                    |
| `backdrop-filter: blur(8px)`        | `backdrop-blur-md`                             |
| `mix-blend-mode: multiply`          | `mix-blend-multiply`                           |
| `filter: blur(4px) grayscale(100%)` | `blur grayscale` (compose tự động qua CSS var) |

**Transitions & Animations:**

| CSS                                       | Tailwind                         |
| ----------------------------------------- | -------------------------------- |
| `transition: all 150ms ease`              | `transition`                     |
| `transition: color 300ms`                 | `transition-colors duration-300` |
| `transition-duration: 500ms`              | `duration-500`                   |
| `transition-timing-function: ease-in-out` | `ease-in-out`                    |
| `transition-delay: 100ms`                 | `delay-100`                      |
| `@keyframes spin + animation`             | `animate-spin`                   |
| `@keyframes ping + animation`             | `animate-ping`                   |
| `@keyframes bounce + animation`           | `animate-bounce`                 |
| `@keyframes pulse + animation`            | `animate-pulse`                  |

**Transforms:**

| CSS                             | Tailwind               |
| ------------------------------- | ---------------------- |
| `transform: scale(1.05)`        | `scale-105`            |
| `transform: rotate(45deg)`      | `rotate-45`            |
| `transform: translateX(1rem)`   | `translate-x-4`        |
| `transform: skewY(3deg)`        | `skew-y-3`             |
| `transform-origin: top left`    | `origin-top-left`      |
| `transform: rotateX(45deg)`     | `rotate-x-45` (v4 3D)  |
| `transform: perspective(500px)` | `perspective-500` (v4) |

---

#### 3.1.7 - Responsive Design

- CSS truyền thống: dùng media queries để viết style cho từng breakpoint, phải lặp lại selector và style cho mỗi breakpoint.

- Tailwind dùng hệ thống **mobile-first**: style không có prefix áp dụng cho mọi màn hình, prefix breakpoint chỉ kích hoạt từ breakpoint đó **trở lên**.

**Breakpoints mặc định (v4):**

| Prefix       | Min-width      | Mô tả                    |
| ------------ | -------------- | ------------------------ |
| _(không có)_ | 0              | Mobile (tất cả màn hình) |
| `sm:`        | 40rem (640px)  | Small                    |
| `md:`        | 48rem (768px)  | Medium                   |
| `lg:`        | 64rem (1024px) | Large                    |
| `xl:`        | 80rem (1280px) | Extra large              |
| `2xl:`       | 96rem (1536px) | 2X large                 |

```html
<!-- Mobile: 1 cột, md trở lên: 3 cột -->
<div class="grid grid-cols-1 md:grid-cols-3">
  <!-- Ảnh full-width trên mobile, cố định 48 trên md+ -->
  <img class="w-full md:w-48 md:h-full" />
</div>
```

**Breakpoint range** — style chỉ active trong một khoảng:

```html
<!-- Chỉ active trên md, tắt ở lg trở lên -->
<div class="md:max-lg:flex"></div>
```

**Breakpoint tùy chỉnh** qua `@theme`:

```css
@theme {
  --breakpoint-tablet: 48rem;
  --breakpoint-laptop: 64rem;
}
```

Reset toàn bộ và định nghĩa lại:

```css
@theme {
  --breakpoint-*: initial;
  --breakpoint-sm: 30rem;
  --breakpoint-lg: 60rem;
}
```

**Arbitrary breakpoint** — dùng one-off không cần vào theme:

```html
<div class="min-[375px]:text-center max-[600px]:bg-sky-300"></div>
```

**Container queries** (tính năng v4) — responsive theo kích thước container thay vì viewport:

```html
<!-- Đánh dấu container -->
<div class="@container">
  <!-- Responsive theo width của div cha, không phải viewport -->
  <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3">
    <img class="aspect-square @sm:aspect-3/2 object-cover" />
  </div>
</div>
```

---

#### 3.1.8 - Dark Mode

Tailwind cung cấp variant `dark:` để style khi dark mode active.

**Mặc định: theo hệ điều hành** (`prefers-color-scheme` media query):

```html
<div class="text-gray-900 bg-white dark:bg-gray-900 dark:text-white">
  <h1 class="text-2xl dark:text-gray-100">Tiêu đề</h1>
  <p class="text-gray-500 dark:text-gray-400">Mô tả</p>
</div>
```

**Toggle dark mode thủ công** — dùng selector strategy (thêm class `dark` lên `<html>`):

```css
/* Trong CSS: override dark variant */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

```html
<html class="dark">
  <!-- Toàn bộ con cháu nhận dark: variant -->
</html>
```

```js
// Toggle bằng JavaScript
document.documentElement.classList.toggle("dark");
```

**Dùng data attribute** thay vì class:

```css
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

```html
<html data-theme="dark">
  ...
</html>
```

---

### 3.2 - Những trường hợp đặc biệt

#### 3.2.1 - Khi giá trị class phụ thuộc vào biến động

Vì Tailwind scan source file như **plain text**, nó không thể hiểu string interpolation hay concatenation. Class phải tồn tại dưới dạng chuỗi hoàn chỉnh trong source.

**❌ Sai — Tailwind không detect được:**

```jsx
// Sai: class name bị nối chuỗi
<div className={`bg-${color}-500`} />
<div className={`text-${size === 'lg' ? 'xl' : 'base'}`} />
<div className={`p-` + padding} />
```

**✅ Đúng — luôn dùng class name đầy đủ:**

```jsx
// Đúng: object map với class đầy đủ
const colorMap = {
  red:  "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
};
<div className={colorMap[color]} />

// Đúng: ternary trả về class hoàn chỉnh
<div className={size === 'lg' ? 'text-xl' : 'text-base'} />

// Đúng: array join
const classes = ['flex', 'items-center', isActive && 'bg-blue-500'];
<div className={classes.filter(Boolean).join(' ')} />
```

**Lý do:** Tailwind scan tìm token có dạng class name trong toàn bộ source — nó không execute code. Chỉ cần class xuất hiện dưới dạng chuỗi hoàn chỉnh ở bất kỳ đâu trong file là đủ.

**Công cụ hỗ trợ merge class an toàn:** `clsx` + `tailwind-merge`

```jsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// twMerge giải quyết conflict: p-4 vs px-2 -> chỉ giữ px-2
const cn = (...inputs) => twMerge(clsx(inputs));

<div className={cn("p-4", isCompact && "p-2")} />;
```

#### 3.2.2 - Khi cần giá trị lẻ không có trong scale

Dùng **arbitrary values** với cú pháp ngoặc vuông `[value]`:

```html
<!-- Spacing lẻ -->
<div class="mt-[10.5px]">
  <!-- margin-top: 10.5px -->
  <div class="w-[327px]">
    <!-- width: 327px -->
    <div class="h-[calc(100vh-64px)]">
      <!-- height: calc(100vh - 64px) -->

      <!-- Màu lẻ ngoài palette -->
      <div class="bg-[#ff6600]">
        <div class="text-[oklch(0.6_0.25_30)]">
          <!-- CSS variable -->
          <div class="text-[var(--brand-color)]">
            <div class="bg-[var(--surface)]">
              <!-- Shorthand cho CSS variable (tự động thêm var()) -->
              <div class="text-(--brand-color)">
                <!-- Property không có trong Tailwind -->
                <div class="[mask-type:luminance]">
                  <div
                    class="[grid-template-areas:'header_header'_'sidebar_main']"
                  >
                    <!-- Kết hợp với variant -->
                    <div class="hover:w-[300px] md:mt-[20px]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Quy tắc dấu cách trong arbitrary values:**

- Thay space bằng `_`: `bg-[url('/my_image.png')]`
- Nếu cần dấu underscore thực sự: escape bằng `\_`: `content-['hello\_world']`

#### 3.2.3 - Khi cần quản lý class phức tạp trong component

**Dùng `@apply` trong CSS** — gom utility classes thành một class có tên (nhưng dùng cẩn thận):

```css
/* Hợp lý: style cho element ngoài tầm kiểm soát (thư viện bên thứ 3) */
.select2-dropdown {
  @apply rounded-b-lg shadow-md;
}

/* Hợp lý: base styles trong @layer base */
@layer base {
  h1 {
    @apply text-3xl font-bold tracking-tight;
  }
}
```

**Khi KHÔNG nên dùng `@apply`:**

- Khi bạn chỉ muốn tránh "lặp class" trong JSX, dùng component thay thế
- Khi tạo một lớp abstraction không cần thiết
- Khi class chỉ dùng đúng 1 chỗ

### 3.3 - Tính năng mới của Tailwind mà CSS truyền thống không có

#### 3.3.1 - Theme System

Tailwind v4 thay thế hoàn toàn `tailwind.config.js` bằng **CSS-native `@theme` block**.

**Cú pháp:**

```css
@import "tailwindcss";

@theme {
  /* Font */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Màu tùy chỉnh (v4 dùng oklch) */
  --color-brand: oklch(0.7 0.28 145);
  --color-surface: oklch(0.98 0 0);

  /* Spacing tùy chỉnh */
  --spacing-18: 4.5rem;
  --spacing-128: 32rem;

  /* Breakpoint tùy chỉnh */
  --breakpoint-xs: 30rem;
}
```

Sử dụng ngay trong HTML:

```html
<div class="font-sans text-brand p-18 xs:flex"></div>
```

**Override giá trị mặc định:**

```css
@theme {
  --color-blue-500: oklch(0.6 0.24 250); /* Override blue-500 */
}
```

**Xóa toàn bộ namespace và định nghĩa lại:**

```css
@theme {
  --color-*: initial; /* Xóa toàn bộ màu mặc định */
  --color-white: #fff;
  --color-primary: #6366f1;
}
```

**Theme variables cũng là CSS variables** — có thể dùng trong inline style và CSS tùy ý:

```html
<div style="background: var(--color-brand)"></div>
```

**`@theme static`** — luôn generate tất cả CSS variable dù có dùng hay không:

```css
@theme static {
  --color-primary: var(--color-red-500);
}
```

---

#### 3.3.2 - Colors

Tailwind v4 chuyển sang **wide-gamut P3 colors** dùng định dạng `oklch` thay vì hex/rgb.

**Palette màu có sẵn:** slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose — mỗi màu có thang từ `50` -> `950`.

**Opacity modifier** — thêm `/[value]` sau class màu:

```html
<div class="bg-blue-500/50">
  <!-- 50% opacity -->
  <div class="text-red-600/75">
    <!-- 75% opacity -->
    <div class="border-gray-300/30"><!-- 30% opacity --></div>
  </div>
</div>
```

Thay thế hoàn toàn cho `bg-opacity-*` của v3.

**Màu arbitrary:**

```html
<div class="bg-[#ff6600]">
  <div class="bg-[oklch(0.7_0.25_180)]">
    <div class="bg-[color:var(--my-color)]"></div>
  </div>
</div>
```

---

#### 3.3.3 - Thêm Custom Styles

##### Cách 1: `@theme` — thêm design tokens

Dùng khi muốn tạo utility class mới gắn với hệ thống theme:

```css
@theme {
  --color-brand: oklch(0.7 0.28 145);
  --spacing-18: 4.5rem;
}
/* -> tự động có class: text-brand, bg-brand, p-18, m-18... */
```

##### Cách 2: Arbitrary values — giá trị lẻ không qua theme

```html
<div class="w-[327px] top-[calc(100%-2rem)] text-[#ff6600]"></div>
```

##### Cách 3: `@utility` — tạo custom utility class

Dùng khi cần một utility mới hỗ trợ đầy đủ variant (hover, responsive,...):

```css
@utility tab-* {
  tab-size: --value(--tab-size-*); /* resolve theo theme key */
}

@utility tab-* {
  tab-size: --value(integer); /* resolve bare number */
}
```

Kết quả: có thể dùng `tab-4`, `hover:tab-2`, `md:tab-8`.

Nếu utility phức tạp hơn một property:

```css
@utility card {
  border-radius: var(--radius-lg);
  padding: --spacing(6);
  box-shadow: var(--shadow-xl);
  background: var(--color-white);
}
```

##### Cách 4: `@layer components` — component style có thể override bằng utility

```css
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-colors;
  }
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
}
```

```html
<!-- Override component style bằng utility -->
<button class="rounded-none btn btn-primary">Square button</button>
```

##### Cách 5: `@custom-variant` — tạo variant tùy chỉnh

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"], [data-theme="midnight"] *));
```

```html
<html data-theme="midnight">
  <button class="theme-midnight:bg-black theme-midnight:text-white"></button>
</html>
```

---

#### 3.3.4 - Detecting Classes in Source Files

Tailwind scan toàn bộ source file **như plain text** (không parse code) để tìm token nào có thể là class name, rồi generate CSS cho những class đó. Chỉ output CSS của class thực sự được dùng nên bundle nhỏ nhất có thể.

**v4: tự động scan** — không cần config `content` array như v3. Tailwind tự phát hiện file cần scan.

**Tùy chỉnh nguồn scan** với `@source`:

```css
@import "tailwindcss";

/* Thêm thư mục ngoài project root */
@source "../node_modules/@my-company/ui-lib/src";

/* Thêm file pattern cụ thể */
@source "../../shared-components/**/*.jsx";
```

**Safelist** — force generate class dù không thấy trong source:

```css
@source not "../node_modules"; /* Bỏ qua node_modules */
```

**Lưu ý quan trọng về dynamic classes:**

```jsx
// ❌ Tailwind không detect được
const bg = `bg-${color}-500`;

// ✅ Class xuất hiện dưới dạng chuỗi đầy đủ
const bgMap = { red: "bg-red-500", blue: "bg-blue-500" };
```

#### 3.3.5 - Functions and Directives

Tailwind v4 cung cấp một bộ directives và functions dùng trong CSS.

**Directives:**

| Directive                          | Mục đích                                                                           |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| `@import "tailwindcss"`            | Entry point — kích hoạt toàn bộ Tailwind (thay cho 3 directive của v3)             |
| `@theme {}`                        | Định nghĩa design tokens / CSS variables cho hệ thống utility                      |
| `@theme static {}`                 | Giống `@theme` nhưng luôn output tất cả CSS var dù không dùng                      |
| `@source "path"`                   | Thêm nguồn file để scan class                                                      |
| `@layer base/components/utilities` | Thêm style vào đúng cascade layer                                                  |
| `@apply`                           | Dùng utility class bên trong CSS rule                                              |
| `@utility name {}`                 | Đăng ký custom utility mới (thay cho plugin)                                       |
| `@variant name {}`                 | Áp dụng Tailwind variant lên style CSS                                             |
| `@custom-variant name (selector)`  | Tạo custom variant mới                                                             |
| `@reference "path"`                | Import theme để dùng `@apply` trong scoped CSS (Vue/Svelte) mà không duplicate CSS |
| `@config "path"`                   | Load legacy `tailwind.config.js` (backward compat v3)                              |

**Build-time functions:**

| Function                  | Mục đích                             | Ví dụ                                 |
| ------------------------- | ------------------------------------ | ------------------------------------- |
| `--value(--theme-key-*)`  | Resolve utility value theo theme key | `tab-size: --value(--tab-size-*)`     |
| `--value(integer)`        | Resolve bare number value            | `tab-size: --value(integer)`          |
| `--spacing(n)`            | Tính toán spacing theo scale         | `padding: --spacing(4)` = `1rem`      |
| `--alpha(color, opacity)` | Điều chỉnh opacity của màu           | `--alpha(var(--color-blue-500), 50%)` |

**Ví dụ dùng `@reference` trong Vue/Svelte component:**

```vue
<template>
  <h1>Hello</h1>
</template>
<style>
@reference "../../app.css";
h1 {
  @apply text-2xl font-bold text-brand;
}
</style>
```

**Ví dụ tạo custom utility functional:**

```css
@utility tab-* {
  tab-size: --value(integer);
}
/* Dùng: tab-2, tab-4, hover:tab-2, md:tab-8 */
```
