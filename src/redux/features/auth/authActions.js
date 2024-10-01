"use client";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
import { redirect } from "next/navigation";

// authActions.js

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
/**
 * @method userLogin - Handle User Login function
  */
export const userLogin = createAsyncThunk(
  "auth/fetchData",

  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${baseUrl}/auth/login`, data, {
        headers: {
          accessKey:
            "U2FsdGVkX1+Reb80FLsBqS0l90d4nYdWNohfrbSME+tMkSbv2Xb5nqLSacVmuG2+eMrAhXc3PT12NmsmQddGJdfdCHuDMOrPPq4p/lBRj3WWWtvLs56RF7EHhqY/qaiD19a95VDaGGrTyj+ZsGCKEg==",
        },
      });
      // store user's token in local storage
      if (result) {
        window?.localStorage.setItem("user", JSON.stringify(result.data.data));
        window?.localStorage.setItem("role", result.data.data.user.role);
        window?.localStorage.setItem("roleId", result.data.data.user.roleId);
        window?.localStorage.setItem("facilityName", result.data.data.user.facilityName);
        window?.localStorage.setItem("facilityId", result.data.data.user.facility);
        window?.localStorage.setItem("storedRoles", JSON.stringify(result?.data?.data?.user?.privileges));
      }
      if (result.data.data.token) {
        setCookie("payslate-admin-token-1", result.data.data.token);
      }
      // if (result?.data?.data?.user?.multiFactorAuth) {
      //   redirect("verify-multi-factor-auth");
      // }

      return result.data;
    } catch (error) {
      if (error.response.status === 400) {
        return rejectWithValue("Invalid Login details");
      }
    }
  }
);
