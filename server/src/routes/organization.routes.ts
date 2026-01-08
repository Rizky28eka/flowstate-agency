import { Router } from 'express';
import organizationController from '../controllers/organization.controller';

const router = Router();

router.get('/me/settings', organizationController.getSettings);
router.patch('/me/settings', organizationController.updateSettings);
router.get('/', organizationController.getOrganization);
router.patch('/', organizationController.updateOrganization);
router.get('/roles', organizationController.getRoles);
router.get('/permissions', organizationController.getPermissions);
router.patch('/roles/:roleId/permissions', organizationController.updateRolePermissions);

export default router;