import request from 'supertest';
import express from 'express';
import taskRoutes from '../src/routes/task.routes';
import prisma from '../src/config/db';

// Mock socket.io
jest.mock('../src/index', () => ({
  io: {
    emit: jest.fn(),
  },
}));

// Mock Prisma client
jest.mock('../src/config/db', () => ({
  task: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.organizationId = 'test-org-id';
  req.userId = 'test-user-id';
  next();
});
app.use('/api/tasks', taskRoutes);

describe('Task Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 for GET /api/tasks', async () => {
    const mockTasks = [
      { id: 'task1', title: 'Task 1', organizationId: 'test-org-id' },
      { id: 'task2', title: 'Task 2', organizationId: 'test-org-id' },
    ];
    (prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

    const res = await request(app).get('/api/tasks');

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.data).toEqual(mockTasks);
  });

  it('should create a new task with POST /api/tasks', async () => {
    const newTaskData = {
      title: 'New Task',
      description: 'Task Desc',
      status: 'TODO',
      projectId: 'project-id',
      priority: 'HIGH',
      dueDate: '2023-12-31',
    };

    const createdTask = { id: 'new-task-id', ...newTaskData, organizationId: 'test-org-id' };
    (prisma.task.create as jest.Mock).mockResolvedValue(createdTask);

    const res = await request(app)
      .post('/api/tasks')
      .send(newTaskData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toEqual(createdTask);
  });
});
