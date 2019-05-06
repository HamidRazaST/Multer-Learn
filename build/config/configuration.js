"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var envVars = process.env;
var configuration = Object.freeze({
    PORT: envVars.PORT || '9000',
    MONGO_URL: envVars.MONGO_URL || '',
    CLOUD_NAME: envVars.CLOUD_NAME || '',
    API_KEY: envVars.API_KEY || '',
    API_SECRET: envVars.API_SECRET || '',
});
exports.default = configuration;
