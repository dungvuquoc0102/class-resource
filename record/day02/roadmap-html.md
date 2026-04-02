# Bản đồ kiến thức HTML (đầy đủ)

```
LỚP 1 — Nền tảng tư duy
├── HTML (Hypertext Markup Language) là gì: không phải ngôn ngữ lập trình, là ngôn ngữ đánh dấu (markup)
│   — trình duyệt đọc HTML và xây dựng DOM tree từ đó
├── Cấu trúc tài liệu: DOCTYPE, html, head, body
│   — DOCTYPE không phải tag HTML, là khai báo cho trình duyệt biết phiên bản HTML
├── Element, Tag, Attribute: phân biệt 3 khái niệm
│   — <p class="text">Hello</p>: tag là p, attribute là class, element là cả cụm
├── Block vs Inline: sự khác biệt mặc định trước khi CSS can thiệp
│   — div, p, h1 là block; span, a, strong là inline
├── Void element (self-closing): img, input, br, hr, meta, link
│   — không có nội dung, không có closing tag
├── Semantic vs Non-semantic
│   — div/span không mang nghĩa; header/nav/main/article/section/footer mang nghĩa
│   — tại sao semantic quan trọng: SEO, accessibility, khả năng đọc code
└── Nesting rules: block không được nằm trong inline
    — <p><div> là sai, trình duyệt tự sửa nhưng kết quả không đoán được
```

```
LỚP 2 — Các nhóm element quan trọng
├── Text content: h1-h6, p, span, strong, em, blockquote, pre, code
│   — strong ≠ bold, em ≠ italic: strong/em có nghĩa ngữ nghĩa
├── List: ul, ol, li, dl, dt, dd
│   — dl (description list) thường bị bỏ quên nhưng đúng ngữ nghĩa hơn ul cho glossary
├── Link: <a href>
│   ├── href: URL tuyệt đối, tương đối, fragment (#id), mailto:, tel:
│   ├── target="_blank": luôn kèm rel="noopener noreferrer" — lý do bảo mật
│   ├── download attribute: tải file thay vì điều hướng
│   └── <a> bao quanh block element: hợp lệ từ HTML5
├── Image: <img>
│   ├── src, alt: alt không phải tùy chọn — accessibility và SEO
│   ├── width, height: khai báo để tránh layout shift (CLS)
│   ├── loading="lazy": defer tải ảnh ngoài viewport
│   └── srcset & sizes: responsive image — trình duyệt tự chọn ảnh phù hợp
├── Table: table, thead, tbody, tfoot, tr, th, td
│   ├── scope attribute trên th: screen reader dùng để liên kết header với data
│   ├── caption: tiêu đề bảng — quan trọng cho accessibility
│   └── table không dùng để layout — là sai lầm của thời HTML4
├── Media: video, audio, source, track
│   ├── controls, autoplay, muted, loop, preload
│   ├── <source> để fallback nhiều định dạng
│   └── <track> cho subtitle/caption — accessibility
└── iframe: nhúng tài liệu khác
    — sandbox attribute: giới hạn quyền của iframe
    — allow attribute: camera, microphone, fullscreen
```

```
LỚP 3 — Form (quan trọng nhất, hay bị học sai)
├── Form element: <form action method enctype>
│   ├── action: URL nhận data — bỏ trống nếu xử lý bằng JS
│   ├── method: GET (data trên URL) vs POST (data trong body)
│   └── enctype="multipart/form-data": bắt buộc khi có file upload
├── Input types — mỗi loại có behavior riêng
│   ├── text, email, password, number, tel, url, search
│   ├── checkbox, radio: checked property khác value property
│   ├── file: multiple, accept attribute; không đọc được bằng .value
│   ├── date, time, datetime-local, month, week, color, range
│   ├── hidden: gửi data mà user không thấy
│   └── submit, reset, button: sự khác biệt khi đặt trong form
├── Label: luôn liên kết với input
│   — cách 1: <label for="id"> + input có id tương ứng
│   — cách 2: bao input trong label
│   — click vào label = focus input — accessibility & UX
├── Textarea: không phải void element — có closing tag
│   — giá trị nằm giữa tag, không phải value attribute
├── Select & Option
│   ├── selected attribute vs .value property
│   ├── optgroup: nhóm option
│   └── multiple attribute: chọn nhiều, nhưng UX tệ trên desktop
├── Fieldset & Legend: nhóm các input liên quan
│   — quan trọng cho accessibility, đặc biệt nhóm radio/checkbox
├── Attribute quan trọng
│   ├── name: key trong form data — không có name thì không được gửi
│   ├── required, disabled, readonly: sự khác biệt về behavior và form submission
│   │   — disabled: không gửi, không thể tương tác
│   │   — readonly: không sửa được nhưng vẫn gửi
│   ├── placeholder: không thay thế label được — biến mất khi gõ
│   ├── autocomplete: gợi ý từ browser, tắt được
│   ├── min, max, step: validation số và ngày
│   ├── minlength, maxlength: giới hạn ký tự
│   └── pattern: regex validation — nhưng chỉ chạy khi submit
└── Native validation vs Custom validation
    — browser tự validate khi submit nếu có required, type, pattern
    — novalidate trên form: tắt native validation để tự handle bằng JS
```

