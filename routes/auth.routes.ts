import { Router } from "express";
import { check } from "express-validator";

import { loginUser, registerUser, renewPassword } from "../controllers/auth.controllers";
import fieldsValidate from '../helpers/fieldsValidate';

const router = Router();

router.post('/login', [
    check('email', 'Correo Electrónico Inválido').isEmail(),
    check('password', 'La contraseña debe tener min. 6 caractéres').isLength({ min: 6 }),
    fieldsValidate
],loginUser);

router.post('/register', [
    check('name', 'El Nombre es requerido').isLength({ min: 3 }),
    check('email', 'Correo Electrónico inválido').isEmail(),
    check('role', 'Rol inválido').isIn([1, 2]),
    check('password', 'La contraseña debe tener min. 6 caractéres').isLength({ min:6 }),
    fieldsValidate
],registerUser);

router.get('/renew', renewPassword);

export default router;