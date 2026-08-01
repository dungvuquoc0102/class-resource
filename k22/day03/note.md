# Day 3: Link, Media, Form, Table, Block/Inline trong HTML

## Link

- Attributes:
  - href
    - External URL
    - Internal URL
    - Anchor link (#id)
    - mailto:
    - tel:
  - target
  - download
  - rel

## Media

- `img`
  - src, alt
- `audio`
  - src, controls, autoplay, loop, muted
- `video`
  - src, controls, autoplay, loop, muted, poster, width, height
- `iframe`
  - src, width, height, allowfullscreen, title
  - Embed external content: YouTube, Google Maps

## Form

- `<form action="" method="">`
  - method: GET, POST
- `input`
  - Types: text, password, email, number, date, checkbox, radio, file, color, range, hidden
  - Attributes: name, value, placeholder, required, readonly, disabled, min, max, step
- `textarea`
  - rows, cols, placeholder
- `select`
  - option, optgroup, selected
- `button`
  - type: submit, reset, button
  - `<button>` vs `<input type="submit">`
- `label`
  - for + id (association)
  - Click vào label → focus vào input

## Table

- `table`
- `tr` (table row)
- `th` (table header cell)
- `td` (table data cell)
- `caption`
- Attributes: colspan, rowspan
- `thead`, `tbody`, `tfoot`

## Block and Inline elements

- Block: chiếm toàn bộ chiều rộng, xuống dòng
  - div, p, h1-h6, ul, ol, li, table, form, section, header, footer
- Inline: nằm trên cùng dòng, chỉ chiếm nội dung
  - span, a, img, input, button, label, strong, em, small
- Block vs Inline: khác biệt về layout, width, margin/padding

## Excercise

- Ex 1: Tạo form đăng nhập (username, password, button submit) có label đi kèm.
- Ex 2: Tạo bảng thời khóa biểu dùng thead, tbody, colspan, rowspan.
- Ex 3: Chèn video YouTube và ảnh vào trang bằng iframe và img.

# Module 3: CSS

## Introduction

- Cascading Style Sheets: ngôn ngữ định dạng giao diện cho HTML
- File `.css`: chứa các luật styling
- Browser read: đọc HTML trước, sau đó đọc CSS và áp dụng lên các phần tử
- Where to use CSS:
  - Inline: thuộc tính `style` trong tag
  - Internal: thẻ `<style>` trong `<head>`
  - External: file `.css` riêng, link qua `<link rel="stylesheet" href="">`
  - Ưu tiên dùng External

## Syntax

- Rule = Selector + Declaration block

```
selector {
  property: value;
  property: value;
}
```

- Selector: Chọn phần tử để styling
  - Simple selectors:
    - element: `p { }`
    - class: `.class-name { }`
    - id: `#id-name { }`
  - Combinators:
    - descendant: `div p` (con cháu)
    - child: `div > p` (con trực tiếp)
    - adjacent sibling: `h1 + p` (kế sau)
    - general sibling: `h1 ~ p` (cùng cấp phía sau)
  - Pseudo-classes: `:hover`, `:focus`, `:nth-child()`, `:first-child`
  - Pseudo-elements: `::before`, `::after`, `::first-letter`
  - Attribute selectors: `[attr]`, `[attr=value]`, `[attr~=value]`
- Declaration: `property` và `value` (ví dụ `color: red;`)
- Rule: Selector + Declaration block

## Inheritance

- Một số property được kế thừa từ cha xuống con: color, font-family, font-size
- Không kế thừa: margin, padding, border, background, width, height
- `inherit` để ép kế thừa, `initial` để về mặc định

## Specificity

- Độ ưu tiên chọn selector khi xung đột:
  - Inline style > ID > Class / Attribute / Pseudo-class > Element / Pseudo-element
- Cùng độ ưu tiên → selector xuất hiện sau thắng
- `!important` ghi đè mọi thứ (hạn chế dùng)

## Unit

- Absolute (cố định, không đổi theo viewport):
  - px, cm, mm, in, pt, pc
- Relative (tỷ lệ theo phần tử khác):
  - em (theo font-size cha)
  - rem (theo font-size root html)
  - % (theo phần tử cha)
  - vw / vh (theo viewport width / height)

## Reset CSS

- Trình duyệt có style mặc định khác nhau → cần reset cho nhất quán
- Cách làm: dùng `* { margin: 0; padding: 0; box-sizing: border-box; }` hoặc file reset.css / Normalize.css

## Excercise

- Ex 1: Viết CSS External cho trang HTML, dùng selector element, class, id.
- Ex 2: Thực hành 4 combinator và 2 pseudo-class (:hover, :first-child).
- Ex 3: Dùng ::before, ::after để thêm icon/nội dung trang trí.
