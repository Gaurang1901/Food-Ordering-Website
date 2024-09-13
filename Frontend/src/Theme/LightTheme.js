import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode:"light",
        
        primary:{
            main:"#F4D9D0"
        },
        secondary:{
            main:"#D9ABAB"
        },
        light:{
            main:"#E7E8D8"
        },
        background:{
            main:"#D9ABAB",
            default:"#E7E8D8",
            paper:"C75B7A"
        },
        text:{
            primary:"#921A40",
        }
    }
})