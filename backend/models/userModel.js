import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import uniqueValidator from 'mongoose-unique-validator'
import Joi from 'joi'
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    dob: {
      type: Date
    },
    thumbnail: {
      type: Schema.Types.ObjectId,
      ref: 'Image'
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.plugin(uniqueValidator)

userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName
})

userSchema.statics.validateUserInput = function (userInput) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    dob: Joi.date().optional()
  })
  return schema.validate(userInput)
}

const User = mongoose.model('User', userSchema)

export default User
