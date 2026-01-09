export interface User {
    id: number;
    email: string;
    name: string;
    role: 'superadmin' | 'admin' | 'member' | 'client';
    avatar_url?: string;
}

export interface Project {
    id: number;
    name: string;
    description?: string;
    client?: string;
    client_id?: number;
    status: 'In Progress' | 'Completed' | 'On Hold' | 'Cancelled';
    progress: number;
    budget?: number;
    start_date?: string;
    end_date?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Task {
    id: number;
    project_id: number;
    title: string;
    description?: string;
    status: 'Backlog' | 'To Do' | 'In Progress' | 'Review' | 'Done';
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    assigned_to?: number;
    due_date?: string;
    estimated_hours?: number;
    actual_hours?: number;
    created_at?: string;
    updated_at?: string;
    assignee_name?: string; // Joined field
    assignee_avatar?: string; // Joined field
}