import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createProject } from '../../../Redux/Actions/projectActions.js'
import CategoryDropdown from '../../../Components/CategoryDropdown/CategoryDropdown'
import { Container, Box, Button, Checkbox } from '@mui/material'
import ImageDropdown from '../../../Components/ImageDropdown/ImageDropdown'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import './NewProjectPage.scss'
const NewProjectPage = () => {
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
  console.log(formData)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
      categories: formData.categories
    }
    dispatch(createProject(projectData))
    navigate('/dashboard')
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(formData)
  }
  const handleCheckboxChange = e => {
    setFormData({
      ...formData,
      published: e.target.checked
    })
  }
  const handleImageSelect = imageId => {
    setFormData({
      ...formData,
      images: [...formData.images, imageId]
    })
  }
  return (
    <Container maxWidth='sm' className='new-project-container'>
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
        <Box mb={2} className='new-project-categories'>
          <CategoryDropdown className='new-project-categories-dropdown' />
        </Box>
        <Box mb={2} className='new-project-categories'>
          <ImageDropdown
            onChange={handleImageSelect}
            className='new-project-categories-dropdown'
          />
        </Box>
        <Box mb={2} className='new-project-submit'>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className='new-project-submit-button'
          >
            Create Project
          </Button>
        </Box>
      </form>
    </Container>
  )
}
export default NewProjectPage
