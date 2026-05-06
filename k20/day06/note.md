# Day 6: Filesystem, Comments, Formatting, Quotation, Code, Links, Media, Forms, Tables, Graphics

## Filesystem: Cấu trúc thư mục, file types, path

**Filesystem** (hệ thống tập tin) là cách máy tính tổ chức, lưu trữ, và quản lý file & folder. Mỗi hệ điều hành (Windows, Mac, Linux) có cấu trúc riêng.

### Windows Filesystem

```
C:\ (hoặc D:\, E:\, ...)         # Root — ổ cứng
├── Users\
│   └── YourUsername\
│       ├── Desktop\              # Bàn làm việc
│       ├── Documents\            # Tài liệu
│       ├── Downloads\            # Tải về
│       ├── Pictures\             # Ảnh
│       ├── Videos\               # Video
│       ├── Music\                # Nhạc
│       └── AppData\
│           ├── Local\            # Dữ liệu ứng dụng cục bộ
│           ├── Roaming\          # Cài đặt người dùng
│           └── LocalLow\         # Dữ liệu nhạy cảm
├── Program Files\                # Ứng dụng 64-bit
├── Program Files (x86)\          # Ứng dụng 32-bit
├── Windows\                      # Hệ điều hành
└── System32\                     # Tệp hệ thống
```

**Các phím tắt điều hướng:**

- `Ctrl+Alt+Del` — Task Manager
- `Win+E` — File Explorer
- `Win+R` → `cmd` — Command Prompt
- `Win+R` → `powershell` — PowerShell
- Thanh địa chỉ: `C:\Users\YourName\Documents` (tuyệt đối)

### macOS Filesystem

```
/ (root)                          # Gốc hệ thống
├── Applications/                 # Ứng dụng cài đặt
├── Users/
│   └── YourUsername/
│       ├── Desktop/              # Bàn làm việc
│       ├── Documents/            # Tài liệu
│       ├── Downloads/            # Tải về
│       ├── Pictures/             # Ảnh
│       ├── Movies/               # Video
│       ├── Music/                # Nhạc
│       ├── Library/              # Cài đặt, cache ứng dụng
│       └── .ssh/                 # SSH keys (ẩn — bắt đầu bằng .)
├── System/                       # Hệ thống lõi
├── Library/                      # Thư viện hệ thống
└── var/                          # Dữ liệu tạm, logs
```

**Các phím tắt điều hướng:**

- `Cmd+Space` — Spotlight search
- `Cmd+Shift+D` — Mở Desktop
- `Cmd+Option+L` — Mở Downloads
- Terminal: `Cmd+Space` → "Terminal"
- Thanh địa chỉ: `/Users/YourName/Documents` (tuyệt đối)

### Linux Filesystem (Ubuntu, Debian, CentOS, …)

```
/ (root)                          # Gốc hệ thống
├── home/
│   └── username/                 # Thư mục home (~ = shortcut)
│       ├── Desktop/              # Bàn làm việc
│       ├── Documents/            # Tài liệu
│       ├── Downloads/            # Tải về
│       └── .config/              # Cài đặt ứng dụng (ẩn)
├── usr/
│   ├── bin/                      # Executable programs
│   ├── local/bin/                # Custom programs
│   └── share/                    # Shared data
├── etc/                          # Cấu hình hệ thống
├── var/                          # Logs, cache, data tạm
├── tmp/                          # Tệp tạm thời
└── opt/                          # Ứng dụng của bên thứ ba
```

**Các phím tắt điều hướng:**

- `Ctrl+Alt+T` — Mở Terminal
- `pwd` — In đường dẫn hiện tại
- `ls` hoặc `ls -la` — Liệt kê file (kể cả ẩn)
- `cd Documents` — Vào folder Documents
- `cd ~` — Vào home directory
- Thanh địa chỉ: `/home/username/documents` (tuyệt đối)

