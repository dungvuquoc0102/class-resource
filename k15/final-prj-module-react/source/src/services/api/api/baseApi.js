import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Hàm lấy token từ state Redux (hoặc localStorage)
const getAuthToken = () => {
  // Logic thực tế nên lấy từ Redux Store hoặc LocalStorage
  return localStorage.getItem("accessToken");
};

export const baseApi = createApi({
  // Tên key cho slice này trong Redux store (e.g., state.api)
  reducerPath: "baseApi",

  // Cấu hình Base Query (giống như axiosClient)
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.your-app.com/v1",
    prepareHeaders: (headers, { getState }) => {
      // 1. Lấy token và đính kèm vào header Authorization
      const token = getAuthToken(); // Hoặc: getState().auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // Các tags để quản lý caching (Ví dụ: 'User', 'Post')
  tagTypes: ["User", "Profile", "Post", "Comment"],

  // Khởi tạo các endpoints. Ta sẽ tiêm chúng sau.
  endpoints: () => ({}),
});
