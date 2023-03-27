import React, { useState, useEffect, useCallback } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createProject } from '../../../Redux/Actions/projectActions.js'
import { listImages } from '../../../Redux/Actions/imageUploadActions.js'
import { listCategories } from '../../../Redux/Actions/categoryActions.js'

import ImageDropDown from '../../ImageComponents/ImageDropdown/ImageDropdown'
import AlertComponent from '../../AlertComponent/AlertComponent'
import LoadingComponent from '../../LoadingComponent/LoadingComponent'

import {
  TextField,
  Container,
  Box,
  Button,
  Checkbox,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Typography
} from '@mui/material'

import FormControlLabel from '@mui/material/FormControlLabel'
import './NewProjectComponent.scss'

const NewProjectPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categoriesList = useSelector(state => state.categoriesList)
  const imageList = useSelector(state => state.imageList)
  const userLogin = useSelector(state => state.userLogin)
  const { categories } = categoriesList
  const { loading, error, images } = imageList
  const { userInfo } = userLogin
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
  const [selectedThumbnail, setSelectedThumbnail] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listImages())
      dispatch(listCategories())
    } else {
      navigate('/login')
    }
  }, [userInfo, dispatch, navigate])
  const handleAddCategory = () => {
    setSelectedCategories([...selectedCategories, selectedCategory])
    setSelectedCategory('')
    setFormData({
      ...formData,
      categories: [...formData.categories, selectedCategory]
    })
  }
  const handleAddThumbnail = selectedImage => {
    setSelectedThumbnail(selectedImage)
    setFormData({
      ...formData,
      thumbnail: selectedImage
    })
  }
  const handleThumbnailChange = event => {
    setSelectedThumbnail(event.target.value)
  }
  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value)
  }
  const handleCheckboxChange = e => {
    setFormData({
      ...formData,
      published: e.target.checked
    })
  }
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  // Define the reloadPage callback at the top level
  const reloadPage = useCallback(() => {
    window.location.reload()
  }, [])
  const handleSubmit = async e => {
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

    // Wrap the dispatch in an async function to wait for the project creation
    await dispatch(createProject(projectData))

    // Invoke the callback
    reloadPage()

    navigate('/dashboard')
  }

  return (
    <>
      <Container maxWidth='sm' className='new-project-container'>
        <Typography variant='h4' className='project-post-create__title'>
          Create Project
        </Typography>
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
              required
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
              required
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
              multiline
              rows={4}
              required
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
              type='number'
              value={formData.likes}
              onChange={handleChange}
              placeholder='Likes'
              variant='outlined'
              fullWidth
              className='new-project-likes-input'
              inputProps={{ min: 0 }}
              required
            />
          </Box>
          <Box mb={2} className='new-project-images'>
            {loading && <LoadingComponent />}
            {error && (
              <AlertComponent severity='danger'>{error}</AlertComponent>
            )}
            {images && (
              <>
                <ImageDropDown handleImageSelect={handleAddThumbnail} />
                {selectedThumbnail && (
                  <p>Added thumbnail: {selectedThumbnail}</p>
                )}
                {formData.thumbnail && (
                  <p>
                    Added Thumbnail on Form Data:
                    {formData.thumbnail}
                  </p>
                )}
              </>
            )}
          </Box>
          <Box mb={2} className='new-project-categories'>
            {categories && (
              <>
                <div>
                  <FormControl>
                    <InputLabel id='categorie-select-label'>
                      Category
                    </InputLabel>
                    <Select
                      labelId='categorie-select-label'
                      id='categorie-select'
                      onChange={handleCategoryChange}
                      value={selectedCategory}
                    >
                      {categories.map(category => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Select a Category</FormHelperText>
                  </FormControl>
                </div>
                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleAddCategory}
                  >
                    Add
                  </Button>
                </div>
                {selectedCategories.length > 0 && (
                  <p>Added categories: {selectedCategories.join(', ')}</p>
                )}
                {formData.categories.length > 0 && (
                  <p>
                    Added categories on Form Data:
                    {formData.categories.join(', ')}
                  </p>
                )}
              </>
            )}
          </Box>
          <Box mb={2} className='new-project-submit'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
            >
              Create Project
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}
export default NewProjectPage
