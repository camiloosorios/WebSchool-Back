"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const router = (0, express_1.Router)();
router.get('/login', auth_controllers_1.loginUser);
router.post('/register', auth_controllers_1.registerUser);
router.get('/renew', auth_controllers_1.renewPassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map