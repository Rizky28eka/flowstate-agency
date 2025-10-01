export interface Organization {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  settings?: {
    plan?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  level?: string;
  permissions: any;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  clientId?: string;
  teamId?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  assigneeId?: string;
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: string;
  amount: number;
  dueDate: string;
  issuedAt: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  items?: any;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
}

export interface TeamMember {
  userId: string;
  teamId: string;
  role: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  description?: string;
  expiresAt?: string;
  createdAt: string;
  organizationId: string;
  userId: string;
}
