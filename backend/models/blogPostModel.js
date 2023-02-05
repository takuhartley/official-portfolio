import mongoose from 'mongoose'
const Schema = mongoose.Schema
// ----------------------------------------------------------------------------------------------------
const BlogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category'
      }
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    likes: {
      type: Number,
      default: 0
    },
    thumbnail: {
      type: Schema.Types.ObjectId,
      ref: 'Image'
    }
  },
  {
    timestamps: true
  }
)
// ----------------------------------------------------------------------------------------------------
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
export default BlogPost
