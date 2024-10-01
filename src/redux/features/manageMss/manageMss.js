import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    manageOrders:[]
}

const manageMssSlice = createSlice({
    name: "manageMss", 
    initialState: initialState, 
    reducers: { 
        setManageMss: (state, action) => { 
            // console.log('bitch I called you????')
            state.manageOrders = action.payload
        }, 
        updateManageMss: (state, action) => {
            const updatedOrder = action.payload;
            const index = state.manageOrders.findIndex(order => order.workOrderId === updatedOrder.workOrderId);
            console.log('you belong to index', index)
            if (index !== -1) {
                state.manageOrders[index] = updatedOrder;
            }
        },
        clearManageMss: (state) => {
            state.manageOrders = [];
            console.log('manage Orders now', state.manageOrders)
        }
    }
})

export const {setManageMss, updateManageMss, clearManageMss} = manageMssSlice.actions

export default manageMssSlice.reducer