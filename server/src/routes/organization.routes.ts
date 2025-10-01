import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

const router = Router();

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