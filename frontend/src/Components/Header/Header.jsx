import React from 'react'
import Navigation from './Navigation/Navigation'
import Logo from './Logo/Logo'
import './Header.scss'
const Header = () => {
  return (
    <>
      <div className='header'>
        <div className='header-logo'>
          <Logo />
        </div>
        <div className='header-navigation'>
          <Navigation />
        </div>
      </div>
    </>
  )
}

export default Header
