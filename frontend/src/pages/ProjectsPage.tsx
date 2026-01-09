import { useState, useEffect } from 'react'
import { Plus, Search, ArrowRight, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { projectsAPI, clientsAPI } from '../services/api'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Modal } from '../components/shared/Modal'
import type { Project } from '../types'

interface ClientOption {
    id: number;
    name: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [clients, setClients] = useState<ClientOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        client_id: string;
        budget: string;
        status: 'Planning' | 'In Progress' | 'Completed';
    }>({
        name: '',
        description: '',
        client_id: '',
        budget: '',
        status: 'In Progress'
    });
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const [projectsRes, clientsRes] = await Promise.all([
                projectsAPI.getAll(),
                clientsAPI.getAll()
            ]);
            setProjects(projectsRes.data || []);
            setClients(clientsRes.data || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await projectsAPI.create({
                name: formData.name,
                description: formData.description,
                client: formData.client_id ? clients.find(c => c.id === parseInt(formData.client_id))?.name || '' : '',
                status: formData.status,
                budget: formData.budget ? parseFloat(formData.budget) : undefined,
            });
            setIsModalOpen(false);
            setFormData({ name: '', description: '', client_id: '', budget: '', status: 'In Progress' });
            fetchData();
        } catch (err) {
            setError((err as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to create project');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.client && project.client.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <DashboardLayout>
            <div className="flex justify-between items-end mb-8 text-left">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
                    <p className="text-slate-500 mt-1">Manage all your active and archived agency projects.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Project
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex gap-4 text-left">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            {/* Project Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Project Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Budget</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={6} className="px-6 py-4">
                                        <div className="h-10 bg-slate-50 rounded w-full"></div>
                                    </td>
                                </tr>
                            ))
                        ) : filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <tr
                                    key={project.id}
                                    className="hover:bg-slate-50 transition-colors group cursor-pointer text-left"
                                    onClick={() => navigate(`/ projects / ${project.id} `)}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{project.name}</span>
                                            <span className="text-[10px] text-slate-400 mt-0.5">ID: {project.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                                                {project.client?.[0] || 'I'}
                                            </div>
                                            <span className="text-sm text-slate-600">{project.client || 'Internal'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-left">
                                        <span className={`text - [10px] px - 2 py - 0.5 rounded - full font - bold uppercase tracking - wider ${project.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-100' :
                                            project.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                'bg-slate-50 text-slate-500 border border-slate-100'
                                            } `}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${project.progress}% ` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{project.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-700">${project.budget?.toLocaleString() || '0'}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                                            <ArrowRight size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-20 text-center text-slate-500 text-left">
                                    No projects found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create Project Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Project"
            >
                <form onSubmit={handleCreateProject} className="space-y-4 text-left">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Project Name</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. Website Redesign"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Description</label>
                        <textarea
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all min-h-[100px]"
                            placeholder="Project details and scope..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Client</label>
                            <select
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
                                value={formData.client_id}
                                onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                            >
                                <option value="">Select a client...</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Budget ($)</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                placeholder="0.00"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Create Project'}
                        </button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
}
