import { Router } from 'express';
import * as userPersonalizationController from '../controllers/userPersonalization.controller';

const router = Router();

router.post('/', userPersonalizationController.createUserPersonalization);
router.get('/', userPersonalizationController.getUserPersonalizations);
router.get('/:id', userPersonalizationController.getUserPersonalization);
router.put('/:id', userPersonalizationController.updateUserPersonalization);
router.delete('/:id', userPersonalizationController.deleteUserPersonalization);

export default router;
