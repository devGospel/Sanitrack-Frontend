import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isExpired: false,
};

const expiredSlice = createSlice({
  name: "expired",
  initialState,
  reducers: {
    setIsExpiredToken: (state, action) => {
      state.isExpired = action.payload;
    },
  },
});

export const { setIsExpiredToken, isExpired } = expiredSlice.actions;
export default expiredSlice.reducer;
