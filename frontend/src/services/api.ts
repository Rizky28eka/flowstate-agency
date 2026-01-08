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
    create: (data: any) => api.post('/projects', data),
    update: (id: number, data: any) => api.put(`/projects/${id}`, data),
    delete: (id: number) => api.delete(`/projects/${id}`),
};

export default api;
