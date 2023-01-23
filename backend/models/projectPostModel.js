import mongoose from 'mongoose'
const Schema = mongoose.Schema
// ----------------------------------------------------------------------------------------------------
const ProjectSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    published: {
      type: Boolean,
      default: false
    },
    likes: {
      type: Number,
      default: 0
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Image'
      }
    ],
    thumbnail: {
      type: Schema.Types.ObjectId,
      ref: 'Image'
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category'
      }
    ],
    links: [
      {
        url: {
          type: String
        },
        description: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
)
// ----------------------------------------------------------------------------------------------------
const Project = mongoose.model('Project', ProjectSchema)

export default Project
