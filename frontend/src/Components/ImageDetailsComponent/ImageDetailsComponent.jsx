import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listImageDetails } from '../../Redux/Actions/imageUploadActions'
import AlertComponent from '../../Components/AlertComponent/AlertComponent'
import LoadingComponent from '../../Components/LoadingComponent/LoadingComponent'
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
  console.log(formData)
  return (
    <>
     <div className="image-details-container" id="image-details-component">
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <AlertComponent />
      ) : (
        <img src={`/Images/${formData.filename}`} alt={formData.name} />
      )}
    </div>
    </>
  )
}

export default ImageDetailsComponent
