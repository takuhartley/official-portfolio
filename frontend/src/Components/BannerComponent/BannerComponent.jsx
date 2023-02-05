import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import './BannerComponent.scss'

const Banner = () => {
  return (
    <>
      <div className='banner-container'>
        <Typography variant='h2' className='banner-container__title'>
          Robert Hartley
        </Typography>
        <Typography variant='h4' className='banner-container__subtitle'>
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
        </Typography>
        <Typography variant='subtitle1' className='banner-container__location'>
          Currently in Tokyo, Japan
          <span role='img' aria-label='Tokyo Tower'>
            🗼
          </span>
        </Typography>
        <Box mt={3} className='banner-container__button-wrapper'>
          <Link to='/about' className='banner-container__button-link'>
            <Button
              variant='outlined'
              color='primary'
              className='banner-container__button'
            >
              Learn more
            </Button>
          </Link>
        </Box>
      </div>
    </>
  )
}

export default Banner
