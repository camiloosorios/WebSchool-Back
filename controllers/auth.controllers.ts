import { Response } from "express";
import bcryptjs from "bcryptjs";

import User from '../models/user';
import sendEmail from "../helpers/sendEmail";
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
            id: user.getDataValue('id'),
            email
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
            msg: 'Error, comuniquese con un Administrador'
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
                msg: 'El Correo Electrónico ya ha sido tomado por otro usuario'
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
            id: user.getDataValue('id'),
            email
        }
        
        //Generamos el token con la data a enviar en el correo
        const token = generateToken(payload, process.env.SECRET_KEY!);

        //Enviamos el correo
        sendEmail(name, email, token);

        return res.json({
            msg: 'Usuario creado correctamente',
            token
        })
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador'
        });                
    }


}

export const renewToken = (req: RequestJwt, res: Response) => {

}

export const emailConfirmation = async(req: RequestJwt, res: Response) => {
    
    //obtenemos el id del usuario
    const id = req.id;
    
    //Obtenemos el usuario a actualizar
    const user = await User.findByPk(id);
 
    if(user) {

        //Actualizamos el estado a verificado
        user.set('verified', true);
        await user.save();
    
        return res.json({
            msg: 'Cuenta Verificada'
        });
    }

}

export const renewPassword = async (req: RequestJwt, res: Response): Promise<void> => {

    res.json({
        msg: 'Renew'
    });

}