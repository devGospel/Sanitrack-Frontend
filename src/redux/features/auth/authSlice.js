"use client";
import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";

import { logoutAsync } from "./logoutAction";
import { store } from "@/redux/store";

const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const token = user?.token ? user?.token : null;
const storedRoles = user?.user?.privileges ? user?.user?.privileges : null;
const initialState = {
  loading: false,
  user: user,
  userToken: token,
  error: null,
  success: false,
  priviliges:storedRoles
};

const authSlice = createSlice({
  
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    // login user
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
        state.userToken = null;
        state.priviliges = null;
        state.success = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = user;
        state.error = null;
        state.userToken = token;
        state.priviliges = storedRoles;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.userToken = null;
        state.priviliges = null;
        state.error = action.payload;
        state.success = false;
      });

    //logout user

    builder
      .addCase(logoutAsync.fulfilled, (state) => {
        state.userToken = null;
        state.user = null;
        // This will be triggered when the logoutAsync action is fulfilled
        // You can put any additional cleanup code here if needed
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.userToken = null;
        state.user = null;
        // This will be triggered if the logoutAsync action is rejected
        // Handle any errors here if needed
      });
  },
});
export default authSlice.reducer;
