import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { io } from '../index'; // Assuming io is exported from index.ts

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reports = await prisma.report.findMany({
      where: { organizationId: req.organizationId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(reports);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, type, generatedBy, content } = req.body;
    const newReport = await prisma.report.create({
      data: {
        title,
        type,
        generatedBy,
        content,
        organizationId: req.organizationId,
      },
    });
    io.emit('report_updated', newReport);
    res.status(201).json(newReport);
  } catch (error) {
    next(error);
  }
});

export default router;