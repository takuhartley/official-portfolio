import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import {
  createCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
  deleteCategory
} from '../controllers/categoryController.js'

router.post('/new', protect, admin, createCategory)
router.route('/').get(getAllCategories)
router
  .route('/:id')
  .get(getCategoryById)
  .patch(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory)

export default router
