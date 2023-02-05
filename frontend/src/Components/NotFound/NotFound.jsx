import React from 'react'
import './NotFound.scss'
const NotFound = () => {
  return (
    <div className='not-found'>
      <h1 className='error-message'>404 Error</h1>
      <p className='error-description'>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  )
}

export default NotFound
