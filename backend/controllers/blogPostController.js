import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import BlogPost from '../models/blogPostModel.js'
import User from '../models/userModel.js'
// Create a new blog post
const createBlogPost = asyncHandler(async (req, res) => {
  try {
    // Get the logged-in user from the request
    const user = req.user

    // Create a new blog post object with the request body and the user as the author
    const blogPost = new BlogPost({
      ...req.body,
      author: user._id
    })

    // Save the blog post to the database
    await blogPost.save()

    // Send a response with the created blog post
    res.json({ message: 'Blog post created successfully', post: blogPost })
  } catch (error) {
    // If there is an error, send a response with the error status code
    res.status(error.status || 500).send(error.message)
  }
})

// Search
const searchBlogPost = asyncHandler(async (req, res) => {
  const searchTerm = req.query.term
  try {
    // Create a full-text search index on the blog posts collection
    await BlogPost.createIndex({ title: 'text', body: 'text' })

    // Perform a search on the blog posts collection using the $text operator
    const searchResults = await BlogPost.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } })

    // Send the search results as a response
    res.json({ searchResults })
  } catch (error) {
    // If there is an error, send a response with the error status code
    res.status
  }
})
// Read 1
const getBlogPostById = asyncHandler(async (req, res) => {
  const blog = await BlogPost.findById(req.params.id)
  if (!blog) {
    return res.status(404).send({ error: 'Blog Post not found' })
  }
  res.send(blog)
})

// Read all
const getAllBlogPosts = asyncHandler(async (req, res) => {
  try {
    const blogPosts = await BlogPost.find()
    res.send({ success: true, blogPosts })
  } catch (error) {
    res.send({ success: false, error: error.message })
  }
})

// Update blog post by Id
const updateBlogPostById = asyncHandler(async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!blog) {
      return res.status(404).send({ error: 'Blog not found' })
    }
    res.send({ success: true, blog })
  } catch (error) {
    res.send({ success: false, error: error.message })
  }
})

// Delete
const deleteBlogById = asyncHandler(async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndDelete(req.params.id)
    if (!blog) {
      return res.status(404).send({ error: 'Blog not found' })
    }
    res.send({ success: true })
  } catch (error) {
    res.send({ success: false, error: error.message })
  }
})

export {
  createBlogPost,
  searchBlogPost,
  getBlogPostById,
  getAllBlogPosts,
  updateBlogPostById,
  deleteBlogById
}
