import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem("mode") ?? 'light'
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setModeDark: (state) => {
            state.theme = 'dark'
            localStorage.setItem("mode", 'dark');
        },
        setModeLight: (state) => {
            state.theme = 'light'
            localStorage.setItem("mode", 'light');
        }
    },
});

// Action creators are generated for each case reducer function
export const { setModeDark, setModeLight } = themeSlice.actions;

export default themeSlice.reducer;