### File types thường gặp

| Extension | Loại         | Mô tả                                       |
| --------- | ------------ | ------------------------------------------- |
| `.html`   | Markup       | Cấu trúc website                            |
| `.css`    | Stylesheet   | Định dạng và bố cục                         |
| `.js`     | Script       | Interactivity, logic                        |
| `.json`   | Data         | Trao đổi dữ liệu (API response, config)     |
| `.svg`    | Vector image | Biểu đồ, icon (có thể style bằng CSS)       |
| `.png`    | Raster image | Hình ảnh với nền trong suốt (PNG-8/24/32)   |
| `.jpg`    | Raster image | Hình ảnh nén cao (tốt cho ảnh chụp)         |
| `.webp`   | Modern image | Format hiệu quả (nén tốt hơn, hỗ trợ alpha) |
| `.woff`   | Web font     | Font file tối ưu cho web                    |
| `.md`     | Markdown     | Tài liệu (README, note)                     |

### Path: đường dẫn tuyệt đối & tương đối

**Tuyệt đối** (absolute path): bắt đầu từ gốc (`/`). Không khuyến khích dùng trong project vì khi move project đi, link sẽ hỏng.

```html
<!-- Không tốt: đường dẫn máy cá nhân -->
<img src="/Users/you/project/img/logo.png" alt="Logo" />
```

**Tương đối** (relative path): bắt đầu từ file hiện tại.

```html
<!-- Từ index.html -->
<link rel="stylesheet" href="css/style.css" />
<img src="img/logo.png" alt="Logo" />

<!-- Từ file pages/about.html (lên 1 cấp, vào css/) -->
<link rel="stylesheet" href="../css/style.css" />
<img src="../img/logo.png" alt="Logo" />
```

**Ký hiệu:**

- `./` hoặc không ghi: folder hiện tại.
- `../` hoặc `../../`: lên 1 cấp, 2 cấp, … trong thư mục.

---

## Comment code: Bình luận code

**Comment** giúp bạn (và đội nhóm) hiểu ý đồ, trình bày logic rõ ràng mà không ảnh hưởng đến chức năng.

### Comment trong HTML

```html
<!-- Đây là comment 1 dòng -->

<!--
  Comment nhiều dòng
  được dùng để thuyết minh
  một khối chức năng
-->

<!-- Navigation bar -->
<nav class="navbar">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- TODO: Thêm tính năng dark mode ở đây -->
<button id="theme-toggle">Toggle theme</button>

<!-- FIXME: Khắc phục lỗi responsive trên iPad -->
<div class="sidebar">
  <!-- Sidebar content -->
</div>
```

### Comment trong CSS

```css
/* Comment 1 dòng */

/*
  Comment nhiều dòng
  thường dùng cho section
*/

/* ==================== Layout ==================== */

/* Header cố định */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

/* Main content với padding chừa chỗ cho header */
.main {
  margin-top: 4rem; /* header height */
  padding: 2rem 1rem;
}

/* TODO: Tối ưu hiệu năng animation */
```

### Comment trong JavaScript

```javascript
// Comment 1 dòng

/*
  Comment nhiều dòng
  dùng để mô tả hàm,
  logic phức tạp
*/

// Lấy thông tin user từ API
function fetchUserData(userId) {
  // TODO: Thêm error handling
  return fetch(`/api/users/${userId}`).then((res) => res.json());
}

// FIXME: Bug khi click nhanh 2 lần
document.getElementById("btn").addEventListener("click", () => {
  console.log("Button clicked");
});
```

**Thực hành tốt:**

- Viết comment để giải thích "tại sao", không phải "cái gì" (code đã nói rồi).
- Tránh comment rác hoặc lỏng lẻo.
- Cập nhật comment khi thay đổi code.

---

## Tag types — Formatting: b, strong, i, em, mark, small, del, ins, sub, sup

