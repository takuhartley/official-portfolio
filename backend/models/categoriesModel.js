import mongoose from 'mongoose'
const Schema = mongoose.Schema
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    blogPost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Category = mongoose.model('Category', CategorySchema)

export default Category
