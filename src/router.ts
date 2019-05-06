import { Router } from 'express';
import { userRouter } from './controllers';

const router: Router = Router();

router.use('/user', userRouter);