"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["CONTINUE"] = 100] = "CONTINUE";
    HttpStatusCode[HttpStatusCode["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
    HttpStatusCode[HttpStatusCode["EARLY_HINTS"] = 103] = "EARLY_HINTS";
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["CREATED"] = 201] = "CREATED";
    HttpStatusCode[HttpStatusCode["ACCEPTED"] = 202] = "ACCEPTED";
    HttpStatusCode[HttpStatusCode["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
    HttpStatusCode[HttpStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatusCode[HttpStatusCode["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    HttpStatusCode[HttpStatusCode["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    HttpStatusCode[HttpStatusCode["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    HttpStatusCode[HttpStatusCode["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    HttpStatusCode[HttpStatusCode["FOUND"] = 302] = "FOUND";
    HttpStatusCode[HttpStatusCode["SEE_OTHER"] = 303] = "SEE_OTHER";
    HttpStatusCode[HttpStatusCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    HttpStatusCode[HttpStatusCode["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
    HttpStatusCode[HttpStatusCode["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCode[HttpStatusCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    HttpStatusCode[HttpStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    HttpStatusCode[HttpStatusCode["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    HttpStatusCode[HttpStatusCode["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
    HttpStatusCode[HttpStatusCode["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    HttpStatusCode[HttpStatusCode["CONFLICT"] = 409] = "CONFLICT";
    HttpStatusCode[HttpStatusCode["GONE"] = 410] = "GONE";
    HttpStatusCode[HttpStatusCode["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    HttpStatusCode[HttpStatusCode["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    HttpStatusCode[HttpStatusCode["PAYLOAD_TOO_LARGE"] = 413] = "PAYLOAD_TOO_LARGE";
    HttpStatusCode[HttpStatusCode["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
    HttpStatusCode[HttpStatusCode["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    HttpStatusCode[HttpStatusCode["RANGE_NOT_SATISFIABLE"] = 416] = "RANGE_NOT_SATISFIABLE";
    HttpStatusCode[HttpStatusCode["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    HttpStatusCode[HttpStatusCode["IM_A_TEAPOT"] = 418] = "IM_A_TEAPOT";
    HttpStatusCode[HttpStatusCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpStatusCode[HttpStatusCode["TOO_EARLY"] = 425] = "TOO_EARLY";
    HttpStatusCode[HttpStatusCode["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
    HttpStatusCode[HttpStatusCode["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
    HttpStatusCode[HttpStatusCode["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    HttpStatusCode[HttpStatusCode["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
    HttpStatusCode[HttpStatusCode["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatusCode[HttpStatusCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    HttpStatusCode[HttpStatusCode["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    HttpStatusCode[HttpStatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    HttpStatusCode[HttpStatusCode["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    HttpStatusCode[HttpStatusCode["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    HttpStatusCode[HttpStatusCode["VARIANT_ALSO_NEGOTIATES"] = 506] = "VARIANT_ALSO_NEGOTIATES";
    HttpStatusCode[HttpStatusCode["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
    HttpStatusCode[HttpStatusCode["LOOP_DETECTED"] = 508] = "LOOP_DETECTED";
    HttpStatusCode[HttpStatusCode["NOT_EXTENDED"] = 510] = "NOT_EXTENDED";
    HttpStatusCode[HttpStatusCode["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));
class HttpStatus extends Error {
    constructor(code, message) {
        super(message);
        if (typeof code === "string") {
            this.code = +HttpStatusCode[code];
        }
        else {
            this.code = code;
        }
    }
    toJSON() {
        const { code, message } = this;
        return { code, message };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    get statusCode() {
        return this.code;
    }
}
exports.HttpStatus = HttpStatus;
HttpStatus.CONTINUE = new HttpStatus(HttpStatusCode.CONTINUE, "Continue");
HttpStatus.SWITCHING_PROTOCOLS = new HttpStatus(HttpStatusCode.SWITCHING_PROTOCOLS, "Switching Protocols");
HttpStatus.EARLY_HINTS = new HttpStatus(HttpStatusCode.EARLY_HINTS, "Early Hints");
HttpStatus.OK = new HttpStatus(HttpStatusCode.OK, "OK");
HttpStatus.CREATED = new HttpStatus(HttpStatusCode.CREATED, "Created");
HttpStatus.ACCEPTED = new HttpStatus(HttpStatusCode.ACCEPTED, "Accepted");
HttpStatus.NON_AUTHORITATIVE_INFORMATION = new HttpStatus(HttpStatusCode.NON_AUTHORITATIVE_INFORMATION, "Non-Authoritative Information");
HttpStatus.NO_CONTENT = new HttpStatus(HttpStatusCode.NO_CONTENT, "No Content");
HttpStatus.RESET_CONTENT = new HttpStatus(HttpStatusCode.RESET_CONTENT, "Reset Content");
HttpStatus.PARTIAL_CONTENT = new HttpStatus(HttpStatusCode.PARTIAL_CONTENT, "Partial Content");
HttpStatus.MULTIPLE_CHOICES = new HttpStatus(HttpStatusCode.MULTIPLE_CHOICES, "Multiple Choices");
HttpStatus.MOVED_PERMANENTLY = new HttpStatus(HttpStatusCode.MOVED_PERMANENTLY, "Moved Permanently");
HttpStatus.FOUND = new HttpStatus(HttpStatusCode.FOUND, "Found");
HttpStatus.SEE_OTHER = new HttpStatus(HttpStatusCode.SEE_OTHER, "See Other");
HttpStatus.NOT_MODIFIED = new HttpStatus(HttpStatusCode.NOT_MODIFIED, "Not Modified");
HttpStatus.TEMPORARY_REDIRECT = new HttpStatus(HttpStatusCode.TEMPORARY_REDIRECT, "Temporary Redirect");
HttpStatus.PERMANENT_REDIRECT = new HttpStatus(HttpStatusCode.PERMANENT_REDIRECT, "Permanent Redirect");
HttpStatus.BAD_REQUEST = new HttpStatus(HttpStatusCode.BAD_REQUEST, "Bad Request");
HttpStatus.UNAUTHORIZED = new HttpStatus(HttpStatusCode.UNAUTHORIZED, "Unauthorized");
HttpStatus.PAYMENT_REQUIRED = new HttpStatus(HttpStatusCode.PAYMENT_REQUIRED, "Payment Required");
HttpStatus.FORBIDDEN = new HttpStatus(HttpStatusCode.FORBIDDEN, "Forbidden");
HttpStatus.NOT_FOUND = new HttpStatus(HttpStatusCode.NOT_FOUND, "Not Found");
HttpStatus.METHOD_NOT_ALLOWED = new HttpStatus(HttpStatusCode.METHOD_NOT_ALLOWED, "Method Not Allowed");
HttpStatus.NOT_ACCEPTABLE = new HttpStatus(HttpStatusCode.NOT_ACCEPTABLE, "Not Acceptable");
HttpStatus.PROXY_AUTHENTICATION_REQUIRED = new HttpStatus(HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED, "Proxy Authentication Required");
HttpStatus.REQUEST_TIMEOUT = new HttpStatus(HttpStatusCode.REQUEST_TIMEOUT, "Request Timeout");
HttpStatus.CONFLICT = new HttpStatus(HttpStatusCode.CONFLICT, "Conflict");
HttpStatus.GONE = new HttpStatus(HttpStatusCode.GONE, "Gone");
HttpStatus.LENGTH_REQUIRED = new HttpStatus(HttpStatusCode.LENGTH_REQUIRED, "Length Required");
HttpStatus.PRECONDITION_FAILED = new HttpStatus(HttpStatusCode.PRECONDITION_FAILED, "Precondition Failed");
HttpStatus.PAYLOAD_TOO_LARGE = new HttpStatus(HttpStatusCode.PAYLOAD_TOO_LARGE, "Payload Too Large");
HttpStatus.URI_TOO_LONG = new HttpStatus(HttpStatusCode.URI_TOO_LONG, "URI Too Long");
HttpStatus.UNSUPPORTED_MEDIA_TYPE = new HttpStatus(HttpStatusCode.UNSUPPORTED_MEDIA_TYPE, "Unsupported Media Type");
HttpStatus.RANGE_NOT_SATISFIABLE = new HttpStatus(HttpStatusCode.RANGE_NOT_SATISFIABLE, "Range Not Satisfiable");
HttpStatus.EXPECTATION_FAILED = new HttpStatus(HttpStatusCode.EXPECTATION_FAILED, "Expectation Failed");
HttpStatus.IM_A_TEAPOT = new HttpStatus(HttpStatusCode.IM_A_TEAPOT, "I'm a teapot");
HttpStatus.UNPROCESSABLE_ENTITY = new HttpStatus(HttpStatusCode.UNPROCESSABLE_ENTITY, "Unprocessable Entity");
HttpStatus.TOO_EARLY = new HttpStatus(HttpStatusCode.TOO_EARLY, "Too Early");
HttpStatus.UPGRADE_REQUIRED = new HttpStatus(HttpStatusCode.UPGRADE_REQUIRED, "Upgrade Required");
HttpStatus.PRECONDITION_REQUIRED = new HttpStatus(HttpStatusCode.PRECONDITION_REQUIRED, "Precondition Required");
HttpStatus.TOO_MANY_REQUESTS = new HttpStatus(HttpStatusCode.TOO_MANY_REQUESTS, "Too Many Requests");
HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE = new HttpStatus(HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE, "Request Header Fields Too Large");
HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS = new HttpStatus(HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS, "Unavailable For Legal Reasons");
HttpStatus.INTERNAL_SERVER_ERROR = new HttpStatus(HttpStatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
HttpStatus.NOT_IMPLEMENTED = new HttpStatus(HttpStatusCode.NOT_IMPLEMENTED, "Not Implemented");
HttpStatus.BAD_GATEWAY = new HttpStatus(HttpStatusCode.BAD_GATEWAY, "Bad Gateway");
HttpStatus.SERVICE_UNAVAILABLE = new HttpStatus(HttpStatusCode.SERVICE_UNAVAILABLE, "Service Unavailable");
HttpStatus.GATEWAY_TIMEOUT = new HttpStatus(HttpStatusCode.GATEWAY_TIMEOUT, "Gateway Timeout");
HttpStatus.HTTP_VERSION_NOT_SUPPORTED = new HttpStatus(HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED, "HTTP Version Not Supported");
HttpStatus.VARIANT_ALSO_NEGOTIATES = new HttpStatus(HttpStatusCode.VARIANT_ALSO_NEGOTIATES, "Variant Also Negotiates");
HttpStatus.INSUFFICIENT_STORAGE = new HttpStatus(HttpStatusCode.INSUFFICIENT_STORAGE, "Insufficient Storage");
HttpStatus.LOOP_DETECTED = new HttpStatus(HttpStatusCode.LOOP_DETECTED, "Loop Detected");
HttpStatus.NOT_EXTENDED = new HttpStatus(HttpStatusCode.NOT_EXTENDED, "Not Extended");
HttpStatus.NETWORK_AUTHENTICATION_REQUIRED = new HttpStatus(HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED, "Network Authentication Required");
