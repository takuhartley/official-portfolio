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
    required: true
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
    imageCollection: [ImageSchema]
  },
  edited: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Date,
    default: Date.now
  }
})
// ----------------------------------------------------------------------------------------------------
const BlogPost = mongoose.model('post', BlogPostSchema)
module.exports = BlogPost
