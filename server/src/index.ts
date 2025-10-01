import express, { Express, Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { PORT } from './config/env';
import prisma from './config/db';
import { userAuthMiddleware } from './middlewares/auth.middleware';
import { errorHandlingMiddleware } from './middlewares/error.middleware';
import userRoutes from './routes/user.routes';
import clientRoutes from './routes/client.routes';
import projectRoutes from './routes/project.routes';
import reportRoutes from './routes/report.routes';
import invoiceRoutes from './routes/invoice.routes';
import organizationRoutes from './routes/organization.routes';
import analyticsRoutes from './routes/analytics.routes';
import authRoutes from './routes/auth.routes';

const app: Express = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*", // In production, restrict this to your frontend's URL
    methods: ["GET", "POST"]
  }
});

const port = PORT;

// --- CORE MIDDLEWARES --- //
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', apiLimiter);

// --- ROUTES --- //
app.get('/', (req: Request, res: Response) => {
  res.send('Flowstate Agency server is running with Prisma and Socket.IO!');
});

const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use(userAuthMiddleware);

apiRouter.use('/users', userRoutes);
apiRouter.use('/clients', clientRoutes);
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/reports', reportRoutes);
apiRouter.use('/invoices', invoiceRoutes);
apiRouter.use('/organization', organizationRoutes);
apiRouter.use('/analytics', analyticsRoutes);

app.use('/api', apiRouter);

// --- ERROR HANDLING MIDDLEWARE --- //
app.use(errorHandlingMiddleware);

// --- SOCKET.IO CONNECTION --- //
io.on('connection', (socket) => {
  console.log('A user connected with socket ID:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
