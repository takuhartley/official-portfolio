import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listImageDetails } from '../../../Redux/Actions/imageUploadActions'
import AlertComponent from '../../AlertComponent/AlertComponent'
import LoadingComponent from '../../LoadingComponent/LoadingComponent'
import './ImageComponent.scss'
const ImageDetailsComponent = ({ imageId }) => {
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
  const { loading, error, imageData: image } = imageDetails
  useEffect(() => {
    dispatch(listImageDetails(imageId))
  }, [dispatch, imageId, formData.id, image, formData.name])
  return (
    <>
      <div className='image-details-container' id='image-details-component'>
        <img src={formData.filename} alt={formData.name} />
      </div>
    </>
  )
}

export default ImageDetailsComponent
