# Day 38

## Performance optimization component

### Component parent - children

- Parent re-render -> children re-render => solution: memo
- Parent re-render -> Function as a prop of children re-declaration -> children re-render => solution: useCallback

### Component

- Heavy logic in component -> re-render -> slow => solution: useMemo

## Pattern optimization component

### Component use imperative handle

- Focus, blur, scroll, getBoundingClientRect, play, pause => ref

### Component use expose handle

- Parent use children -> children expose all functions to parent => solution: useImperativeHandle

### Component reuse logic

- Custom hook
