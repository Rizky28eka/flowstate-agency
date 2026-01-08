import taskRepository from '../repositories/task.repository';
import { io } from '../config/socket';
import { Prisma, TaskStatus, TaskPriority, TaskType } from '@prisma/client';

interface TaskData {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    type?: TaskType;
    dueDate?: string;
    projectId: string;
    assigneeId?: string;
    completedAt?: string;
}

export class TaskService {
    async getAllTasks(organizationId: string, projectId?: string) {
        return taskRepository.findMany(organizationId, projectId);
    }

    async getTaskById(id: string, organizationId: string) {
        return taskRepository.findById(id, organizationId);
    }

    async createTask(organizationId: string, userId: string, taskData: TaskData) {

        const { title, description, status, priority, type, dueDate, projectId, assigneeId } = taskData;

        const data: Prisma.TaskCreateInput = {
            title,
            description,
            status: status || TaskStatus.TODO,
            priority: priority || TaskPriority.MEDIUM,
            type: type || TaskType.TASK,
            dueDate: dueDate ? new Date(dueDate) : null,
            project: { connect: { id: projectId } },
            createdBy: { connect: { id: userId } },
            ...(assigneeId && { assignee: { connect: { id: assigneeId } } })
        };

        const newTask = await taskRepository.create(data);
        io.to(organizationId).emit('task_created', newTask);
        return newTask;
    }

    async updateTask(id: string, organizationId: string, updateData: Partial<TaskData>) {
        const formattedData: Prisma.TaskUpdateInput = { ...updateData as Prisma.TaskUpdateInput };

        if (updateData.dueDate) formattedData.dueDate = new Date(updateData.dueDate);
        if (updateData.completedAt) formattedData.completedAt = new Date(updateData.completedAt);

        if (updateData.assigneeId) {
            formattedData.assignee = { connect: { id: updateData.assigneeId } };
            delete (formattedData as Record<string, unknown>).assigneeId;
        }


        const updatedTask = await taskRepository.update(id, organizationId, formattedData);
        io.to(organizationId).emit('task_updated', updatedTask);
        return updatedTask;
    }

    async deleteTask(id: string, organizationId: string) {
        await taskRepository.delete(id, organizationId);
        io.to(organizationId).emit('task_deleted', { id });
    }
}

export default new TaskService();
