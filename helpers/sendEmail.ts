import nodemailer from "nodemailer";
import emailTemplate from "./templates/email.template";

const sendMail = (name: string, email: string) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:  {
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
      html: emailTemplate(name)
    });

    // transporter.set("oauth2_provision_cb", (user, renew, callback) => {
    //     let accessToken = process.env.ACCESS_TOKEN;
    //     if (!accessToken) {
    //       return callback(new Error("Unknown user"));
    //     } else {
    //       return callback(null, accessToken);
    //     }
    //   });
    
}

export default sendMail;