```
LỚP 4 — Head & Metadata
├── <meta> tags
│   ├── charset="UTF-8": khai báo đầu tiên trong head — luôn cần
│   ├── viewport: "width=device-width, initial-scale=1" — mobile responsive
│   ├── description: xuất hiện trên kết quả search
│   ├── robots: index/noindex, follow/nofollow
│   └── http-equiv: giả lập HTTP header — refresh, cache-control
├── <title>: tab title + search result title
│   — quan trọng cho SEO, phải unique mỗi trang
├── Open Graph & Twitter Card
│   — og:title, og:description, og:image, og:url
│   — kiểm soát preview khi share lên mạng xã hội
├── <link> element
│   ├── rel="stylesheet": load CSS
│   ├── rel="icon": favicon
│   ├── rel="canonical": báo với search engine URL gốc tránh duplicate content
│   ├── rel="preload": tải resource trước — font, critical image, script
│   └── rel="preconnect": kết nối sớm đến domain ngoài — giảm latency
└── <script> tag
    ├── đặt cuối body vs trong head: ảnh hưởng đến render blocking
    ├── defer: tải song song, chạy sau khi HTML parse xong
    ├── async: tải song song, chạy ngay khi xong — không đảm bảo thứ tự
    └── type="module": bật ES module trong browser, mặc định là defer
```

```
LỚP 5 — Semantic HTML & Accessibility
├── Landmark elements: header, nav, main, aside, footer, section, article
│   ├── main: chỉ có 1 trên trang
│   ├── article: nội dung độc lập, có thể đứng riêng (bài blog, comment)
│   ├── section: nhóm nội dung liên quan, nên có heading
│   └── aside: nội dung liên quan nhưng không chính (sidebar, callout)
├── Heading hierarchy: h1 → h2 → h3 — không nhảy cấp
│   — h1 chỉ nên có 1 trên trang
│   — heading không dùng để tạo kích thước chữ — đó là việc của CSS
├── ARIA (Accessible Rich Internet Applications)
│   ├── role: bổ sung ngữ nghĩa khi HTML thuần không đủ
│   │   — role="button" trên div: vẫn cần xử lý keyboard bằng JS
│   ├── aria-label: label cho element không có text content
│   ├── aria-labelledby: tham chiếu đến element khác làm label
│   ├── aria-describedby: mô tả bổ sung cho screen reader
│   ├── aria-hidden="true": ẩn khỏi accessibility tree — icon trang trí
│   └── aria-live: thông báo thay đổi động cho screen reader
├── Keyboard navigation
│   — tabindex="0": thêm element vào tab order
│   — tabindex="-1": focus bằng JS nhưng không trong tab order
│   — tabindex > 0: tránh dùng, phá tab order tự nhiên
└── Focus management
    — :focus visible thay vì :focus — chỉ hiện outline khi navigate bằng keyboard
    — skip link: link ẩn đầu trang, dùng để bỏ qua nav khi tab
```

```
LỚP 6 — Performance & Rendering
├── Render blocking: HTML parse bị dừng bởi CSS và JS không có defer/async
│   — critical rendering path: HTML → DOM, CSS → CSSOM → Render Tree → Layout → Paint
├── Resource hints
│   ├── preload: tài nguyên chắc chắn cần — font, hero image, critical JS
│   ├── preconnect: domain sẽ dùng — CDN, font provider
│   ├── prefetch: tài nguyên có thể cần ở trang tiếp theo
│   └── dns-prefetch: nhẹ hơn preconnect, chỉ resolve DNS
├── Image optimization
│   ├── srcset + sizes: đúng ảnh cho đúng thiết bị
│   ├── <picture> element: art direction — ảnh khác nhau hoàn toàn theo breakpoint
│   ├── loading="lazy" và fetchpriority="high": điều khiển ưu tiên tải
│   └── width + height attribute: tránh Cumulative Layout Shift (CLS)
├── Core Web Vitals liên quan đến HTML
│   ├── LCP (Largest Contentful Paint): hero image, h1 — load nhanh không
│   ├── CLS (Cumulative Layout Shift): khai báo dimension cho image/video
│   └── INP (Interaction to Next Paint): liên quan đến event handler JS
└── Template & Slot (Web Components)
    ├── <template>: HTML không render, chỉ dùng bằng JS
    └── <slot>: placeholder trong Shadow DOM
```

```
LỚP 7 — HTML và hệ sinh thái
├── HTML5 API gắn với element
│   ├── Canvas API: vẽ 2D bằng JS — game, chart tùy chỉnh
│   ├── SVG inline: đồ họa vector trong HTML, có thể style bằng CSS
│   ├── drag and drop API: draggable attribute + JS event
│   └── contenteditable: biến element thành editor
├── HTML trong framework: JSX không phải HTML
│   — className thay class, htmlFor thay for, camelCase event
│   — tại sao: JS keyword collision và React DOM model
├── Template engines: Jinja, Handlebars, EJS
│   — HTML được tạo server-side, không phải static
├── SEO cơ bản qua HTML
│   ├── Structured data (JSON-LD): schema.org trong <script type="application/ld+json">
│   └── Sitemap & robots.txt: không phải HTML nhưng liên quan đến crawling
└── Validation & Tooling
    ├── W3C Validator: check HTML hợp lệ không
    ├── Linter: HTMLHint, Prettier
    └── Axe / Lighthouse: check accessibility và performance
```
