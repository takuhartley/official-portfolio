import React from 'react'
import Header from '../../Components/Header/Header'
import Banner from '../../Components/Banner/Banner'
import Footer from '../../Components/Footer/Footer'
import Projects from '../Projects/Projects'
import './Home.scss'
const Home = () => {
  return (
    <>
      <div className='Home'>
        <Header />
        <Banner />
        <Projects />
        <Footer />
      </div>
    </>
  )
}

export default Home
