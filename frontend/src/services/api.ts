
import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('agencyflow_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 errors (token expired)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('agencyflow_token');
            localStorage.removeItem('agencyflow_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    register: (data: { email: string; password: string; name: string }) =>
        api.post('/auth/register', data),

    login: (data: { email: string; password: string }) =>
        api.post('/auth/login', data),

    getCurrentUser: () =>
        api.get('/auth/me'),
};

export const projectsAPI = {
    getAll: () => api.get('/projects'),
    getById: (id: number) => api.get(`/projects/${id}`),
    create: (data: { name: string; description?: string; client?: string; status?: 'Planning' | 'In Progress' | 'Completed'; start_date?: string; end_date?: string; progress?: number; budget?: number }) => api.post('/projects', data),
    update: (id: number, data: { name?: string; description?: string; client?: string; status?: 'Planning' | 'In Progress' | 'Completed'; start_date?: string; end_date?: string; progress?: number; budget?: number }) => api.put(`/projects/${id}`, data),
    delete: (id: number) => api.delete(`/projects/${id}`),
    getTasks: (id: number) => api.get(`/projects/${id}/tasks`),
    createTask: (id: number, data: { title: string; description?: string; priority: 'Low' | 'Medium' | 'High' | 'Urgent'; status?: 'Backlog' | 'To Do' | 'In Progress' | 'Review' | 'Done'; due_date?: string; assignee_id?: number }) => api.post(`/projects/${id}/tasks`, data),
    startTimer: (id: number) => api.post(`/tasks/${id}/timer/start`),
    stopTimer: (id: number) => api.post(`/tasks/${id}/timer/stop`),
    getTimerStatus: (id: number) => api.get(`/tasks/${id}/timer/status`),
};

export const tasksAPI = {
    update: (id: number, data: { title?: string; description?: string; priority?: 'Low' | 'Medium' | 'High' | 'Urgent'; status?: 'Backlog' | 'To Do' | 'In Progress' | 'Review' | 'Done'; due_date?: string; assignee_id?: number }) => api.put(`/tasks/${id}`, data),
    delete: (id: number) => api.delete(`/tasks/${id}`),
};

export const clientsAPI = {
    getAll: () => api.get('/clients'),
    getById: (id: number) => api.get(`/clients/${id}`),
    create: (data: { name: string; email: string }) => api.post('/clients', data),
};

export const usersAPI = {
    getStaff: () => api.get('/users/staff'),
    getAll: () => api.get('/users'),
};

export const invoicesAPI = {
    getAll: () => api.get('/invoices'),
    getById: (id: number) => api.get(`/invoices/${id}`),
    create: (data: { project_id: number; client_id: number; invoice_number: string; amount: number; due_date: string }) => api.post('/invoices', data),
};

export const quotationsAPI = {
    getAll: () => api.get('/quotations'),
    create: (data: any) => api.post('/quotations', data),
    updateStatus: (id: number, status: string) => api.put(`/quotations/${id}/status`, { status }),
    convertToProject: (id: number) => api.post(`/quotations/${id}/convert`),
};

export default api;
