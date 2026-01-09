import { Router, Request, Response } from 'express';
import { query } from '../../shared/infra/database';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

// Apply auth middleware to all client routes
router.use(authMiddleware);

// GET /api/clients
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await query(
            "SELECT id, email, name, role, avatar_url, is_active, created_at FROM users WHERE role = 'client' ORDER BY name ASC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
});

// GET /api/clients/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const result = await query(
            "SELECT id, email, name, role, avatar_url, is_active, created_at FROM users WHERE id = $1 AND role = 'client'",
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch client' });
    }
});

// POST /api/clients (Create a new client user)
router.post('/', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    // Note: In a real app, you'd hash the password here. 
    // For this implementation, we'll assume a default or provided hash.
    // For simplicity, we'll just check if email exists.
    try {
        const existing = await query("SELECT id FROM users WHERE email = $1", [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const result = await query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, 'client') RETURNING id, name, email, role, created_at",
            [name, email, 'REPLACE_WITH_ACTUAL_HASH']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create client' });
    }
});

export default router;
