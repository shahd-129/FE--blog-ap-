// import React from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { useSelector } from 'react-redux';

// const CustomThemeProvider = ({ children }) => {
//     const darkMode = useSelector((state) => state.theme.darkMode); 

//     const theme = createTheme({
//         palette: {
//             mode: darkMode ? 'dark' : 'light',
//             primary: {
//                 main: '#1976d2',
//             },
//             background: {
//                 default: darkMode ? '#121212' : '#ffffff',
//                 paper: darkMode ? '#1d1d1d' : '#ffffff',
//             },
//             text: {
//                 primary: darkMode ? '#ffffff' : '#000000', 
//                 secondary: darkMode ? '#aaaaaa' : '#555555', 
//             },
//         },
//     });
    

//     return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
// };

// export default CustomThemeProvider;
