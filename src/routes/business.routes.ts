import {Router} from 'express';
import * as controller from '../controllers/business.controller';
import { authenticate } from '../middlewares/auth.middleware';

const businessRouter = Router();

businessRouter.patch('/:userId', authenticate, controller.updateBusinessDetails);

export default businessRouter;
