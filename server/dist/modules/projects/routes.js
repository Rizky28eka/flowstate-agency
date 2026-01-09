"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../../shared/infra/database");
const auth_1 = require("../../shared/middleware/auth");
const router = (0, express_1.Router)();
// Apply auth middleware to all project routes
router.use(auth_1.authMiddleware);
// GET /api/projects
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, database_1.query)(`
            SELECT p.*, u.name as client 
            FROM projects p 
            LEFT JOIN users u ON p.client_id = u.id 
            ORDER BY p.created_at DESC
        `);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
}));
// GET /api/projects/:id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, database_1.query)('SELECT * FROM projects WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
}));
// POST /api/projects
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, client_id, status, progress, budget, start_date, end_date } = req.body;
    try {
        const result = yield (0, database_1.query)(`INSERT INTO projects 
            (name, description, client_id, status, progress, budget, start_date, end_date) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`, [name, description, client_id, status, progress || 0, budget, start_date, end_date]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
}));
// PUT /api/projects/:id
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, status, progress, budget, start_date, end_date } = req.body;
    try {
        const result = yield (0, database_1.query)(`UPDATE projects 
            SET name = $1, description = $2, status = $3, progress = $4, budget = $5, start_date = $6, end_date = $7, updated_at = CURRENT_TIMESTAMP
            WHERE id = $8 RETURNING *`, [name, description, status, progress, budget, start_date, end_date, req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update project' });
    }
}));
// DELETE /api/projects/:id
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, database_1.query)('DELETE FROM projects WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
}));
// GET /api/projects/:id/tasks
router.get('/:id/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, database_1.query)(`SELECT t.*, u.name as assignee_name, u.avatar_url as assignee_avatar 
             FROM tasks t 
             LEFT JOIN users u ON t.assigned_to = u.id 
             WHERE t.project_id = $1 
             ORDER BY t.created_at DESC`, [req.params.id]);
        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}));
// POST /api/projects/:id/tasks
router.post('/:id/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, assigned_to, due_date, estimated_hours } = req.body;
    try {
        const result = yield (0, database_1.query)(`INSERT INTO tasks 
            (project_id, title, description, status, priority, assigned_to, due_date, estimated_hours) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`, [req.params.id, title, description, status || 'To Do', priority || 'Medium', assigned_to, due_date, estimated_hours]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create task' });
    }
}));
exports.default = router;
