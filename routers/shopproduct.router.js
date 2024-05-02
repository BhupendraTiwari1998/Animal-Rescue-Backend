import express from 'express';
import { addShopProduct, deleteShop, getShop, getShopProducts, updateShop } from '../controllers/shopproduct.controller.';

const router = express.Router();

router.get('/get-shopproduct', getShopProducts)
router.post('/add-shopproduct', addShopProduct)
router.get('/get-shop/:shopping_id', getShop)
router.delete('/delete-shopproduct/:shop_id', deleteShop)
router.put('/update-shopproduct/:update_id',updateShop)

export default router