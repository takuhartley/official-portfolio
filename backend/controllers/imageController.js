import express from 'express'
import asyncHandler from 'express-async-handler'
import Image from '../models/imageModel.js'
const router = express.Router()
import multer from 'multer'
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const imageUpload = asyncHandler(async (req, res) => {
  try {
    // Create a new image object with the uploaded image data
    const image = new Image({
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      path: req.file.path,
      originalname: req.file.originalname
    })
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
  try {
    // retrieve all images from the database
    const images = await Image.find()

    // send a success response with the images data
    res.send({
      message: 'Images retrieved successfully',
      data: images
    })
  } catch (error) {
    // an error occurred while retrieving the images
    res.status(500).send({ message: 'Error retrieving images' })
  }
})

const getImageById = asyncHandler(async (req, res) => {})
const updateImageById = asyncHandler(async (req, res) => {})

export {
  imageUpload,
  getImageById,
  updateImageById,
  deleteImageById,
  getAllImages
}
