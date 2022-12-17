import path from 'path'
import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  imageUpload,
  getImageById,
  updateImageById,
  deleteImageById,
  getAllImages
} from '../controllers/imageController.js'
import { fileUploadMiddleware } from '../middleware/fileUploadMiddleware.js'
// Define the image upload route
router.post('/upload', protect, admin, fileUploadMiddleware)
router.route('/all').get(getAllImages)
router
  .route('/:id')
  .get(getImageById)
  .patch(protect, admin, updateImageById)
  .delete(protect, admin, deleteImageById)
export default router
