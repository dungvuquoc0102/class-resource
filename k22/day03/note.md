# Day 3: Nhóm thẻ Link, Media, Form, Table trong HTML; Introduction, Syntax trong CSS

## Tag types

- Link: a
  - href
    - External URL
    - Internal URL
    - Anchor link (#id)
    - mailto:
    - tel:
  - target
  - download
  - rel
    - noopener
    - noreferrer

- Media:
  - img
    - src, alt
  - audio
    - src, controls, autoplay, loop, muted
  - video
    - src, controls, autoplay, loop, muted, poster
  - iframe
    - src, allowfullscreen
    - Embed external content: YouTube, Google Maps

- Form:
  - form
    - action
    - method
  - input
    - type: text, password, email, checkbox, radio, file
    - Attributes: name, value, placeholder, required, readonly, disabled, min, max, step
  - textarea
    - rows, cols, placeholder
  - select
  - option
  - button
    - type: submit, reset, button
  - label
    - for + id, labal bọc input (association)
    - Click vào label -> focus vào input

- Table
  - table
  - caption
  - thead, tbody, tfoot
  - tr
  - th
  - td
  - Attributes: colspan, rowspan

## Block and Inline elements

- Block: chiếm toàn bộ chiều rộng, xuống dòng
  - div, p, h1-h6, ul, ol, li, table, form, section, header, footer
- Inline: nằm trên cùng dòng, chỉ chiếm nội dung
  - span, a, img, input, button, label, strong, em, small
- Block vs Inline: khác biệt về layout, width, margin/padding

## Introduction to CSS

- Cascading Style Sheets: ngôn ngữ định dạng giao diện cho HTML
- File `.css`: chứa các luật styling
- Browser read: đọc HTML trước, sau đó đọc CSS và áp dụng lên các phần tử
- Where to use CSS:
  - Inline: thuộc tính `style` trong tag
  - Internal: thẻ `<style>` trong `<head>`
  - External: file `.css` riêng, link qua `<link rel="stylesheet" href="">`
  - Ưu tiên dùng External

## Syntax

- Rule = Selector + Declaration

```css
selector {
  property: value;
  property: value;
}
```

- Selector
  - Simple selectors
    - element: `p { }`
    - class: `.class-name { }`
    - id: `#id-name { }`
  - Combinators
    - descendant: `div p`
    - child: `div > p`
    - adjacent sibling: `h1 + p`
    - general sibling: `h1 ~ p`
