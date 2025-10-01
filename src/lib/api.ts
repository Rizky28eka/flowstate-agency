import { User as Employee } from '../types';

const API_BASE_URL = 'http://localhost:3001';

// TODO: Replace this with a dynamic ID from your authentication context
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, { headers: getAuthHeaders() });
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
    const response = await fetch(`${API_BASE_URL}/api/clients`, { headers: getAuthHeaders() });
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
  const response = await fetch(`${API_BASE_URL}/api/clients/${id}`, { headers: getAuthHeaders() });
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
  const response = await fetch(`${API_BASE_URL}/api/projects`, { headers: getAuthHeaders() });
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
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'POST',
    headers: getAuthHeaders(),
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
    const response = await fetch(`${API_BASE_URL}/api/organization`, { headers: getAuthHeaders() });
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
    const response = await fetch(`${API_BASE_URL}/api/reports`, { headers: getAuthHeaders() });
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
    const response = await fetch(`${API_BASE_URL}/api/analytics`, { headers: getAuthHeaders() });
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