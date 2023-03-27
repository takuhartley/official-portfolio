import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProjects } from '../../Redux/Actions/projectActions.js'
import ProjectCardComponent from '../../Components/ProjectComponents/ProjectCardComponent/ProjectCardComponent'
const ProjectsPage = () => {
  const dispatch = useDispatch()
  const projectList = useSelector(state => state.projectList)
  const { loading, error, projects } = projectList

  useEffect(() => {
    dispatch(listProjects())
  }, [dispatch])

  return (
    <div className='projects-container'>
      {loading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        projects.map(project => (
          <ProjectCardComponent key={project._id} project={project} />
        ))
      )}
    </div>
  )
}

export default ProjectsPage
