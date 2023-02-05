import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createProject } from '../../../Redux/Actions/projectActions.js'
import CategoryDropdown from '../../CategoryComponents/CategoryDropdown/CategoryDropdown'
import { Container, Box, Button, Checkbox } from '@mui/material'
import AlertComponent from '../../AlertComponent/AlertComponent'
import LoadingComponent from '../../LoadingComponent/LoadingComponent'
import TextField from '@mui/material/TextField'
import { listImages } from '../../../Redux/Actions/imageUploadActions.js'

import {
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel
} from '@mui/material'

import FormControlLabel from '@mui/material/FormControlLabel'
import './NewProjectComponent.scss'
const NewProjectPage = () => {
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    subTitle: '',
    description: '',
    published: false,
    likes: 0,
    images: [],
    categories: [],
    thumbnail: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const imageList = useSelector(state => state.imageList)
  const { loading, error, images } = imageList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listImages())
    } else {
      navigate('/login')
    }
  }, [userInfo, dispatch, navigate])

  const [selectedImage, setSelectedImage] = useState('')
  const handleAddImage = () => {
    // Pass the selectedImage value to the parent component's function to add it to the images array
    handleThumbnailSelect(selectedImage)
  }
  const handleImageChange = event => {
    setSelectedImage(event.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    const projectData = {
      author: formData.author,
      title: formData.title,
      subTitle: formData.subTitle,
      description: formData.description,
      published: formData.published,
      likes: formData.likes,
      images: formData.images,
      categories: formData.categories,
      thumbnail: formData.thumbnail
    }
    dispatch(createProject(projectData))
    navigate('/dashboard')
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleCheckboxChange = e => {
    setFormData({
      ...formData,
      published: e.target.checked
    })
  }
  const handleThumbnailSelect = thumbnailId => {
    setFormData({
      ...formData,
      thumbnail: thumbnailId
    })
  }
  const handleCategorySelect = categoryId => {
    setFormData({
      ...formData,
      categories: [...formData.categories, categoryId]
    })
  }
  return (
    <>
      <Container maxWidth='sm' className='new-project-container'>
        <h2 className='project-post-create__title'>Create Project</h2>
        {formData.thumbnail ?? <>{formData.thumbnail}</>}
        <form onSubmit={handleSubmit} className='new-project-form'>
          <Box mb={2} className='new-project-title'>
            <TextField
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder='Title'
              variant='outlined'
              fullWidth
              className='new-project-title-input'
            />
          </Box>
          <Box mb={2} className='new-project-subtitle'>
            <TextField
              name='subTitle'
              value={formData.subTitle}
              onChange={handleChange}
              placeholder='Sub-Title'
              variant='outlined'
              fullWidth
              className='new-project-subtitle-input'
            />
          </Box>
          <Box mb={2} className='new-project-description'>
            <TextField
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Description'
              variant='outlined'
              fullWidth
              className='new-project-description-input'
            />
          </Box>
          <Box mb={2} className='new-project-published'>
            <FormControlLabel
              control={
                <Checkbox
                  name='published'
                  checked={formData.published}
                  onChange={handleCheckboxChange}
                  color='primary'
                  className='new-project-published-checkbox'
                />
              }
              label='Published'
              className='new-project-published-label'
            />
          </Box>
          <Box mb={2} className='new-project-likes'>
            <TextField
              name='likes'
              value={formData.likes}
              onChange={handleChange}
              placeholder='Likes'
              variant='outlined'
              fullWidth
              className='new-project-likes-input'
            />
          </Box>
          <Box mb={2} className='new-project-likes'>
            {loading && <LoadingComponent></LoadingComponent>}
            {error && (
              <AlertComponent severity='danger'>{error}</AlertComponent>
            )}
            {images && (
              <>
                <div>
                  <FormControl>
                    <InputLabel id='image-select-label'>Image</InputLabel>
                    <Select
                      labelId='image-select-label'
                      id='image-select'
                      onChange={handleImageChange}
                      value={selectedImage}
                    >
                      {images.map(image => (
                        <MenuItem key={image._id} value={image._id}>
                          {image.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Select an Thumbnail</FormHelperText>
                  </FormControl>
                </div>
                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleAddImage}
                  >
                    Add
                  </Button>
                </div>
              </>
            )}
          </Box>
          <Box mb={2} className='new-project-categories'>
            <CategoryDropdown onAddCategory={handleCategorySelect} />
          </Box>
          <Box mb={2} className='new-project-submit'>
            <Button type='submit' variant='contained' color='primary'>
              Create Project
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}
export default NewProjectPage
