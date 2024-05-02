import express from 'express'
import { UpdateAdmin, addAdmin, deleteAdmin, getAdmin, getAdmins, signIn, signUp } from '../controllers/admin.controller';

const router = express.Router();

router.get('/get-admins',getAdmins)
router.post('/add-admin',addAdmin)
router.get('/get-admin/:admin_id',getAdmin)
router.put('/update-admin/:admin_id',UpdateAdmin)
router.delete('/delete-admin/:admin_id',deleteAdmin)
router.post('/adminsign-up',signUp)
router.post('/adminsign-in',signIn)

export default router
