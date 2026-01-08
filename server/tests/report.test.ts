import request from 'supertest';
import express from 'express';
import reportRoutes from '../src/routes/report.routes';
import prisma from '../src/config/db';

// Mock socket.io
jest.mock('../src/index', () => ({
  io: {
    emit: jest.fn(),
  },
}));

// Mock Prisma client
jest.mock('../src/config/db', () => ({
  report: {
    findMany: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.organizationId = 'test-org-id';
  req.userId = 'test-user-id';
  next();
});
app.use('/api/reports', reportRoutes);

describe('Report Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 for GET /api/reports', async () => {
    const mockReports = [
      { id: 'rep1', title: 'Report 1', organizationId: 'test-org-id' },
    ];
    (prisma.report.findMany as jest.Mock).mockResolvedValue(mockReports);

    const res = await request(app).get('/api/reports');

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(mockReports);
  });
});
