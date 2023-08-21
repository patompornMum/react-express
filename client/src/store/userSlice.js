import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info:[]
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state,action) => {
      state.info = action.payload
    },
    logout: (state) => {
      state.info = []
      // localStorage.clear()
      localStorage.removeItem('token')
    }
  },
});

// Action creators are generated for each case reducer function
export const { login, logout} = userSlice.actions;

export default userSlice.reducer;