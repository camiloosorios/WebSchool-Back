import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JsonWebTokenPayload } from "../interfaces/jwt.interface";
import { RequestJwt } from '../interfaces/request.interface';

const validateJwt = (req: RequestJwt, res:Response, next: NextFunction): (Response | void) => {

    const token = req.query.token || null;

    //Validamos que el token venga en la url
    if(token == null){
        return res.status(401).json({
            msg: 'El token es requerido'
        });
    }   

    try {
        //Validamos que el token sea válido
        const payload = jwt.verify(String(token), process.env.SECRET_KEY!) as JsonWebTokenPayload;
        
        //asignamos el token en la request
        req.id = payload.id;
        
        //Pasamos al siguiente middleware
        next();

    } catch (error) {
        console.log(error);
        
        return res.status(401).json({
            msg: 'El token suministrado es incorrecto o ya ha expirado'
        });  
        
    }


}

export default validateJwt;