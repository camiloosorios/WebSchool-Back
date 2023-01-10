"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.renewPassword = exports.emailConfirmation = exports.renewToken = exports.registerUser = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const sendEmail_1 = require("../helpers/sendEmail");
const jwtGenerate_1 = __importDefault(require("../helpers/jwtGenerate"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Desestructuramos el correo y contraseña del body
    const { email, password } = req.body;
    try {
        //Hacemos la consulta en la db
        const user = yield user_1.default.findOne({
            where: {
                email
            }
        });
        //Validamos que el usuario exista en la db
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña incorrecta'
            });
        }
        //Validamos que la contraseña haga match
        const validPass = bcryptjs_1.default.compareSync(password, user.getDataValue('password'));
        if (!validPass) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña incorrecta'
            });
        }
        const payload = {
            id: user.getDataValue('id')
        };
        //Generamos token
        const token = (0, jwtGenerate_1.default)(payload, process.env.SECRET_KEY);
        return res.json({
            msg: 'Login',
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador',
            token: ''
        });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Extraemos los datos desde el body
    const { name, email, password, role } = req.body;
    try {
        //Hacemmos consulta en la DB
        const existEmail = yield user_1.default.findOne({
            where: {
                email
            }
        });
        //Validamos que el correo no exista
        if (existEmail) {
            return res.status(400).json({
                msg: 'El Correo Electrónico ya ha sido tomado por otro usuario',
                token: ''
            });
        }
        //Generamos salt de encriptacion
        const salt = bcryptjs_1.default.genSaltSync();
        //Encriptamos la contraseña
        const passEncripted = bcryptjs_1.default.hashSync(password, salt);
        //Guardamos usuario en base de datos
        const user = yield user_1.default.create({
            name,
            email,
            password: passEncripted,
            role
        });
        const payload = {
            id: user.getDataValue('id')
        };
        //Generamos el token con la data a enviar en el correo
        const token = (0, jwtGenerate_1.default)(payload, process.env.SECRET_KEY);
        //Enviamos el correo
        (0, sendEmail_1.confirmEmail)(name, email, token);
        return res.json({
            msg: 'Usuario creado correctamente',
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador',
            token: ''
        });
    }
});
exports.registerUser = registerUser;
const renewToken = (req, res) => {
    //Obtenemos el id del usuario
    const id = req.id;
    //Configuramos el payload
    const payload = {
        id: Number(id)
    };
    //Renovamos el token
    const token = (0, jwtGenerate_1.default)(payload, process.env.SECRET_KEY);
    //Retornamos el nuevo token
    return res.json({
        msg: 'Token renovado',
        token
    });
};
exports.renewToken = renewToken;
const emailConfirmation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //obtenemos el id del usuario
    const id = req.id;
    try {
        //Obtenemos el usuario a actualizar
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(401).json({
                msg: 'El usuario no existe',
                token: ''
            });
        }
        //Actualizamos el estado a verificado
        user.set('verified', true);
        yield user.save();
        return res.json({
            msg: 'Cuenta Verificada',
            token: ''
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador',
            token: ''
        });
    }
});
exports.emailConfirmation = emailConfirmation;
const renewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        const emailExist = yield user_1.default.findOne({
            where: { email }
        });
        if (!emailExist) {
            return res.status(401).json({
                msg: 'Correo Electrónico incorrecto',
                token: ''
            });
        }
        const payload = {
            id: emailExist.getDataValue('id')
        };
        const name = emailExist.getDataValue('name');
        //Generamos el token con la data a enviar en el correo
        const token = (0, jwtGenerate_1.default)(payload, process.env.SECRET_KEY);
        //Enviamos el correo
        (0, sendEmail_1.changePassword)(name, String(email), token);
        return res.json({
            msg: `Se envio correo para actualizar contraseña a la dirección "${email}"`,
            token: ''
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador',
            token: ''
        });
    }
});
exports.renewPassword = renewPassword;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtenemos el id y la contraseña de la request
    const id = req.id;
    const { password } = req.body;
    try {
        //buscamos el usuario con el id correspondiente
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.json({
                msg: `El usuario con id: ${id} no existe`,
                token: ''
            });
        }
        //Generamos el salt
        const salt = bcryptjs_1.default.genSaltSync();
        //Encriptamos la contraseña
        const pass = bcryptjs_1.default.hashSync(password, salt);
        //Actualizamos la contraseña en la base de datos
        user.set('password', pass);
        yield user.save();
        return res.json({
            msg: 'Contraseña actualizada correctamente',
            token: ''
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador',
            token: ''
        });
    }
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=auth.controllers.js.map