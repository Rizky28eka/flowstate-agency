import request from 'supertest';
import express from 'express';
import userRoutes from '../src/routes/user.routes';

// Mock @faker-js/faker to avoid ES module import issues
jest.mock('@faker-js/faker', () => ({
  faker: {
    internet: {
      userName: () => 'testuser',
      email: () => 'test@example.com',
    },
    string: {
      uuid: () => 'test-uuid',
    },
  },
}));

// Mock the socket.io import from ../index
jest.mock('../src/index', () => ({
  io: {
    emit: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
  it('should return 200 for GET /api/users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
  });
});