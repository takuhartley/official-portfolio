import React from 'react'
import Banner from '../../Components/Banner/Banner'
import Footer from '../../Components/Footer/Footer'
import Projects from '../Projects/Projects'
import './Home.scss'
const Home = () => {
  return (
    <>
      <div className='Home'>
        <Banner />
        <Projects />
        <Footer />
      </div>
    </>
  )
}

export default Home
