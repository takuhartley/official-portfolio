import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProjectDetails,
  updateProject,
  getProjectImage
} from '../../../Redux/Actions/projectActions.js'
import { PROJECT_UPDATE_RESET } from '../../../Redux/Constants/projectConstants.js'

import AlertComponent from '../../../Components/AlertComponent/AlertComponent'
import LoadingComponent from '../../../Components/LoadingComponent/LoadingComponent'
import ImageDropdown from '../../../Components/ImageDropdown/ImageDropdown'
import ImageDetailsComponent from '../../../Components/ImageDetailsComponent/ImageDetailsComponent'
import {
  Input,
  InputLabel,
  Container,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Box,
  Button
} from '@mui/material'
import './ProjectEdit.scss'
const ProjectEditPage = () => {
  const { id } = useParams()
  const projectId = id
  const navigate = useNavigate()
  // Define State
  const [editMode, setEditMode] = useState(true)
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    subTitle: '',
    description: '',
    published: false,
    likes: 0,
    images: [],
    categories: []
  })
  console.log('Form Data: ' + JSON.stringify(formData))
  // Dispatch Redux
  const dispatch = useDispatch()
  // Define project details from state
  const projectDetails = useSelector(state => state.projectDetails)
  const { loading, error, project } = projectDetails
  const projectUpdate = useSelector(state => state.projectUpdate)
  const { success: successUpdate } = projectUpdate
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!project._id) {
      dispatch(listProjectDetails(projectId))
    } else {
      setFormData({
        id: project._id,
        title: project.title,
        subTitle: project.subTitle,
        description: project.description,
        published: project.published,
        likes: project.likes,
        images: project.images,
        categories: project.categories
      })
    }
  }, [
    dispatch,
    project._id,
    project.categories,
    project.description,
    project.images,
    project.likes,
    project.published,
    project.subTitle,
    project.title,
    projectId
  ])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateProject({
        _id: project._id,
        author: userInfo._id,
        title: formData.title,
        subTitle: formData.subTitle,
        description: formData.description,
        published: formData.published,
        likes: formData.likes,
        images: formData.images,
        categories: formData.categories
      })
    )
  }
  const handleImageSelect = image => {
    if (formData.images) {
      setFormData({
        ...formData,
        images: [...formData.images]
      })
    } else {
      setFormData({
        ...formData,
        images: [image._id]
      })
    }
  }

  return (
    <>
      <Container>
        <h1>Edit Project</h1>
      </Container>
      {editMode ? (
        <>
          <Container>
            <form onSubmit={submitHandler}>
              <FormControl fullWidth>
                <InputLabel htmlFor='title'>Title</InputLabel>
                <Input
                  type='text'
                  value={formData.title}
                  onChange={e =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='subTitle'>SubTitle</InputLabel>
                <Input
                  type='text'
                  value={formData.subTitle ?? ''}
                  onChange={e =>
                    setFormData({ ...formData, subTitle: e.target.value })
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='description'>Description</InputLabel>
                <TextField
                  multiline
                  rows={4}
                  value={formData.description ?? ''}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.published ?? false}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            published: e.target.checked
                          })
                        }
                      />
                    }
                    label='Published'
                  />
                </FormGroup>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='likes'>Likes</InputLabel>
                <Input
                  id='likes'
                  type='number'
                  value={formData.likes ?? ''}
                  onChange={e =>
                    setFormData({ ...formData, likes: e.target.value })
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                {formData.categories &&
                  formData.categories.map((category, index) => (
                    <div
                      key={index}
                      className='category-tag'
                      id={`category-${index}`}
                    >
                      <p
                        className='category-tag-name'
                        id={`category-tag-name-${index}`}
                      >
                        {category.name}
                      </p>
                    </div>
                  ))}
              </FormControl>
              <FormControl fullWidth>
                <ImageDropdown
                  onChange={handleImageSelect}
                  className='new-project-categories-dropdown'
                />
              </FormControl>
              <Button type='submit' variant='contained' color='primary'>
                Update
              </Button>
            </form>
          </Container>
          <Container>
            <div id='image-container'>
              {formData.images &&
                formData.images.map((image, index) => (
                  <div key={index} className='image-box'>
                    <img
                      className='project-image'
                      src={`/Images/${image.filename}`}
                      alt={image.name}
                    />
                  </div>
                ))}
            </div>
          </Container>
        </>
      ) : loading ? (
        <LoadingComponent />
      ) : error ? (
        <AlertComponent severity='danger'>{error}</AlertComponent>
      ) : (
        <Container>
          <div>
            <p id='title'>Title: {formData.title}</p>
          </div>
          <div>
            <p id='subTitle'>Sub-Title: {formData.subTitle}</p>
          </div>
          <div>
            <p id='description'>Description: {formData.description}</p>
          </div>
          <div>
            <p id='likes'>Likes: {formData.likes}</p>
          </div>
          <div></div>
        </Container>
      )}
    </>
  )
}
export default ProjectEditPage
