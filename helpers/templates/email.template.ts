
const emailTemplate =  (name: string) => {
    return  `

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
        <div style="display: grid; justify-items: center;">
            <button style=" background-color: blueviolet; 
                            color: white; font-weight: bold; 
                            text-align: center;
                            cursor: pointer;
                            border: none;
                            border-radius: 5px;
                            height: 30px
                            width: fit-content;"
                >CONFIRMAR CUENTA
            </button>
        </div>
        <br>
        <p style="text-align: center;"
            ><small>Si no solicitaste registrate en <span style="font-weight: bold;">Webschool</span> ignora este correo.</small> 
        </p>
    </body>
    </html>
            
            `;
}


export default emailTemplate;