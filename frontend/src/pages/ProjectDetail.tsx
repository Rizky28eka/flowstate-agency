import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, MoreVertical, Plus, Loader2 } from 'lucide-react'
import { projectsAPI, usersAPI } from '../services/api'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import KanbanBoard from '../components/project/KanbanBoard'
import { Modal } from '../components/shared/Modal'
import type { Project, Task, User } from '../types'

function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [staff, setStaff] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium' as Task['priority'],
        assigned_to: '',
        due_date: ''
    });
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        if (!id) return;
        try {
            const [projectRes, tasksRes, staffRes] = await Promise.all([
                projectsAPI.getById(parseInt(id)),
                projectsAPI.getTasks(parseInt(id)),
                usersAPI.getStaff()
            ]);
            setProject(projectRes.data);
            setTasks(tasksRes.data);
            setStaff(staffRes.data);
        } catch (error) {
            console.error('Failed to fetch project details:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [fetchData]);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        setError('');
        setIsSubmitting(true);
        try {
            await projectsAPI.createTask(parseInt(id), {
                ...formData,
                assignee_id: formData.assigned_to ? parseInt(formData.assigned_to) : undefined
            });
            setIsModalOpen(false);
            setFormData({ title: '', description: '', priority: 'Medium', assigned_to: '', due_date: '' });
            fetchData();
        } catch (err) {
            setError((err as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to create task');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (!project) {
        return (
            <DashboardLayout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-slate-900">Project Not Found</h2>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 text-indigo-600 font-medium hover:underline"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            {/* Project Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-4 transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={16} />
                    Back to Projects
                </button>
                <div className="flex justify-between items-start">
                    <div className="text-left">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                        'bg-slate-100 text-slate-700'
                                }`}>
                                {project.status}
                            </span>
                        </div>
                        <p className="text-slate-500 max-w-2xl">{project.description || 'No description provided.'}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-lg">
                            <MoreVertical size={20} />
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                        >
                            <Plus size={18} />
                            Add Task
                        </button>
                    </div>
                </div>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500 font-medium mb-1">Client</p>
                    <p className="text-lg font-semibold text-slate-900">{project.client || 'Internal'}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500 font-medium mb-1">Overall Progress</p>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{project.progress}%</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500 font-medium mb-1">Budget</p>
                    <p className="text-lg font-semibold text-slate-900">${project.budget?.toLocaleString() || '0'}</p>
                </div>
            </div>

            {/* Kanban Board Section */}
            <div className="flex flex-col h-[600px]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Task Board</h2>
                    <div className="flex gap-2">
                        <span className="text-sm text-slate-500 font-medium">{tasks.length} Total Tasks</span>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden">
                    {tasks.length > 0 ? (
                        <KanbanBoard tasks={tasks} onTaskUpdate={fetchData} />
                    ) : (
                        <div className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-12">
                            <CheckCircle2 className="w-12 h-12 text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">No tasks assigned to this project yet.</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-2 text-indigo-600 text-sm font-semibold hover:underline"
                            >
                                Create your first task
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Task Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Task"
            >
                <form onSubmit={handleCreateTask} className="space-y-4 text-left">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Task Title</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. Design homepage layout"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Description</label>
                        <textarea
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all min-h-[80px]"
                            placeholder="Briefly describe the task..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Priority</label>
                            <select
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'Low' | 'Medium' | 'High' | 'Urgent' })}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Assign To</label>
                            <select
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
                                value={formData.assigned_to}
                                onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                            >
                                <option value="">Unassigned</option>
                                {staff.map(member => (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Due Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            value={formData.due_date}
                            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                        />
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
                            {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Create Task'}
                        </button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
}

export default ProjectDetail
