import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { io } from '../index'; // Assuming io is exported from index.ts

const router = Router();

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedInvoice = await prisma.invoice.update({
      where: { 
        id,
        organizationId: req.organizationId
      },
      data: { status },
    });

    // If the invoice was marked as paid, trigger an analytics update
    if (status === 'paid') {
      io.emit('analytics_updated');
    }

    // Also, we could emit a specific invoice_updated event
    io.emit('invoice_updated', updatedInvoice);

    res.json(updatedInvoice);
  } catch (error) {
    next(error);
  }
});

export default router;