// authExtraReducer.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";

// Define an async thunk to handle the logout action
  /**
 * @method logoutAsync - Handle logging out
  */
export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      deleteCookie("payslate-admin-token-1");
      redirect("/")
      window?.localStorage.clear()
     
      // Return any data if needed
      return { success: true };
    } catch (error) {
      // Handle errors if necessary

      throw error;
    }
  }
);

export default logoutAsync;
