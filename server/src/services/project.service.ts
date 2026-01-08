import projectRepository from '../repositories/project.repository';
import { io } from '../config/socket';
import { Prisma, ProjectStatus } from '@prisma/client';


export class ProjectService {
    async getAllProjects(organizationId: string) {
        return projectRepository.findMany(organizationId);
    }

    async getProjectById(id: string, organizationId: string) {
        const project = await projectRepository.findById(id, organizationId);
        if (!project) throw new Error("Project not found");
        return project;
    }


    async createProject(organizationId: string, userId: string, projectData: { name: string; clientId?: string; description?: string; budget?: number; status?: ProjectStatus; startDate?: Date; endDate?: Date }) {
        const { name, clientId, description, budget, status, startDate, endDate } = projectData;

        const data: Prisma.ProjectCreateInput = {
            name,
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 7),
            description,
            budget,
            status,
            startDate,
            endDate,
            organization: { connect: { id: organizationId } },
            createdBy: { connect: { id: userId } },
            ...(clientId && { client: { connect: { id: clientId } } })
        };

        const newProject = await projectRepository.create(data);
        io.emit('project_updated', newProject);
        return newProject;
    }

    async updateProject(id: string, organizationId: string, updateData: Prisma.ProjectUpdateInput) {
        const updatedProject = await projectRepository.update(id, organizationId, updateData);
        io.to(organizationId).emit('project_updated', updatedProject);
        return updatedProject;
    }

    async deleteProject(id: string, organizationId: string) {
        await projectRepository.delete(id, organizationId);
        io.to(organizationId).emit('project_deleted', { id });
    }

}

export default new ProjectService();
