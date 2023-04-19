import express from 'express'
import multer from 'multer'
import mime from 'mime-types'
import { config } from 'dotenv-flow'
config()
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  S3Client
} from '@aws-sdk/client-s3'
import {
  imageUpload,
  getImageById,
  updateImageById,
  deleteImageById,
  getAllImages
} from '../controllers/imageController.js'

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/gif']
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

const MAX_FILE_SIZE = 5000000 // 5MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images') // set the destination to the public/images folder
  },
  filename: function (req, file, cb) {
    const extension = mime.extension(file.mimetype)
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
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
