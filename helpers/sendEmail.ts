import nodemailer from "nodemailer";
import emailTemplate from "./email.template";

const sendMail = async(name: string, email: string, jwt: string) => {
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
      html: emailTemplate(name, jwt)
    });

    
}

export default sendMail;
