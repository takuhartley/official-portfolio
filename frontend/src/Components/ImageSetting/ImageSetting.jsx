import React from 'react'
import ImageUpload from '../ImageUpload/ImageUpload'
import ImageTable from '../ImageTable/ImageTable'
import ImageDetails from '../ImageDetails/ImageDetails'

const ImageSetting = () => {
  return (
    <div>
      <ImageUpload />
      <ImageTable />
      <ImageDetails />
    </div>
  )
}

export default ImageSetting
