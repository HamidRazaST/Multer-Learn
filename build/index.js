"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./Server");
var config_1 = require("./config");
var server = new Server_1.default(config_1.config);
server.bootstrap().run();
