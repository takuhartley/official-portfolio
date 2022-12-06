import React from 'react'
import Navigation from './Navigation/Navigation'
import Logo from './Logo/Logo'
import './Header.scss'
const Header = () => {
  return (
    <>
      <div className='header'>
        <Logo />
        <Navigation />
      </div>
    </>
  )
}

export default Header
