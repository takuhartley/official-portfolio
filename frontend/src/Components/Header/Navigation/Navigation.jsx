import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.scss'
const Navigation = () => {
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
            <Link className='nav-link' to='about'>
              About
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='dashboard'>
              Dashboard
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='login'>
              Login
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='logout'>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navigation
