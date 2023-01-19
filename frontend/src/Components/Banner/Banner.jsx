import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import './Banner.scss'

const Banner = () => {
  return (
    <>
      <div className='banner-container'>
        <p className='banner-container__title'>Robert T. Hartley</p>
        <p className='banner-container__subtitle'>
          Hi there
          <span role='img' aria-label='Wave'>
            👋🏼
          </span>
          <br />
          I'm a Full-Stack Developer
          <span role='img' aria-label='Coding'>
            👨🏻‍💻
          </span>
          / Agile IT Business Analyst
          <span role='img' aria-label='Glasses'>
            👓
          </span>
        </p>
        <div className='banner-container__location'>
          Currently in Tokyo, Japan
          <span role='img' aria-label='Tokyo Tower'>
            🗼
          </span>
        </div>
        <Box mt={3} className='banner-container__button-wrapper'>
          <Link to='/about' className='banner-container__button-link'>
            <Button
              variant='outlined'
              color='primary'
              className='banner-container__button'
            >
              Add+
            </Button>
          </Link>
        </Box>
      </div>
    </>
  )
}

export default Banner
