import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './DashboardNavigation.scss'
import { logout } from '../../../Redux/Actions/userActions.js'
import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import BookIcon from '@mui/icons-material/Book'
import LabelIcon from '@mui/icons-material/Label'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const DashboardNavigation = () => {
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
      <div className='nav-container'>
        <ul className='nav-list'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              <HomeIcon />
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to=''>
              <DashboardIcon />
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='project-setting'>
              <AutoAwesomeIcon />
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='image-setting'>
              <PhotoCameraIcon />
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='blog-post-setting'>
              <BookIcon />
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='category-setting'>
              <LabelIcon />
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='user-setting'>
              <AccountCircleIcon />
            </Link>
          </li>
          <li className='nav-item'>
            <Link onClick={logoutHandler} className='nav-link'>
              <LogoutIcon />
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default DashboardNavigation
