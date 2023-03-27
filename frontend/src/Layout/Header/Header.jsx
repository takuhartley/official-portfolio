import React from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import './Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;