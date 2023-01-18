import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import { listProjects } from '../../Redux/Actions/projectActions'
import ErrorMessage from '../../Components/ErrorMessage/ErrorMessage'
import Loading from '../../Components/Loading/Loading'

//import Message from '../../Components/Message/Message'
import './Projects.scss'

const Projects = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const projectList = useSelector(state => state.projectList)
  const { projects } = projectList
  useEffect(() => {
    setLoading(true)
    dispatch(listProjects())
      .then(() => setLoading(false))
      .catch(err => setError(err))
  }, [dispatch])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }
  return (
    <>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid2
          xs
          display='flex'
          justifyContent='center'
          alignItems='center'
          container
          spacing={2}
          className='projects-grid'
        >
          {projects.map(project => (
            <Grid item xs={2} className='projects-grid-item' key={project._id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid2>
      </Box>
    </>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  }).isRequired
}

export default React.memo(Projects)
