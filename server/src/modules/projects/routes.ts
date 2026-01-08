import { Router, Request, Response } from 'express';
import { query } from '../../shared/infra/database';
import { authMiddleware, AuthRequest } from '../../shared/middleware/auth';

const router = Router();

// Apply auth middleware to all project routes
router.use(authMiddleware);

// GET /api/projects
router.get('/', async (req: Request, res: Response) => {
    try {
        // Attempt to fetch from DB
        const result = await query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Database Error:', error);
        // Fallback for demo purposes if DB is not set up
        res.json([
            { id: 1, name: 'Demo Project (DB Error)', client: 'Fallback Client', status: 'In Progress', progress: 50 },
            { id: 2, name: 'Setup Database', client: 'System', status: 'On Hold', progress: 0 }
        ]);
    }
});

// POST /api/projects
router.post('/', async (req: Request, res: Response) => {
    const { name, client } = req.body;
    try {
        const result = await query(
            'INSERT INTO projects (name, client) VALUES ($1, $2) RETURNING *',
            [name, client]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

export default router;
