# Day 26: DOM Events, Thực hành DOM

## Events trong DOM

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
