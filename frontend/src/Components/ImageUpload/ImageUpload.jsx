import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Dropzone, { useDropzone } from 'react-dropzone'
import { uploadImage } from '../../Redux/Actions/imageUploadActions.js'

const ImageUpload = () => {
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState(null)
  const [imageName, setImageName] = useState('')
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setSelectedFile(acceptedFiles[0])
    }
  })

  const onSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('name', imageName)
    console.log(formData)
    dispatch(uploadImage(formData))
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
