import React from 'react'
import Navigation from './Navigation/Navigation'
import Logo from './Logo/Logo'
import './Header.scss'
const Header = () => {
  return (
    <>
      <div className='header'>
        <div className='header__logo'>
          <Logo />
        </div>
        <div className='header__navigation'>
          <Navigation />
        </div>
      </div>
    </>
  )
}

export default Header
