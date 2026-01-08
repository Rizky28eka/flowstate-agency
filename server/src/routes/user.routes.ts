import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.get('/me', userController.getCurrentUser);
router.patch('/me', userController.updateProfile);
router.patch('/me/avatar', userController.updateAvatar);
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;