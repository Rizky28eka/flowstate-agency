import { Router, Request, Response } from 'express';
import { query } from '../../shared/infra/database';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

router.use(authMiddleware);

// GET /api/quotations
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await query(`
            SELECT q.*, u.name as client_name 
            FROM quotations q 
            LEFT JOIN users u ON q.client_id = u.id 
            ORDER BY q.created_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch quotations' });
    }
});

// POST /api/quotations
router.post('/', async (req: Request, res: Response) => {
    const { client_id, title, description, amount, status } = req.body;
    try {
        const result = await query(
            `INSERT INTO quotations 
            (client_id, title, description, amount, status) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [client_id, title, description, amount, status || 'Draft']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create quotation' });
    }
});

// PUT /api/quotations/:id/status
router.put('/:id/status', async (req: Request, res: Response) => {
    const { status } = req.body;
    try {
        const result = await query(
            "UPDATE quotations SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
            [status, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Quotation not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update quotation status' });
    }
});

// POST /api/quotations/:id/convert
router.post('/:id/convert', async (req: Request, res: Response) => {
    try {
        // 1. Get quotation
        const qResult = await query("SELECT * FROM quotations WHERE id = $1", [req.params.id]);
        if (qResult.rows.length === 0) {
            return res.status(404).json({ error: 'Quotation not found' });
        }
        const q = qResult.rows[0];

        // 2. Create project from quotation
        const pResult = await query(
            `INSERT INTO projects 
            (name, description, client_id, status, budget) 
            VALUES ($1, $2, $3, 'In Progress', $4) 
            RETURNING *`,
            [q.title, q.description, q.client_id, q.amount]
        );

        // 3. Update quotation status
        await query("UPDATE quotations SET status = 'Accepted' WHERE id = $1", [req.params.id]);

        res.status(201).json({
            message: 'Converted successfully',
            project: pResult.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to convert quotation to project' });
    }
});

export default router;
