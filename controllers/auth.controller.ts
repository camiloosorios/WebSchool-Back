import { Request, Response } from "express";


export const loginUser = (req: Request, res: Response) => {

    res.json({
        msg: 'Login'
    });

}

export const registerUser = (req: Request, res: Response) => {

    res.json({
        msg: 'Register'
    });

}

export const renewPassword = (req: Request, res: Response) => {

    res.json({
        msg: 'Renew'
    });

}