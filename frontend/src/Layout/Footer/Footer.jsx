import React from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import './Footer.scss'
const Footer = () => {
  return (
    <div className='footer' id='footer-main'>
      <div className='footer-content' id='footer-content'>
        <div className='copyright' id='footer-copyright'>
          <p>Copyright © Robert T. Hartley</p>
        </div>
        <div className='social-media' id='footer-social-media'>
          <a
            href='https://github.com/takuhartley'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GitHubIcon className='social-icon' id='footer-github-icon' />
          </a>
          <a
            href='https://www.linkedin.com/in/robin-hartley/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedInIcon className='social-icon' id='footer-linkedin-icon' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
