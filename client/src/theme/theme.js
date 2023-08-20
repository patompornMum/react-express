import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        // primary: red,
        activeColor: '#3c5363'
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        // primary: {
        //   main: '#33BBC5'
        // },
        activeColor: '#afd4ef'
    },
});