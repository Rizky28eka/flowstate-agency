import { User } from '../types';

const API_BASE_URL = 'http://localhost:3001';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return []; // Return empty array on error
  }
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
  const response = await fetch(`${API_BASE_URL}/api/projects`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to fetch projects' }));
    throw new Error(errorData.message || 'Failed to fetch projects');
  }
  const data = await response.json();
  return data.data;
}

export type NewProjectData = {
  name: string;
  clientName?: string;
  status?: string;
};

export async function createProject(projectData: NewProjectData): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to create project' }));
    throw new Error(errorData.message || 'Failed to create project');
  }

  const result = await response.json();
  return result.data;
}