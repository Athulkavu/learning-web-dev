import express from 'express';
import { checkSchema } from 'express-validator';
import authenticateUser from '../middlewares/authenticate.js';
import categoryController from '../controllers/categoryController.js';
import { categoryValidationSchema } from '../validations/categoryValidationSchema.js';

const router = express.Router();

router.use(authenticateUser);
router.post('/', checkSchema(categoryValidationSchema), categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', checkSchema(categoryValidationSchema), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
