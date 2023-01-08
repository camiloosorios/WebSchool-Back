import nodemailer from "nodemailer";
import emailTemplate from "./templates/email.template";

const sendMail = (name: string, email: string) => {
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
    
    transporter.sendMail({
      to: email,
      subject: "Bienvenido a Webschool",
      html: emailTemplate(name)
    });

    
}

export default sendMail;
