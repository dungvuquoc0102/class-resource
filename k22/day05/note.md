# Day 5: Flexbox, Position, Grid, Z-index, Typography

## Flexbox

- Flex container
  - display: flex
  - flex-direction
    - row (default), row-reverse
    - column, column-reverse
  - flex-wrap
    - nowrap (default), wrap, wrap-reverse
  - justify-content
    - flex-start, flex-end, center
    - space-between, space-around, space-evenly
  - align-items
    - stretch (default), flex-start, flex-end, center, baseline
  - align-content
  - gap / row-gap / column-gap
- Flex item
  - order
  - flex-grow
  - flex-shrink
  - flex-basis
  - align-self

## Position

- static
- relative
- absolute
- fixed
- sticky
- Offset: top, right, bottom, left, inset

## Grid

- Grid container
  - display: grid
  - grid-template-columns / grid-template-rows / grid-template
  - justify-content / align-content / place-content/ align-items
  - gap / row-gap / column-gap
  - grid-template-areas
  - grid-auto-columns / grid-auto-rows
  - grid-auto-flow
- Grid item
  - grid-column-start / grid-column-end / grid-column
  - grid-row-start / grid-row-end / grid-row
  - grid-area
  - order

## Z-index

- Layer on the z-axis
- Stacking context

## Typography

- font-family
- font-size
- font-weight
- line-height
- letter-spacing
- text-align
  - left, center, right, justify
- Colors
  - HEX
  - RGB
  - HSL
  - OKLCH

## Exercise

- Ex 1: Tạo layout thanh navbar: logo trái, menu giữa, nút đăng nhập phải, dùng flexbox với justify-content và align-items.
- Ex 2: Tạo card sản phẩm có badge "Sale" nằm góc trên phải, dùng position absolute với container relative.
- Ex 3: Tạo layout trang web dạng 3 vùng (header, body gồm sidebar + main, footer) dùng grid với grid-template-areas.
