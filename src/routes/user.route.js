import express from 'express'
import { login, signup, createAdmin } from '../controllers/User.controller.js';
import verifyToken from '../middleware/auth.middleware.js';
import verifyAdmin from '../middleware/admin.middleware.js';


const router=express.Router();
router.post("/signup", signup)
router.post("/login", login)
router.post("/admin/create", verifyToken, verifyAdmin, createAdmin)

export default router;