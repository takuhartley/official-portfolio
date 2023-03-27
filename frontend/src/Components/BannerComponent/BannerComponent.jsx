import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { FaMediumM, FaLinkedinIn, FaGithub } from 'react-icons/fa'

import './BannerComponent.scss'

const Banner = () => {
  return (
    <div className='banner-container'>
      <Typography
        variant='h4'
        component='h1'
        className='banner-container__tagline'
      >
        Exploring the Boundaries of Technology
      </Typography>
      <Typography
        variant='h3'
        component='h2'
        className='banner-container__title'
      >
        Robert Hartley
      </Typography>
      <Typography
        variant='h5'
        component='h3'
        className='banner-container__subtitle'
      >
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
      <Typography
        variant='subtitle2'
        component='h4'
        className='banner-container__location'
      >
        Currently in Tokyo, Japan
        <span role='img' aria-label='Tokyo Tower'>
          🗼
        </span>
      </Typography>
      <Box mt={3} className='banner-container__button-wrapper'>
        <Link to='/about' className='banner-container__button-link'>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className='banner-container__button'
          >
            Learn more
          </Button>
        </Link>
      </Box>
      <Box mt={3} className='banner-container__social-icons'>
        <a
          href='https://github.com/takuhartley'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithub className='social-icon' />
        </a>
        <a
          href='https://www.linkedin.com/in/robin-hartley/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaLinkedinIn className='social-icon' />
        </a>
        <a
          href='https://medium.com/@robin.taku.hartley'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaMediumM className='social-icon' />
        </a>
      </Box>
      <div className='banner-container__illustration'></div>
    </div>
  )
}

export default Banner
