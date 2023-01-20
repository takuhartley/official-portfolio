import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProjectDetails } from '../../Redux/Actions/projectActions'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'

const Project = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const projectDetails = useSelector(state => state.projectDetails)
  const { project, loading, error } = projectDetails
  const { title, subTitle, description, ...images } = project

  useEffect(() => {
    if (!project._id || project._id !== id) {
      dispatch(listProjectDetails(id))
    }
  }, [dispatch, id, project._id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>
  }
  return (
    <>
      <h1>{project.title}</h1>
      <p>By {project.author}</p>
      <p>{project.description}</p>
      <p>Published: {project.published ? 'Yes' : 'No'}</p>
      <p>Likes: {project.likes}</p>
      {/* <h2>Categories:</h2>
      <ul>
        {project.categories.map(category => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
      <h2>Images:</h2>
      {project.images.map(image => (
        <img key={image._id} src={image.url} alt={image.name} />
      ))} */}
    </>
  )
}
export default Project
