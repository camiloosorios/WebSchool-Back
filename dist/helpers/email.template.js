"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewPasswordHtml = exports.confirmEmailHtml = void 0;
const confirmEmailHtml = (name, jwt) => {
    return `

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a Webschool</title>
    </head>
    <body style="font-family: Verdana, Geneva, Tahoma, sans-serif">
        <h1 style="text-align: center;"
            >Bienvenido a Webschool
        </h1>
        <br>
        <p style="text-align: center; font-weight: bold;"
            >Hola ${name}, te damos la bienvenida a Webschool!
        </p>
        <br>
        <p style="text-align: center;"
            >Ya casi esta lista tu cuenta, solo falta que confirmes tu dirección de correo electrónico dando click en el botón de confirmar.
        </p>
        <br>
        <div style="display: grid;">
            <a  href="http://localhost:8080/auth/emailconfirmation?token=${jwt}" 
                style=" color: white; font-weight: bolder; 
                        text-align: center;
                        cursor: pointer;                        
                        text-decoration: none;"
            ><strong style=" font-weight: bolder; border-radius: 5px; background-color: blueviolet; padding: 10px;">Confirmar cuenta</strong></a>
        </div>
        <br>
        <p style="text-align: center;"
            ><small>Si no solicitaste registrate en <span style="font-weight: bold;">Webschool</span> ignora este correo.</small> 
        </p>
    </body>
    </html>
            
            `;
};
exports.confirmEmailHtml = confirmEmailHtml;
//http://localhost:4200/dashboard
const renewPasswordHtml = (name, jwt) => {
    return `

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Actualizar Contraseña</title>
    </head>
    <body style="font-family: Verdana, Geneva, Tahoma, sans-serif">
        <h1 style="text-align: center;"
            >Actualizar Contraseña
        </h1>
        <br>
        <p style="text-align: center; font-weight: bold;"
            >Hola ${name}, ¿Olvidaste tu contraseña?
        </p>
        <br>
        <p style="text-align: center;"
            >Si no recuerdas tu contraseña y deseas actualizarla presiona en el siguiente enlace.
        </p>
        <br>
        <div style="display: grid;">
            <a  href="http://localhost:4200/auth/update?token=${jwt}" 
                style=" color: white; font-weight: bolder; 
                        text-align: center;
                        cursor: pointer;                        
                        text-decoration: none;"
            ><strong style=" font-weight: bolder; border-radius: 5px; background-color: blueviolet; padding: 10px;">Actualizar Contraseña</strong></a>
        </div>
        <br>
        <p style="text-align: center;"
            ><small>Si no solicitaste actualizar tu contraseña ignora este correo.</small> 
        </p>
    </body>
    </html>
            
            `;
};
exports.renewPasswordHtml = renewPasswordHtml;
//# sourceMappingURL=email.template.js.map