import { User as Employee } from '../types';

const API_BASE_URL = ''; // Use relative path for proxy

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

const handleAuthError = (status: number) => {
  if (status === 401 || status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  }
};

const fetchWithAuth = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, { ...options, headers: { ...getAuthHeaders(), ...options?.headers } });
  handleAuthError(response.status);
  return response;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return []; // Return empty array on error
  }
};

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  projects: any[];
  avatarUrl: string | null;
  contactName: string | null;
  status: string | null;
  totalBilled: number | null;
  satisfaction: number | null;
  activeProjects: number;
}

export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/clients`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const clients = await response.json();
    return clients;
  } catch (error) {
    return []; // Return empty array on error
  }
};

export const getClientById = async (id: string): Promise<Client> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/clients/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const client = await response.json();
  return client;
};


// EXISTING CODE

export interface Project {
  id: number;
  name: string;
  clientName: string | null;
  startDate: string | null;
  endDate: string | null;
  status: string | null;
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/projects`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch projects' }));
    throw new Error(errorData.message || 'Failed to fetch projects');
  }
  const data = await response.json();
  return data;
}

export type NewProjectData = {
  name: string;
  clientName?: string;
  status?: string;
};

export async function createProject(projectData: NewProjectData): Promise<Project> {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/projects`, {
    method: 'POST',
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to create project' }));
    throw new Error(errorData.message || 'Failed to create project');
  }

  const result = await response.json();
  return result;
}

export const getOrganization = async (): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/organization`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const org = await response.json();
    return org;
  } catch (error) {
    console.error("Failed to fetch organization:", error);
    // Return a default organization structure on error
    return { name: 'Error fallback', settings: { plan: 'Free' } };
  }
};

// --- PLACEHOLDER FUNCTIONS ---

export interface Report {
  id: string;
  title: string;
  generatedBy: string;
  generatedDate: string;
  period: string;
  type: 'Financial' | 'Resource' | 'Client';
}

export const getReports = async (): Promise<Report[]> => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/reports`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const reports = await response.json();
    return reports;
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return [];
  }
};

export interface AnalyticsData {
  totalRevenue: number;
  activeClients: number;
  projectSuccessRate: number;
  avgProjectValue: number;
}

export const getAnalytics = async (): Promise<AnalyticsData> => {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/analytics`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const analytics = await response.json();
    return analytics;
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    // Return a default/zero state on error
    return { totalRevenue: 0, activeClients: 0, projectSuccessRate: 0, avgProjectValue: 0 };
  }
};

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  organizationId: string;
  roles: Array<{ role: { name: string } }>;
}

export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/users/me`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const user = await response.json();
  return user;
};

export const updateCurrentUser = async (userData: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/users/me`, {
    method: 'PATCH',
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const updatedUser = await response.json();
  return updatedUser;
};

export interface OrganizationSettings {
  company: {
    name: string;
    website?: string;
    address?: string;
    logo?: string;
    description?: string;
    industry?: string;
    size?: string;
    founded?: string;
  };
  branding?: {
    primaryColor?: string;
    secondaryColor?: string;
    logoUrl?: string;
    favicon?: string;
    customCSS?: string;
  };
  notifications?: {
    emailNotifications?: boolean;
    projectDeadlines?: boolean;
    teamUpdates?: boolean;
    systemMaintenance?: boolean;
    securityAlerts?: boolean;
    weeklyReports?: boolean;
    frequency?: string;
  };
  billing?: {
    currency?: string;
    taxRate?: number;
    paymentTerms?: string;
    invoicePrefix?: string;
    autoRenewal?: boolean;
    billingAddress?: string;
    paymentMethod?: string;
  };
  security?: {
    enforce2FA?: boolean;
    sessionTimeout?: number;
    passwordPolicy?: {
      minLength?: number;
      requireSpecialChars?: boolean;
      requireNumbers?: boolean;
      requireUppercase?: boolean;
    };
    ipWhitelist?: string[];
    auditLogging?: boolean;
    dataRetention?: number;
  };
}

export const getOrganizationSettings = async (): Promise<OrganizationSettings> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/organization/me/settings`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const settings = await response.json();
  return settings;
};

export const updateOrganizationSettings = async (settingsData: Partial<OrganizationSettings>): Promise<OrganizationSettings> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/organization/me/settings`, {
    method: 'PATCH',
    body: JSON.stringify(settingsData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const updatedSettings = await response.json();
  return updatedSettings;
};

export interface Role {
  id: string;
  name: string;
  slug: string;
  description?: string;
  level: number;
  isSystem: boolean;
  permissions: Array<{ permission: { id: string; slug: string; name: string; resource: string; action: string; } }>;
}

export interface Permission {
  id: string;
  name: string;
  slug: string;
  resource: string;
  action: string;
  description?: string;
  isSystem: boolean;
}

export const getRoles = async (): Promise<Role[]> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/organization/roles`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const roles = await response.json();
  return roles;
};

export const getPermissions = async (): Promise<Permission[]> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/organization/permissions`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const permissions = await response.json();
  return permissions;
};

export const updateRolePermissions = async (roleId: string, permissionIds: string[]): Promise<Role> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/api/organization/roles/${roleId}/permissions`, {
    method: 'PATCH',
    body: JSON.stringify({ permissionIds }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const updatedRole = await response.json();
  return updatedRole;
};