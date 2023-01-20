import express from 'express'
import multer from 'multer'
import mime from 'mime-types'
//import GridFSStorage from 'multer-gridfs-storage'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  imageUpload,
  getImageById,
  updateImageById,
  deleteImageById,
  getAllImages
} from '../controllers/imageController.js'

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/gif']
const MAX_FILE_SIZE = 5000000 // 5MB
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images') // set the destination to the public/images folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // set the file name to the fieldname plus the current timestamp
  }
})

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type'), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
})

const router = express.Router()
router.post('/upload', upload.single('file'), protect, admin, imageUpload)
router.route('/').get(getAllImages)
router
  .route('/:id')
  .get(getImageById)
  .patch(protect, admin, updateImageById)
  .delete(protect, admin, deleteImageById)

export default router
