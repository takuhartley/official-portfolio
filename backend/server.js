// Import dependencies
import dotenv from 'dotenv'
import express from 'express'
import colors from 'colors'

// Import database connection function and error middleware
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

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

// Parse request body as JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Define routes
app.get('/', (req, res) => {
  res.send('API running nicely boss')
})
app.use('/api/users', userRoutes)
app.use('/api/projects', projectPostRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/blogs', blogPostRoutes)

// Use error middleware
app.use(notFound)
app.use(errorHandler)

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
