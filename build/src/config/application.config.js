"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const config = {
    baseUrl: '',
    port: 0,
    production: false,
};
let isInitialized = false;
const initializeConfig = () => {
    const production = process.env.NODE_ENV === 'production';
    config.production = production;
    if (production) {
        dotenv_1.default.config({ path: path_1.default.resolve('production.env') });
    }
    else {
        dotenv_1.default.config();
    }
    config.baseUrl = process.env.BASE_URL || 'http://localhost';
    config.port = process.env.PORT || 3000;
    isInitialized = true;
};
function getApplicationConfig() {
    if (!isInitialized)
        initializeConfig();
    return config;
}
exports.getApplicationConfig = getApplicationConfig;
