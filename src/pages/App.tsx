import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { theme } from '../theme/Theme'
import AppRouter from '../router/AppRouter'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
