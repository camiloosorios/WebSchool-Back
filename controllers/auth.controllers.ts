import { Response } from "express";
import bcryptjs from "bcryptjs";

import User from '../models/user';
import { confirmEmail, changePassword } from '../helpers/sendEmail';
import generateToken from "../helpers/jwtGenerate";
import { JsonWebTokenPayload } from '../interfaces/jwt.interface';
import { RequestJwt } from "../interfaces/request.interface";


export const loginUser = async (req: RequestJwt, res: Response): Promise<Response> => {

    //Desestructuramos el correo y contraseña del body
    const { email, password } = req.body;

    try {

        //Hacemos la consulta en la db
        const user = await User.findOne({
            where: {
                email
            }
        });
    
        //Validamos que el usuario exista en la db
        if(!user) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña incorrecta'
            });

        } 

        //Validamos que la contraseña haga match
        const validPass = bcryptjs.compareSync(password, user.getDataValue('password'));

        if(!validPass) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña incorrecta'
            });
        } 

        const payload : JsonWebTokenPayload = {
            id: user.getDataValue('id')
        }

        //Generamos token
        const token = generateToken(payload, process.env.SECRET_KEY!);

        return res.json({
            msg: 'Login',
            token

        })

        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador',
            token: ''
        });
        
    }

}

export const registerUser = async (req: RequestJwt, res: Response): Promise<Response> => {

    //Extraemos los datos desde el body
    const { name, email, password, role } = req.body;

    try {
        
        //Hacemmos consulta en la DB
        const existEmail = await User.findOne({
            where: {
                email
            }
        });

        //Validamos que el correo no exista
        if(existEmail) {

            return res.status(400).json({
                msg: 'El Correo Electrónico ya ha sido tomado por otro usuario',
                token: ''
            })
        }

        //Generamos salt de encriptacion
        const salt = bcryptjs.genSaltSync();

        //Encriptamos la contraseña
        const passEncripted = bcryptjs.hashSync(password, salt);

        
        //Guardamos usuario en base de datos
        const user = await User.create({
            name,
            email,
            password: passEncripted,
            role
        });
        
        const payload: JsonWebTokenPayload = {
            id: user.getDataValue('id')
        }
        
        //Generamos el token con la data a enviar en el correo
        const token = generateToken(payload, process.env.SECRET_KEY!);

        //Enviamos el correo
        confirmEmail(name, email, token);

        return res.json({
            msg: 'Usuario creado correctamente',
            token
        })
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador',
            token: ''
        });                
    }


}

export const renewToken = (req: RequestJwt, res: Response): Response => {

    //Obtenemos el id del usuario
    const id = req.id;

    //Configuramos el payload
    const payload: JsonWebTokenPayload = {
        id: Number(id)
    }

    //Renovamos el token
    const token = generateToken(payload, process.env.SECRET_KEY!);

    //Retornamos el nuevo token
    return res.json({
        msg: 'Token renovado',
        token
    })

}

export const emailConfirmation = async (req: RequestJwt, res: Response): Promise<Response> => {
    
    //obtenemos el id del usuario
    const id = req.id;

    try {
        //Obtenemos el usuario a actualizar
        const user = await User.findByPk(id);
     
        if(!user) {
    
           return res.status(401).json({
                msg: 'El usuario no existe',
                token: ''
           })
        }

         //Actualizamos el estado a verificado
         user.set('verified', true);
         await user.save();
     
         return res.json({
             msg: 'Cuenta Verificada',
             token: ''
         });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador',
            token: ''
        });
        
    }
    

}

export const renewPassword = async (req: RequestJwt, res: Response): Promise<Response> => {

    const { email } = req.body;

    try {

        const emailExist = await User.findOne({
            where:{ email }
        });

        if(!emailExist){
            return res.status(401).json({
                msg: 'Correo Electrónico incorrecto',
                token: ''
            });
        }        

        const payload: JsonWebTokenPayload = {
            id: emailExist.getDataValue('id')
        }

        const name: string = emailExist.getDataValue('name');
        
        //Generamos el token con la data a enviar en el correo
        const token: string = generateToken(payload, process.env.SECRET_KEY!);

        //Enviamos el correo
        changePassword(name, String(email), token);

        return res.json({
            msg: `Se envio correo para actualizar contraseña a la dirección "${email}"`,
            token: ''
        })
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador',
            token: ''
        });
    }

}

export const updatePassword = async(req: RequestJwt, res: Response): Promise<Response> => {

    //Obtenemos el id y la contraseña de la request
    const id = req.id;
    const { password } = req.body;

    try {

        //buscamos el usuario con el id correspondiente
        const user = await User.findByPk(id);

        if(!user) {
            return res.json({
                msg: `El usuario con id: ${id} no existe`,
                token: ''
            });
        }

        //Generamos el salt
        const salt = bcryptjs.genSaltSync();

        //Encriptamos la contraseña
        const pass = bcryptjs.hashSync(password, salt);

        //Actualizamos la contraseña en la base de datos
        user.set('password', pass);
        await user.save();

        return res.json({
            msg: 'Contraseña actualizada correctamente',
            token: ''
        })
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador',
            token: ''
        });
        
    }

}