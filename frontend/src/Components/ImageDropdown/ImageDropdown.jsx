import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AlertComponent from '../AlertComponent/AlertComponent'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { listImages } from '../../Redux/Actions/imageUploadActions.js'

const ImageDropdown = (props) => {
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
  const handleChange = e => {
    props.onChange(e.target.value)
  }
  return (
    <div>
      {loading && <LoadingComponent></LoadingComponent>}
      {error && <AlertComponent severity='danger'>{error}</AlertComponent>}
      {images && (
        <FormControl>
          <InputLabel id='image-select-label'>Image</InputLabel>
          <Select
            labelId='image-select-label'
            id='image-select'
            onChange={handleChange}
          >
            {images.map(image => (
              <MenuItem key={image._id} value={image._id}>
                {image.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select an Image</FormHelperText>
        </FormControl>
      )}
    </div>
  )
}

export default ImageDropdown
