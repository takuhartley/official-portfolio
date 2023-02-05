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
    color: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Category = mongoose.model('Category', CategorySchema)

export default Category
