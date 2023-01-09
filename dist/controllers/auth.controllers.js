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
exports.renewPassword = exports.emailConfirmation = exports.renewToken = exports.registerUser = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const sendEmail_1 = __importDefault(require("../helpers/sendEmail"));
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
            id: user.getDataValue('id'),
            email
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
            msg: 'Error, comuniquese con un Administrador'
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
                msg: 'El Correo Electrónico ya ha sido tomado por otro usuario'
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
            id: user.getDataValue('id'),
            email
        };
        //Generamos el token con la data a enviar en el correo
        const token = (0, jwtGenerate_1.default)(payload, process.env.SECRET_KEY);
        //Enviamos el correo
        (0, sendEmail_1.default)(name, email, token);
        return res.json({
            msg: 'Usuario creado correctamente',
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error, comuniquese con un Administrador'
        });
    }
});
exports.registerUser = registerUser;
const renewToken = (req, res) => {
};
exports.renewToken = renewToken;
const emailConfirmation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //obtenemos el id del usuario
    const id = req.id;
    //Obtenemos el usuario a actualizar
    const user = yield user_1.default.findByPk(id);
    if (user) {
        //Actualizamos el estado a verificado
        user.set('verified', true);
        yield user.save();
        return res.json({
            msg: 'Cuenta Verificada'
        });
    }
});
exports.emailConfirmation = emailConfirmation;
const renewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'Renew'
    });
});
exports.renewPassword = renewPassword;
//# sourceMappingURL=auth.controllers.js.map