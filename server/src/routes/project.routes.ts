import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { io } from '../index'; // Assuming io is exported from index.ts
import { faker } from '@faker-js/faker';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await prisma.project.findMany({
      where: { organizationId: req.organizationId },
      include: { client: true, team: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, clientId, description, budget, status, startDate, endDate } = req.body;

    const newProject = await prisma.project.create({
      data: {
        name,
        slug: faker.helpers.slugify(name).toLowerCase() + '-' + faker.string.alphanumeric(5),
        description,
        budget,
        status,
        startDate,
        endDate,
        organizationId: req.organizationId,
        clientId,
        createdById: req.userId,
        // teamId can be assigned later
      },
      include: { client: true, team: true },
    });

    // Emit an event to all connected clients to notify them of the new project
    io.emit('project_updated', newProject);

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, budget, startDate, endDate } = req.body;

    const updatedProject = await prisma.project.update({
      where: {
        id,
        organizationId: req.organizationId
      },
      data: {
        status,
        budget,
        startDate,
        endDate,
      },
      include: { client: true, team: true },
    });

    // Emit an event to all connected clients
    io.emit('project_updated', updatedProject);

    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
});

export default router;