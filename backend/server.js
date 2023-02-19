// Import dependencies
import dotenv from 'dotenv'
import express from 'express'
import colors from 'colors'
import path from 'path'
// Import database connection function and error middleware
import connectDB from './config/db.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3'
// Import routes
import userRoutes from './routes/userRoutes.js'
import projectPostRoutes from './routes/projectPostRoutes.js'
import imageRoutes from './routes/imageRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import blogPostRoutes from './routes/blogPostRoutes.js'

// Load environment variables
dotenv.config()
// Connect to database
connectDB()

// Initialize Express app
const app = express()
const __dirname = path.resolve()
// Parse request body as JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Define routes
app.use('/api/users', userRoutes)
app.use('/api/projects', projectPostRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/blog-posts', blogPostRoutes)

// Use error middleware
// app.use(notFound)
app.use(errorHandler)
app.use('/Images', express.static('./Images'))
// Production
if (process.env.NODE_ENV === 'production') {
  console.log('production')
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
  console.log('Got here')
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
// Set port for the server
const PORT = process.env.PORT || 5000

// Start the server
app.listen(
  PORT,
  console.log(
    `Server runny in ${process.env.NODE_ENV} mode on port ${PORT} boss`.green
      .underline.bold
  )
)
