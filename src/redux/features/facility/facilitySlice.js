import { createSlice } from "@reduxjs/toolkit";

// Initial state, loaded from local storage if available

const initialState = {
  selectedFacilityId:typeof window !== "undefined"
  ? localStorage.getItem("facilityId")
  : null,
  selectedFacilityName:typeof window !== "undefined"
  ? localStorage.getItem("facilityName")
  : null
};

const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setSelectedFacilityId: (state, action) => {
      state.selectedFacilityId = action.payload;
      typeof window !== "undefined"
        ? localStorage.setItem("facilityId", action.payload)
        : null;
    },
    setSelectedFacilityName: (state, action) => {
      state.selectedFacilityName = action.payload;
      typeof window !== "undefined"
        ? localStorage.setItem("facilityName", action.payload)
        : null;
    },

    clearFacilityDetails:(state) => { 
      state.selectedFacilityId = null
      state.selectedFacilityName = null
    }
  },
});

export const { setSelectedFacilityId,setSelectedFacilityName, clearFacilityDetails } = facilitySlice.actions;

export default facilitySlice.reducer;
