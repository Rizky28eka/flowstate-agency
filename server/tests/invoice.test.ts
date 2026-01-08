import request from 'supertest';
import express from 'express';
import invoiceRoutes from '../src/routes/invoice.routes';
import prisma from '../src/config/db';

// Mock socket.io
jest.mock('../src/index', () => ({
  io: {
    emit: jest.fn(),
  },
}));

// Mock Prisma client
jest.mock('../src/config/db', () => ({
  invoice: {
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
app.use('/api/invoices', invoiceRoutes);

describe('Invoice Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 for GET /api/invoices', async () => {
    const mockInvoices = [
      { id: 'inv1', invoiceNumber: 'INV-001', organizationId: 'test-org-id' },
      { id: 'inv2', invoiceNumber: 'INV-002', organizationId: 'test-org-id' },
    ];
    (prisma.invoice.findMany as jest.Mock).mockResolvedValue(mockInvoices);

    const res = await request(app).get('/api/invoices');

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.data).toEqual(mockInvoices);
  });

  it('should create a new invoice with POST /api/invoices', async () => {
    const newInvoiceData = {
      invoiceNumber: 'INV-003',
      clientId: 'client-id',
      projectId: 'project-id',
      total: 500,
      dueDate: '2023-12-31',
      items: [{ description: 'Item 1', quantity: 1, unitPrice: 500 }],
    };

    const createdInvoice = { id: 'new-inv-id', ...newInvoiceData, organizationId: 'test-org-id' };
    (prisma.invoice.create as jest.Mock).mockResolvedValue(createdInvoice);

    const res = await request(app)
      .post('/api/invoices')
      .send(newInvoiceData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toEqual(createdInvoice);
  });
});
