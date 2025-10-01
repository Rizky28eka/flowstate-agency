import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

const router = Router();

router.get('/me/settings', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const organization = await prisma.organization.findUnique({
      where: { id: req.organizationId },
      select: { settings: true },
    });
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json(organization.settings || {});
  } catch (error) {
    next(error);
  }
});

router.patch('/me/settings', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newSettings = req.body;

    const updatedOrganization = await prisma.organization.update({
      where: { id: req.organizationId },
      data: {
        settings: newSettings,
      },
      select: { settings: true },
    });

    res.json(updatedOrganization.settings);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const organization = await prisma.organization.findUnique({
      where: { id: req.organizationId },
    });
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json(organization);
  } catch (error) {
    next(error);
  }
});

router.get('/roles', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await prisma.role.findMany({
      where: { organizationId: req.organizationId },
      include: { permissions: { include: { permission: true } } },
    });
    res.json(roles);
  } catch (error) {
    next(error);
  }
});

router.get('/permissions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const permissions = await prisma.permission.findMany({
      where: { organizationId: req.organizationId },
    });
    res.json(permissions);
  } catch (error) {
    next(error);
  }
});

router.patch('/roles/:roleId/permissions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roleId } = req.params;
    const { permissionIds } = req.body; // Array of permission IDs to assign

    // Clear existing permissions for the role
    await prisma.rolePermission.deleteMany({
      where: { roleId },
    });

    // Create new permissions
    const newRolePermissions = permissionIds.map((permissionId: string) => ({
      roleId,
      permissionId,
    }));

    await prisma.rolePermission.createMany({
      data: newRolePermissions,
    });

    const updatedRole = await prisma.role.findUnique({
      where: { id: roleId },
      include: { permissions: { include: { permission: true } } },
    });

    res.json(updatedRole);
  } catch (error) {
    next(error);
  }
});

export default router;