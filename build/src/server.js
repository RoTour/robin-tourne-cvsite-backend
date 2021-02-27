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
exports.startServer = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("./util/logger");
const errorHandler_middleware_1 = require("./middleware/errorHandler.middleware");
const http_status_1 = require("./util/http-status");
const pages_router_1 = require("./routers/pages.router");
const article_router_1 = require("./routers/article.router");
const post_router_1 = require("./routers/post.router");
const startServer = ({ port, }) => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    // Setup auto-parse of 'application.json' bodies and cookies
    app.use(express_1.default.json());
    // server.use(cookieParser());
    // Setup body parser
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use(cors_1.default());
    // Setup JWT
    app.use((req, res, next) => {
        logger_1.LOGGER.log('called jwt setup');
        if (req.headers
            && req.headers.authorization
            && req.headers.authorization.split(' ')[0] === 'JWT'
            && req.headers.username) {
            logger_1.LOGGER.log('first check ok');
            jsonwebtoken_1.default.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
                if (err || (decode.username && decode.username !== req.headers.username)) {
                    req.user = undefined;
                    req.username = undefined;
                    next();
                }
                else {
                    req.user = decode;
                    next();
                }
            });
        }
        else {
            logger_1.LOGGER.log(`first check NOT ok: ${req.headers.username}`);
            req.user = undefined;
            req.username = undefined;
            next();
        }
    });
    // Setup Routers
    app.use('', pages_router_1.router);
    app.use('/article', article_router_1.router);
    app.use('/post', post_router_1.router);
    // ? Catch all errors
    app.use((req, res, next) => next(http_status_1.HttpStatus.NOT_FOUND));
    app.use(errorHandler_middleware_1.errorHandler);
    app.listen(port, () => {
        logger_1.LOGGER.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
    return app;
});
exports.startServer = startServer;
