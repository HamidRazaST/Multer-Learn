"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Controller_1 = require("./Controller");
var userRouter = express_1.Router();
var userController = new Controller_1.default();
userRouter
    .get('/image/:id', userController.getImage)
    .post('/image', userController.uploadImage)
    .post('/images', userController.uploadImages);
exports.default = userRouter;
