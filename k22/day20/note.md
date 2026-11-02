# Day 20: Props, Event Handling, useState trong React, Thực hành game Tic Tac Toe

## Props

- Props (Properties) thuộc tính của Component, giúp truyền dữ liệu từ Component cha xuống Component con
- Props là read-only, không thể thay đổi trong Component con
- Cách truyền Props: `<ChildComponent propName={value} />`
- Cách nhận Props trong Component con: `function ChildComponent({ propName }) { ... }`
- Default Props: Có thể gán giá trị mặc định cho Props nếu không được truyền từ Component cha:

```javascript
function ChildComponent({ propName = 'default value' }) { ... }
```

## Xử lý sự kiện (Event Handling)

- Cú pháp bắt sự kiện: Dùng camelCase (ví dụ: `onClick`, `onChange`, `onSubmit`, `onKeyDown`)
- Truyền hàm xử lý (Event Handler): Truyền dưới dạng tham chiếu hàm `onClick={handleClick}`, **không** gọi hàm `onClick={handleClick()}`
- Truyền tham số vào Event Handler: Dùng Arrow Function `onClick={() => handleDelete(id)}`
- SyntheticEvent: Wrapper sự kiện chuẩn hóa của React giúp chạy đồng nhất trên mọi trình duyệt

## useState

Quản lý state trong component

- Không bị reset khi re-render
- Render lại component khi state thay đổi

```jsx
export default function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

## Thực hành game Tic Tac Toe
