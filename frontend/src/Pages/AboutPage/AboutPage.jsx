import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import DownloadIcon from '@mui/icons-material/Download'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Aos from 'aos'
import 'aos/dist/aos.css'
import './AboutPage.scss'

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <Container maxWidth='md' className='about-page-container'>
      <Box className='about-page-header' data-aos='fade-up'>
        <Typography variant='h4' className='about-page-header-title'>
          A little about me
        </Typography>
        <hr />
        <Typography variant='h5' className='about-page-subtitle'>
          Hi, my name is Robert, and I'm from Washington. I studied Digital Tech
          at Washington State University.
        </Typography>
      </Box>
      <Grid container spacing={4} className='about-page-body'>
        <Grid item xs={12} sm={6} data-aos='fade-up'>
          <Typography variant='body1' className='about-page-main-body__text'>
            I'm passionate about cultivating a wide variety of plants, from
            succulents to exotic flowers. I find it rewarding to watch them grow
            and thrive under my care.
          </Typography>
          <Typography variant='body1' className='about-page-main-body__text'>
            In my free time, I love exploring new places and cultures. I'm
            especially fond of Japan and hope to visit again soon.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} data-aos='fade-up'>
          <ul className='about-page-main-body__list'>
            <li>
              📷 Photography is another passion of mine. I have a collection of
              lenses that I love working with, and I'm always looking for new
              ways to improve my skills.
            </li>
            <li>
              🐟 I have a fascination with fish and freshwater aquariums. I find
              the science of ichthyology and aquascaping fascinating, and I
              enjoy creating beautiful and healthy habitats for my aquatic pets.
            </li>
          </ul>
        </Grid>
      </Grid>
      <Box className='about-page-second-body' data-aos='fade-up'>
        <Typography variant='h5' className='about-page-second-body__header'>
          Professional Interests
        </Typography>
        <hr className='about-page-second-body__hr' />
        <Typography variant='body1' className='about-page-second-body__text'>
          I have a variety of career-related interests that I enjoy learning
          about in my spare time. I also hope to pursue some of them in the
          future.
        </Typography>
        <ul className='about-page-second-body__list'>
          <li>🏘️ International Real Estate Investment Strategies</li>
          <li>₿ FinTech/Crypto/Blockchain</li>
          <li>🧠 Machine Learning/AI</li>
        </ul>
        <Typography variant='h6'>Personal Interests:</Typography>
        <ul className='about-page-second-body__list'>
          <li>
            🎨 I love to express my creativity through drawing, painting, and
            other artistic mediums.
          </li>
          <li>
            📚 Reading is another favorite pastime of mine, and I enjoy a
            variety of genres, from science fiction to historical non-fiction.
          </li>
          <li>
            🎮 I also enjoy playing video games, both for entertainment and as a
            way to unwind after a long day.
          </li>
          <li>
            🚴‍♀️ Staying active is important to me, and I love to go cycling and
            hiking in my free time.
          </li>
          <li>
            🍲 Cooking and trying out new recipes is a hobby of mine, and I
            enjoy experimenting with different flavors and ingredients.
          </li>
          <li>
            🌍 I'm passionate about environmental conservation and
            sustainability, and I try to make eco-friendly choices in my daily
            life.
          </li>
        </ul>
      </Box>
      <Box className='about-page-links' data-aos='fade-up'>
        <Typography variant='h6' className='about-page-links__header'>
          Connect with me:
        </Typography>
        <ul className='about-page-links__list'>
          <li>
            <a href='[Link to social media profile]'>
              [Social media platform] Profile
            </a>
          </li>
          <li>
            <a href='[Link to photography portfolio]'>Photography Portfolio</a>
          </li>
          <li>
            <a href='[Link to personal blog]'>Personal Blog</a>
          </li>
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
