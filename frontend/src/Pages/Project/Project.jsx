import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProjectDetails } from '../../Redux/Actions/projectActions'
import Message from '../../Components/Message/Message'
const Project = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const projectDetails = useSelector(state => projectDetails)
  const { loading, error, project } = projectDetails
  
  useEffect(() => {
    dispatch(listProjectDetails(id))
  }, [dispatch, id])
  return (
    <>
      <Message>{error}</Message>
      <h1>{project.title}</h1>
      <h3>{project.subTitle}</h3>
      <p>{project.description}</p>
      <p>{project.published}</p>
    </>
  )
}

export default Project
