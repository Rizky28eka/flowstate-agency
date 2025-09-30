import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './db';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 3001;

app.use(cors());
app.use(express.json());

// Simple route for health check
app.get('/', (req: Request, res: Response) => {
  res.send('Flowstate Agency server is running!');
});

// Example API route to test DB connection
app.get('/api/test', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error('Database connection error', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all users
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error('Error fetching users', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const initializeDatabase = async () => {
  try {
    const client = await pool.connect();
    // Example: Create a users table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed the table if it's empty
    const res = await client.query('SELECT COUNT(*) FROM users');
    if (res.rows[0].count === '0') {
      await client.query(`
        INSERT INTO users (name, email) VALUES
        ('Alice Johnson', 'alice@example.com'),
        ('Bob Williams', 'bob@example.com'),
        ('Charlie Brown', 'charlie@example.com');
      `);
      console.log('Users table was empty, seeded with 3 users.');
    }

    console.log('Database initialized successfully.');
    client.release();
  } catch (err) {
    console.error('Error initializing database:', err);
    // Exit process if database initialization fails
    process.exit(1);
  }
};

app.listen(port, () => {
  initializeDatabase();
  console.log(`Server is running at http://localhost:${port}`);
});
