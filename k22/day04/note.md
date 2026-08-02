# Day 4: CSS Selector, Inheritance, Specificity, Unit, Reset CSS

## Selector

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

- Ex 2: Thực hành 4 combinator và 2 pseudo-class (:hover, :first-child).
- Ex 3: Dùng ::before, ::after để thêm icon/nội dung trang trí.
