import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  disputeSearch: false,
};

const disputeSlice = createSlice({
  name: "dispute",
  initialState,
  reducers: {
    setDisputeSlice: (state, action) => {
      state.disputeSearch = action.payload;
    },
  },
});

export const { setDisputeSlice, disputeSearch } = disputeSlice.actions;
export default disputeSlice.reducer;
