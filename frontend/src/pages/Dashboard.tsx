import { useState, useEffect } from 'react'
import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell, Search, Plus, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { projectsAPI } from '../services/api'
import type { Project } from '../types'

function Dashboard() {
    const [status, setStatus] = useState<string>('Connecting...');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Check health status
        fetch('/api/health')
            .then(res => res.json())
            .then(() => setStatus(`Online`))
            .catch(() => setStatus('Offline'));

        // Fetch projects with authentication
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await projectsAPI.getAll();
                setProjects(response.data || []);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [])

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">

            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                        <span className="text-xl font-bold text-slate-900">AgencyFlow</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {[
                        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
                        { icon: <FileText size={20} />, label: 'Projects', active: false },
                        { icon: <Users size={20} />, label: 'Clients', active: false },
                        { icon: <FileText size={20} />, label: 'Invoices', active: false },
                        { icon: <Settings size={20} />, label: 'Settings', active: false },
                    ].map((item, i) => (
                        <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-600 transition-colors text-sm font-medium">
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 pl-64">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4 w-96">
                        <Search className="text-slate-400 w-5 h-5" />
                        <input type="text" placeholder="Search projects..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400" />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right">
                                <p className="text-sm font-medium text-slate-900">{user?.name || 'User'}</p>
                                <p className="text-xs text-slate-500">{user?.role === 'admin' ? 'Super Admin' : 'Member'}</p>
                            </div>
                            <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                                {user?.name?.[0] || 'U'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                            <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition-colors">
                            <Plus className="w-4 h-4" />
                            New Project
                        </button>
                    </div>

                    {[
                        { label: 'System Status', value: status },
                    ].map((stat, i) => (
                        <div key={i} className="mb-6 inline-block bg-white px-4 py-2 rounded border border-slate-200 text-xs font-mono text-slate-500">
                            {stat.label}: <span className={stat.value === 'Online' ? 'text-green-600' : 'text-amber-600'}>{stat.value}</span>
                        </div>
                    ))}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Active Projects', value: (projects?.length ?? 0).toString() },
                            { label: 'Pending Invoices', value: '3' },
                            { label: 'Revenue (Jan)', value: '$12,450' },
                            { label: 'Avg. Turnaround', value: '14 days' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Project List */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-semibold text-slate-900">Recent Projects</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {loading ? (
                                <div className="p-12 text-center">
                                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
                                    <p className="text-slate-500 text-sm">Loading projects...</p>
                                </div>
                            ) : projects.length > 0 ? projects.map((project: Project) => (
                                <div 
                                    key={project.id} 
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                    className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                                >
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="font-medium text-slate-900">{project.name}</h4>
                                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${project.status === 'Completed' ? 'bg-green-50 text-green-700' :
                                                project.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                                                    'bg-slate-100 text-slate-700'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500">{project.client}</p>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right hidden sm:block">
                                            <div className="text-xs text-slate-500 mb-1">Progress</div>
                                            <div className="w-24 bg-slate-100 rounded-full h-1.5">
                                                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-12 text-center">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                                        <Search className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-slate-900 font-medium">No projects found</h3>
                                    <p className="text-slate-500 text-sm mt-1">Get started by creating a new project.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
