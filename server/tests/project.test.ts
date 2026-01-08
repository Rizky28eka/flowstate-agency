import request from 'supertest';
import express from 'express';
import projectRoutes from '../src/routes/project.routes';
import prisma from '../src/config/db';

// Mock socket.io
jest.mock('../src/index', () => ({
  io: {
    emit: jest.fn(),
  },
}));

// Mock Prisma client
jest.mock('../src/config/db', () => ({
  project: {
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
app.use('/api/projects', projectRoutes);

describe('Project Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 for GET /api/projects', async () => {
    const mockProjects = [
      { id: 'proj1', name: 'Project 1', organizationId: 'test-org-id' },
      { id: 'proj2', name: 'Project 2', organizationId: 'test-org-id' },
    ];
    (prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects);

    const res = await request(app).get('/api/projects');

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.data).toEqual(mockProjects);
  });

  it('should create a new project with POST /api/projects', async () => {
    const newProjectData = {
      name: 'New Project',
      description: 'Project Desc',
      status: 'ACTIVE',
      clientId: 'client-id',
      budget: 1000,
    };

    const createdProject = { id: 'new-proj-id', ...newProjectData, organizationId: 'test-org-id' };
    (prisma.project.create as jest.Mock).mockResolvedValue(createdProject);

    const res = await request(app)
      .post('/api/projects')
      .send(newProjectData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toEqual(createdProject);
  });
});
