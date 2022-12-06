import React from 'react'
import Container from '@mui/material/Container' // import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import './Banner.scss'
const Banner = () => {
  return (
    <>
      <Container className='banner'>
        <p className='banner-title'>Robert T. Hartley</p>
        <p className='banner-subtitle'>
          Hi there{' '}
          <span role='img' aria-label='Wave'>
            👋🏼
          </span>{' '}
          I'm a Front-End Developer{' '}
          <span role='img' aria-label='Coding'>
            👨🏻‍💻
          </span>{' '}
          / Agile IT Business Analyst
        </p>
        <div className='banner-location'>
          Currently in Japan{' '}
          <span role='img' aria-label='Tokyo Tower'>
            🗼
          </span>
        </div>
      </Container>
    </>
  )
}

export default Banner
