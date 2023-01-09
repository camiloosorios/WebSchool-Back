import { JsonWebTokenPayload } from "../interfaces/jwt.interface";
import jwt from "jsonwebtoken";


const generateToken = (payload: JsonWebTokenPayload, key: string): string => {

    return jwt.sign(payload, key, {
        expiresIn: '1h'
    });

}

export default generateToken;