// Import dependencies
import asyncHandler from 'express-async-handler'
import ProjectPost from '../models/projectPostModel.js'
import Image from '../models/imageModel.js'
import Category from '../models/categoriesModel.js'
import * as dotenv from 'dotenv'
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  ListObjectsV2Command
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import * as fs from 'fs/promises'
import colors from 'colors'
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

// Create a new project post
const createProjectPost = asyncHandler(async (req, res) => {
  try {
    const user = req.user._id
    const projectPost = new ProjectPost({
      ...req.body,
      author: user
    })
    await projectPost.save()
    res.status(200).json({ message: 'Project post created successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project post', error })
  }
})

// Get a project post by ID
const getProjectPostById = asyncHandler(async (req, res) => {
  const project = await ProjectPost.findById(req.params.id)
    .populate('author', 'firstName')
    .populate('images')
    .populate('categories')
    .populate('thumbnail', 'filename')

  if (project) {
    res.json(project)
  } else {
    res.status(404).json({ message: 'Project not found' })
  }
})

const getAllProjectPosts = asyncHandler(async (req, res) => {
  try {
    const projects = await ProjectPost.find({})
      .populate('thumbnail')
      .populate('categories')
      .populate('images')
    const projectsWithImages = await Promise.all(
      projects.map(async project => {
        const projectImages = await Promise.all(
          project.images.map(async image => {
            if (image && image.filename) {
              const imageUrl = await getSignedUrl(
                s3,
                new GetObjectCommand({
                  Bucket: bucketName,
                  Key: image.filename
                })
              )
              return { ...image._doc, url: imageUrl }
            }
            return null
          })
        )
        let thumbnailUrl = null
        if (project.thumbnail && project.thumbnail.filename) {
          thumbnailUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Bucket: bucketName,
              Key: project.thumbnail.filename
            })
          )
        }
        const filteredImageData = projectImages.filter(image => image !== null)
        const categoriesData = await Promise.all(
          project.categories.map(async categoryId => {
            const category = await Category.findById(categoryId)
            return category
          })
        )
        return {
          ...project._doc,
          thumbnail: thumbnailUrl
            ? { ...project.thumbnail._doc, url: thumbnailUrl }
            : project.thumbnail,
          images:
            filteredImageData.length > 0
              ? filteredImageData
              : project.images.map(image => image._id.toString()),
          categories: categoriesData
        }
      })
    )
    res.json(projectsWithImages)
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

// Update a project post by ID
const updateProjectPostById = asyncHandler(async (req, res) => {
  try {
    const { url } = req.body.links

    if (!url.match(/^https?:\/\//)) {
      return res.status(400).json({ message: 'Invalid URL format' })
    }

    const updatedProjectPost = await ProjectPost.findByIdAndUpdate(
      req.params.id,
      {
        author: req.user._id,
        title: req.body.title,
        subTitle: req.body.subTitle,
        description: req.body.description,
        published: req.body.published,
        likes: req.body.likes,
        images: req.body.images,
        categories: req.body.categories,
        links: req.body.links
      },
      { new: true }
    )

    if (!updatedProjectPost) {
      return res.status(404).json({ message: 'Project post not found' })
    }

    res.json({
      message: 'Project post updated successfully',
      data: updatedProjectPost
    })
  } catch (error) {
    res.status(500).json({ message: 'Error updating project post', error })
  }
})

// Delete a project post by ID
const deleteProjectPostById = asyncHandler(async (req, res) => {
  try {
    const deletedProject = await ProjectPost.findByIdAndDelete(req.params.id)

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' })
    }

    res.json({
      message: 'Project deleted successfully',
      data: deletedProject
    })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error })
  }
})

// Export controller functions
export {
  createProjectPost,
  updateProjectPostById,
  getProjectPostById,
  getAllProjectPosts,
  deleteProjectPostById
}
