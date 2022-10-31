import React from 'react'
import Header from '../../Components/Header/Header'
import Banner from '../../Components/Banner/Banner'
import Footer from '../../Components/Footer/Footer'
import Projects from '../Projects/Projects'

const Home = () => {
  return (
    <>
      <div>
        <Header />
        <Banner />
        <Projects />
        <Footer />
      </div>
    </>
  )
}

export default Home
