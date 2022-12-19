"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewPassword = exports.registerUser = exports.loginUser = void 0;
const loginUser = (req, res) => {
    res.json({
        msg: 'Login'
    });
};
exports.loginUser = loginUser;
const registerUser = (req, res) => {
    res.json({
        msg: 'Register'
    });
};
exports.registerUser = registerUser;
const renewPassword = (req, res) => {
    res.json({
        msg: 'Renew'
    });
};
exports.renewPassword = renewPassword;
//# sourceMappingURL=auth.controller.js.map