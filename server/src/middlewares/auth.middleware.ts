import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { JWT_SECRET } from '../config/env';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

export const userAuthMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Unauthorized: No token provided');
  }

  const token = authHeader.split(' ')[1];

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      organizationId: string;
      role: string;
    };

    if (!decoded.userId || !decoded.organizationId) {
      throw new ApiError(401, 'Unauthorized: Invalid token payload');
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new ApiError(401, 'Unauthorized: User not found');
    }

    req.userId = decoded.userId;
    req.organizationId = decoded.organizationId;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    throw new ApiError(401, 'Unauthorized: Invalid or expired token');
  }
});