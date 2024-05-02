import express from 'express';
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/categories.controller';

const router = express.Router();

router.get('/get-categories', getCategories)
router.post('/add-category', addCategory)
router.get('/get-category/:category_id',getCategory)
router.delete('/delete-category/:category_id', deleteCategory)
router.put('/update-category/:update_id', updateCategory)

export default router