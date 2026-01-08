import request from 'supertest';
import express from 'express';
import clientRoutes from '../src/routes/client.routes';
import prisma from '../src/config/db';

// Mock socket.io
jest.mock('../src/index', () => ({
  io: {
    emit: jest.fn(),
  },
}));

// Mock Prisma client
jest.mock('../src/config/db', () => ({
  client: {
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
app.use('/api/clients', clientRoutes);

describe('Client Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 for GET /api/clients', async () => {
    const mockClients = [
      {
        id: 'client1',
        name: 'Client One',
        companyName: 'Company A',
        organizationId: 'test-org-id',
        projects: [{ id: 'proj1', status: 'ACTIVE' }, { id: 'proj2', status: 'INACTIVE' }],
      },
      {
        id: 'client2',
        name: 'Client Two',
        companyName: 'Company B',
        organizationId: 'test-org-id',
        projects: [{ id: 'proj3', status: 'ACTIVE' }],
      },
    ];
    (prisma.client.findMany as jest.Mock).mockResolvedValue(mockClients);

    const res = await request(app).get('/api/clients');

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.data[0].activeProjects).toEqual(1);
    expect(res.body.data[1].activeProjects).toEqual(1);
    expect(prisma.client.findMany).toHaveBeenCalledWith({
      where: { organizationId: 'test-org-id' },
      include: { projects: true },
    });
  });

  it('should create a new client with POST /api/clients', async () => {
    const newClientData = {
      name: 'New Client',
      companyName: 'New Company',
      email: 'new@example.com',
      phone: '123-456-7890',
      website: 'www.newcompany.com',
      address: '123 New St',
      city: 'New City',
      state: 'NS',
      country: 'NC',
      postalCode: '12345',
      industry: 'Tech',
      companySize: 'Small',
      status: 'ACTIVE',
      type: 'Enterprise',
      rating: 5,
      avatarUrl: 'http://example.com/avatar.jpg',
      taxId: 'TAX123',
      notes: 'Some notes',
      metadata: { key: 'value' },
    };

    const createdClient = { id: 'new-client-id', ...newClientData, organizationId: 'test-org-id', createdById: 'test-user-id' };
    (prisma.client.create as jest.Mock).mockResolvedValue(createdClient);

    const res = await request(app)
      .post('/api/clients')
      .send(newClientData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toEqual(createdClient);
    expect(prisma.client.create).toHaveBeenCalledWith({
      data: {
        ...newClientData,
        organization: { connect: { id: 'test-org-id' } },
        createdBy: { connect: { id: 'test-user-id' } },
      },
    });
  });
});