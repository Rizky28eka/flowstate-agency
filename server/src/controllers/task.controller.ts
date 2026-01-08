import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import taskService from '../services/task.service';

export class TaskController {
    getAllTasks = asyncHandler(async (req: Request, res: Response) => {
        const { projectId } = req.query;
        const tasks = await taskService.getAllTasks(req.organizationId, projectId as string);
        return res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
    });

    getTaskById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const task = await taskService.getTaskById(id, req.organizationId);
        return res.status(200).json(new ApiResponse(200, task, "Task fetched successfully"));
    });

    createTask = asyncHandler(async (req: Request, res: Response) => {
        const task = await taskService.createTask(req.organizationId, req.userId, req.body);
        return res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
    });

    updateTask = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const task = await taskService.updateTask(id, req.organizationId, req.body);
        return res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
    });

    deleteTask = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await taskService.deleteTask(id, req.organizationId);
        return res.status(200).json(new ApiResponse(200, {}, "Task deleted successfully"));
    });
}

export default new TaskController();
