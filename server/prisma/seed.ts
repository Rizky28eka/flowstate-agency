import { PrismaClient, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Optional: Clean up specific seed data to avoid conflicts if re-running
  // Be careful with deleteMany in production!
  await prisma.userRole.deleteMany({});
  await prisma.user.deleteMany({
    where: {
      email: {
        in: ['superadmin@flowstate.agency', 'admin@agencyone.com']
      }
    }
  });
  await prisma.role.deleteMany({
    where: {
      slug: {
        in: ['super-admin', 'admin']
      },
      organization: {
        slug: {
          in: ['flowstate-hq', 'agency-one']
        }
      }
    }
  });
  await prisma.organization.deleteMany({
    where: {
      slug: {
        in: ['flowstate-hq', 'agency-one']
      }
    }
  });

  // 1. Create the Main Organization (for Super Admin)
  const mainOrg = await prisma.organization.create({
    data: {
      name: 'Flowstate HQ',
      slug: 'flowstate-hq',
      domain: 'flowstate.agency',
      subscriptionTier: 'ENTERPRISE',
    },
  });

  // 2. Create Super Admin Role
  const superAdminRole = await prisma.role.create({
    data: {
      name: 'Super Admin',
      slug: 'super-admin',
      description: 'Platform Super Administrator',
      organizationId: mainOrg.id,
      level: 100,
      isSystem: true,
    },
  });

  // 3. Create Super Admin User
  const superAdminPassword = await bcrypt.hash('password123', 10);
  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@flowstate.agency',
      name: 'Super Administrator',
      password: superAdminPassword,
      organizationId: mainOrg.id,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      roles: {
        create: {
          roleId: superAdminRole.id,
        },
      },
    },
  });

  console.log(`✅ Created Super Admin: ${superAdmin.email} / password123`);

  // 4. Create a Client Agency
  const agencyOrg = await prisma.organization.create({
    data: {
      name: 'Agency One',
      slug: 'agency-one',
      domain: 'agencyone.com',
      subscriptionTier: 'PRO',
    },
  });

  // 5. Create Admin Role for Agency
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      slug: 'admin',
      description: 'Agency Administrator',
      organizationId: agencyOrg.id,
      level: 50,
      isSystem: true,
    },
  });

  // 6. Create Admin User for Agency
  const adminPassword = await bcrypt.hash('password123', 10);
  const agencyAdmin = await prisma.user.create({
    data: {
      email: 'admin@agencyone.com',
      name: 'Agency Admin',
      password: adminPassword,
      organizationId: agencyOrg.id,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      roles: {
        create: {
          roleId: adminRole.id,
        },
      },
    },
  });

  console.log(`✅ Created Agency Admin: ${agencyAdmin.email} / password123`);
  console.log('🚀 Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });