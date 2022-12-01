import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import { listProjects } from '../../Redux/Actions/projectActions.js'
import Message from '../../Components/Message/Message'
const Projects = () => {
  const dispatch = useDispatch()
  const projectList = useSelector(state => state.projectList)
  const { loading, error, projects } = projectList

  useEffect(() => {
    dispatch(listProjects())
  }, [dispatch])
  
  return (
    <>
      {loading ? (
        <h1>loading biatch</h1>
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <Container maxWidth='sm'>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {projects.map(project => (
              <Grid xs={2} sm={4} md={4} key={project._id}>
                <ProjectCard project={project} key={project._id} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  )
}

export default Projects
