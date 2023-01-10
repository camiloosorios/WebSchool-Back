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
exports.changePassword = exports.confirmEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_template_1 = require("./email.template");
const confirmEmail = (name, email, jwt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN
            }
        });
        yield transporter.sendMail({
            to: email,
            subject: "Registro Webschool",
            html: (0, email_template_1.confirmEmailHtml)(name, jwt)
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.confirmEmail = confirmEmail;
const changePassword = (name, email, jwt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN
            }
        });
        yield transporter.sendMail({
            to: email,
            subject: "Actualizar Contraseña",
            html: (0, email_template_1.renewPasswordHtml)(name, jwt)
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.changePassword = changePassword;
//# sourceMappingURL=sendEmail.js.map