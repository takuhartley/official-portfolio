import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../Redux/Actions/categoryActions.js'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Container from '@mui/material/Container'

const CategoryNew = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ name: '', description: '' })
  const handleSubmit = e => {
    e.preventDefault()
    const categoryData = {
      name: formData.name,
      description: formData.description
    }
    dispatch(createCategory(categoryData))
    navigate('/dashboard')
  }
  return (
    <Container maxWidth='sm'>
      <h2>New Category</h2>
      <Box m={2}>
        <form onSubmit={handleSubmit}>
          <Box m={2}>
            <TextField
              required
              id='name'
              label='Name'
              variant='outlined'
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </Box>
          <Box m={2}>
            <TextField
              id='description'
              label='Description'
              variant='outlined'
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Box>
          <Tooltip title='Create'>
            <Button type='submit' variant='contained' color='primary'>
              Create
            </Button>
          </Tooltip>
        </form>
      </Box>
    </Container>
  )
}

export default CategoryNew
