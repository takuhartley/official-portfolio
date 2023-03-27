import React, { useContext } from 'react'
import CityScape from '../../Components/CityScape/CityScape'
import BannerComponent from '../../Components/BannerComponent/BannerComponent'
import ProjectsPage from '../ProjectsPage/ProjectsPage'
import ContactComponent from '../../Pages/ContactPage/ContactPage'
import { ThemeContext } from '../../App.js'
import Footer from '../../Layout/Footer/Footer'

import './HomePage.scss'

const Home = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <div
        className='Home'
        style={{ backgroundColor: theme === 'light' ? 'white' : 'black' }}
      >
        <BannerComponent />
        <ProjectsPage />
        <CityScape />
        <ContactComponent />
        <Footer />
      </div>
    </>
  )
}

export default Home
