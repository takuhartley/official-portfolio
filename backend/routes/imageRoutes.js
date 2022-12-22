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
// Define the image upload route
router.post('/upload', protect, admin, imageUpload)

router.route('/').get(getAllImages)

router
  .route('/:id')
  .get(getImageById)
  .patch(protect, admin, updateImageById)
  .delete(protect, admin, deleteImageById)

export default router
