const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
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

module.exports = mongoose.model('Image', imageSchema)
