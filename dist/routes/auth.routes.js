"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controllers_1 = require("../controllers/auth.controllers");
const fieldsValidate_1 = __importDefault(require("../middlewares/fieldsValidate"));
const jwtValidate_1 = __importDefault(require("../middlewares/jwtValidate"));
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'Correo Electrónico Inválido').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener min. 6 caractéres').isLength({ min: 6 }),
    fieldsValidate_1.default
], auth_controllers_1.loginUser);
router.post('/register', [
    (0, express_validator_1.check)('name', 'El Nombre es requerido').isLength({ min: 3 }),
    (0, express_validator_1.check)('email', 'Correo Electrónico inválido').isEmail(),
    (0, express_validator_1.check)('role', 'Rol inválido').isIn([1, 2]),
    (0, express_validator_1.check)('password', 'La contraseña debe tener min. 6 caractéres').isLength({ min: 6 }),
    fieldsValidate_1.default
], auth_controllers_1.registerUser);
router.get('/emailconfirmation', jwtValidate_1.default, auth_controllers_1.emailConfirmation);
router.post('/renew', [
    (0, express_validator_1.check)('email', 'Correo Electrónico Inválido').isEmail(),
    fieldsValidate_1.default
], auth_controllers_1.renewPassword);
router.put('/updatepassword', [
    (0, express_validator_1.check)('password', 'La contraseña debe tener min. 6 caractéres').isLength({ min: 6 }),
    fieldsValidate_1.default,
    jwtValidate_1.default
], auth_controllers_1.updatePassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map