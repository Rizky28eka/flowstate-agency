import { PrismaClient } from '@prisma/client';
import { seedOrganization } from './seeders/organization.seeder';
import { seedRoles } from './seeders/role.seeder';
import { seedUsers } from './seeders/user.seeder';
import { seedTeams } from './seeders/team.seeder';
import { seedClients } from './seeders/client.seeder';
import { seedProjects } from './seeders/project.seeder';
import { seedTasks } from './seeders/task.seeder';
import { seedInvoices } from './seeders/invoice.seeder';
import { seedApiKeys } from './seeders/apiKey.seeder';

const prisma = new PrismaClient();

const AGENCY_COUNT = 20;
const agencyNames = [
  'Quantum Leap Digital', 'Zenith Creative Labs', 'Stellar Solutions', 'Momentum Dynamics', 'Apex Innovations',
  'Nusantara Scale', 'Cipta Kreasi Bangsa', 'Sinergi Digital Raya', 'Bintang Lima Tech', 'Garuda Innovations',
  'Evolve Media Group', 'Fusion Forward', 'Ignite Growth', 'Pixel Perfect', 'Blue Ocean Strategies',
  'Warna Warni Nusantara', 'Jaya Abadi Creative', 'Pilar Teknologi', 'VisioNet', 'Karya Anak Bangsa Digital'
];

async function main() {
  console.log('🚀 Starting UNIVERSAL AGENCY seed process...\n');
  console.log('📊 Supports: Software, Creative, Marketing, Consulting, PR, Events, and more!\n');
  console.log('=' .repeat(60));
  
  const totalStart = Date.now();

  // 1. Seed all organizations
  console.log('\n📊 Step 2: Seeding organizations...');
  console.log('=' .repeat(60));
  
  for (let i = 0; i < AGENCY_COUNT; i++) {
    console.log(`\n🏢 [${i + 1}/${AGENCY_COUNT}] Seeding: ${agencyNames[i]}`);
    const startTime = Date.now();

    const organization = await seedOrganization(prisma, agencyNames[i]);
    const roleMap = await seedRoles(prisma, organization.id);
    const { allUsers, usersByRole } = await seedUsers(prisma, organization, roleMap);
    const teams = await seedTeams(prisma, organization, usersByRole);
    const clients = await seedClients(prisma, organization, allUsers);
    const projects = await seedProjects(prisma, organization, clients, teams, allUsers);
    const totalTasks = await seedTasks(prisma, projects, allUsers, usersByRole);
    const totalInvoices = await seedInvoices(prisma, organization.id, projects, clients);
    const totalApiKeys = await seedApiKeys(prisma, organization, usersByRole);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`   ⏱️  Completed in ${duration}s`);
  }

  // 3. Summary
  const totalDuration = ((Date.now() - totalStart) / 1000).toFixed(2);
  console.log('\n' + '=' .repeat(60));
  console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!\n');
  
  const stats = {
    organizations: await prisma.organization.count(),
    users: await prisma.user.count(),
    teams: await prisma.team.count(),
    projects: await prisma.project.count(),
    tasks: await prisma.task.count(),
    invoices: await prisma.invoice.count(),
    clients: await prisma.client.count(),
    apiKeys: await prisma.apiKey.count(),
  };

  console.log('📈STATISTICS:');
  console.log(`   Organizations: ${stats.organizations}`);
  console.log(`   Users: ${stats.users}`);
  console.log(`   Teams: ${stats.teams}`);
  console.log(`   Clients: ${stats.clients}`);
  console.log(`   Projects: ${stats.projects}`);
  console.log(`   Tasks: ${stats.tasks}`);
  console.log(`   Invoices: ${stats.invoices}`);
  console.log(`   API Keys: ${stats.apiKeys}`);
  console.log(`\n⏱️  Total time: ${totalDuration}s`);
  console.log('=' .repeat(60));
}

main()
  .catch((e) => {
    console.error('\n❌ An error occurred during seeding:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });