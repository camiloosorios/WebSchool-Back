"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJwt = (req, res, next) => {
    const token = req.query.token || null;
    if (token == null) {
        return res.status(401).json({
            msg: 'El token es requerido'
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(String(token), process.env.SECRET_KEY);
        req.id = payload.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'El token suministrado es incorrecto o ya ha expirado'
        });
    }
};
exports.default = validateJwt;
//# sourceMappingURL=jwtValidate.js.map