"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.httpServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// Trigger restart after DB migration fix
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
exports.httpServer = httpServer;
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*", // Allow all for dev, restrict in prod
        methods: ["GET", "POST"]
    }
});
exports.io = io;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
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
const routes_1 = __importDefault(require("./modules/auth/routes"));
const routes_2 = __importDefault(require("./modules/projects/routes"));
const routes_3 = __importDefault(require("./modules/tasks/routes"));
const routes_4 = __importDefault(require("./modules/clients/routes"));
const routes_5 = __importDefault(require("./modules/users/routes"));
const routes_6 = __importDefault(require("./modules/invoices/routes"));
const routes_7 = __importDefault(require("./modules/quotations/routes"));
app.use('/api/auth', routes_1.default);
app.use('/api/projects', routes_2.default);
app.use('/api/tasks', routes_3.default);
const timerRoutes_1 = __importDefault(require("./modules/tasks/timerRoutes"));
app.use('/api/tasks', timerRoutes_1.default);
app.use('/api/clients', routes_4.default);
app.use('/api/users', routes_5.default);
app.use('/api/invoices', routes_6.default);
app.use('/api/quotations', routes_7.default);
