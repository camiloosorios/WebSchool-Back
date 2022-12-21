import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import User from '../models/user';


export const loginUser = async (req: Request, res: Response): Promise<Response> => {

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
            })
        } else {
            return res.json({
                msg: 'Login'
            })
        }

        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador'
        });
        
    }

    

}

export const registerUser = async (req: Request, res: Response): Promise<Response> => {

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

        return res.json({
            msg: 'Usuario creado correctamente',
            user
        })
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador'
        });                
    }


}

export const renewPassword = async (req: Request, res: Response): Promise<void> => {

    res.json({
        msg: 'Renew'
    });

}