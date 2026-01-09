import { Router, Request, Response } from 'express';
import { query } from '../../shared/infra/database';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

router.use(authMiddleware);

// PUT /api/tasks/:id
router.put('/:id', async (req: Request, res: Response) => {
    const { title, description, status, priority, assigned_to, due_date, estimated_hours, actual_hours } = req.body;
    
    // Construct dynamic update query
    const fields = [];
    const values = [];
    let idx = 1;

    if (title !== undefined) { fields.push(`title = $${idx++}`); values.push(title); }
    if (description !== undefined) { fields.push(`description = $${idx++}`); values.push(description); }
    if (status !== undefined) { fields.push(`status = $${idx++}`); values.push(status); }
    if (priority !== undefined) { fields.push(`priority = $${idx++}`); values.push(priority); }
    if (assigned_to !== undefined) { fields.push(`assigned_to = $${idx++}`); values.push(assigned_to); }
    if (due_date !== undefined) { fields.push(`due_date = $${idx++}`); values.push(due_date); }
    if (estimated_hours !== undefined) { fields.push(`estimated_hours = $${idx++}`); values.push(estimated_hours); }
    if (actual_hours !== undefined) { fields.push(`actual_hours = $${idx++}`); values.push(actual_hours); }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);

    if (fields.length === 1) { // Only updated_at
        return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(req.params.id);
    const queryStr = `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;

    try {
        const result = await query(queryStr, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const result = await query('DELETE FROM tasks WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

export default router;
