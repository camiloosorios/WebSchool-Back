import nodemailer from "nodemailer";
import { confirmEmailHtml, renewPasswordHtml } from "./email.template";


export const confirmEmail = async(name: string, email: string, jwt: string) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:  {
                type: 'OAuth2',
                user: process.env.USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN
            }
        });

        await transporter.sendMail({
          to: email,
          subject: "Registro Webschool",
          html: confirmEmailHtml(name, jwt)
        });
        
    } catch (error) {
        console.log(error);
        
    }

    
}

export const changePassword = async(name: string, email: string, jwt: string) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:  {
                type: 'OAuth2',
                user: process.env.USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN
            }
        });
        await transporter.sendMail({
            to: email,
            subject: "Actualizar Contraseña",
            html: renewPasswordHtml(name, jwt)
          });

    } catch (error) {
        console.log(error);

    }

}
