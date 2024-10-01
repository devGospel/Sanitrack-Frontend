import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offset: 0,
};

const offsetSlice = createSlice({
  name: "offset",
  initialState,
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
});

export const { setOffset, offset } = offsetSlice.actions;
export default offsetSlice.reducer;
