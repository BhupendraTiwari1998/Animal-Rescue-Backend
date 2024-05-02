import express from 'express';
import { addAbout, deleteAbout, getAbout, getAboutUs, updateAbout } from '../controllers/aboutus.controller';

const router = express.Router();

router.get('/get-aboutus', getAboutUs)
router.post('/add-about', addAbout)
router.get('/get-about/:about_id' , getAbout)
router.delete('/delete-about/:about_id', deleteAbout)
router.put('/update-about/:update_id', updateAbout)


export default router