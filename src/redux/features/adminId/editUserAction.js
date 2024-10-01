"use client";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const editUserAction = createAsyncThunk(
  "editUser/editData",
  async (id, token) => {
    try {
      const result = await axios.put(`${baseUrl}/staff/info/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accessKey:
            "U2FsdGVkX1+Reb80FLsBqS0l90d4nYdWNohfrbSME+tMkSbv2Xb5nqLSacVmuG2+eMrAhXc3PT12NmsmQddGJdfdCHuDMOrPPq4p/lBRj3WWWtvLs56RF7EHhqY/qaiD19a95VDaGGrTyj+ZsGCKEg==",
        },
      });
    } catch (error) {}
  }
);
