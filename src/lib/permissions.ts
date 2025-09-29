/**
 * This file defines the source of truth for all permissions in the application.
 * It is used to build the role-based access control (RBAC) system.
 */

// 1. Defines all possible permissions as a constant object.
export const PERMISSIONS = {
  // Projects
  PROJECTS_VIEW: 'projects:view',
  PROJECTS_CREATE: 'projects:create',
  PROJECTS_EDIT: 'projects:edit',
  PROJECTS_DELETE: 'projects:delete',
  PROJECTS_ASSIGN_USERS: 'projects:assign_users',

  // Tasks
  TASKS_VIEW: 'tasks:view',
  TASKS_CREATE: 'tasks:create',
  TASKS_EDIT: 'tasks:edit',
  TASKS_DELETE: 'tasks:delete',
  TASKS_CHANGE_STATUS: 'tasks:change_status',

  // Clients
  CLIENTS_VIEW: 'clients:view',
  CLIENTS_CREATE: 'clients:create',
  CLIENTS_EDIT: 'clients:edit',
  CLIENTS_DELETE: 'clients:delete',

  // Team Management
  TEAM_VIEW: 'team:view',
  TEAM_EDIT_MEMBERS: 'team:edit_members',

  // Financials
  FINANCE_VIEW_REPORTS: 'finance:view_reports',
  FINANCE_MANAGE_INVOICES: 'finance:manage_invoices',
  FINANCE_MANAGE_EXPENSES: 'finance:manage_expenses',
  FINANCE_MANAGE_BUDGETS: 'finance:manage_budgets',

  // Admin - User & Role Management
  ADMIN_USERS_VIEW: 'admin:users:view',
  ADMIN_USERS_MANAGE: 'admin:users:manage',
  ADMIN_ROLES_VIEW: 'admin:roles:view',
  ADMIN_ROLES_MANAGE: 'admin:roles:manage',

  // Admin - System Settings
  ADMIN_SETTINGS_MANAGE: 'admin:settings:manage',
  ADMIN_BILLING_MANAGE: 'admin:billing:manage',
  ADMIN_INTEGRATIONS_MANAGE: 'admin:integrations:manage',
  ADMIN_VIEW_SYSTEM_HEALTH: 'admin:view_system_health',
  ADMIN_VIEW_AUDIT_LOGS: 'admin:view_audit_logs',

  // Owner-level permissions
  OWNER_VIEW_DASHBOARD: 'owner:view_dashboard',
} as const;

// 2. Creates a TypeScript type from the permissions object keys.
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// 3. Groups permissions by category for easier management in the UI.
export const PERMISSION_GROUPS: Record<string, Permission[]> = {
  "Projects": [
    PERMISSIONS.PROJECTS_VIEW,
    PERMISSIONS.PROJECTS_CREATE,
    PERMISSIONS.PROJECTS_EDIT,
    PERMISSIONS.PROJECTS_DELETE,
    PERMISSIONS.PROJECTS_ASSIGN_USERS,
  ],
  "Tasks": [
    PERMISSIONS.TASKS_VIEW,
    PERMISSIONS.TASKS_CREATE,
    PERMISSIONS.TASKS_EDIT,
    PERMISSIONS.TASKS_DELETE,
    PERMISSIONS.TASKS_CHANGE_STATUS,
  ],
  "Clients": [
    PERMISSIONS.CLIENTS_VIEW,
    PERMISSIONS.CLIENTS_CREATE,
    PERMISSIONS.CLIENTS_EDIT,
    PERMISSIONS.CLIENTS_DELETE,
  ],
  "Team Management": [
    PERMISSIONS.TEAM_VIEW,
    PERMISSIONS.TEAM_EDIT_MEMBERS,
  ],
  "Financials": [
    PERMISSIONS.FINANCE_VIEW_REPORTS,
    PERMISSIONS.FINANCE_MANAGE_INVOICES,
    PERMISSIONS.FINANCE_MANAGE_EXPENSES,
    PERMISSIONS.FINANCE_MANAGE_BUDGETS,
  ],
  "Admin: User Management": [
    PERMISSIONS.ADMIN_USERS_VIEW,
    PERMISSIONS.ADMIN_USERS_MANAGE,
    PERMISSIONS.ADMIN_ROLES_VIEW,
    PERMISSIONS.ADMIN_ROLES_MANAGE,
  ],
  "Admin: System": [
    PERMISSIONS.ADMIN_SETTINGS_MANAGE,
    PERMISSIONS.ADMIN_BILLING_MANAGE,
    PERMISSIONS.ADMIN_INTEGRATIONS_MANAGE,
    PERMISSIONS.ADMIN_VIEW_SYSTEM_HEALTH,
    PERMISSIONS.ADMIN_VIEW_AUDIT_LOGS,
  ],
  "Owner": [
    PERMISSIONS.OWNER_VIEW_DASHBOARD,
  ],
};

// 4. Defines the data structure for a Role.
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

// 5. Provides initial mock data for roles, using the new permission structure.
export const MOCK_ROLES: Role[] = [
  {
    id: 'owner',
    name: 'Owner',
    description: 'Has unrestricted access to all features, including company-level settings and analytics.',
    permissions: Object.values(PERMISSIONS), // Owner has all permissions
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Manages system settings, users, roles, and billing. Does not have access to owner-level strategic data.',
    permissions: [
      ...PERMISSION_GROUPS["Admin: User Management"],
      ...PERMISSION_GROUPS["Admin: System"],
    ],
  },
  {
    id: 'project_manager',
    name: 'Project Manager',
    description: 'Manages projects, tasks, clients, and team members assigned to their projects.',
    permissions: [
      PERMISSIONS.PROJECTS_VIEW,
      PERMISSIONS.PROJECTS_CREATE,
      PERMISSIONS.PROJECTS_EDIT,
      PERMISSIONS.PROJECTS_ASSIGN_USERS,
      PERMISSIONS.TASKS_VIEW,
      PERMISSIONS.TASKS_CREATE,
      PERMISSIONS.TASKS_EDIT,
      PERMISSIONS.TASKS_CHANGE_STATUS,
      PERMISSIONS.CLIENTS_VIEW,
      PERMISSIONS.TEAM_VIEW,
    ],
  },
  {
    id: 'team_lead',
    name: 'Team Lead',
    description: 'Manages a specific team, oversees their tasks and performance, but does not manage budgets or clients.',
    permissions: [
      PERMISSIONS.PROJECTS_VIEW,
      PERMISSIONS.TASKS_VIEW,
      PERMISSIONS.TASKS_CHANGE_STATUS,
      PERMISSIONS.TEAM_VIEW,
      PERMISSIONS.TEAM_EDIT_MEMBERS,
    ],
  },
  {
    id: 'member',
    name: 'Member',
    description: 'A team member who works on assigned tasks. Can only view projects and tasks they are part of.',
    permissions: [
      PERMISSIONS.PROJECTS_VIEW,
      PERMISSIONS.TASKS_VIEW,
      PERMISSIONS.TASKS_CHANGE_STATUS,
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Manages all financial aspects of the company, including invoices, expenses, and reports.',
    permissions: [...PERMISSION_GROUPS["Financials"]],
  },
  {
    id: 'client',
    name: 'Client',
    description: 'Can view the projects they are involved in, communicate with the team, and view their invoices.',
    permissions: [
      PERMISSIONS.PROJECTS_VIEW,
      PERMISSIONS.TASKS_VIEW,
      PERMISSIONS.FINANCE_MANAGE_INVOICES, // Assuming they can view/pay their own
    ],
  },
];
