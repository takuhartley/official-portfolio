import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  createProject,
  updateProject,
  getProjectById,
  getAllProjects,
  deleteProject
} from '../controllers/projectController.js'

router.post('/new', createProject)
router.route('/').get(getAllProjects)
router.route('/:id').get(getProjectById)
export default router