Các thẻ **formatting** dùng để **nhấn mạnh** hoặc **đánh dấu** text với ý nghĩa ngữ nghĩa hoặc visual.

| Thẻ        | Mục đích                  | Render mặc định                | Ngữ nghĩa            |
| ---------- | ------------------------- | ------------------------------ | -------------------- |
| `<b>`      | Bold (trọng lượng cao)    | **Đậm** nhưng không quan trọng | Visual only          |
| `<strong>` | Strong (quan trọng)       | **Đậm**                        | Nhấn mạnh quan trọng |
| `<i>`      | Italic (trọng lượng cao)  | _Nghiêng_ nhưng không đặc biệt | Visual only          |
| `<em>`     | Emphasis (nhấn mạnh)      | _Nghiêng_                      | Nhấn mạnh ý nghĩa    |
| `<mark>`   | Mark (đánh dấu/highlight) | Nền vàng                       | Highlight quan trọng |
| `<small>`  | Small (nhỏ)               | Chữ nhỏ hơn                    | Phụ thuộc            |
| `<del>`    | Delete (xoá)              | ~~Gạch ngang~~                 | Nội dung đã xóa      |
| `<ins>`    | Insert (thêm)             | Gạch dưới                      | Nội dung đã thêm     |
| `<sub>`    | Subscript (chỉ số dưới)   | Nhỏ + hạ                       | H₂O (water)          |
| `<sup>`    | Superscript (chỉ số trên) | Nhỏ + nâng                     | E=mc² (physics)      |

### Ví dụ thực tế

```html
<p>
  Sản phẩm này <mark>có giảm giá 30%</mark> — rất
  <strong>được khuyên dùng</strong> để tiết kiệm.
</p>

<p>
  <b>Lưu ý:</b> Thông tin cũ (cập nhật ngày 1/1/2024) <del>đã hết hạn</del>.
  <ins>Ngày 1/1/2025 có quy định mới</ins>.
</p>

<p>
  Công thức hóa học: H<sub>2</sub>O (nước).
  <br />
  Công thức vật lý: E = mc<sup>2</sup>.
</p>

<p>
  <em>Hãy chú ý</em> rằng <small>chữ nhỏ thường là điều khoản bổ sung.</small>
</p>

<!-- Tìm lỗi / trạng thái: highlight từ tìm kiếm -->
<p>
  Tìm thấy từ "<mark>CSS</mark>" trong: "CSS là ngôn ngữ
  <mark>CSS</mark> định dạng website."
</p>
```

**Khi nào dùng cái nào:**

- `<b>` vs `<strong>`: `<strong>` (semantic) khi thực sự quan trọng; `<b>` khi chỉ visual.
- `<i>` vs `<em>`: `<em>` (semantic) khi nhấn mạnh; `<i>` cho foreign text, tên khoa học, … (visual).
- `<mark>`: highlight kết quả tìm kiếm, lỗi, điểm chính.
- `<del>` + `<ins>`: thay đổi version / tracking change.
- `<sub>` / `<sup>`: công thức toán học, khoa học, thuộc tính.

---

## Tag types — Quotation and Citation: blockquote, q, cite, abbr, address, bdo

Các thẻ **quotation & citation** để **trích dẫn**, **giải thích**, và **liên hệ** ngữ cảnh.

| Thẻ            | Mục đích                      | Hành vi mặc định       |
| -------------- | ----------------------------- | ---------------------- |
| `<blockquote>` | Trích dẫn dài (block-level)   | Lề trái, font italic   |
| `<q>`          | Trích dẫn ngắn (inline)       | Tự thêm ngoặc kép      |
| `<cite>`       | Tên tác phẩm / nguồn          | Italic                 |
| `<abbr>`       | Viết tắt + giải thích (title) | Gạch nét dưới (dotted) |
| `<address>`    | Thông tin liên hệ (block)     | Italic (thường)        |
| `<bdo>`        | Đảo chiều text (RTL/LTR)      | Không render mặc định  |

