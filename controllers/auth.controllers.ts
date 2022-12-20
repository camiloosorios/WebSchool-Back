import { Request, Response } from "express";
import User from '../models/user';


export const loginUser = async (req: Request, res: Response): Promise<void> => {


    const { email, password } = req.body;

    const { body } = req;

    try {

        const emailExist = await User.findOne({
            where: {
                email
            }
        });

        //Validar que el correo exista en base de datos
        if(!emailExist){
            throw new Error('Correo o contraseña inexistente');
        } else {
            
            res.json({
                body: emailExist
            })
            
        }
        
    } catch (error) {
        
    }

    

}

export const registerUser = async (req: Request, res: Response): Promise<void> => {

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    res.json({
        msg: 'Register'
    });

}

export const renewPassword = async (req: Request, res: Response): Promise<void> => {

    res.json({
        msg: 'Renew'
    });

}