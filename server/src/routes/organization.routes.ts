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

export default router;