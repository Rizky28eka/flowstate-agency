import { PrismaClient, User, Organization, Role, UserStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { getRandomDate, getIndonesianName } from './utils';

const USERS_PER_AGENCY = {
  OWNER: 2,
  ADMIN: 3,
  DIRECTOR: 4,
  SENIOR_MANAGER: 5,
  MANAGER: 8,
  TEAM_LEAD: 8,
  SENIOR_SPECIALIST: 12,
  SPECIALIST: 25,
  JUNIOR_SPECIALIST: 15,
  COORDINATOR: 6,
  ASSISTANT: 8,
  FINANCE: 4,
  HR: 3,
  SALES: 5,
  ACCOUNT_MANAGER: 6,
  CLIENT: 25, // Increased client count for more varied projects
  CONTRACTOR: 8,
  INTERN: 10,
  VIEWER: 5,
};

export async function seedUsers(prisma: PrismaClient, organization: Organization, roleMap: Map<string, Role>): Promise<{ allUsers: User[]; usersByRole: Record<string, User[]> }> {
  const allUsers: User[] = [];
  const usersByRole: Record<string, User[]> = {};

  for (const [roleName, count] of Object.entries(USERS_PER_AGENCY)) {
    const role = roleMap.get(roleName);
    if (!role) continue;

    usersByRole[roleName] = [];

    for (let i = 0; i < count; i++) {
      let userName: string;
      let emailPrefix: string;

      if (roleName === 'OWNER') {
        userName = i === 0 ? 'Founder' : 'Co-Founder';
        emailPrefix = userName.toLowerCase().replace(/\s+/g, '.');
      } else if (Math.random() > 0.5) {
        userName = getIndonesianName();
        emailPrefix = userName.split(' ')[0].toLowerCase(); // Take first name for email prefix
      } else {
        const roleTitle = role.name.split('_').map(w => 
          w.charAt(0) + w.slice(1).toLowerCase()
        ).join(' ');
        userName = `${roleTitle} ${i + 1}`;
        emailPrefix = role.name.toLowerCase().replace(/_/g, ''); // Use slugified role name for email prefix
      }

      const domain = Math.random() > 0.5 ? '.com' : '.id';
      const organizationSlug = organization.name.toLowerCase().replace(/\s+/g, '');

      let baseEmail = `${emailPrefix}@${organizationSlug}${domain}`;
      let email = baseEmail;
      let emailCounter = 1;

      // Ensure email uniqueness
      while (await prisma.user.findUnique({ where: { email } })) {
        email = `${emailPrefix}${emailCounter}@${organizationSlug}${domain}`;
        emailCounter++;
      }
      
      const hashedPassword = await bcrypt.hash('password', 10);
      const user = await prisma.user.create({
        data: {
          email,
          name: userName,
          password: hashedPassword,
          organizationId: organization.id,
          status: UserStatus.ACTIVE,
          createdAt: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        }
      });
      
      await prisma.userRole.create({ data: { userId: user.id, roleId: role.id } });
      allUsers.push(user);
      usersByRole[roleName].push(user);
    }
  }
  console.log(`   ✓ Users: ${allUsers.length}`);
  return { allUsers, usersByRole };
}