### Ví dụ thực tế

```html
<!-- Blockquote: trích dẫn dài -->
<blockquote cite="https://example.com/article">
  <p>
    "CSS không phải ngôn ngữ lập trình, nhưng nó là công cụ mạnh mẽ để tạo ra
    những giao diện đẹp mắt."
  </p>
  <footer>— <cite>Frontend Expert</cite>, ngày 15/1/2024</footer>
</blockquote>

<!-- Q: trích dẫn ngắn (inline) -->
<p>
  Theo chuyên gia:
  <q cite="https://example.com">Học HTML trước khi học CSS</q>. Điều này giúp
  bạn hiểu cấu trúc trang trước.
</p>

<!-- CITE: tên tác phẩm / bài viết -->
<p>
  Bài viết <cite>Web Design Trends 2024</cite> được xuất bản trên
  <cite>CSS-Tricks</cite>.
</p>

<!-- ABBR: viết tắt -->
<p>
  <abbr title="HyperText Markup Language">HTML</abbr>
  là nền tảng của web.
  <br />
  <abbr title="Cascading Style Sheets">CSS</abbr>
  dùng để định dạng.
</p>

<!-- ADDRESS: thông tin liên hệ -->
<address>
  Công ty ABC <br />
  Email: <a href="mailto:contact@abc.com">contact@abc.com</a> <br />
  Điện thoại: <a href="tel:+84123456789">+84 123 456 789</a> <br />
  Địa chỉ: 123 Đường ABC, Tp HCM, Việt Nam
</address>

<!-- BDO: đảo chiều text -->
<p>Từ tiếng Anh "HTML" được viết: <bdo dir="rtl">HTML</bdo> nếu đảo RTL.</p>
```

**Lưu ý:**

- `<blockquote>` thường kèm `<footer>` để ghi nguồn / tác giả.
- `<q>` tự động thêm ngoặc kép (tuỳ trình duyệt & ngôn ngữ).
- `<abbr title="...">` hiển thị tooltip khi hover.
- `<address>` dùng cho contact info của trang hoặc người viết.
- `<bdo>` hiếm gặp, chủ yếu cho ngôn ngữ RTL (Tiếng Ả-rập, Do Thái).

---

## Tag types — Computer code: code, pre, kbd, samp

Các thẻ dùng để **hiển thị code**, **input/output console**, **phím bấm**.

| Thẻ      | Mục đích                             | Render mặc định                     |
| -------- | ------------------------------------ | ----------------------------------- |
| `<code>` | Đoạn code (inline hoặc block)        | Font monospace (fixed)              |
| `<pre>`  | Preformatted text (giữ khoảng trắng) | Font monospace, preserve whitespace |
| `<kbd>`  | Keyboard input (phím bấm)            | Font monospace, thường có border    |
| `<samp>` | Sample output (output chương trình)  | Font monospace                      |

### Ví dụ thực tế

```html
<!-- CODE inline: nhắc tới code trong text -->
<p>
  Hàm <code>console.log()</code> dùng để in ra console.
  <br />
  Tag <code>&lt;img&gt;</code> dùng để hiển thị ảnh.
</p>

<!-- PRE: code block với khoảng trắng giữ nguyên -->
<pre><code>
function hello() {
  console.log('Hello, World!');
  // Khoảng trắng & indent được giữ đúng
}
hello(); // Output: Hello, World!
</code></pre>

<!-- PRE: JSON format -->
<pre><code>
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
</code></pre>

<!-- KBD: phím bấm hướng dẫn người dùng -->
<p>
  Để save file, bấm <kbd>Ctrl</kbd> + <kbd>S</kbd>.
  <br />
  Để mở DevTools, bấm <kbd>F12</kbd> hoặc <kbd>Cmd</kbd> + <kbd>Option</kbd> +
  <kbd>I</kbd>.
</p>

<!-- SAMP: output kết quả -->
<p>
  Nhập lệnh: <kbd>npm install</kbd>
  <br />
  Output:
</p>
<samp> added 150 packages in 2.35s </samp>

<!-- Combination: code + output -->
<p>Terminal command:</p>
<pre><kbd>
$ node script.js
</kbd></pre>
<p>Output:</p>
<samp> Result: 42 Time: 123ms </samp>
```

