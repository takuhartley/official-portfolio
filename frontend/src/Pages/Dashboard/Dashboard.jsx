import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu'
import UserTable from '../../Components/UserTable/UserTable'
import ProjectTable from '../../Components/ProjectTable/ProjectTable'
import FiberNewRoundedIcon from '@mui/icons-material/FiberNewRounded'
import PingButton from '../../Components/PingButton/pingButton'
const drawerWidth = 240
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const mdTheme = createTheme()

function DashboardContent () {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <PingButton></PingButton>
      <div>
        <UserTable />
      </div>
      <div>
        <ProjectTable />
      </div>
    </>
  )
}

export default function Dashboard () {
  return <DashboardContent />
}
