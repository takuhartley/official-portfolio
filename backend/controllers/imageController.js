import asyncHandler from 'express-async-handler'
import Image from '../models/imageModel.js'
import * as dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import colors from 'colors'
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  ListObjectsV2Command
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import * as fs from 'fs/promises'

dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const bucketAccessKey = process.env.AWS_ACCESS_KEY
const bucketSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey
  }
})

const imageUpload = asyncHandler(async (req, res) => {
  const { name, desc } = req.body

  if (!req.file) {
    res.status(400)
    throw new Error('No file was uploaded')
  }

  try {
    const key = req.file.filename
    const contentType = req.file.mimetype

    console.log(
      `Uploading image ${req.file.originalname} with key ${key} to S3 bucket ${bucketName}`
        .blue.bold
    )

    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: await fs.readFile(req.file.path),
      ContentType: contentType
    }
    const data = await s3.send(new PutObjectCommand(uploadParams))
    const imageUrl = `https://${bucketName}.s3.amazonaws.com/${key}`

    console.log(`Image uploaded successfully to ${imageUrl}`.green.bold)

    const image = new Image({
      name,
      desc,
      mimetype: contentType,
      path: imageUrl,
      originalname: req.file.originalname,
      size: req.file.size,
      author: req.user._id,
      filename: key
    })

    console.log(`Saving image metadata to MongoDB`.blue.bold)

    await image.save()

    console.log(`Image metadata saved successfully`.green.bold)

    res.status(201).json({
      success: true,
      data: image
    })
  } catch (error) {
    console.error(error.red.bold)
    res.status(500)
    throw new Error('Server error')
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
  const name = req.query.name

  try {
    let images

    if (name) {
      console.log('Fetching images with name:', name.yellow)
      const dbImages = await Image.find({
        name: { $regex: name, $options: 'i' }
      })
      const dbImageDict = {}
      dbImages.forEach(img => (dbImageDict[img.name] = img))

      const listParams = {
        Bucket: bucketName
      }

      const data = await s3.send(new ListObjectsV2Command(listParams))
      images = await Promise.all(
        data.Contents.map(async item => {
          const imageUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Bucket: bucketName,
              Key: item.Key
            })
          )

          let img = {
            url: imageUrl,
            name: item.Key,
            lastModified: item.LastModified,
            imageSize: item.Size
          }

          if (dbImageDict.hasOwnProperty(item.Key)) {
            const dbImg = dbImageDict[item.Key]
            img = {
              ...img,
              desc: dbImg.desc,
              mimetype: dbImg.mimetype,
              author: dbImg.author,
              filename: dbImg.filename
            }
          }

          return img
        })
      )
    } else {
      console.log('Fetching all images'.yellow)
      const listParams = {
        Bucket: bucketName
      }

      const data = await s3.send(new ListObjectsV2Command(listParams))
      images = await Promise.all(
        data.Contents.map(async item => {
          const imageUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Bucket: bucketName,
              Key: item.Key
            })
          )
          return {
            url: imageUrl,
            name: item.Key,
            lastModified: item.LastModified,
            imageSize: item.Size
          }
        })
      )
    }

    res.status(200).json(images)
  } catch (error) {
    console.error(error.message.red)
    res.status(500).json({ message: 'Server error' })
  }
})

const getImageById = asyncHandler(async (req, res) => {
  // get the image ID from the request parameters
  const imageId = req.params.id
  const key = req.file.filename
  const bucketParams = {
    Bucket: bucketName,
    Key: key,
    region: bucketRegion
  }
  const data = await s3.send(new GetObjectCommand(bucketParams))
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
