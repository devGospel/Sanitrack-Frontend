// idSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { editUserAction } from "./editUserAction";

const initialState = {
  editedUser: null,
  storedItem: null,
  storedId: null,
  storedWorkId:null,
  storedQr:null,
  storedIdx:null, 
  storedRoomId: null, 
  storedHour: null,

};

const idSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.storedId = action.payload;
    },
    setItem: (state, action) => {
      state.storedItem = action.payload;
    },


    setRoomId: (state, action) => { 
      state.storedRoomId = action.payload
    },

    setHour: (state, action) => { 
      state.storedHour = action.payload
    }, 

    setQr: (state, action) => {
      state.storedQr = action.payload;
    },
    setIdx: (state, action) => {
      state.storedIdx = action.payload;
    },
    setStoredWorkId: (state, action) => {
      state.storedWorkId = action.payload;
    },

    clearStoredWorkOrderDetails: (state) => { 
      state.storedWorkId = null,
      state.storedRoomId = null,
      state.storedHour = null, 
      state.storedItem = null
    },

    editUserReducer: (builder) => {
      builder.addcase(editUserAction.pending, (state, action) => {
        state.editedUser = action.payload;
      });
    },
  },
});

export const { editUserReducer, setItem, setId,setQr,setIdx,setStoredWorkId, setRoomId, setHour, clearStoredWorkOrderDetails } = idSlice.actions;
export default idSlice.reducer;
