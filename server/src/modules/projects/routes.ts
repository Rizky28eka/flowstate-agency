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

// GET /api/projects/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const result = await query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// POST /api/projects
router.post('/', async (req: Request, res: Response) => {
    const { name, description, client_id, status, progress, budget, start_date, end_date } = req.body;
    try {
        const result = await query(
            `INSERT INTO projects 
            (name, description, client_id, status, progress, budget, start_date, end_date) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`,
            [name, description, client_id, status, progress || 0, budget, start_date, end_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// PUT /api/projects/:id
router.put('/:id', async (req: Request, res: Response) => {
    const { name, description, status, progress, budget, start_date, end_date } = req.body;
    try {
        const result = await query(
            `UPDATE projects 
            SET name = $1, description = $2, status = $3, progress = $4, budget = $5, start_date = $6, end_date = $7, updated_at = CURRENT_TIMESTAMP
            WHERE id = $8 RETURNING *`,
            [name, description, status, progress, budget, start_date, end_date, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const result = await query('DELETE FROM projects WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// GET /api/projects/:id/tasks
router.get('/:id/tasks', async (req: Request, res: Response) => {
    try {
        const result = await query(
            `SELECT t.*, u.name as assignee_name, u.avatar_url as assignee_avatar 
             FROM tasks t 
             LEFT JOIN users u ON t.assigned_to = u.id 
             WHERE t.project_id = $1 
             ORDER BY t.created_at DESC`,
            [req.params.id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// POST /api/projects/:id/tasks
router.post('/:id/tasks', async (req: Request, res: Response) => {
    const { title, description, status, priority, assigned_to, due_date, estimated_hours } = req.body;
    try {
        const result = await query(
            `INSERT INTO tasks 
            (project_id, title, description, status, priority, assigned_to, due_date, estimated_hours) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`,
            [req.params.id, title, description, status || 'To Do', priority || 'Medium', assigned_to, due_date, estimated_hours]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

export default router;
