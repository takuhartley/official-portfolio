import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../../AlertComponent/AlertComponent'
import LoadingComponent from '../../LoadingComponent/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { listImages } from '../../../Redux/Actions/imageUploadActions.js'
import {
  Button,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Typography
} from '@mui/material'
import './ImageDropdown.scss'

const ImageDropdown = props => {
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
    props.handleImageSelect(selectedImage)
  }
  const handleImageChange = event => {
    setSelectedImage(event.target.value)
    handleCloseDropdown()
  }

  const handleCloseDropdown = () => {
    setOpen(false)
  }

  const handleOpenDropdown = () => {
    setOpen(true)
  }

  const [open, setOpen] = useState(false)
  const findImageUrl = imageId => {
    const foundImage = images.find(image => image._id === imageId)
    return foundImage ? foundImage.url : ''
  }

  const imageUrl = findImageUrl(selectedImage)

  return (
    <>
      <div className='image-dropdown-container'>
        {loading && <LoadingComponent />}
        {error && <AlertComponent severity='danger'>{error}</AlertComponent>}
        {images && (
          <>
            <Typography variant='h5' className='image-dropdown-title'>
              Image Dropdown
            </Typography>
            <div className='image-dropdown-form'>
              <FormControl>
                <InputLabel id='image-select-label'>Image</InputLabel>
                <Select
                  labelId='image-select-label'
                  id='image-select'
                  open={open}
                  onOpen={handleOpenDropdown}
                  onClose={handleCloseDropdown}
                  onChange={handleImageChange}
                  value={selectedImage}
                  MenuProps={{
                    onClose: () => {
                      handleCloseDropdown()
                    }
                  }}
                >
                  {images.map(image => (
                    <MenuItem key={image.name} value={image._id}>
                      {image.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select a Thumbnail</FormHelperText>
              </FormControl>
              <div className='image-dropdown-add-btn'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handleAddImage()}
                >
                  Add
                </Button>
              </div>
            </div>
            {selectedImage && (
              <div className='image-preview'>
                <img src={imageUrl} alt='Selected thumbnail' width='200' />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
export default ImageDropdown
