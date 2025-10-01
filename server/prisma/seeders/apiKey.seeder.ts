import { PrismaClient, Organization, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { getRandomElement, getRandomDate } from './utils';

const API_KEYS_PER_AGENCY = 3;

export async function seedApiKeys(prisma: PrismaClient, organization: Organization, usersByRole: Record<string, User[]>): Promise<number> {
  const admins = [...(usersByRole['OWNER'] || []), ...(usersByRole['ADMIN'] || [])];
  for (let i = 0; i < API_KEYS_PER_AGENCY; i++) {
    await prisma.apiKey.create({
      data: {
        name: `API Key ${i + 1} - ${['Production', 'Staging', 'Development'][i] || 'Testing'}`,
        key: `sk_${organization.id.slice(0, 8)}_${faker.string.alphanumeric(32)}`,
        organizationId: organization.id,
        userId: getRandomElement(admins).id,
        expiresAt: i === 0 ? null : getRandomDate(new Date(), new Date(2026, 11, 31)),
      }
    });
  }
  console.log(`   ✓ API Keys: ${API_KEYS_PER_AGENCY}`);
  return API_KEYS_PER_AGENCY;
}
