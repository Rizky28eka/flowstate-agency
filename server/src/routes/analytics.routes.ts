import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalRevenue = await prisma.invoice.aggregate({
      _sum: { total: true },
      where: { status: 'PAID', project: { organizationId: req.organizationId } },
    });

    const activeClients = await prisma.client.count({
      where: { status: 'ACTIVE', organizationId: req.organizationId },
    });

    // These are more complex and might require more logic or data points.
    // For now, we can return mock data for them.
    const projectSuccessRate = 94.8;
    const avgProjectValue = 24750;

    res.json({
      totalRevenue: totalRevenue._sum.total || 0,
      activeClients,
      projectSuccessRate,
      avgProjectValue,
    });
  } catch (error) {
    next(error);
  }
});

export default router;