import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu'
import UserTable from '../../Components/UserTable/UserTable'
import ProjectTable from '../../Components/ProjectComponents/ProjectTable/ProjectTable'
import FiberNewRoundedIcon from '@mui/icons-material/FiberNewRounded'
import Header from '../../Layout/Header/Header'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TryIcon from '@mui/icons-material/Try'
import PersonIcon from '@mui/icons-material/Person'
import BookIcon from '@mui/icons-material/Book'
import ImageIcon from '@mui/icons-material/Image'
import NewProjectComponent from '../../Components/ProjectComponents/NewProjectComponent/NewProjectComponent'
import ImageSetting from '../../Components/ImageComponents/ImageSetting/ImageSetting'
import CategoryComponent from '../../Components/CategoryComponents/CategoryComponent/CategoryComponent'
const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

function DashboardContent () {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [seleted, setSelected] = useState(false)
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='fixed' open={open}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap component='div'>
              Welcome {userInfo.firstName}
              <RouterLink to={`/projects/new`}>New Project</RouterLink>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box'
            }
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <RouterLink to={'images/upload'}>
                  <ListItemText primary='Home' />
                </RouterLink>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='User Setting' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TryIcon />
                </ListItemIcon>
                <ListItemText primary='Project Setting' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary='Blog Setting' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ImageIcon />
                </ListItemIcon>
                <RouterLink to={'/images'}>
                  <ListItemText primary='Image Setting' />
                </RouterLink>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <Main open={open}>
          <Container>
            <div>
              <NewProjectComponent />
            </div>
            <div>
              <CategoryComponent />
            </div>
            <div>
              <ImageSetting />
            </div>
            <div>
              <UserTable />
            </div>
            <div>
              <ProjectTable />
            </div>
          </Container>
        </Main>
      </Box>
    </>
  )
}

export default function Dashboard () {
  return <DashboardContent />
}
