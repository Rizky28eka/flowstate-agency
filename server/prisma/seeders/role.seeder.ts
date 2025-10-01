import { PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';

const rolesConfig = [
  // === C-LEVEL & OWNERSHIP ===
  {
    name: 'OWNER',
    permissions: {
      organizations: { create: true, read: true, update: true, delete: true },
      users: { create: true, read: true, update: true, delete: true },
      roles: { create: true, read: true, update: true, delete: true },
      projects: { create: true, read: true, update: true, delete: true },
      tasks: { create: true, read: true, update: true, delete: true },
      clients: { create: true, read: true, update: true, delete: true },
      teams: { create: true, read: true, update: true, delete: true },
      finances: { create: true, read: true, update: true, delete: true },
      reports: { create: true, read: true, export: true },
      settings: { read: true, update: true },
      scope: 'all'
    },
    description: 'Company founders and owners with full system access',
    level: 5
  },
  
  // === EXECUTIVE & SENIOR MANAGEMENT ===
  {
    name: 'DIRECTOR',
    permissions: {
      organizations: { read: true, update: true },
      users: { create: true, read: true, update: true },
      roles: { read: true },
      projects: { create: true, read: true, update: true, delete: true },
      tasks: { create: true, read: true, update: true, delete: true },
      clients: { create: true, read: true, update: true, delete: true },
      teams: { create: true, read: true, update: true },
      finances: { read: true, update: true },
      reports: { create: true, read: true, export: true },
      settings: { read: true },
      scope: 'all'
    },
    description: 'Department directors and C-level executives',
    level: 4
  },
  {
    name: 'ADMIN',
    permissions: {
      organizations: { read: true, update: true },
      users: { create: true, read: true, update: true, delete: true },
      roles: { create: true, read: true, update: true },
      projects: { create: true, read: true, update: true, delete: true },
      tasks: { create: true, read: true, update: true, delete: true },
      clients: { create: true, read: true, update: true, delete: true },
      teams: { create: true, read: true, update: true, delete: true },
      finances: { read: true },
      reports: { create: true, read: true, export: true },
      settings: { read: true, update: true },
      scope: 'all'
    },
    description: 'System administrators with broad permissions',
    level: 4
  },
  
  // === MANAGEMENT LEVELS ===
  {
    name: 'SENIOR_MANAGER',
    permissions: {
      organizations: { read: true },
      users: { read: true, update: true },
      roles: { read: true },
      projects: { create: true, read: true, update: true, delete: true },
      tasks: { create: true, read: true, update: true, delete: true },
      clients: { create: true, read: true, update: true },
      teams: { create: true, read: true, update: true },
      finances: { read: true },
      reports: { create: true, read: true, export: true },
      settings: { read: true },
      scope: 'department'
    },
    description: 'Senior managers overseeing multiple projects/teams',
    level: 3
  },
  {
    name: 'MANAGER',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { create: true, read: true, update: true },
      tasks: { create: true, read: true, update: true, delete: true },
      clients: { read: true, update: true },
      teams: { read: true, update: true },
      finances: { read: true },
      reports: { create: true, read: true },
      settings: { read: true },
      scope: 'assigned_projects'
    },
    description: 'Project and department managers',
    level: 3
  },
  {
    name: 'ACCOUNT_MANAGER',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { create: true, read: true, update: true },
      tasks: { read: true, update: true },
      clients: { create: true, read: true, update: true },
      teams: { read: true },
      finances: { read: true },
      reports: { read: true },
      settings: { read: true },
      scope: 'assigned_clients'
    },
    description: 'Client relationship and account management',
    level: 3
  },
  
  // === TEAM LEADERSHIP ===
  {
    name: 'TEAM_LEAD',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { read: true, update: true },
      tasks: { create: true, read: true, update: true, delete: true },
      clients: { read: true },
      teams: { read: true, update: true },
      finances: { read: true },
      reports: { read: true },
      settings: { read: true },
      scope: 'team'
    },
    description: 'Team leaders and supervisors',
    level: 2
  },
  
  // === SPECIALIST LEVELS (Universal for any field) ===
  {
    name: 'SENIOR_SPECIALIST',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { read: true, update: true },
      tasks: { create: true, read: true, update: true },
      clients: { read: true },
      teams: { read: true },
      finances: { read: true },
      reports: { read: true },
      settings: { read: true },
      scope: 'assigned'
    },
    description: 'Senior-level specialists with advanced expertise',
    level: 2
  },
  {
    name: 'SPECIALIST',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { read: true },
      tasks: { create: true, read: true, update: true },
      clients: { read: true },
      teams: { read: true },
      finances: {},
      reports: { read: true },
      settings: { read: true },
      scope: 'assigned'
    },
    description: 'Mid-level specialists and practitioners',
    level: 1
  },
  {
    name: 'JUNIOR_SPECIALIST',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { read: true },
      tasks: { read: true, update: true },
      clients: { read: true },
      teams: { read: true },
      finances: {},
      reports: { read: true },
      settings: { read: true },
      scope: 'assigned'
    },
    description: 'Entry-level specialists and junior staff',
    level: 0
  },
  
  // === SUPPORT & COORDINATION ===
  {
    name: 'COORDINATOR',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { read: true, update: true },
      tasks: { create: true, read: true, update: true },
      clients: { read: true },
      teams: { read: true },
      finances: {},
      reports: { read: true },
      settings: { read: true },
      scope: 'assigned'
    },
    description: 'Project coordinators and facilitators',
    level: 1
  },
  {
    name: 'ASSISTANT',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { read: true },
      tasks: { read: true, update: true },
      clients: { read: true },
      teams: { read: true },
      finances: {},
      reports: { read: true },
      settings: { read: true },
      scope: 'assigned'
    },
    description: 'Administrative assistants and support staff',
    level: 0
  },
  
  // === BUSINESS FUNCTIONS ===
  {
    name: 'FINANCE',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { read: true },
      tasks: { read: true },
      clients: { read: true },
      teams: { read: true },
      finances: { create: true, read: true, update: true, delete: true },
      reports: { create: true, read: true, export: true },
      settings: { read: true },
      scope: 'all'
    },
    description: 'Financial management and accounting',
    level: 2
  },
  {
    name: 'HR',
    permissions: {
      organizations: { read: true },
      users: { create: true, read: true, update: true },
      roles: { read: true, update: true },
      projects: { read: true },
      tasks: { read: true },
      clients: {},
      teams: { read: true, update: true },
      finances: {},
      reports: { create: true, read: true, export: true },
      settings: { read: true },
      scope: 'all'
    },
    description: 'Human resources and people operations',
    level: 2
  },
  {
    name: 'SALES',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { create: true, read: true },
      tasks: { read: true },
      clients: { create: true, read: true, update: true },
      teams: { read: true },
      finances: { read: true },
      reports: { read: true },
      settings: { read: true },
      scope: 'assigned_clients'
    },
    description: 'Sales and business development',
    level: 2
  },
  
  // === TEMPORARY & EXTERNAL ===
  {
    name: 'CONTRACTOR',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { read: true },
      tasks: { read: true, update: true },
      clients: {},
      teams: { read: true },
      finances: {},
      reports: {},
      settings: {},
      scope: 'assigned'
    },
    description: 'External contractors and freelancers',
    level: 0
  },
  {
    name: 'INTERN',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: { read: true },
      projects: { read: true },
      tasks: { read: true, update: true },
      clients: { read: true },
      teams: { read: true },
      finances: {},
      reports: { read: true },
      settings: { read: true },
      scope: 'assigned'
    },
    description: 'Interns and trainees',
    level: 0
  },
  {
    name: 'CLIENT',
    permissions: {
      organizations: {},
      users: {},
      roles: {},
      projects: { read: true },
      tasks: { read: true, comment: true },
      clients: {},
      teams: {},
      finances: {},
      reports: { read: true },
      settings: {},
      scope: 'own_projects'
    },
    description: 'External clients with project visibility',
    level: 0
  },
  {
    name: 'VIEWER',
    permissions: {
      organizations: { read: true },
      users: { read: true },
      roles: {},
      projects: { read: true },
      tasks: { read: true },
      clients: { read: true },
      teams: { read: true },
      finances: {},
      reports: { read: true },
      settings: {},
      scope: 'all'
    },
    description: 'Read-only access for stakeholders',
    level: 0
  },
];

export async function seedRoles(prisma: PrismaClient, organizationId: string): Promise<Map<string, Role>> {
  const roles = await Promise.all(
    rolesConfig.map(role => prisma.role.create({
      data: { name: role.name, slug: faker.helpers.slugify(role.name).toLowerCase(), description: role.description, level: role.level, organizationId }
    }))
  );
  console.log(`   ✓ Roles: ${roles.length}`);
  return new Map(roles.map(r => [r.name, r]));
}
