// Dependencies
// import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
// import morgan from 'morgan'
// import cors from 'cors'
import projects from './data/projects.js'
import colors from 'colors'
// ----------------------------------------------------------------------------------------------------
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// ----------------------------------------------------------------------------------------------------
// Routes (Import):
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
// ----------------------------------------------------------------------------------------------------
dotenv.config()
// ----------------------------------------------------------------------------------------------------
// Function running to connect express with database
// connectDB(); was imported from another file and
// Sends a connection request using .env file and returns
// The connection
connectDB()
// ----------------------------------------------------------------------------------------------------
const app = express()
// Asking express to use json as a default-------------------------------------------------------------
app.use(express.json())
// app.use(
//   express.urlencoded({
//     extended: true
//   })
// )
// ----------------------------------------------------------------------------------------------------
// Initial Test Route
app.get('/', (req, res) => {
  res.send('API running nicely boss')
})
app.get('/api/projects', (req, res) => {
  res.json(projects)
})
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p._id === req.params.id)
  res.json(project)
})
// Routes----------------------------------------------------------------------------------------------
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/upload', uploadRoutes)
// ----------------------------------------------------------------------------------------------------
// Middleware
//app.use(morgan('dev'))
// app.use(
//   express.urlencoded({
//     extended: true
//   })
// )
// app.use(cors())
// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   )
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....')
//   })
// }
app.use(notFound)
app.use(errorHandler)
// ----------------------------------------------------------------------------------------------------
const PORT = process.env.PORT || 5000
// ----------------------------------------------------------------------------------------------------
app.listen(
  PORT,
  console.log(
    `Server runny in ${process.env.NODE_ENV} modey on porty ${PORT} boss`.green
      .underline.bold
  )
)
