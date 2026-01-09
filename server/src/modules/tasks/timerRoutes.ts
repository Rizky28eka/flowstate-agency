import { Router, Request, Response } from 'express';
import { query } from '../../shared/infra/database';
import { authMiddleware, AuthRequest } from '../../shared/middleware/auth';

const router = Router();

router.use(authMiddleware);

// POST /api/tasks/:id/timer/start
router.post('/:id/timer/start', async (req: AuthRequest, res: Response) => {
    try {
        // Check if there's already a running timer for this user
        const existingResult = await query(
            "SELECT * FROM time_logs WHERE user_id = $1 AND end_time IS NULL",
            [req.userId]
        );
        if (existingResult.rows.length > 0) {
            return res.status(400).json({ error: 'You already have a running timer' });
        }

        const result = await query(
            "INSERT INTO time_logs (task_id, user_id, start_time) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *",
            [req.params.id, req.userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to start timer' });
    }
});

// POST /api/tasks/:id/timer/stop
router.post('/:id/timer/stop', async (req: AuthRequest, res: Response) => {
    try {
        const result = await query(
            `UPDATE time_logs 
             SET end_time = CURRENT_TIMESTAMP, 
                 duration_minutes = EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - start_time))/60 
             WHERE task_id = $1 AND user_id = $2 AND end_time IS NULL 
             RETURNING *`,
            [req.params.id, req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No running timer found for this task' });
        }

        // Update task's actual_hours
        const durationMinutes = result.rows[0].duration_minutes;
        await query(
            "UPDATE tasks SET actual_hours = COALESCE(actual_hours, 0) + $1 WHERE id = $2",
            [durationMinutes / 60, req.params.id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to stop timer' });
    }
});

// GET /api/tasks/:id/timer/status
router.get('/:id/timer/status', async (req: AuthRequest, res: Response) => {
    try {
        const result = await query(
            "SELECT * FROM time_logs WHERE task_id = $1 AND user_id = $2 AND end_time IS NULL",
            [req.params.id, req.userId]
        );
        res.json({ running: result.rows.length > 0, log: result.rows[0] || null });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch timer status' });
    }
});

export default router;
