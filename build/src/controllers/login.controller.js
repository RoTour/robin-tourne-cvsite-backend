"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequired = exports.login = exports.register = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const logger_1 = require("../util/logger");
const user_entity_1 = require("../models/user.entity");
/**
 * Requirements:
 * {
 *   email
 *   password
 *   role
 *   username
 * }
 * Optional:
 * {
 *   profilePicturePath
 * }
 */
const register = (req, res) => {
    const payload = req.body;
    if (!(payload.email && payload.password && payload.role && payload.username)) {
        throw new Error('Missing requirements in body');
    }
    const userRepo = typeorm_1.getRepository(user_entity_1.User);
    const newUser = new user_entity_1.User(payload);
    userRepo
        .save(newUser)
        .then((user) => {
        user.hidePassword();
        return res.json(user);
    })
        .catch((error) => res.status(400).send({ name: error.name, message: error.message }));
};
exports.register = register;
/**
 * Requirements:
 * {
 *   email
 *   password
 * }
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        res.status(417).send({ message: 'expected field "email" not found' });
    }
    const userRepo = typeorm_1.getRepository(user_entity_1.User);
    const user = yield userRepo.findOne({ email: req.body.email });
    if (!user) {
        res.status(401).json({ message: 'auth failed: no user found' });
    }
    else if (user.hashPassword && !user.comparePassword(req.body.password, user.hashPassword)) {
        res.status(401).json({ message: 'auth failed: Wrong password' });
    }
    else {
        res.json({
            token: jwt.sign({
                email: user.email,
                username: user.username,
                _id: user.id,
            }, 'RESTFULAPIs'),
            username: user.username,
        });
    }
});
exports.login = login;
const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        logger_1.LOGGER.log('Error 401: Unauthorized');
        res.status(401).json({ message: 'Unauthorized user' });
    }
};
exports.loginRequired = loginRequired;
