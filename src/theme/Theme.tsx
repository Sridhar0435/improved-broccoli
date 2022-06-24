import { createTheme } from '@material-ui/core'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#004e37',
      light: '#99b8af',
      dark: '#004631',
      contrastText: '#f2f5f4',
    },
    secondary: {
      main: '#fcbc00',
      light: '#fde499',
      dark: '#e2a800',
      contrastText: '#fefbf2',
    },
    error: {
      main: '#d70926',
      light: '#ef9ca8',
      dark: '#810516',
      contrastText: '#c10822',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
})
