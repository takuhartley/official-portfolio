import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ImageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})
