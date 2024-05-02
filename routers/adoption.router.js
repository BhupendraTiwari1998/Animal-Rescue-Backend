import express from 'express';
import { addAdoption, deleteAdoption, getAdoptions, getadoption, updatePet } from '../controllers/adoption.controller';

const router = express.Router();

router.get('/get-adoptions', getAdoptions)
router.post('/add-adoption', addAdoption)
router.get('/get-adoption/:adoption_id', getadoption)
router.delete('/delete-pets/:adoption_id', deleteAdoption)
router.put('/update-pets/:update_id', updatePet)

export default router