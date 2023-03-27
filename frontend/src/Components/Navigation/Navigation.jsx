import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/Actions/userActions.js'
import { Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import FolderIcon from '@mui/icons-material/Folder'
import InfoIcon from '@mui/icons-material/Info'
import BookIcon from '@mui/icons-material/Book'
import Logo from '../Logo/Logo'

import './Navigation.scss'

const Navigation = () => {
  const [showSlider, setShowSlider] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  // Check if the viewport width is less than or equal to 768px
  useEffect(() => {
    const checkViewportWidth = () => setIsMobile(window.innerWidth <= 768)
    checkViewportWidth()
    window.addEventListener('resize', checkViewportWidth)
    return () => window.removeEventListener('resize', checkViewportWidth)
  }, [])

  const toggleSlider = () => {
    setShowSlider(!showSlider)
    if (!showSlider) {
      document.body.style.overflow = 'hidden'
      document.querySelector('.hamburger').classList.add('active')
    } else {
      document.body.style.overflow = 'unset'
      document.querySelector('.hamburger').classList.remove('active')
    }
  }

  const closeSlider = () => {
    setShowSlider(false)
  }

  const desktopNav = (
    <div className='desktop-nav'>
      <Link className='nav-link' to='/'>
        Home
      </Link>
      <Link className='nav-link' to='/about'>
        About
      </Link>
      <Link className='nav-link' to='/projects'>
        Projects
      </Link>
      <Link className='nav-link' to='/blog-posts'>
        Blog
      </Link>
      <Link className='nav-link' to='/dashboard'>
        Dashboard
      </Link>
      <Link
        className='nav-link'
        onClick={() => {
          logoutHandler()
          closeSlider()
        }}
      >
        Logout
      </Link>
    </div>
  )

  const mobileNav = (
    <div className={`mobile-nav ${showSlider ? 'show' : ''}`}>
      <Link
        className='nav-link'
        to='/'
        onClick={() => {
          closeSlider()
          toggleSlider()
        }}
      >
        <HomeIcon />
        <Box ml={'1rem'}>Home</Box>
      </Link>
      <Link
        className='nav-link'
        to='/about'
        onClick={() => {
          closeSlider()
          toggleSlider()
        }}
      >
        <InfoIcon />
        <Box ml={'1rem'}>About</Box>
      </Link>
      <Link
        className='nav-link'
        to='/projects'
        onClick={() => {
          closeSlider()
          toggleSlider()
        }}
      >
        <FolderIcon />
        <Box ml={'1rem'}>Projects</Box>
      </Link>
      <Link
        className='nav-link'
        to='/blog-posts'
        onClick={() => {
          closeSlider()
          toggleSlider()
        }}
      >
        <BookIcon />
        <Box ml={'1rem'}>Blog</Box>
      </Link>
      <Link
        className='nav-link'
        to='/dashboard'
        onClick={() => {
          closeSlider()
          toggleSlider()
        }}
      >
        <DashboardIcon />
        <Box ml={'1rem'}>Dashboard</Box>
      </Link>
      <Link
        className='nav-link'
        onClick={() => {
          logoutHandler()
          closeSlider()
        }}
      >
        <LogoutIcon />
        <Box ml={'1rem'}>Logout</Box>
      </Link>
    </div>
  )

  return (
    <>
      <div className='navbar'>
        <div className='logo-container'>
          <Logo />
        </div>
        {isMobile ? (
          <>
            <div
              onClick={toggleSlider}
              className={`hamburger ${showSlider ? 'active' : ''}`}
            >
              <span className='bar'></span>
              <span className='bar'></span>
              <span className='bar'></span>
            </div>
            {mobileNav}
          </>
        ) : (
          <>{desktopNav}</>
        )}
      </div>
    </>
  )
}

export default Navigation
