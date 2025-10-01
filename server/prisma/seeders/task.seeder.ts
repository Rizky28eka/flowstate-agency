import { PrismaClient, Project, User, TaskStatus, TaskPriority } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { getRandomElement, getRandomInt, getRandomDate, generateTaskTitle } from './utils';

const TASKS_PER_PROJECT = { min: 5, max: 15 };

export async function seedTasks(prisma: PrismaClient, projects: Project[], allUsers: User[], usersByRole: Record<string, User[]>): Promise<number> {
  let totalTasks = 0;
  const specialists = [
    ...(usersByRole['SENIOR_SPECIALIST'] || []),
    ...(usersByRole['SPECIALIST'] || []),
    ...(usersByRole['JUNIOR_SPECIALIST'] || []),
  ];
  const teamLeads = usersByRole['TEAM_LEAD'] || [];
  const contractors = usersByRole['CONTRACTOR'] || [];
  const projectWorkers = [...specialists, ...teamLeads, ...contractors.slice(0, 2)];

  const taskStatuses = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.IN_REVIEW, TaskStatus.DONE, TaskStatus.BLOCKED];
  const taskPriorities = [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH, TaskPriority.URGENT];

  for (const project of projects) {
    const taskCount = getRandomInt(TASKS_PER_PROJECT.min, TASKS_PER_PROJECT.max);
    for (let t = 0; t < taskCount; t++) {
      const taskStatus = getRandomElement(taskStatuses);
      await prisma.task.create({
        data: {
          title: generateTaskTitle(),
          description: faker.lorem.paragraph(),
          status: taskStatus,
          priority: getRandomElement(taskPriorities),
          projectId: project.id,
          assigneeId: getRandomElement(projectWorkers).id,
          createdById: getRandomElement(allUsers).id,
          estimatedHours: getRandomInt(2, 40),
          actualHours: taskStatus === TaskStatus.DONE ? getRandomInt(2, 40) : 0,
          dueDate: getRandomDate(project.createdAt, project.endDate || new Date()),
        }
      });
      totalTasks++;
    }
  }
  console.log(`   ✓ Tasks: ${totalTasks}`);
  return totalTasks;
}
