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
const router = (0, express_1.Router)();
// GET /api/projects
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Attempt to fetch from DB
        const result = yield (0, database_1.query)('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Database Error:', error);
        // Fallback for demo purposes if DB is not set up
        res.json([
            { id: 1, name: 'Demo Project (DB Error)', client: 'Fallback Client', status: 'In Progress', progress: 50 },
            { id: 2, name: 'Setup Database', client: 'System', status: 'On Hold', progress: 0 }
        ]);
    }
}));
// POST /api/projects
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, client } = req.body;
    try {
        const result = yield (0, database_1.query)('INSERT INTO projects (name, client) VALUES ($1, $2) RETURNING *', [name, client]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
}));
exports.default = router;
