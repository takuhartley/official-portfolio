import React from 'react'
import BannerComponent from '../../Components/BannerComponent/BannerComponent'
import Footer from '../../Components/Footer/Footer'
import ProjectsPage from '../ProjectsPage/ProjectsPage'
import './HomePage.scss'
const Home = () => {
  return (
    <>
      <div className='Home'>
        <BannerComponent />
        <ProjectsPage />
        <Footer />
      </div>
    </>
  )
}

export default Home
