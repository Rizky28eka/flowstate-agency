import { Router, Request, Response } from 'express';
import { query } from '../../shared/infra/database';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

router.use(authMiddleware);

// GET /api/users/staff (Get all users who can be assigned tasks)
router.get('/staff', async (req: Request, res: Response) => {
    try {
        const result = await query(
            "SELECT id, name, email, role, avatar_url FROM users WHERE role IN ('superadmin', 'admin', 'member') ORDER BY name ASC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch staff members' });
    }
});

// GET /api/users (Get all users)
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await query(
            "SELECT id, name, email, role, avatar_url, created_at FROM users ORDER BY created_at DESC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

export default router;
