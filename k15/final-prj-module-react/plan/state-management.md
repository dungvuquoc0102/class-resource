# State management

## 1. Cấu trúc thư mục để thiết lập Redux Toolkit

```
src/
├── app/
│   └── store.js
└── features/
    ├── auth/
    │   └── authSlice.js
    └── theme/
        └── themeSlice.js
```

## 2. Khởi tạo Redux Store (store.js)

```javascript
// ...

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});
```

## 3. Cung cấp store cho toàn ứng dụng (main.js)

```javascript
// ...

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
```

## 4. Định nghĩa các State Slices

### 4.1. Theme Slice (themeSlice.js)

```javascript
// features/theme/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// 1. Cập nhật initialState: Có thể đặt là 'light' hoặc 'system' tùy ý
const initialState = {
  mode: "light", // Giá trị có thể là 'light', 'dark', hoặc 'system'
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      // Chỉ cho phép các giá trị hợp lệ
      const validModes = ["light", "dark", "system"];
      if (validModes.includes(action.payload)) {
        state.mode = action.payload;
      } else {
        state.mode = "light"; // Mặc định về 'light' nếu giá trị không hợp lệ
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
```

### 4.2. Auth Slice (authSlice.js)

```javascript
// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      // Cập nhật trạng thái xác thực
      state.isAuth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
```

## 5. Sử dụng State trong Components

## 5.1. State theme

- Component cho phép người dùng chọn chế độ giao diện (Light, Dark, System):

```javascript
// ThemeSelector.jsx
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../features/theme/themeSlice";
import { SunIcon, MoonIcon, LaptopIcon } from "@radix-ui/react-icons";
import React from "react";

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  // Class chung áp dụng cho mọi tùy chọn
  const defaultClass =
    "flex items-center cursor-pointer px-3 py-2 rounded-lg border transition-all duration-200";

  // Class cho trạng thái ACTIVE
  const activeClass =
    "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:border-blue-700 dark:hover:bg-blue-800 shadow-md";

  // Class cho trạng thái KHÔNG ACTIVE
  const inactiveClass =
    "border-gray-300 text-gray-700 bg-white hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700";

  const themeOptions = [
    { mode: "light", icon: <SunIcon className="h-4 w-4" />, label: "Light" },
    { mode: "dark", icon: <MoonIcon className="h-4 w-4" />, label: "Dark" },
    {
      mode: "system",
      icon: <LaptopIcon className="h-4 w-4" />,
      label: "System",
    },
  ];

  const handleSetTheme = (mode) => {
    // Chỉ dispatch nếu chế độ thay đổi
    if (mode !== themeMode) {
      dispatch(setTheme(mode));
    }
  };

  return (
    // Container bao ngoài
    <div
      className="flex max-w-max gap-2 rounded-xl bg-gray-50 p-1 shadow-inner dark:bg-gray-900"
      aria-label="Theme Selection"
    >
      {themeOptions.map(({ mode, icon, label }) => {
        const isActive = themeMode === mode;

        // Kết hợp default class với active/inactive class
        const combinedClassName = `${defaultClass} ${isActive ? activeClass : inactiveClass}`;

        return (
          <div
            key={mode}
            onClick={() => handleSetTheme(mode)}
            className={combinedClassName}
            aria-pressed={isActive} // Dùng cho khả năng truy cập (Accessibility)
            title={`Set theme to ${label}`} // Tooltip
          >
            {icon}
            <span className="ml-1 text-sm font-medium whitespace-nowrap">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ThemeSelector;
```

- Component áp dụng theme dựa trên Redux State:

```javascript
// ThemeWrapper.jsx
// ...
```

## 5.2. State auth

### 5.2.1. Component kiểm soát xác thực

```javascript
// AuthenticationControls.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authSlice";
// Giả định bạn có hook từ RTK Query API, đã được export từ file service
import { useGetUserProfileQuery } from "../services/userApi";

const AuthenticationControls = () => {
  const dispatch = useDispatch();

  // 1. Đọc trạng thái xác thực từ Auth Slice (Redux State)
  const isAuth = useSelector((state) => state.auth.isAuth);

  // 2. Sử dụng RTK Query Hook để lấy dữ liệu user
  // skipToken: Chỉ fetch data khi isAuth là TRUE. Nếu isAuth là FALSE, hook sẽ skip
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetUserProfileQuery(undefined, { skip: !isAuth });

  // Lấy tên người dùng (giả định object profile có thuộc tính 'name')
  const userName = profile?.name || "Người dùng";

  // Giả định hàm/hook mở Modal Đăng nhập (vẫn giữ nguyên)
  const openLoginModal = () => console.log("Mở Modal Đăng nhập...");

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    // 1. Thực hiện các bước Đăng xuất:
    //    a) Xóa token khỏi Cookie/Local Storage (Logic này thường nằm trong Redux Thunk/Saga/Listener)
    //    b) Gọi API /logout (tùy chọn)

    // 2. Cập nhật trạng thái Redux:
    dispatch(setAuth(false));
    console.log(
      "Đã đăng xuất. State Redux và RTK Query cache đã bị xóa/invalide.",
    );
  };

  // Hàm xử lý khi nhấn nút Đăng nhập (chỉ mở modal)
  const handleOpenLogin = () => {
    openLoginModal();
  };

  return (
    <div>
      {/* Hiển thị dựa trên trạng thái xác thực */}
      {isAuth ? (
        // --- Đã Đăng nhập ---
        <div>
          {/* Sử dụng userName lấy từ RTK Query */}
          <p>
            Xin chào, <span>{userName}</span>!
          </p>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      ) : (
        // --- Chưa Đăng nhập ---
        <div>
          <p>Bạn chưa đăng nhập.</p>
          <button onClick={handleOpenLogin}>Đăng nhập</button>
        </div>
      )}
    </div>
  );
};

export default AuthenticationControls;
```

### 5.2.2. Component hiển thị nội dung dựa trên xác thực

```javascript
// ProtectedContent.jsx
import React from "react";
import { useSelector } from "react-redux";

const ProtectedContent = () => {
  // Đọc trạng thái isAuth hiện tại
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    // Nếu chưa xác thực, không hiển thị nội dung bảo mật
    return (
      <div>
        <p>Vui lòng đăng nhập để xem nội dung bảo mật.</p>
      </div>
    );
  }

  return (
    <div>
      <p>Chào mừng! Bạn đã đăng nhập và có thể xem nội dung này.</p>
    </div>
  );
};

export default ProtectedContent;
```
