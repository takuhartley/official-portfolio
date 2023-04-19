import React, { useContext } from 'react'
import { ThemeContext } from '../../App.js'
import Switch from '@mui/material/Switch'
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Switch
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white'
      }}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </Switch>
  )
}

export default ThemeToggleButton
