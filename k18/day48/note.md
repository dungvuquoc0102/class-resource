# Day 48: useReducer, useRef, Custom Hooks

## useReducer

### Ý tưởng

`useReducer` là Hook để **quản lý state phức tạp** — thay vì `useState` với một giá trị đơn, bạn dùng `useReducer` khi state có **nhiều sub-values** hoặc **thay đổi liên kết** nhau. Nó tuân theo mô hình **reducer** từ Redux: `action` được gửi đi, `reducer` hàm lọc action và trả lại state mới.

**Khi dùng?**

- State phức tạp: form có nhiều field, bộ đếm với hành động (+, −, reset)
- Các thay đổi state liên quan nhau
- Muốn logic thay đổi state tập trung ở một chỗ (hàm reducer)
- Cần truyền logic xuống nhiều component con (thay vì callback từng hành động)

### Cú pháp cơ bản

```javascript
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>
        Count: {state.count}, Step: {state.step}
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>−</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <input
        type="number"
        value={state.step}
        onChange={(e) =>
          dispatch({ type: "SET_STEP", payload: Number(e.target.value) })
        }
      />
    </div>
  );
}
```

### Ưu điểm

- **Tập trung logic**: Mọi thay đổi state nằm trong hàm `reducer` duy nhất → dễ debug, dễ test
- **Dễ mở rộng**: Thêm hành động (action type) mới mà không làm rối component
- **Truyền callback**: Gọi `dispatch` và action, không cần truyền callback từng cái

### Lazy initialization

Nếu state phụ thuộc vào props hoặc tính toán phức tạp, dùng **init function**:

```javascript
function Counter({ initialCount }) {
  function init(initial) {
    return { count: initial * 2, status: "idle" };
  }

  const [state, dispatch] = useReducer(reducer, initialCount, init);
  // ...
}
```

---

## useRef

### Ý tưởng

`useRef` tạo một **reference lâu dài** sống qua nhiều lần render — không như state, thay đổi ref **không gây re-render**. Dùng để:

1. **Lưu DOM node** trực tiếp (focus input, play video, …)
2. **Lưu giá trị thay đổi** mà không cần render lại (bộ đếm từng tích, timeout ID, …)
3. **Lưu instance trước đó** để so sánh

### Lưu DOM node

```javascript
function TextInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus input</button>
    </>
  );
}
```

### Lưu giá trị không render

```javascript
function StopWatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}
```

### So sánh ref vs state

| Vấn đề           | `useState`                          | `useRef`                            |
| ---------------- | ----------------------------------- | ----------------------------------- |
| Cập nhật trigger | Gây re-render                       | Không gây re-render                 |
| Giá trị          | Bất biến (immutable)                | Có thể thay đổi trực tiếp (mutable) |
| Truy cập giá trị | Trực tiếp biến trong closure        | Qua `.current`                      |
| Dùng cho         | UI state (count, text, visibility…) | DOM, interval ID, instance lưu trữ  |

### Lưu ý

```javascript
function Example() {
  const ref = useRef(null);

  // ref.current thay đổi trong render
  // (có thể gặp bug khó chẩn đoán)
  if (ref.current === null) {
    ref.current = new DataManager();
  }

  // Dùng useCallback/useMemo hoặc lấy lần đầu
  useEffect(() => {
    if (ref.current === null) {
      ref.current = new DataManager();
    }
  }, []);

  // ...
}
```

---

## Custom Hooks

### Ý tưởng

Custom Hook là **hàm JavaScript** bắt đầu với `use` — kết hợp các Hook (useState, useEffect, useRef…) **rút gọn logic lặp lại** giữa các component. Tuân theo **React Hook Rules**:

1. Chỉ gọi Hook từ **React component** hoặc **custom hook** (không gọi từ hàm thường)
2. Gọi Hook ở **top level** (không gọi trong vòng lặp, điều kiện)

### Ví dụ đơn giản: `useToggle`

```javascript
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(!value);

  return [value, toggle];
}

function LightSwitch() {
  const [isOn, toggle] = useToggle(false);

  return (
    <div>
      <p>Light is {isOn ? "ON" : "OFF"}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
```

### `useForm` — Quản lý form

```javascript
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setValues(initialValues);

  return {
    values,
    handleChange,
    reset,
  };
}

function LoginForm() {
  const { values, handleChange, reset } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit:", values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### `useFetch` — Lấy dữ liệu

```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