**Thực hành tốt:**

- `<code>` inline khi nhắc tới hàm, biến trong câu.
- `<pre><code>...</code></pre>` khi hiển thị code block (thường với syntax highlight từ CSS/JS).
- `<kbd>` khi hướng dẫn bấm phím.
- `<samp>` khi show kết quả console / API response.

---

## Tag types — Link: a

Tag `<a>` (anchor) tạo **siêu liên kết** — điểm nối giữa các trang, tài nguyên, hoặc vị trí.

### Cách dùng cơ bản

```html
<!-- Link trang khác -->
<a href="/about">Về chúng tôi</a>

<!-- Link URL ngoài -->
<a href="https://google.com" target="_blank">Google</a>

<!-- Link file tải về -->
<a href="/files/resume.pdf" download>Tải CV</a>

<!-- Link email -->
<a href="mailto:hello@example.com">Liên hệ</a>

<!-- Link điện thoại -->
<a href="tel:+84123456789">+84 123 456 789</a>

<!-- Link vị trí trên trang (anchor) -->
<a href="#section-2">Đi tới phần 2</a>

<!-- Link trở về đầu trang -->
<a href="#top">↑ Lên đầu</a>
```

### Thuộc tính quan trọng

| Thuộc tính | Ghi chú                                                              |
| ---------- | -------------------------------------------------------------------- |
| `href`     | **Bắt buộc** — URL đích hoặc `#id` (anchor)                          |
| `target`   | `_self` (mặc định, cùng tab), `_blank` (tab mới), `_parent`, `_top`  |
| `title`    | Tooltip khi hover                                                    |
| `rel`      | `nofollow` (SEO), `external` (link ngoài), `noopener` + `noreferrer` |
| `download` | Tải file thay vì mở (nếu có giá trị, đặt tên file tải)               |

### Ví dụ thực tế

```html
<!-- Navigation internal links -->
<nav>
  <a href="/">Home</a>
  <a href="/products">Products</a>
  <a href="/contact">Contact</a>
</nav>

<!-- External link với target="_blank" -->
<p>
  Đọc thêm:
  <a
    href="https://developer.mozilla.org/en-US/docs/Web/HTML"
    target="_blank"
    rel="noopener noreferrer"
    title="MDN Web Docs"
  >
    MDN HTML Reference
  </a>
</p>

<!-- Email link -->
<footer>
  <p>
    Liên hệ:
    <a href="mailto:support@example.com?subject=Hỗ trợ">
      support@example.com
    </a>
  </p>
</footer>

<!-- Anchor link: jump to section -->
<a href="#features">Xem tính năng</a>
<!-- ... content ở đây ... -->
<section id="features">
  <h2>Tính năng</h2>
  <p>...</p>
</section>

<!-- Download file -->
<a href="/files/guide.pdf" download="Download_Guide"> Tải hướng dẫn PDF </a>

<!-- Link ngoài không theo (SEO) -->
<a href="https://ads.example.com" rel="nofollow"> Quảng cáo </a>
```

**Thực hành SEO:**

- Dùng **anchor text có ý nghĩa** (không phải "Click here", "Link", …).
- Đánh `rel="nofollow"` cho quảng cáo, user-generated content.
- Dùng `title` để cung cấp thêm ngữ cảnh.

---

## Tag types — Media: img, audio, video, iframe

### `<img>`: Hình ảnh

