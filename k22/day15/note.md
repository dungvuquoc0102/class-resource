# Day 15: DOM Tree, Data types, Select, Manipulate, Create, Delete DOM elements, DOM Events trong JavaScript

## DOM Tree

## Data types

- Document
- Node
- Element
- Attribute
- Text

## Select DOM elements

- document.getElementById()
- document.getElementsByClassName()
- document.getElementsByTagName()
- document.querySelector()
- document.querySelectorAll()

- element.parentElement
- element.children
- element.firstElementChild
- element.lastElementChild
- element.previousElementSibling
- element.nextElementSibling
- element.closest()

## Manipulate DOM elements

- Text element
  - Content
    - innerHTML
    - textContent
    - innerText
    - outerHTML
    - outerText

  - Get and set attribute nodes
    - element.getAttribute()
    - element.setAttribute()
    - element.hasAttribute()
    - element.removeAttribute()

  - Attribute
    - element.<attributeName> = <value>

  - Special attribute
    - element.style = <styleObject>
    - element.style.<propertyName> = <value>
    - element.className
    - element.classList.add()
    - element.classList.remove()
    - element.classList.toggle()
    - element.classList.contains()
    - element.dataset
    - element.dataset.<name> = <value>

  - Properties
    - element.offsetWidth
    - element.offsetHeight
    - element.offsetTop
    - element.offsetLeft
    - element.clientWidth
    - element.clientHeight
    - element.scrollWidth
    - element.scrollHeight
    - element.scrollTop
    - element.scrollLeft

  - Methods
    - element.getBoundingClientRect()
    - element.scrollIntoView()
    - window.scrollTo()

- Media element
  - img
  - audio
  - video
    - src
    - controls
    - autoplay
    - loop
    - muted
    - poster
    - duration
    - currentTime
    - volume
    - muted
    - play()
    - pause()
    - load()
  - iframe

- Form element
  - form
    - elements
    - reset()
    - submit()
    - new FormData(form)
  - input
    - value
    - focus()
  - textarea
  - select
  - option
  - button
    - click()

## Create DOM element

- document.createElement()
- document.createAttribute()
- document.createTextNode()
- document.createDocumentFragment()
- element.append
- element.prepend
- element.insertAdjacentHTML

## Delete DOM element

- parent.removeChild(child);
- child.remove();

## DOM Events

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

### Dispatch event

- new Event()
- new CustomEvent()
- element.dispatchEvent()
