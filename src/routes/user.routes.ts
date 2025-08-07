import {Router} from 'express';
import * as controller from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.post('/register', controller.registerUser);
userRouter.patch('/:id', authenticate, controller.updateUser);
userRouter.get('/:id', authenticate, controller.getUser);
userRouter.post('/:id/verify-otp', controller.verifyEmailOtp);
userRouter.post('/login', controller.login);

export default userRouter;