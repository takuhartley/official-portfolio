import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import { listProjects } from '../../Redux/Actions/projectActions'
//import Message from '../../Components/Message/Message'
import './Projects.scss'

const Projects = () => {
  const dispatch = useDispatch()
  const projectList = useSelector(state => state.projectList)
  const { projects } = projectList

  useEffect(() => {
    dispatch(listProjects())
  }, [dispatch])

  return (
    <>
      <Container className='projects'>
        <Grid
          justifyContent='center'
          direction='row'
          alignItems='center'
          container
          spacing={1}
          className='projects-grid'
        >
          {projects.map(project => (
            <Grid item xs={2} className='projects-grid-item' key={project._id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Projects
