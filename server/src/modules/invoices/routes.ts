import { Router, Request, Response } from 'express';
import { query } from '../../shared/infra/database';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

router.use(authMiddleware);

// GET /api/invoices
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await query(`
            SELECT i.*, p.name as project_name, u.name as client_name 
            FROM invoices i 
            LEFT JOIN projects p ON i.project_id = p.id 
            LEFT JOIN users u ON i.client_id = u.id 
            ORDER BY i.created_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
});

// GET /api/invoices/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const result = await query(
            "SELECT i.*, p.name as project_name, u.name as client_name FROM invoices i LEFT JOIN projects p ON i.project_id = p.id LEFT JOIN users u ON i.client_id = u.id WHERE i.id = $1",
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch invoice' });
    }
});

// POST /api/invoices
router.post('/', async (req: Request, res: Response) => {
    const { project_id, client_id, invoice_number, amount, status, due_date } = req.body;
    try {
        const result = await query(
            `INSERT INTO invoices 
            (project_id, client_id, invoice_number, amount, status, due_date) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`,
            [project_id, client_id, invoice_number, amount, status || 'Pending', due_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create invoice' });
    }
});

export default router;
