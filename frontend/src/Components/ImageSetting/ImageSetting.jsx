import React from 'react'
import ImageUpload from '../ImageUpload/ImageUpload'
import ImageTable from '../ImageTable/ImageTable'
import ImageDetails from '../ImageDetails/ImageDetails'

const ImageSetting = () => {
  return (
    <div>
      <h1>Image Settings</h1>
      <ImageUpload />
      <ImageTable />
    </div>
  )
}

export default ImageSetting
