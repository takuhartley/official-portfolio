import React from 'react'
import './AboutPage.scss'
import { Container } from '@mui/material'
const About = () => {
  return (
    <Container maxWidth='sm' className='about-page-container'>
      <div className='about-page-header'>
        <h1 className='about-page-header-title'>About Me</h1>
        <hr />
      </div>
      <div className='about-page-body'>
        <p className='about-page-main-body__text'>
          I have a few main interests that I like to explore further on. In
          reality, I have too many interests to keep track of, so it's nice to
          have them on my official website.
        </p>
        <ul className='about-page-main-body__list'>
          <li>
            I like getting out and exploring 🏙, so you might run into me in
            Tokyo! Though I doubt you know what I look like lol
          </li>
          <li>
            I like to think I'm a photographer, but my current camera broke so
            I'm just a guy with lenses...HAHA
          </li>
          <li>
            I'm weirdly really into ichthyology and aquascaping or anything
            related to fresh water aquariums
          </li>
          <li>I am a seasonal skier/snowboarder</li>
          <li>Not a botanist but a plantsman</li>
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
