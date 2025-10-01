import { PrismaClient, Organization, SubscriptionPlan, SubscriptionStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { getRandomElement } from './utils';

const agencyTypes = [
  'Digital Marketing', 'Software Development', 'Creative & Design', 'Consulting',
  'Advertising', 'PR & Communications', 'Event Management', 'Branding',
  'Content Production', 'Social Media', 'SEO & Analytics', 'Full Service'
];

export async function seedOrganization(prisma: PrismaClient, name: string): Promise<Organization> {
  const agencyType = getRandomElement(agencyTypes);
  const organization = await prisma.organization.create({
    data: {
      name,
      slug: faker.helpers.slugify(name).toLowerCase() + '-' + faker.string.alphanumeric(5),
      timezone: 'Asia/Jakarta',
      currency: 'IDR',
      subscriptionTier: getRandomElement(Object.values(SubscriptionPlan)),
      subscriptionStatus: getRandomElement(Object.values(SubscriptionStatus)),
      settings: {
        workingHours: { start: '09:00', end: '17:00' },
        industryType: agencyType
      }
    }
  });
  console.log(`   📋 Type: ${agencyType}`);
  return organization;
}
