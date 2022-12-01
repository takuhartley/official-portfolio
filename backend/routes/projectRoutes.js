import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import {
	createProject,
	updateProject,
	getProjectById,
	getAllProjects,
	deleteProject,
} from '../controllers/projectController.js';

router.post('/new', createProject);
router.get('/', getAllProjects);
router.route('/:id').delete(protect, admin, deleteProject).get(getProjectById).put(protect, admin, updateProject);

export default router;
