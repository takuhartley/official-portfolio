import asyncHandler from 'express-async-handler'
import ProjectPost from '../models/projectPostModel.js'

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

const getProjectPostById = asyncHandler(async (req, res) => {
  const project = await ProjectPost.findById(req.params.id)
    .populate('author', 'firstName')
    .populate('images')
    .populate('categories')
    .populate('thumbnail', 'filename')
  if (project) {
    res.json(project)
  } else {
    res.status(404)
    throw new Error('Project not found')
  }
})

const getAllProjectPosts = asyncHandler(async (req, res) => {
  try {
    const projects = await ProjectPost.find({})
      .populate('images')
      .populate('thumbnail')
      .populate('categories')

    res.json(projects)
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

const updateProjectPostById = asyncHandler(async (req, res) => {
  try {
    // Extract the URL from the request body
    const { url } = req.body.links
    // Validate the URL
    if (!url.match(/^https?:\/\//)) {
      return res.status(400).json({ message: 'Invalid URL format' })
    }
    // Find the project post by ID and update it
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
      return res.status(404).send({ message: 'Project post not found' })
    }
    // Return a success message
    return res.send({
      message: 'Project post updated successfully',
      data: updatedProjectPost
    })
  } catch (error) {
    // Return an error message
    return res
      .status(500)
      .send({ message: 'Error updating project post', error })
  }
})

const deleteProjectPostById = asyncHandler(async (req, res) => {
  try {
    // Find the project by ID and delete it
    const deletedProject = await ProjectPost.findByIdAndDelete(req.params.id)
    if (!deletedProject) {
      return res.status(404).send({ message: 'Project not found' })
    }
    // Return a success message
    return res.send({
      message: 'Project deleted successfully',
      data: deletedProject
    })
  } catch (error) {
    // Return an error message
    return res.status(500).send({ message: 'Error deleting project', error })
  }
})

export {
  createProjectPost,
  updateProjectPostById,
  getProjectPostById,
  getAllProjectPosts,
  deleteProjectPostById
}
