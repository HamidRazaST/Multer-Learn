import { Router } from 'express';
import Controller from './Controller';

const userRouter: Router = Router();
const userController = new Controller();

userRouter
    .get('/image/:id', userController.getImage)
    .post('/image', userController.uploadImage)
    .post('/images', userController.uploadImages);

export default userRouter;