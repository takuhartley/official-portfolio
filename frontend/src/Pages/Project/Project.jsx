import React, { useEffect } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProjectDetails } from '../../Redux/Actions/projectActions'
import Message from '../../Components/Message/Message'
const Project = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const projectDetails = useSelector(state => state.projectDetails)
  const { project } = projectDetails
  const { title, subTitle, description, ...images } = project
  console.log(images)
  useEffect(() => {
    if (!project._id || project._id !== id) {
      dispatch(listProjectDetails(id))
    }
  }, [dispatch, id, project._id])
  return (
    <>
      <div className='project-details-page-link'>
        <RouterLink to='/'>Back</RouterLink>
      </div>
      <div className='project-details-page-title'>
        <p></p>
      </div>
      <div className='project-details-page-title'>
        <p>{title}</p>
      </div>
      <div className='project-details-page-subTitle'>
        <p>{subTitle}</p>
      </div>
      <div className='project-details-page-description'>
        <p>{description}</p>
      </div>
    </>
  )
}

export default Project
