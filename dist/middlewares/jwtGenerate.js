"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, key) => {
    return jsonwebtoken_1.default.sign(payload, key, {
        expiresIn: '1h'
    });
};
exports.default = generateToken;
//# sourceMappingURL=jwtGenerate.js.map