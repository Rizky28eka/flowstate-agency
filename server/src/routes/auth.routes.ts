import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { JWT_SECRET } from '../config/env';

const router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: { include: { role: true } },
        organization: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
      { userId: user.id, organizationId: user.organizationId, role: user.roles[0]?.role.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name, organizationId: user.organizationId, role: user.roles[0]?.role.name } });
  } catch (error) {
    next(error);
  }
});

// TODO: Implement forgot password, reset password, and register routes

export default router;