import mongoose from 'mongoose'
const Schema = mongoose.Schema
// ----------------------------------------------------------------------------------------------------
const BlogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  category: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  },
  body: {
    type: String,
    requred: true
  },
  images: {
    thumbnail: {
      type: String
    },
    mainImage: {
      type: String
    },
    subImage: {
      type: String
    },
    imageCollection: []
  },
  edited: {
    type: Date,
    default: Date.now()
  },
  published: {
    type: Date,
    default: Date.now()
  },
  private: {
    type: Boolean,
    default: true
  }
})
// ----------------------------------------------------------------------------------------------------
module.exports = Post = mongoose.model('post', PostSchema)