```html
<!-- Cơ bản -->
<img src="logo.png" alt="Logo công ty" />

<!-- Với kích thước -->
<img src="hero.jpg" alt="Banner" width="800" height="600" />

<!-- Responsive: srcset để màn hình khác nhau -->
<img
  src="image-small.png"
  srcset="image-small.png 320w, image-medium.png 768w, image-large.png 1200w"
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Ảnh responsive"
/>

<!-- PICTURE: định dạng khác nhau theo màn hình -->
<picture>
  <source media="(max-width: 600px)" srcset="image-mobile.webp" />
  <source media="(min-width: 601px)" srcset="image-desktop.webp" />
  <img src="image-fallback.jpg" alt="Fallback image" />
</picture>
```

| Thuộc tính | Mục đích                                   |
| ---------- | ------------------------------------------ |
| `src`      | Đường dẫn hình ảnh **(bắt buộc)**          |
| `alt`      | Văn bản thay thế (SEO, accessibility)      |
| `width`    | Chiều rộng (không bắt buộc, tránh stretch) |
| `height`   | Chiều cao                                  |
| `srcset`   | Danh sách ảnh cho resolution khác          |
| `sizes`    | Kích thước để chọn từ `srcset`             |
| `loading`  | `lazy`, `eager` (defer loading)            |

### `<audio>`: Âm thanh

```html
<!-- Cơ bản -->
<audio controls>
  <source src="song.mp3" type="audio/mpeg" />
  <source src="song.ogg" type="audio/ogg" />
  Trình duyệt không hỗ trợ audio.
</audio>

<!-- Tự động phát, không lặp -->
<audio autoplay loop muted>
  <source src="background-music.mp3" type="audio/mpeg" />
</audio>

<!-- Không hiển thị controls (phát nền) -->
<audio loop>
  <source src="ambient.mp3" type="audio/mpeg" />
</audio>
```

| Thuộc tính | Ghi chú                                |
| ---------- | -------------------------------------- |
| `controls` | Hiển thị nút play, volume, timeline    |
| `autoplay` | Tự động phát (trình duyệt có thể chặn) |
| `loop`     | Phát lặp lại                           |
| `muted`    | Âm lặng (thường kèm `autoplay`)        |

### `<video>`: Video

```html
<!-- Cơ bản -->
<video width="640" height="360" controls>
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.webm" type="video/webm" />
  Trình duyệt không hỗ trợ video.
</video>

<!-- Poster (ảnh đại diện trước khi play) -->
<video width="640" height="360" controls poster="thumbnail.jpg">
  <source src="intro.mp4" type="video/mp4" />
</video>

<!-- Preload: bao nhiêu phần load sẵn -->
<video controls preload="metadata">
  <!-- preload="none" (không), "metadata" (thời lượng), "auto" (toàn bộ) -->
  <source src="demo.mp4" type="video/mp4" />
</video>
```

| Thuộc tính | Ghi chú                               |
| ---------- | ------------------------------------- |
| `width`    | Chiều rộng                            |
| `height`   | Chiều cao                             |
| `controls` | Hiển thị nút play, volume, fullscreen |
| `poster`   | Hình đại diện trước khi play          |
| `autoplay` | Tự động phát (thường kèm `muted`)     |
| `loop`     | Phát lặp                              |
| `muted`    | Âm lặng                               |
| `preload`  | `none`, `metadata`, `auto`            |

### `<iframe>`: Nhúng trang khác

```html
<!-- Nhúng video YouTube -->
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video title"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
>
</iframe>

<!-- Nhúng Google Maps -->
<iframe
  width="100%"
  height="450"
  style="border: 0;"
  loading="lazy"
  src="https://www.google.com/maps/embed?pb=..."
  allowfullscreen
>
</iframe>

<!-- Nhúng trang web nội bộ -->
<iframe src="/dashboard.html" width="100%" height="600" title="Dashboard">
</iframe>

<!-- Nhúng form Google Form -->
<iframe
  src="https://docs.google.com/forms/d/e/FORM_ID/viewform"
  width="640"
  height="757"
  frameborder="0"
  marginheight="0"
  marginwidth="0"
>
  Loading…
</iframe>
```

