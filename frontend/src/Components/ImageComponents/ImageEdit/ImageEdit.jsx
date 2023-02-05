import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  listImageDetails,
  updateImage
} from '../../../Redux/Actions/imageUploadActions.js'
import {
  Container,
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Input,
  InputLabel
} from '@mui/material'
import LoadingComponent from '../../LoadingComponent/LoadingComponent'
import AlertComponent from '../../AlertComponent/AlertComponent'

const ImageEdit = () => {
  const { id } = useParams()
  console.log(id)
  const imageId = id
  console.log(imageId)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    desc: '',
    path: '',
    originalname: '',
    size: 0,
    author: '',
    filename: ''
  })
  const [editing, setEditing] = useState(false)
  const dispatch = useDispatch()
  const imageDetails = useSelector(state => state.imageDetails)
  const { loading, error, image } = imageDetails

  useEffect(() => {
    if (!image || image._id !== imageId) {
      dispatch(listImageDetails(imageId))
      console.log(image)
    } else {
      setFormData({
        id: image._id,
        name: image.name,
        desc: image.desc,
        path: image.path,
        originalname: image.originalname,
        size: image.size,
        author: image.author,
        filename: image.filename
      })
    }
  }, [dispatch, id, image, imageId])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEdit = () => {
    setEditing(!editing)
  }

  const handleUpdate = e => {
    e.preventDefault()
    dispatch(updateImage(id, formData))
    setEditing(!editing)
  }
  return (
    <Container>
      <img
        src={`/Images/${formData.filename}`}
        alt={formData.name}
        className='table-img'
      />
      <Box p={2}>
        {!editing ? (
          <>
            <p>ID: {formData.id}</p>
            <p>Name: {formData.name}</p>
            <p>Description: {formData.desc}</p>
            <p>Path: {formData.path}</p>
            <p>Original Name: {formData.originalname}</p>
            <p>File Name: {formData.filename}</p>
            <p>Size: {formData.size}</p>
            <p>Author: {formData.author}</p>
            <FormControlLabel
              control={
                <Switch
                  checked={editing}
                  onChange={handleEdit}
                  name='editing'
                />
              }
              label='Edit'
            />
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            <FormControl>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <Input
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <TextField
                id='desc'
                name='desc'
                label='Description'
                value={formData.desc}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='author'>Author</InputLabel>
              <Input
                id='author'
                name='author'
                value={formData.author}
                onChange={handleChange}
              />
            </FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={editing}
                    onChange={handleEdit}
                    name='editing'
                  />
                }
                label='Cancel'
              />
              <FormControl>
                <button type='submit'>Update</button>
              </FormControl>
            </FormGroup>
          </form>
        )}
      </Box>
    </Container>
  )
}

export default ImageEdit
