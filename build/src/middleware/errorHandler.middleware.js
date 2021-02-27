"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_1 = require("../util/http-status");
const errorHandler = (err, req, res, next) => {
    var _a;
    let error;
    if (err === undefined || ((_a = err) === null || _a === void 0 ? void 0 : _a.statusCode) === 404) {
        error = http_status_1.HttpStatus.NOT_FOUND;
    }
    else if (err instanceof http_status_1.HttpStatus) {
        error = err;
    }
    else {
        error = http_status_1.HttpStatus.INTERNAL_SERVER_ERROR;
    }
    res.status(error.statusCode).json(Object.assign({ error: true }, error.toJSON()));
    return next();
};
exports.errorHandler = errorHandler;
