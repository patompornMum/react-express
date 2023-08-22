import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userOnline: {}
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        newOline: (state, action) => {
            state.userOnline = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const { newOline } = socketSlice.actions;

export default socketSlice.reducer;