import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/Actions/userActions.js'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import FolderIcon from '@mui/icons-material/Folder'
import InfoIcon from '@mui/icons-material/Info'
import BookIcon from '@mui/icons-material/Book'

const NavMenu = styled('ul')({
  display: 'flex',
  flexDirection: 'row',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'absolute',
  top: '5rem',
  right: 0,
  backgroundColor: '#4169E1',
  zIndex: 1,
  '& li': {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    margin: '0 1rem',
    '& a': {
      color: '#fff',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    padding: 0,
    backgroundColor: '#4169E1',
    zIndex: 2,
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease',
    '&.show': {
      transform: 'translateX(0%)'
    },
    '& li': {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      margin: '1rem 0',
      '& a': {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1.2rem',
        display: 'flex',
        alignItems: 'center',
        '& svg': {
          marginRight: '0.5rem'
        }
      }
    }
  }
})

const HamburgerMenu = styled('div')({
  display: 'block',
  cursor: 'pointer',
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  zIndex: 3,
  width: '30px',
  height: '30px',
  textAlign: 'center',
  '& .line': {
    width: '100%',
    height: '2px',
    backgroundColor: '#fff',
    margin: '5px',
    borderRadius: '5px',
    transition: 'all 0.3s ease'
  },
  '& .icon': {
    // Add the icon styles here
  },
  '&.close .line:nth-of-type(1)': {
    transform: 'rotateZ(-45deg) scaleX(0.75) translate(-10px, -3px)'
  },
  '&.close .line:nth-of-type(2)': {},
  '&.close .line:nth-of-type(3)': {
    transform: 'rotateZ(45deg) scaleX(0.75) translate(-10px, 3px)'
  },
  '&:hover': {
    cursor: 'pointer'
  }
})
const Navigation = () => {
  const [showSlider, setShowSlider] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }
  const toggleSlider = () => {
    setShowSlider(!showSlider)
    document.body.style.overflow = showSlider ? 'auto' : 'hidden'
    const hamburgerMenu = document.querySelector('.navbar .HamburgerMenu')
    if (hamburgerMenu) {
      hamburgerMenu.classList.toggle('close')
    }
  }
  return (
    <>
      <div className='navbar'>
        <HamburgerMenu
          onClick={toggleSlider}
          className={showSlider ? 'close' : ''}
        >
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </HamburgerMenu>
        <NavMenu className={`${showSlider ? 'show' : ''}`}>
          {userInfo ? (
            <>
              <Link
                className='nav-link desktop-nav'
                to='/'
                onClick={() => {
                  toggleSlider()
                }}
              >
                <HomeIcon />
              </Link>
              <Link
                className='nav-link desktop-nav'
                to='/about'
                onClick={() => {
                  toggleSlider()
                }}
              >
                <InfoIcon />
              </Link>

              <Link
                className='nav-link desktop-nav'
                to='/projects'
                onClick={() => {
                  toggleSlider()
                }}
              >
                <FolderIcon />
              </Link>
              <Link
                className='nav-link desktop-nav'
                to='/blog-posts'
                onClick={() => {
                  toggleSlider()
                }}
              >
                <BookIcon />
              </Link>
              <Link
                className='nav-link mobile-nav'
                to='/dashboard'
                onClick={() => {
                  toggleSlider()
                }}
              >
                <DashboardIcon />
              </Link>
              <Link
                className='nav-link mobile-nav'
                onClick={() => {
                  logoutHandler()
                  toggleSlider()
                }}
              >
                <LogoutIcon />
              </Link>
            </>
          ) : (
            <>
              <Link className='nav-link mobile-nav' to='/login'>
                <LoginIcon />
                <Box ml={1}>Login</Box>
              </Link>
              <Link className='nav-link desktop-nav' to='/login'>
                Login
              </Link>
            </>
          )}
        </NavMenu>
      </div>
    </>
  )
}

export default Navigation
