import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import DashboardIcon from '@mui/icons-material/Dashboard'
import './Navigation.scss'
import { logout } from '../../Redux/Actions/userActions.js'
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
  }
  return (
    <>
      <div className='navbar'>
        <div className='hamburger-menu' onClick={toggleSlider}>
          <div className={`line ${showSlider ? 'close' : ''}`}></div>
          <div className={`line ${showSlider ? 'close' : ''}`}></div>
        </div>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link className='nav-link' to='/' onClick={toggleSlider}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/projects' onClick={toggleSlider}>
              Projects
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/blog-posts' onClick={toggleSlider}>
              Blog
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/about' onClick={toggleSlider}>
              About
            </Link>
          </li>
          {userInfo ? (
            <>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  to='dashboard'
                  onClick={toggleSlider}
                >
                  <DashboardIcon />
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  onClick={() => {
                    logoutHandler()
                    toggleSlider()
                  }}
                  className='nav-link'
                >
                  <LogoutIcon />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item'>
                <Link className='nav-link' to='login' onClick={toggleSlider}>
                  <LoginIcon />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}

export default Navigation
