"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewPassword = exports.registerUser = exports.loginUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { body } = req;
    try {
        const emailExist = yield user_1.default.findOne({
            where: {
                email
            }
        });
        //Validar que el correo exista en base de datos
        if (!emailExist) {
            throw new Error('Correo o contraseña inexistente');
        }
        else {
            res.json({
                body: emailExist
            });
        }
    }
    catch (error) {
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    res.json({
        msg: 'Register'
    });
});
exports.registerUser = registerUser;
const renewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'Renew'
    });
});
exports.renewPassword = renewPassword;
//# sourceMappingURL=auth.controllers.js.map