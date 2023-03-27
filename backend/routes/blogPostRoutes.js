import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import {
  createBlogPost,
  searchBlogPost,
  getBlogPostById,
  getAllBlogPosts,
  updateBlogPostById,
  deleteBlogById
} from '../controllers/blogPostController.js'

router.post('/new', createBlogPost)
router.route('/').get(getAllBlogPosts)
router.route('/search').get(searchBlogPost)
router
  .route('/:id')
  .get(getBlogPostById)
  .patch(protect, admin, updateBlogPostById)
  .delete(protect, admin, deleteBlogById)

export default router
