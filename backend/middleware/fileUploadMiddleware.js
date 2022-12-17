import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images') // set the destination to the public/images folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()) // set the file name to the fieldname plus the current timestamp
  }
})

const upload = multer({ storage: storage })

const fileUploadMiddleware = (req, res, next) => {
  // use the `upload` middleware function to handle the file upload
  upload.single('image')(req, res, err => {
    if (err) {
      // an error occurred while uploading the file
      return res.status(400).send({ message: 'Error uploading file' })
    }

    // the file has been successfully uploaded
    const fileData = {
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      path: req.file.path,
      originalname: req.file.originalname
    }

    // add the file data to the request object
    req.fileData = fileData
  })
}

export { fileUploadMiddleware }
