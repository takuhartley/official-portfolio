const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment
