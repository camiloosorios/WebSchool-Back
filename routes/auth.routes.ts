import { Router } from "express";
import { loginUser, registerUser, renewPassword } from "../controllers/auth.controllers";

const router = Router();

router.get('/login', loginUser);
router.post('/register', registerUser);
router.get('/renew', renewPassword);

export default router;