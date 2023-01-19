import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProjectDetails,
  updateProject
} from '../../../Redux/Actions/projectActions.js'
import { listImageDetails } from '../../../Redux/Actions/imageUploadActions.js'
import { PROJECT_UPDATE_RESET } from '../../../Redux/Constants/projectConstants.js'

import AlertComponent from '../../../Components/AlertComponent/AlertComponent'
import LoadingComponent from '../../../Components/LoadingComponent/LoadingComponent'
import ImageDropdown from '../../../Components/ImageDropdown/ImageDropdown'
import {
  Input,
  InputLabel,
  Container,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Box
} from '@mui/material'

const ProjectEditPage = () => {
  const { id } = useParams()
  const projectId = id
  const navigate = useNavigate()
  // Define State
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    subTitle: '',
    description: '',
    published: '',
    likes: 0,
    images: [],
    categories: []
  })
  console.log(formData)
  // Dispatch Redux
  const dispatch = useDispatch()
  // Define project details from state
  const projectDetails = useSelector(state => state.projectDetails)
  const { loading, error, project } = projectDetails
  // const imageDetails = useSelector(state => state.imageDetails)
  // const { imageDetails: image } = imageDetails
  // console.log(imageDetails)
  // Define project update state
  const projectUpdate = useSelector(state => state.projectUpdate)
  const { success: successUpdate } = projectUpdate
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  console.log(userInfo)
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    } else {
      dispatch(listProjectDetails(projectId))
      dispatch(listImageDetails())
    }
  }, [dispatch, navigate, projectId, userInfo])
  useEffect(() => {
    if (project) {
      setFormData({
        author: project._id,
        title: project.title,
        subTitle: project.subTitle,
        description: project.description,
        published: project.published,
        likes: project.likes,
        images: project.images,
        categories: project.categories
      })
    }
  }, [project, setFormData])
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
  const handleImageSelect = imageId => {
    setFormData({
      ...formData,
      images: [...formData.images, imageId]
    })
  }

  return (
    <>
      {editMode ? (
        <Container>
          <form onSubmit={submitHandler}>
            <FormControl fullWidth>
              <InputLabel htmlFor='title'>Title</InputLabel>
              <Input
                id='title'
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
                id='subTitle'
                type='text'
                value={formData.subTitle}
                onChange={e =>
                  setFormData({ ...formData, subTitle: e.target.value })
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='description'>Description</InputLabel>
              <TextField
                id='description'
                multiline
                rows={4}
                value={formData.description}
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
                      checked={formData.published}
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
                value={formData.likes}
                onChange={e =>
                  setFormData({ ...formData, likes: e.target.value })
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='display'>Display</InputLabel>
              <Input
                id='display'
                type='text'
                value={formData.display}
                onChange={e =>
                  setFormData({ ...formData, display: e.target.value })
                }
              />
            </FormControl>
            <button type='submit'>Update Project</button>
          </form>
        </Container>
      ) : loading ? (
        <LoadingComponent />
      ) : error ? (
        <AlertComponent severity='danger'>{error}</AlertComponent>
      ) : (
        <Container>
          <div>
            <p id='title'>{formData.title}</p>
          </div>
          <div>
            <p id='subTitle'>{formData.subTitle}</p>
          </div>
          <div>
            <p id='description'>{formData.description}</p>
          </div>
          <div>
            <p id='likes'>{formData.likes}</p>
          </div>
          <div>
            <p id='display'>{formData.display}</p>
          </div>
          <div>
            {formData.images.map((image, index) => (
              <div>
                <span key={index}>{image} </span>
              </div>
            ))}
          </div>
          <div>
            {formData.categories.map((categories, index) => (
              <div>
                <span key={index}>{categories} </span>
              </div>
            ))}
          </div>
        </Container>
      )}
    </>
  )
}
export default ProjectEditPage
