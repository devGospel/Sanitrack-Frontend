"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import idReducer from "./features/adminId/adminSlice";
import sidebarReducer from "./features/sidebar/sideBarSlice"
import expiredReducer from"./features/expiredToken/expiredTokenSlice"
import disputeReducer from "./features/disputeSearch/disputeSearchSlice"
import offsetReducer from "./features/offset/offsetSlice"
import facilityReducer from './features/facility/facilitySlice'

import manageMssReducer from "./features/manageMss/manageMss";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    id: idReducer,
    sidebar: sidebarReducer,
    expiredToken:expiredReducer,
    dispute:disputeReducer,
    offset:offsetReducer,
    facility:facilityReducer, 
    
    manageMss: manageMssReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
