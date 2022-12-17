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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      }
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)
// ----------------------------------------------------------------------------------------------------
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
export default BlogPost
