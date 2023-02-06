import React from 'react'
import ImageUpload from '../../Components/ImageComponents/ImageUpload/ImageUpload'
import ImageTable from '../../Components/ImageComponents/ImageTable/ImageTable'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import './ImageSettingPage.scss'
const ImageSetting = () => {
  return (
    <>
      <Box className='image-settings-container'>
        <Container maxWidth='lg'>
          <div className='image-settings-header'>
            <h1 className='image-settings-title'>Image Settings ⚙️</h1>
          </div>
          <div className='image-settings-content'>
            <ImageUpload />
            <ImageTable />
          </div>
        </Container>
      </Box>
    </>
  )
}

export default ImageSetting