| Thuộc tính        | Ghi chú                           |
| ----------------- | --------------------------------- |
| `src`             | URL trang nhúng                   |
| `width`           | Chiều rộng                        |
| `height`          | Chiều cao                         |
| `frameborder`     | Viền (0 = không)                  |
| `title`           | Tiêu đề cho accessibility         |
| `loading`         | `lazy` để defer load              |
| `allow`           | Các quyền (camera, microphone, …) |
| `allowfullscreen` | Cho phép fullscreen               |

---

## Tag types — Form: form, input, textarea, select, button

Tag **form** tạo **biểu mẫu** để người dùng nhập dữ liệu — rất quan trọng cho tương tác web.

### Cấu trúc cơ bản

```html
<form action="/submit" method="POST">
  <!-- Text input -->
  <label for="username">Username:</label>
  <input
    type="text"
    id="username"
    name="username"
    placeholder="Nhập tên"
    required
  />

  <!-- Email input -->
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />

  <!-- Password -->
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required />

  <!-- Checkbox -->
  <label>
    <input type="checkbox" name="terms" required />
    Tôi đồng ý với điều khoản
  </label>

  <!-- Radio button -->
  <fieldset>
    <legend>Chọn gói:</legend>
    <label>
      <input type="radio" name="plan" value="free" checked />
      Free
    </label>
    <label>
      <input type="radio" name="plan" value="pro" />
      Pro
    </label>
  </fieldset>

  <!-- Select dropdown -->
  <label for="country">Đất nước:</label>
  <select id="country" name="country">
    <option value="">-- Chọn --</option>
    <option value="vn">Việt Nam</option>
    <option value="th">Thái Lan</option>
  </select>

  <!-- Textarea -->
  <label for="message">Tin nhắn:</label>
  <textarea
    id="message"
    name="message"
    rows="5"
    placeholder="Nhập tin nhắn..."
  ></textarea>

  <!-- Submit button -->
  <button type="submit">Gửi</button>
  <button type="reset">Xóa</button>
</form>
```

### Input types thường gặp

| Type       | Ý nghĩa                          | Render                            |
| ---------- | -------------------------------- | --------------------------------- |
| `text`     | Văn bản thông thường             | Text box                          |
| `email`    | Email (validation tự động)       | Text box (mobile: @ keyboard)     |
| `password` | Mật khẩu (ẩn ký tự)              | Text box (ẩn)                     |
| `number`   | Số (spinner increment/decrement) | Number input                      |
| `range`    | Slider                           | Slider 0-100                      |
| `date`     | Ngày (YYYY-MM-DD)                | Date picker                       |
| `checkbox` | Tick hộp (multiple choice)       | Checkbox                          |
| `radio`    | Nút tròn (single choice)         | Radio button                      |
| `file`     | Upload file                      | File chooser button               |
| `submit`   | Nút gửi form                     | Button (trigger form submit)      |
| `reset`    | Nút reset form                   | Button (clear form values)        |
| `button`   | Nút bấm thường                   | Button (không hành động mặc định) |

### Ví dụ nâng cao: Form đăng ký

