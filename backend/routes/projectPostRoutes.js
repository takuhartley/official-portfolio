import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  createProjectPost,
  updateProjectPostById,
  getProjectPostById,
  getAllProjectPosts,
  deleteProjectPostById
} from '../controllers/projectPostController.js'

router.post('/new', protect, admin, createProjectPost)
router.route('/').get(getAllProjectPosts)
router
  .route('/:id')
  .get(getProjectPostById)
  .patch(protect, admin, updateProjectPostById)
  .delete(protect, admin, deleteProjectPostById)
export default router
