import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categories-cltr.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';

const router = express.Router();

// All routes are protected
router.use(authenticateUser);

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
