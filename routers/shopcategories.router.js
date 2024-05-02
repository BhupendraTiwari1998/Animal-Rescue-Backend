import express from 'express';
import { addShopCategories, deleteShopcategories, getShopCategories, getShopcategory, updateShopCategories } from '../controllers/shopcategories.controller';

const router = express.Router();

router.get('/get-shopcategories', getShopCategories)
router.post('/add-shopcategories', addShopCategories)
router.get('/get-shopping/:shopping_id',getShopcategory)
router.delete('/delete-shopcategories/:shop_id', deleteShopcategories)
router.put('/update-shopcategories/:updateShop_id', updateShopCategories)

export default router