import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage } from '../../../Redux/Actions/imageUploadActions.js'
import { IMAGE_UPDATE_RESET } from '../../../Redux/Constants/imageConstants'
import {
  Box,
  Container,
  Button,
  TextField,
  Typography,
  Backdrop,
  CircularProgress
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import './ImageUpload.scss'
const ImageUpload = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [selectedFile, setSelectedFile] = useState(null)
  const [imageName, setImageName] = useState('')
  const [imageDesc, setImageDesc] = useState('')

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setSelectedFile(acceptedFiles[0])
    }
  })

  const imageUpload = useSelector(state => state.imageUpload)
  const { loading, success, error } = imageUpload

  useEffect(() => {
    if (success) {
      dispatch({ type: IMAGE_UPDATE_RESET })
      navigate(`/dashboard`)
    }
  }, [success, dispatch, navigate])

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('name', imageName)
    formData.append('desc', imageDesc)

    dispatch(uploadImage(formData))
  }

  return (
    <Container maxWidth='sm' id='image-upload-container'>
      <Box my={4}>
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          id='image-upload-title'
        >
          Image Upload
        </Typography>
        {loading && (
          <Backdrop open={loading} id='image-upload-loading'>
            <CircularProgress color='inherit' />
          </Backdrop>
        )}
        <form onSubmit={handleSubmit} id='image-upload-form'>
          <div {...getRootProps()} className='dropzone'>
            <input {...getInputProps()} id='image-upload-input' />
            <Typography variant='body1' id='image-upload-text'>
              Drag 'n' drop an image here, or click to select a file
            </Typography>
          </div>
          <Box mt={2}>
            <TextField
              label='Image Name'
              variant='outlined'
              value={imageName}
              onChange={e => setImageName(e.target.value)}
              className='image-name-input'
              id='image-name-input'
            />
          </Box>
          <Box mt={2}>
            <TextField
              label='Description'
              variant='outlined'
              value={imageDesc}
              onChange={e => setImageDesc(e.target.value)}
              className='image-desc-input'
              id='image-desc-input'
            />
          </Box>
          <Box mt={2}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              endIcon={<FileUploadIcon />}
              className='image-upload-button'
              id='image-upload-button'
            >
              Upload
            </Button>
          </Box>
        </form>
        {selectedFile !== null && (
          <Box mt={2}>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt={imageName}
              className='image-preview'
              id='image-preview'
            />
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default ImageUpload
