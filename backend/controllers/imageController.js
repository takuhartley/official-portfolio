import asyncHandler from 'express-async-handler'
import Image from '../models/imageModel.js'
//import { upload } from '../middleware/imageMiddleware.js'

const imageUpload = asyncHandler(async (req, res) => {
  try {
    // Check if a file was actually uploaded
    if (!req.file) {
      return res.status(400).send({ message: 'No file was uploaded' })
    }
    // Check if the file has a non-empty originalname
    if (!req.file.originalname) {
      return res.status(400).send({ message: 'The image must have a filename' })
    }
    // Create new image object
    const newImage = new Image({
      name: req.body.name,
      desc: req.body.desc,
      mimetype: req.file.mimetype,
      path: req.file.path,
      originalname: req.file.originalname,
      size: req.file.size,
      author: req.user._id,
      filename: req.file.filename
    })
    // Save the image to the database
    await newImage.save()

    // Return a success message
    return res.status(201).send({
      message: 'Image uploaded and saved successfully',
      data: newImage
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
  try {
    // find all images in the database
    const images = await Image.find({})
    res.json({ images })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
  // if images are found, return the list of images
  return res.status(200).json({
    success: true,
    error: err.message
  })
})

const getImageById = asyncHandler(async (req, res) => {
  // get the image ID from the request parameters
  const imageId = req.params.id
  // find the image in the database by ID
  const image = await Image.findById(imageId)
  if (image) {
    res.json(image)
  } else {
    res.status(404)
    throw new Error('Image not found')
  }
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
