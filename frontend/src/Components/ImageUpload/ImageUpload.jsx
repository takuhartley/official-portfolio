import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Dropzone, { useDropzone } from 'react-dropzone'
import { uploadImage } from '../../Redux/Actions/imageUploadActions.js'

const ImageUpload = () => {
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState(null)
  const [imageName, setImageName] = useState('')
  const { acceptedFiles } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    }
  })

  const onDrop = acceptedFiles => {
    console.log(acceptedFiles[0])
    setSelectedFile(acceptedFiles[0])
    console.log('Front-End ' + acceptedFiles)
  }

  const onSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('name', imageName)
    console.log(...formData)
    dispatch(uploadImage(formData))
  }

  const acceptedFileItems = acceptedFiles.map(file => (
    <p key={file.path}>
      {file.path} - {file.size} bytes
    </p>
  ))
  return (
    <>
      <form onSubmit={onSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Dropzone multiple={false} onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <p>{acceptedFileItems}</p>
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
      {selectedFile !== null ? <img src={selectedFile} alt={imageName} /> : ''}
    </>
  )
}

export default ImageUpload
