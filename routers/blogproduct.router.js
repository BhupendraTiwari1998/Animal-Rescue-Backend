import express from 'express';
import { addBlogProduct, deleteBlog, getBlog, getBlogProducts, updateBlog } from '../controllers/blogproduct.controller';

const router = express.Router();

router.get('/get-blogproduct', getBlogProducts)
router.post('/add-blogproduct', addBlogProduct)
router.get('/get-singleblog/:bloging_id',getBlog)
router.delete('/delete-blogproduct/:blog_id', deleteBlog)
router.put('/update-blogproduct/:update_id',updateBlog)

export default router