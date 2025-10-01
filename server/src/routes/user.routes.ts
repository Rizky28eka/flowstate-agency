import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { io } from '../index'; // Assuming io is exported from index.ts
import bcrypt from 'bcryptjs';

const router = Router();

router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        roles: { include: { role: true } },
        organization: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.patch('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, avatarUrl, bio } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        name,
        avatarUrl,
        bio,
      },
      include: {
        roles: { include: { role: true } },
        organization: true,
      },
    });

    io.emit('user_updated', updatedUser);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      where: { organizationId: req.organizationId },
      include: {
        roles: { include: { role: true } },
        teams: { include: { team: true } },
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, roleId } = req.body;

    const hashedPassword = await bcrypt.hash('password123', 10); // Default password

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        organizationId: req.organizationId,
        roles: {
          create: {
            roleId: roleId, // Assuming roleId is sent from the client
          }
        }
      },
      include: { roles: { include: { role: true } }, teams: { include: { team: true } } },
    });
    io.emit('user_updated', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { email, name, roleId } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id, organizationId: req.organizationId },
      data: {
        email,
        name,
        // Add logic to update roles if needed
      },
      include: { roles: { include: { role: true } }, teams: { include: { team: true } } },
    });
    io.emit('user_updated', updatedUser);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id, organizationId: req.organizationId },
    });
    io.emit('employee_deleted', id); // Emit event for user deletion
    res.status(204).send(); // No content for successful deletion
  } catch (error) {
    next(error);
  }
});

export default router;