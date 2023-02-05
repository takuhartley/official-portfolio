import React from 'react'
import DashboardNavigation from './DashboardNavigation/DashboardNavigation'
import './DashboardPage.scss'
const DashboardPage = () => {
  return (
    <>
      <div className='dashboard-page'>
        <DashboardNavigation />
        <div className='welcome-section'>
          <h2 className='welcome-title'>Welcome to Your Dashboard Daddy 😩</h2>
          <p className='welcome-text'>
            This page is built using React, a popular JavaScript library for
            building user interfaces. It is designed to give you a comprehensive
            overview of your portfolio and provide easy navigation to other
            sections of the dashboard.
          </p>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
