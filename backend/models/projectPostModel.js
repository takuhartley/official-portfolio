import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProjectSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    subTitle: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000
    },
    body: {
      type: String,
      required: true,
      minlength: 100,
      maxlength: 5000
    },
    published: {
      type: Boolean,
      default: false
    },
    likes: {
      type: Number,
      default: 0,
      min: 0
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
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        }
      }
    ],
    numLinks: {
      type: Number,
      virtual: true,
      get: function () {
        return this.links.length
      }
    }
  },
  {
    timestamps: true
  }
)

ProjectSchema.index({ title: 1 })

ProjectSchema.pre('save', function (next) {
  if (this.isModified('published') && this.published) {
    // do something before saving if project is published
  }
  next()
})

ProjectSchema.pre('remove', function (next) {
  // do something before removing project
  next()
})

const Project = mongoose.model('Project', ProjectSchema)

export default Project
