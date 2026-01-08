import request from 'supertest';
import express from 'express';
import organizationRoutes from '../src/routes/organization.routes';
import prisma from '../src/config/db';

// Mock socket.io
jest.mock('../src/index', () => ({
  io: {
    emit: jest.fn(),
  },
}));

// Mock Prisma client
jest.mock('../src/config/db', () => ({
  organization: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.organizationId = 'test-org-id';
  req.userId = 'test-user-id';
  next();
});
app.use('/api/organization', organizationRoutes);

describe('Organization Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 for GET /api/organization', async () => {
    const mockOrg = { id: 'test-org-id', name: 'Test Org' };
    (prisma.organization.findUnique as jest.Mock).mockResolvedValue(mockOrg);

    const res = await request(app).get('/api/organization');

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(mockOrg);
  });
});
