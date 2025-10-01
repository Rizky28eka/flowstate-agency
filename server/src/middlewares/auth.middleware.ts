import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

export const userAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-user-id'];

  if (!userId || typeof userId !== 'string') {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid X-User-Id header' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }

    req.organizationId = user.organizationId;
    req.userId = user.id;
    next();
  } catch (error) {
    next(error);
  }
};