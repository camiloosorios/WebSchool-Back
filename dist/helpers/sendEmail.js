"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_template_1 = __importDefault(require("./templates/email.template"));
const sendMail = (name, email) => {
    let transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'webschoolauth@gmail.com',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN
        }
    });
    transporter.sendMail({
        to: email,
        subject: "Bienvenido a Webschool",
        html: (0, email_template_1.default)(name)
    });
    // transporter.set("oauth2_provision_cb", (user, renew, callback) => {
    //     let accessToken = process.env.ACCESS_TOKEN;
    //     if (!accessToken) {
    //       return callback(new Error("Unknown user"));
    //     } else {
    //       return callback(null, accessToken);
    //     }
    //   });
};
exports.default = sendMail;
//# sourceMappingURL=sendEmail.js.map