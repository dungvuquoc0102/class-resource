# Day 26: DOM Events & Practice

## Event trong DOM

### Event Object

- event.type
- event.target
- event.currentTarget
- event.preventDefault()
- event.stopPropagation()

### Event Listener

- element.addEventListener(type, listener, options)
- element.removeEventListener(type, listener)
- Inline: `on${event}`, `onsubmit`, ...

### Event Flow: Bubbling & Capturing

- Capturing phase: window -> target
- Bubbling phase: target -> window
- `addEventListener(type, listener, { capture: true })`

### Event Delegation

- Gán 1 listener lên parent, dùng event.target để xử lý child

### Event Types

- Mouse / Pointer / Touch: click, dblclick, contextmenu, pointerover, pointerleave, pointerdown, pointerup
- Keyboard: keydown, keyup, keypress
- Form: submit, change, input, focus, blur
- Window: load, resize, scroll, DOMContentLoaded, beforeunload
- Clipboard: copy, paste, cut

## Practice

### Bài 1: Checkbox All

- Một checkbox "Chọn tất cả" ở header
- Khi check/uncheck checkbox all -> tất cả checkbox dưới đều check/uncheck theo
- Khi tất cả checkbox dưới đều được check -> checkbox all tự động check
- Khi có ít nhất 1 checkbox dưới unchecked -> checkbox all tự động unchecked

### Bài 2: Tab

- Nhiều tab button, mỗi tab tương ứng với 1 content panel
- Click vào tab nào -> tab đó active (highlight), content tương ứng hiện, các content khác ẩn
- Mặc định tab đầu tiên active

### Bài 3: Slideshow (Carousel)

- Hiển thị 1 ảnh tại 1 thời điểm
- Nút Previous / Next để chuyển ảnh
- Dots / indicators dưới slider: click vào dot nào -> chuyển đến slide đó
- Tự động chạy (auto-play) sau mỗi 3 giây
- Dừng auto-play khi hover vào slider
