import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  currentUser: null,
  authStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 1. Cập nhật Token khi Đăng nhập/Đăng ký thành công
    setCredentials: (state, action) => {
      // action.payload: { accessToken, user }
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.authError = null;
      state.status = "succeeded";

      // *Lưu ý: Bạn có thể dispatch action riêng để cập nhật currentUser vào profileSlice*
      // Ví dụ: dispatch(profileActions.setCurrentUser(action.payload.user))
    },

    // 2. Xử lý Đăng xuất
    logOut: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.authError = null;
      // Dọn dẹp cả state người dùng hiện tại (nếu cần)
      // *Lưu ý: Cần clear profile data thông qua dispatch action của profileSlice*
    },

    // 3. Xử lý lỗi xác thực
    setAuthError: (state, action) => {
      state.authError = action.payload; // Ví dụ: 'Invalid credentials'
      state.status = "failed";
    },

    // 4. Reset trạng thái
    resetAuthStatus: (state) => {
      state.status = "idle";
      state.authError = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
