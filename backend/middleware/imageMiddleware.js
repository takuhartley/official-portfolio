import multer from 'multer'
import mime from 'mime-types'

// Set allowed file types and maximum file size
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/gif']
const MAX_FILE_SIZE = 5000000 // 5MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Receiving file:', file) // <-- added this line
    cb(null, '/Images') // set the destination to the public/images folder
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

export { upload }
