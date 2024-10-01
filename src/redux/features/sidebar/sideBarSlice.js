import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarOpen: false
}

const sidebar = createSlice({
    name: 'sidebar',
   initialState,
    reducers: {
        setSidebarOpen: (state,action) => {
        state.sidebarOpen = action.payload;
      },
     
    }
});

export const {setSidebarOpen} = sidebar.actions;
export default sidebar.reducer;