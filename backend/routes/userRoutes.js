import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import {
	authUser,
	registerUser,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} from '../controllers/userController.js';

router.route('/').post(registerUser).get(protect, getUsers);
router.post('/login', authUser);

router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser);

export default router;
