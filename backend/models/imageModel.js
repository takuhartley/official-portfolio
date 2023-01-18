import mongoose from 'mongoose'
import mongooseGridFS from 'mongoose-gridfs'
const Schema = mongoose.Schema

// let gfs
// const conn = mongoose.connection
// conn.once('open', () => {
//   gfs = new mongooseGridFS({
//     collection: 'image',
//     model: 'Image',
//     mongooseConnection: conn
//   })
// })

const ImageSchema = new Schema(
  {
    name: {
      type: String
    },
    mimetype: {
      type: String
    },
    path: {
      type: String
    },
    originalname: String,
    size: {
      type: Number
    },
    filename: String,
    desc: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Image = mongoose.model('Image', ImageSchema)

export default Image
