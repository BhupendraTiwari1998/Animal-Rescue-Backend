import express from 'express'
import { addBlogCategory, blogCategory, deleteBlogcategory, getBlogCategories, updateBlogCategory } from '../controllers/blogcategories.controller';

const router = express.Router();

router.get('/get-blogcategories', getBlogCategories)
router.post('/add-blogcategory', addBlogCategory)
router.get('/get-blogcategory/:blog_id',blogCategory)
router.delete('/delete-blogcategory/:blog_id', deleteBlogcategory)
router.put('/update-blogcategory/:update_id', updateBlogCategory)

export default router