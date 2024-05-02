import express from "express";
import { AddUser, DeleteUser, GetUser, GetUsers, SignUp, Signin, UpdateUser } from "../controllers/user.controller";

const router = express.Router()

router.get('/get-users',GetUsers)
router.post('/add-user',AddUser)
router.get('/get-user/:user_id',GetUser)
router.delete('/delete-user/:user_id',DeleteUser)
router.put('/update-user/:user_id',UpdateUser)

// auth

router.post('/sign-up',SignUp)
router.post('/sign-in',Signin)

export default router