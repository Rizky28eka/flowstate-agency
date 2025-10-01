import { PrismaClient, Organization, Project, Client, Team, User, ProjectStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { getRandomElement, getRandomInt, getRandomDate, generateProjectName } from './utils';

export async function seedProjects(prisma: PrismaClient, organization: Organization, clients: Client[], teams: Team[], allUsers: User[]): Promise<Project[]> {
  const projects: Project[] = [];
  const projectStatuses = [ProjectStatus.PLANNING, ProjectStatus.ACTIVE, ProjectStatus.ON_HOLD, ProjectStatus.COMPLETED, ProjectStatus.CANCELLED];

  for (const client of clients) {
    const numProjects = getRandomInt(1, 10); // Each client gets 1 to 10 projects
    for (let i = 0; i < numProjects; i++) {
      const projectStatus = getRandomElement(projectStatuses);
      const startDate = getRandomDate(new Date(2024, 0, 1), new Date(2024, 6, 1));
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + getRandomInt(2, 6));

      const project: Project = await prisma.project.create({
        data: {
          name: generateProjectName(client.name),
          slug: faker.helpers.slugify(generateProjectName(client.name)).toLowerCase() + '-' + faker.string.alphanumeric(5),
          description: `${faker.lorem.sentence()} Budget: IDR ${getRandomInt(50, 500)}M`,
          status: projectStatus,
          organizationId: organization.id,
          clientId: client.id,
          teamId: getRandomElement(teams).id,
          createdById: getRandomElement(allUsers).id,
        }
      });

      await prisma.project.update({
        where: { id: project.id },
        data: {
          budget: getRandomInt(50000000, 500000000),
          startDate: new Date(startDate),
          endDate: projectStatus === ProjectStatus.COMPLETED ? new Date(endDate) : undefined,
        }
      });

      // No update for budget, startDate, endDate for now
      projects.push(project);
    }
  }
  console.log(`   ✓ Projects: ${projects.length}`);
  return projects;
}
