import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import AlertComponent from '../../Components/AlertComponent/AlertComponent'
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'
import { listImageDetails } from '../../Redux/Actions/imageUploadActions.js'
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
import { useDispatch, useSelector } from 'react-redux'
const ImageDetails = () => {
  const { id } = useParams()
  const imageId = id
  const navigate = useNavigate()
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
  const dispatch = useDispatch()
  const imageDetails = useSelector(state => state.imageDetails)
  const { loading, error, image } = imageDetails
  useEffect(() => {
    dispatch(listImageDetails(imageId))
  }, [dispatch, imageId])
  useEffect(() => {
    if (image) {
      setFormData({
        id: image._id,
        author: image.author,
        name: image.name,
        desc: image.desc,
        path: image.path,
        originalname: image.originalname,
        size: image.size,
        filename: image.filename
      })
    }
  }, [image, setFormData])
  return (
    <Container>
      <img
        src={`/Images/${image.filename}`}
        alt={image.name}
        className='table-img'
      />
      <div>
        <p id='id'>ID: {formData.id}</p>
      </div>
      <div>
        <p id='name'>Name: {formData.name}</p>
      </div>
      <div>
        <p id='desc'>Description: {formData.desc}</p>
      </div>
      <div>
        <p id='path'>Path: {formData.path}</p>
      </div>
      <div>
        <p id='originalname'>Original Name: {formData.originalname}</p>
      </div>
      <div>
        <p id='filename'>File Name: {formData.filename}</p>
      </div>
      <div>
        <p id='size'>Size: {formData.size}</p>
      </div>
      <div>
        <p id='author'>Author: {formData.author}</p>
      </div>
    </Container>
  )
}

export default ImageDetails
