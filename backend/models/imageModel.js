import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      unique: true
    },
    mimetype: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    originalname: String,
    size: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)
const Image = mongoose.model('Image', ImageSchema)

export default Image