function UserProfile({ userId }) {
  const {
    data: user,
    loading,
    error,
  } = useFetch(`https://api.example.com/users/${userId}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{user && <h1>{user.name}</h1>}</div>;
}
```

### `useLocalStorage` — Lưu vào localStorage

```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

function UserTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}
```

### `useAsync` — Quản lý async logic

```javascript
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    setValue(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}

function DataFetcher() {
  const { status, value, error, execute } = useAsync(
    () => fetch("/api/data").then((res) => res.json()),
    true,
  );

  return (
    <div>
      {status === "pending" && <p>Loading...</p>}
      {status === "success" && <pre>{JSON.stringify(value, null, 2)}</pre>}
      {status === "error" && <p>Error: {error.message}</p>}
      <button onClick={execute}>Retry</button>
    </div>
  );
}
```

### Quy tắc đặt tên

Tên Custom Hook **phải bắt đầu bằng `use`** — React sử dụng quy ước này để **tự động kiểm tra Hook Rules** (qua ESLint plugin). Nếu tên không `use`, ESLint sẽ cảnh báo hoặc IDE cảnh báo lỗi.

```javascript
// ✅ Đúng
function useCounter() { ... }
function useWindowWidth() { ... }

// ❌ Sai (ESLint sẽ cảnh báo)
function getCounter() { ... }
function getUserData() { ... }
```

---

## So sánh: useState vs useReducer vs useRef

| Tính chất        | `useState`                             | `useReducer`                         | `useRef`                               |
| ---------------- | -------------------------------------- | ------------------------------------ | -------------------------------------- |
| **Mục đích**     | Quản lý state đơn giản                 | State phức tạp, nhiều hành động      | Lưu giá trị, DOM node, không re-render |
| **Re-render**    | Có (cập nhật state)                    | Có (cập nhật state)                  | Không                                  |
| **Cách sử dụng** | `const [val, setVal] = useState(init)` | `const [s, d] = useReducer(r, init)` | `const ref = useRef(init)`             |
| **Thay đổi**     | Immutable (gọi hàm set)                | Dispatch action → reducer            | Trực tiếp `.current`                   |

---

## Bài tập

### Bài 1: useReducer - Quản lý shopping cart

Tạo một component `ShoppingCart` quản lý giỏ hàng với các action:

- `ADD_ITEM`: Thêm sản phẩm (name, price, quantity)
- `REMOVE_ITEM`: Xóa sản phẩm theo ID
- `UPDATE_QUANTITY`: Cập nhật số lượng sản phẩm
- `CLEAR_CART`: Xóa toàn bộ giỏ hàng

**Yêu cầu:**

- Hiển thị danh sách sản phẩm trong giỏ
- Hiển thị tổng giá
- Có nút Add, Remove, Clear, và ô input để thay đổi số lượng

```javascript
// Gợi ý
const initialState = { items: [], total: 0 };

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      // Cộng thêm item vào state.items
      // Cập nhật total
      return { ...state, items: [...state.items, ...], total: ... };
    // ... các case khác
  }
}
```

### Bài 2: useRef - Video player

Tạo một component `VideoPlayer` với các tính năng:

- Nút Play/Pause
- Slider để seek video
- Hiển thị thời gian hiện tại / tổng thời gian
- Nút Full screen

**Yêu cầu:**

- Dùng `useRef` để lưu DOM reference của `<video>`
- Không dùng event listener HTML, dùng ref để gọi method (`play()`, `pause()`, `currentTime`)

```javascript
function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  // ...
}
```

### Bài 3: Custom Hook - useDebounce

Tạo custom hook `useDebounce` để **trì hoãn** việc gọi hàm cho đến khi user **dừng gõ** (thường dùng cho search).

**Yêu cầu:**

- Hook nhận 2 params: `value` (giá trị hiện tại) và `delay` (thời gian trì hoãn, ms)
- Trả về giá trị đã debounce
- Dùng `useEffect` và `useRef` để lưu timeout

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  // ...
  return debouncedValue;
}

// Sử dụng
function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    console.log("Tìm kiếm:", debouncedTerm); // Chỉ chạy khi dừng gõ 500ms
  }, [debouncedTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Gõ để tìm..."
    />
  );
}
```

### Bài 4: useReducer + Custom Hook - useLocalStorage Form

Kết hợp `useReducer` và Custom Hook để tạo form login với tính năng:

- Lưu dữ liệu vào `localStorage` tự động
- Có nút "Restore" để phục hồi data từ localStorage
- Có nút "Clear" để xóa

**Yêu cầu:**

- Tạo custom hook `useFormWithStorage(key, initialValues)` kết hợp `useReducer`
- Dùng `useEffect` để lưu vào localStorage mỗi khi form thay đổi
- Trả về: `{ values, dispatch, restore, clear }`

```javascript
function useFormWithStorage(storageKey, initialValues) {
  const [values, dispatch] = useReducer(formReducer, () => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : initialValues;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(values));
  }, [values, storageKey]);

  const clear = () => localStorage.removeItem(storageKey);
  const restore = () => {
    const stored = localStorage.getItem(storageKey);
    // Dispatch action để restore
  };

  return { values, dispatch, clear, restore };
}
```

### Bài 5: useRef + useEffect - Focus Management

Tạo component `TodoList` với:

- Input để thêm todo
- List todos
- Tự động focus vào input sau khi thêm todo
- Dùng ref để lưu reference của input

**Yêu cầu:**

- Sau khi nhấn "Add", input phải được focus lại tự động
- Dùng `useEffect` + `useRef` để gọi `.focus()`

```javascript
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleAdd = () => {
    setTodos([...todos, input]);
    setInput("");
    // Focus vào input sau khi add
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]); // Chạy sau mỗi khi todos thay đổi

  return (
    <div>
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Bài 6: Custom Hook - usePrevious

Tạo custom hook `usePrevious` để **lưu giá trị trước đó** của một variable.

**Yêu cầu:**

- Dùng `useRef` để lưu giá trị cũ
- Dùng `useEffect` để update ref mỗi khi value thay đổi
- Trả về giá trị trước đó

```javascript
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value; // Lưu giá trị hiện tại vào ref
  }, [value]);

  return ref.current; // Trả về giá trị lần trước (hoặc undefined lần đầu)
}

// Sử dụng
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Now: {count}</p>
      <p>Before: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```
