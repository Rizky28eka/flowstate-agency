import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// Trigger restart after DB migration fix
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Allow all for dev, restrict in prod
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Routes
import authRoutes from './modules/auth/routes';
import projectRoutes from './modules/projects/routes';
import taskRoutes from './modules/tasks/routes';
import clientRoutes from './modules/clients/routes';
import userRoutes from './modules/users/routes';
import invoiceRoutes from './modules/invoices/routes';
import quotationRoutes from './modules/quotations/routes';

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
import timerRoutes from './modules/tasks/timerRoutes';
app.use('/api/tasks', timerRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/quotations', quotationRoutes);


export { httpServer, io };
