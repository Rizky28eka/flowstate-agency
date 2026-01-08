import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import projectService from '../services/project.service';

export class ProjectController {
    getAllProjects = asyncHandler(async (req: Request, res: Response) => {
        const projects = await projectService.getAllProjects(req.organizationId);
        return res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully"));
    });

    getProjectById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const project = await projectService.getProjectById(id, req.organizationId);
        return res.status(200).json(new ApiResponse(200, project, "Project fetched successfully"));
    });


    createProject = asyncHandler(async (req: Request, res: Response) => {
        const project = await projectService.createProject(req.organizationId, req.userId, req.body);
        return res.status(201).json(new ApiResponse(201, project, "Project created successfully"));
    });

    updateProject = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const project = await projectService.updateProject(id, req.organizationId, req.body);
        return res.status(200).json(new ApiResponse(200, project, "Project updated successfully"));
    });

    deleteProject = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await projectService.deleteProject(id, req.organizationId);
        return res.status(200).json(new ApiResponse(200, {}, "Project deleted successfully"));
    });

}

export default new ProjectController();
