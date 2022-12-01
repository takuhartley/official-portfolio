import mongoose from 'mongoose'
const Schema = mongoose.Schema
// ----------------------------------------------------------------------------------------------------
const ProjectSchema = new Schema(
  {
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
    description: {
      type: String,
      required: true
    },
    published: {
      type: Boolean,
      default: false,
      required: true
    },
    likes: {
      type: Number,
      default: 0,
      required: true
    },
    technologies: [],
    images: {
      thumbnail: {
        name: { type: String },
        image: { type: String }
      },
      icon: {
        name: { type: String },
        image: { type: String }
      },
      articleImages: []
    },
    links: [
      {
        website: { type: String },
        websiteUrl: { type: String }
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
