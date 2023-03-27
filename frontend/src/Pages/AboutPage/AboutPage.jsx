import React, { useEffect } from 'react'
import './AboutPage.scss'
import Container from '@mui/material/Container'
import DownloadIcon from '@mui/icons-material/Download'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Aos from 'aos'
import 'aos/dist/aos.css'

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <Container maxWidth='md' className='about-page-container'>
      <Box className='about-page-header' data-aos='fade-up'>
        <Typography variant='h4' className='about-page-header-title'>
          🌟 A little about me 🌟
        </Typography>
        <hr />
      </Box>
      <Grid container spacing={4} className='about-page-body'>
        <Grid item xs={12} sm={6} data-aos='fade-up'>
          <Typography variant='body1' className='about-page-main-body__text'>
            I have a passion for exploring a few main interests in depth. In
            actuality, I have a multitude of interests that I find it
            challenging to keep track of, and it's convenient to have them
            organized on my personal website.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} data-aos='fade-up'>
          <ul className='about-page-main-body__list'>
            <li>
              🌏 I enjoy venturing out and discovering new places, so you may
              run into me in Tokyo. However, I doubt you would recognize me.
            </li>
            <li>
              📷 I consider myself a photographer, but currently, I am unable to
              practice my craft as my camera is out of commission. Nonetheless,
              I have a collection of lenses that I still enjoy working with.
            </li>
            <li>
              🐟 I'm weirdly really into ichthyology and aquascaping or anything
              related to fresh water aquariums.
            </li>
            <li>
              🌱 Although I am not a botanist, I have a strong admiration for
              plants and consider myself a plantsman.
            </li>
          </ul>
        </Grid>
      </Grid>
      <Box className='about-page-second-body' data-aos='fade-up'>
        <Typography variant='h5' className='about-page-second-body__header'>
          ✨ Professional Interests ✨
        </Typography>
        <hr className='about-page-second-body__hr' />
        <Typography variant='body1' className='about-page-second-body__text'>
          I have a bunch of career-related interests, which mainly manifests in
          the form of occasional weekend book binges or you might start to see
          my work here on the Blog Page.
        </Typography>
        <ul className='about-page-second-body__list'>
          <li>🏘️ International Real Estate Investment Strategies</li>
          <li>₿ FinTech/Crypto/Blockchain</li>
          <li>🧠 Machine Learning/AI</li>
        </ul>
        <Typography variant='h6'>Personal Interests:</Typography>
        <ul className='about-page-second-body__list'>
          <li>Japanese Culture 👍</li>
          <li>🔥 Anime/Manga 🔥</li>
          <li>🧚💀 Pixel Art 💀🧚</li>
          <li>Aquaponics Systems</li>
          <li>👀 Working Out ❤️</li>
          <li>Skiing ⛷️/Snowboarding 🏂</li>
        </ul>
      </Box>
      <Box className='about-page-resume' data-aos='fade-up'>
        <Typography variant='h6'>Resume:</Typography>
        <a
          href='\Assets\Business-Analyst_Resume_v1.7_10302022.pdf'
          download='\Assets\Business-Analyst_Resume_v1.7_10302022.pdf'
        >
          <Tooltip title='Download Resume'>
            <DownloadIcon />
          </Tooltip>
        </a>
      </Box>
    </Container>
  )
}

export default About
