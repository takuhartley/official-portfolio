import React, { useState, useEffect } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage } from '../../Redux/Actions/imageUploadActions.js'
import AlertComponent from '../AlertComponent/AlertComponent'
import LoadingComponent from '../LoadingComponent/LoadingComponent'

import { IMAGE_UPDATE_RESET } from '../../Redux/Constants/imageConstants.js'
const ImageUpload = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageName, setImageName] = useState('')
  const [imageDesc, setImageDesc] = useState('')
  const [loadingTime, setLoadingTime] = useState(null)
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setSelectedFile(acceptedFiles[0])
    }
  })
  // Define project details from state
  const imageUpload = useSelector(state => state.imageUpload)
  const { loading, success, error } = imageUpload
  useEffect(() => {
    if (success) {
      dispatch({ type: IMAGE_UPDATE_RESET })
      navigate(`/dashboard`)
    }
  })
  const onSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('name', imageName)
    formData.append('desc', imageDesc)
    const start = performance.now()
    dispatch(uploadImage(formData))
    const end = performance.now()
    setLoadingTime(end - start)
    navigate(`/dashboard`)
  }

  return (
    <>
      <h1>Image Upload</h1>
      {loading && <LoadingComponent />}
      <form onSubmit={onSubmit}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select a file</p>
        </div>
        <br />
        <label htmlFor='name'>Image Name: </label>
        <input
          type='text'
          id='name'
          value={imageName}
          onChange={e => setImageName(e.target.value)}
        />
        <label htmlFor='desc'>Description: </label>
        <input
          type='text'
          id='desc'
          value={imageDesc}
          onChange={e => setImageDesc(e.target.value)}
        />
        <br />
        <button type='submit'>Submit</button>
      </form>
      {selectedFile !== null ? (
        <img src={URL.createObjectURL(selectedFile)} alt={imageName} />
      ) : (
        ''
      )}
    </>
  )
}

export default ImageUpload
