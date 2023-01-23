import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProjectDetails } from '../../Redux/Actions/projectActions'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'
import AlertComponent from '../../Components/AlertComponent/AlertComponent'
import './Project.scss'
const Project = () => {
  const { id } = useParams()
  const projectId = id
  console.log(id)
  const [formData, setFormData] = useState({
    id: '',
    author: '',
    name: '',
    title: '',
    subTitle: '',
    description: '',
    published: false,
    likes: 0,
    images: [],
    categories: [],
    thumbnail: ''
  })
  console.log(formData)
  const dispatch = useDispatch()
  const projectDetails = useSelector(state => state.projectDetails)
  const { loading, error, project } = projectDetails
  useEffect(() => {
    if (!project._id || project._id !== projectId)
      dispatch(listProjectDetails(projectId))
  }, [dispatch, project._id, projectId])
  useEffect(() => {
    if (project._id)
      setFormData({
        id: project._id,
        author: project.author,
        thumbnail: project.thumbnail,
        title: project.title,
        subTitle: project.subTitle,
        description: project.description,
        published: project.published,
        likes: project.likes,
        images: project.images,
        categories: project.categories
      })
  }, [
    project._id,
    project.author,
    project.categories,
    project.description,
    project.images,
    project.likes,
    project.published,
    project.subTitle,
    project.thumbnail,
    project.title
  ])
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <AlertComponent />
      ) : (
        <>
          <div>
            <div id='thumbnail-overlay' className='thumbnail-overlay'>
              {formData.thumbnail.filename && (
                <img
                  src={`/Images/${formData.thumbnail.filename}`}
                  alt={formData.thumbnail.name}
                  id='thumbnail'
                  className='thumbnail'
                />
              )}
            </div>
            <h1 id='title' className='title'>
              Title: {formData.title}
            </h1>
            <h3 id='sub-title' className='sub-title'>
              Sub-Title: {formData.subTitle}
            </h3>
            <p id='author' className='author'>
              By: {formData.author.firstName}
            </p>

            <p id='likes' className='likes'>
              Likes: {formData.likes}
            </p>
            <p id='description' className='description'>
              Description: {formData.description}
            </p>
          </div>
        </>
      )}
    </>
  )
}
export default Project
