import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    id: null,
    username: null,
    email: null,
    avatarUrl: null,
    bio: null,
  },

  profiles: [],

  followingMap: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
