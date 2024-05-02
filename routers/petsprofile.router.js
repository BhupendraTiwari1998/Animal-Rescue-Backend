import express from 'express';
import { addPetProfile, deleteProfile, getPetProfiles, getpetProfile, updateProfile } from '../controllers/petsprofile.controller';

const router = express.Router();

router.get('/get-petprofiles', getPetProfiles)
router.post('/add-petprofile', addPetProfile)
router.get('/get-petprofile/:profile_id', getpetProfile)
router.put('/update-profile/:profile_id', updateProfile)
router.delete('/delete-profile/:profile_id', deleteProfile)

export default router