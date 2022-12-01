import mongoose from 'mongoose'
const Schema = mongoose.Schema
// ----------------------------------------------------------------------------------------------------
const BlogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
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
  date: {
    type: Date,
    default: Date.now
  },
  private: {
    type: Boolean,
    default: true
  }
})
// ----------------------------------------------------------------------------------------------------
module.exports = Post = mongoose.model('post', PostSchema)
