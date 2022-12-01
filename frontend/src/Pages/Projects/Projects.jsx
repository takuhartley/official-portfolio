import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import axios from 'axios'
const Projects = () => {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get('/api/projects')
      setProjects(data)
    }
    fetchProjects()
  }, [])
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