```html
<form action="/register" method="POST" enctype="multipart/form-data">
  <fieldset>
    <legend>Thông tin cá nhân</legend>

    <!-- Name -->
    <label for="fullname">Họ tên:</label>
    <input
      type="text"
      id="fullname"
      name="fullname"
      required
      minlength="2"
      maxlength="100"
    />

    <!-- Email -->
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required />

    <!-- Phone -->
    <label for="phone">Điện thoại:</label>
    <input type="tel" id="phone" name="phone" pattern="[0-9]{10,}" />

    <!-- DOB -->
    <label for="dob">Ngày sinh:</label>
    <input type="date" id="dob" name="dob" />

    <!-- Avatar -->
    <label for="avatar">Ảnh đại diện:</label>
    <input
      type="file"
      id="avatar"
      name="avatar"
      accept="image/png,image/jpeg"
    />
  </fieldset>

  <fieldset>
    <legend>Tài khoản</legend>

    <!-- Username -->
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required minlength="3" />

    <!-- Password -->
    <label for="password">Mật khẩu:</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      minlength="6"
    />

    <!-- Confirm password -->
    <label for="confirm">Xác nhận mật khẩu:</label>
    <input type="password" id="confirm" name="confirm" required />
  </fieldset>

  <!-- Gender -->
  <fieldset>
    <legend>Giới tính:</legend>
    <label>
      <input type="radio" name="gender" value="male" />
      Nam
    </label>
    <label>
      <input type="radio" name="gender" value="female" />
      Nữ
    </label>
    <label>
      <input type="radio" name="gender" value="other" />
      Khác
    </label>
  </fieldset>

  <!-- Interests -->
  <fieldset>
    <legend>Sở thích:</legend>
    <label>
      <input type="checkbox" name="interests" value="coding" />
      Lập trình
    </label>
    <label>
      <input type="checkbox" name="interests" value="design" />
      Thiết kế
    </label>
    <label>
      <input type="checkbox" name="interests" value="writing" />
      Viết lách
    </label>
  </fieldset>

  <!-- Terms -->
  <label>
    <input type="checkbox" name="terms" required />
    Tôi đã đọc và đồng ý với
    <a href="/terms">Điều khoản dịch vụ</a>
  </label>

  <!-- Buttons -->
  <button type="submit">Đăng ký</button>
  <button type="reset">Xóa</button>
  <button type="button" onclick="history.back()">Quay lại</button>
</form>
```

**Thực hành tốt:**

- Luôn dùng `<label>` với `for` để liên kết input.
- Dùng `required`, `minlength`, `pattern` để validate client-side.
- Dùng `<fieldset>` + `<legend>` để nhóm logic các input.
- `enctype="multipart/form-data"` khi upload file.

---

Hết buổi 6

---

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

## Tóm tắt buổi học

1. **Filesystem**: Cấu trúc thư mục (`css/`, `js/`, `img/`), file types (`.html`, `.css`, `.js`, `.json`, `.svg`, …), path tuyệt đối vs tương đối (`../`).

2. **Comment**: HTML, CSS, JS — dùng để giải thích logic, không phải "cái gì" mà là "tại sao".

3. **Formatting tags**: `<b>`, `<strong>`, `<i>`, `<em>`, `<mark>`, `<small>`, `<del>`, `<ins>`, `<sub>`, `<sup>` — nhấn mạnh ngữ nghĩa.

4. **Quotation & Citation**: `<blockquote>`, `<q>`, `<cite>`, `<abbr>`, `<address>`, `<bdo>` — trích dẫn, giải thích, liên hệ.

5. **Computer code**: `<code>`, `<pre>`, `<kbd>`, `<samp>` — hiển thị code, input, output.

6. **Links**: `<a>` với `href`, `target`, `rel` — siêu liên kết nội bộ, ngoài, email, phone, anchor.

7. **Media**: `<img>` (responsive srcset), `<audio>` (controls, autoplay), `<video>` (poster, preload), `<iframe>` (YouTube, Maps, …).

8. **Forms**: `<form>`, `<input>`, `<textarea>`, `<select>`, `<button>` — collect user data, validation `required`, `minlength`, `pattern`.

9. **Tables**: `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>` — hiển thị dữ liệu bảng, `colspan`, `rowspan`.

10. **Graphics**: `<canvas>` (raster, JS-driven) vs `<svg>` (vector, CSS-styleable) — vẽ đồ hoạ động.
