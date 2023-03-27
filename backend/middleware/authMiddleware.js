import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(' ')[1]

      // Verify the token's signature and decode its contents
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

      // Find the user associated with the token's ID
      req.user = await User.findById(decodedToken.id).select('-password')

      // Check if the token has expired
      const now = Date.now() / 1000
      if (decodedToken.exp < now) {
        throw new Error('Not Authorized: Token has expired')
      }

      // Call the input parameter function next()
      next()
    }

    if (!token) {
      throw new Error('Not Authorized: No token provided')
    }
  } catch (error) {
    console.error(error)
    res.status(401)
    throw new Error('Not Authorized: Failure with token')
  }
})

const admin = (req, res, next) => {
  // Check if the user is an admin
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Authorized: Not an admin')
  }
}

export { protect, admin }
