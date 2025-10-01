import { PrismaClient, Organization, Client, User, ClientStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { getRandomElement } from './utils';

export async function seedClients(prisma: PrismaClient, organization: Organization, allUsers: User[]): Promise<Client[]> {
  const clients: Client[] = [];
  const clientStatuses = [ClientStatus.ACTIVE, ClientStatus.PROSPECTING, ClientStatus.CHURNED];
  const industries = ['Technology', 'E-commerce', 'FinTech', 'Healthcare', 'Food & Beverage', 'Education'];
  
  // Assuming USERS_PER_AGENCY.CLIENT is defined elsewhere or passed
  const CLIENT_COUNT = 25; // Defaulting for now, adjust as needed

  for (let i = 0; i < CLIENT_COUNT; i++) {
    const client = await prisma.client.create({
      data: {
        name: faker.company.name(),
        organizationId: organization.id,
        email: faker.internet.email(),
        phone: faker.helpers.replaceSymbols('+62 ### #### ####'),
        address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
        avatarUrl: faker.image.avatar(),
        status: getRandomElement(clientStatuses),
        industry: getRandomElement(industries),
        totalBilled: faker.number.float({ min: 5000, max: 500000 }),
        satisfactionScore: faker.number.float({ min: 3.0, max: 5.0, fractionDigits: 1 }),
        createdById: getRandomElement(allUsers).id,
      }
    });
    clients.push(client);
  }
  console.log(`   ✓ Clients: ${clients.length}`);
  return clients;
}
