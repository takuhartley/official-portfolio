import React from 'react'
import './AboutPage.scss'
import { Container } from '@mui/material'
const About = () => {
  return (
    <Container maxWidth='sm' className='about-page-container'>
      <div className='about-page-header'>
        <h1 className='about-page-header-title'>A little about me</h1>
        <hr />
      </div>
      <div className='about-page-body'>
        <p className='about-page-main-body__text'>
          I have a passion for exploring a few main interests in depth. In
          actuality, I have a multitude of interests that I find it challenging
          to keep track of, and it's convenient to have them organized on my
          personal website.
        </p>
        <ul className='about-page-main-body__list'>
          <li>
            I enjoy venturing out and discovering new places, so you may run
            into me in Tokyo. However, I doubt you would recognize me.
          </li>
          <li>
            I consider myself a photographer, but currently I am unable to
            practice my craft as my camera is out of commission. Nonetheless, I
            have a collection of lenses that I still enjoy working with.
          </li>
          <li>
            I'm weirdly really into ichthyology and aquascaping or anything
            related to fresh water aquariums
          </li>
          <li>
            Although I am not a botanist, I have a strong admiration for plants
            and consider myself a plantsman.
          </li>
        </ul>
      </div>
      <div className='about-page-second-body'>
        <h3 className='about-page-second-body__header'>
          ✨ Professional Interests ✨
        </h3>
        <hr className='about-page-second-body__hr' />
        <p className='about-page-second-body__text'>
          I have a bunch of career-related interests, which mainly manifests in
          the form of occasional weekend book binges or you might start to see
          my work here on the Blog Page.
        </p>
        <ul className='about-page-second-body__list'>
          <li>🏘️ International Real Estate Investment Strategies</li>
          <li>₿ FinTech/Crypto/Blockchain</li>
          <li>🧠 Machine Learning/AI</li>
        </ul>
        <ul className='about-page-second-body__list'>
          <li>😂Japanese Culture👍</li>
          <li>🔥Anime/Manga🔥</li>
          <li>🧚💀Pixel Art💀🧚</li>
          <li>😍Animals 🐻🥰</li>
          <li>👀Working Out❤️</li>
          <li>⭐Gym✔️</li>
          <li>Skiing⛷️/Snowboarding</li>
        </ul>
      </div>
      <div className='about-page-second-body'>
        <a
          href='\Assets\Business-Analyst_Resume_v1.7_10302022.pdf'
          download='\Assets\Business-Analyst_Resume_v1.7_10302022.pdf'
        >
          Resume
        </a>
      </div>
    </Container>
  )
}
export default About
