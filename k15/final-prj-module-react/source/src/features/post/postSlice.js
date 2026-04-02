import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detail: {
    postIdToEdit: "123",
    newPostDraft: { title: "...", content: "..." },
  },
  list: {
    currentFilter: "most_recent",
    currentSort: "asc",
    selectedPosts: ["456", "789"],
    scrollPosition: 450,
  },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = postSlice.actions;

export default postSlice.reducer;
