import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HomeIcon from '@mui/icons-material/Home'
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton'
import './Navigation.scss'
import { logout } from '../../Redux/Actions/userActions.js'
const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <>
      <div className='nav'>
        <ul>
          <li>
            <Link className='nav-link' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='/projects'>
              Projects
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='/blog-posts'>
              Blog
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='/about'>
              About
            </Link>
          </li>
          {userInfo ? (
            <li>
              <Link className='nav-link' to='dashboard'>
                Dashboard
              </Link>
            </li>
          ) : (
            <li>
              <Link className='nav-link' to='login'>
                Login
              </Link>
            </li>
          )}
          <li>
            <Link onClick={logoutHandler} className='nav-link'>
              Logout
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='playground'>
              Playground
            </Link>
          </li>
          <li>
            <ThemeToggleButton />
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navigation
