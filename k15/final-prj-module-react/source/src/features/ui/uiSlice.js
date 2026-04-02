import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 1. Trạng thái Theme (thêm vào đây)
  theme: "light", // Giá trị có thể là 'light', 'dark', hoặc 'system'

  // 2. Trạng thái Loading chung
  isLoading: false,

  // 3. Trạng thái Sidebar/Menu
  isSidebarOpen: false,

  // 4. Trạng thái Toast/Snackbar (Thông báo)
  toast: {
    isOpen: false,
    message: null,
    severity: "info",
    duration: 3000,
  },

  // ... các trạng thái UI khác
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // REDUCER MỚI: Quản lý trạng thái Theme
    setTheme: (state, action) => {
      // action.payload sẽ là 'light' hoặc 'dark'
      state.theme = action.payload;

      // *** Mẹo: Thêm logic lưu vào Local Storage ở đây nếu cần ***
      // Ví dụ: localStorage.setItem('app-theme', action.payload);
    },

    // ... các reducers cũ khác
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    showToast: (state, action) => {
      // Logic hiển thị toast
      state.toast.isOpen = true;
      state.toast.message = action.payload.message;
      state.toast.severity = action.payload.severity;
    },
    // ...
  },
});

export const {
  setTheme, // Xuất action mới
  setLoading,
  toggleSidebar,
  showToast,
  hideToast,
} = uiSlice.actions;

export default uiSlice.reducer;
