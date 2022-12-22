import React, { useEffect } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProjectDetails } from '../../Redux/Actions/projectActions'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'

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
  return <>
    
  </>
}
export default Project
