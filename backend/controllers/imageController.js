import asyncHandler from 'express-async-handler'
import Image from '../models/imageModel.js'
import { v4 as uuidv4 } from 'uuid'
import {
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  S3Client
} from '@aws-sdk/client-s3'
import * as fs from 'fs'

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
console.log('Bucket Region ' + process.env.AWS_BUCKET_NAME)
const bucketAccessKey = process.env.AWS_ACCESS_KEY
const bucketSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
  Region: bucketRegion,
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey
  }
})

const imageUpload = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file was uploaded' })
    }
    if (!req.file.originalname) {
      return res.status(400).send({ message: 'The image must have a filename' })
    }

    const fileStream = fs.createReadStream(req.file.path)
    console.log(req.file.filename)
    const key = req.file.filename
    // const newImage = new Image({
    //   name: req.body.name,
    //   desc: req.body.desc,
    //   mimetype: req.file.mimetype,
    //   path: req.file.path,
    //   originalname: req.file.originalname,
    //   size: req.file.size,
    //   author: req.user._id,
    //   filename: req.file.filename
    // })
    console.log('working')
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: fileStream
    }
    console.log('here')
    const data = await s3.send(new PutObjectCommand(uploadParams))

    console.log(
      'Successfully uploaded object: ' +
        uploadParams.Bucket +
        '/' +
        uploadParams.Key
    )
    return data
  } catch (error) {
    console.log('Error', error)
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
    const bucketParams = {
      Bucket: bucketName
    }
    const data = await s3.send(new ListObjectsV2Command(bucketParams))
    console.log('Success', data)
    return data // For unit tests.
  } catch (error) {
    console.log('Error', error)
  }
})

const getImageById = asyncHandler(async (req, res) => {
  // get the image ID from the request parameters
  const imageId = req.params.id
  const key = req.file.filename
  const bucketParams = {
    Bucket: bucketName,
    Key: key,
    Region: bucketRegion
  }
  const data = await s3Client.send(new GetObjectCommand(bucketParams))
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
