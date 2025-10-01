import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { io } from '../index'; // Assuming io is exported from index.ts

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await prisma.client.findMany({
      where: { organizationId: req.organizationId },
      include: {
        projects: true
      },
    });
    const clientsWithActiveProjects = clients.map(client => ({
      ...client,
      activeProjects: client.projects.filter(p => p.status === 'ACTIVE').length
    }));
    res.json(clientsWithActiveProjects);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.findUnique({
      where: { 
        id,
        organizationId: req.organizationId
      },
      include: {
        projects: {
          include: {
            invoices: true,
            tasks: true,
          }
        }
      },
    });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, companyName, email, phone, website, address, city, state, country, postalCode, industry, companySize, status, type, rating, avatarUrl, taxId, notes, metadata } = req.body;

    const newClient = await prisma.client.create({
      data: {
        name,
        companyName,
        email,
        phone,
        website,
        address,
        city,
        state,
        country,
        postalCode,
        industry,
        companySize,
        status,
        type,
        rating,
        avatarUrl,
        taxId,
        notes,
        metadata,
        organizationId: req.organizationId,
        createdById: req.userId, // Assuming userId is available from auth middleware
      },
    });

    io.emit('client_updated', newClient);
    res.status(201).json(newClient);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, companyName, email, phone, website, address, city, state, country, postalCode, industry, companySize, status, type, rating, avatarUrl, taxId, notes, metadata } = req.body;

    const updatedClient = await prisma.client.update({
      where: {
        id,
        organizationId: req.organizationId
      },
      data: {
        name,
        companyName,
        email,
        phone,
        website,
        address,
        city,
        state,
        country,
        postalCode,
        industry,
        companySize,
        status,
        type,
        rating,
        avatarUrl,
        taxId,
        notes,
        metadata,
      },
    });

    io.emit('client_updated', updatedClient);
    res.json(updatedClient);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.client.delete({
      where: { id, organizationId: req.organizationId },
    });
    io.emit('client_deleted', id); // Emit event for client deletion
    res.status(204).send(); // No content for successful deletion
  } catch (error) {
    next(error);
  }
});

export default router;