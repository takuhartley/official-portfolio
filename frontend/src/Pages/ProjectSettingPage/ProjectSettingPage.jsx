import React from 'react'
import NewProjectComponent from '../../Components/ProjectComponents/NewProjectComponent/NewProjectComponent'
import ProjectTable from '../../Components/ProjectComponents/ProjectTable/ProjectTable'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import './ProjectSettingPage.scss'
const ProjectSettingPage = () => {
  return (
    <>
      <div className='project-settings'>
        <Container maxWidth='lg'>
          <Box my={2} className='project-settings__box'>
            <h1 className='project-settings__title'>Project Settings ⚙️</h1>
            <NewProjectComponent />
            <ProjectTable />
          </Box>
        </Container>
      </div>
    </>
  )
}

export default ProjectSettingPage
