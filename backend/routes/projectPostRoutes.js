// Import dependencies
import express from 'express'
import {
  projectValidationRules,
  validate
} from '../middleware/projectValidationRules.js'
// Import middleware and controllers
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  createProjectPost,
  updateProjectPostById,
  getProjectPostById,
  getAllProjectPosts,
  deleteProjectPostById
} from '../controllers/projectPostController.js'

// Initialize router
const router = express.Router()

// Define routes
router.post(
  '/new',
  protect,
  admin,
  projectValidationRules,
  validate,
  createProjectPost
)
router.route('/').get(getAllProjectPosts)
router
  .route('/:id')
  .get(getProjectPostById)
  .patch(
    protect,
    admin,
    projectValidationRules,
    validate,
    updateProjectPostById
  )
  .delete(protect, admin, deleteProjectPostById)

// Export router
export default router
