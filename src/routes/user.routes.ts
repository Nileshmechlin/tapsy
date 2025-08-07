import {Router} from 'express';
import * as controller from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/register', controller.registerUser);
userRouter.patch('/:id', controller.updateUser);
userRouter.get('/:id', controller.getUser);

export default userRouter;