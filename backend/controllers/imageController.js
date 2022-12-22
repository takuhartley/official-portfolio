import asyncHandler from 'express-async-handler'
import Image from '../models/imageModel.js'
import { upload } from '../middleware/imageMiddleware.js'

const imageUpload = asyncHandler(upload.single('file'), async (req, res) => {
  try {
    // Check if a file was actually uploaded
    console.log('This is from express image controller' + '-' + req.file)
    // Create a new image object with the uploaded image data
    const image = new Image({})

    // Save the image to the database
    await image.save()

    // Return a success message
    return res.send({
      message: 'Image uploaded and saved successfully',
      data: image
    })
  } catch (error) {
    // Return an error message
    return res.status(500).send({ message: 'Error saving image', error })
  }
})

// const imageSearch = asyncHandler(async (req, res) => {})
const deleteImageById = asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id)
  if (!image) {
    // image not found
    return res.status(404).send({ message: 'Image not found' })
  }

  // delete the image from the database
  await image.remove()

  // send a success response
  res.send({ message: 'Image deleted successfully' })
})

const getAllImages = asyncHandler(async (req, res) => {
  // find all images in the database
  const images = await Image.find({})
  if (!images || images.length === 0) {
    // if no images are found, return a custom message
    return res.status(200).json({
      success: true,
      message: 'No images in database'
    })
  }
  // if images are found, return the list of images
  return res.status(200).json({
    success: true,
    message: 'Images retrieved successfully',
    data: images
  })
})

const getImageById = asyncHandler(async (req, res) => {
  // get the image ID from the request parameters
  const imageId = req.params.id
  // find the image in the database by ID
  const image = await Image.findById(imageId)
  if (!image) {
    // if no image is found, return a custom message
    return res.status(404).json({
      success: false,
      message: 'Image not found'
    })
  }
  // if the image is found, return the image
  return res.status(200).json({
    success: true,
    message: 'Image retrieved successfully',
    data: image
  })
})

const updateImageById = asyncHandler(async (req, res) => {
  // Find the image by ID
  const image = await Image.findById(req.params.id)

  // If no image was found, return a "no images in database" message
  if (!image) {
    return res.status(404).json({ message: 'no images in database' })
  }

  // Update the fields
  image.filename = req.body.filename
  image.mimetype = req.body.mimetype
  image.path = req.body.path
  image.originalname = req.body.originalname

  // Save the updated image
  await image.save()

  // Return a success message
  res.json({ message: 'image updated successfully' })
})

export {
  imageUpload,
  getImageById,
  updateImageById,
  deleteImageById,
  getAllImages
}
