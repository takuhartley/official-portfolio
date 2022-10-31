import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'
import projects from '../../Data/projects.js'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
const Projects = () => {
  return (
    <>
      <Container maxWidth='sm'>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {projects.map(project => (
            <Grid xs={2} sm={4} md={4} key={project._id}>
              <ProjectCard project={project} key={project._id} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Projects
