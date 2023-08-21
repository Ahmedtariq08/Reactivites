import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#32163C',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#ab5600',
            // light: '#F5EBFF',
            // // dark: will be calculated from palette.secondary.main,
            // contrastText: '#47008F',
        },
    },
});

//purple: #2b072a
//mustard: #ea6e20
//deep blue: #050424