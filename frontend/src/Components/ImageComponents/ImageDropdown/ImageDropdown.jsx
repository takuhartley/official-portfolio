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
  InputLabel
} from '@mui/material'

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
  }

  return (
    <>
      <div>
        {loading && <LoadingComponent></LoadingComponent>}
        {error && <AlertComponent severity='danger'>{error}</AlertComponent>}
        {images && (
          <>
            <div>
              <h1>Image Dropdown</h1>
            </div>
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
      </div>
    </>
  )
}
export default ImageDropdown
