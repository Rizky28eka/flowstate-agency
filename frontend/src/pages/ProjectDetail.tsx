import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import type { Project, Task } from '../types';
import KanbanBoard from '../components/project/KanbanBoard';
import { ArrowLeft, Plus, Clock, Loader2 } from 'lucide-react';

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch Data
    const fetchData = useCallback(async () => {
        if (!id) return;
        try {
            setLoading(true);
            const [projRes, tasksRes] = await Promise.all([
                projectsAPI.getById(Number(id)),
                projectsAPI.getTasks(Number(id))
            ]);
            setProject(projRes.data);
            setTasks(tasksRes.data);
        } catch (error) {
            console.error("Failed to fetch project data", error);
            // Handle error (e.g., redirect to dashboard)
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [id, fetchData]);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        // In a real implementation, this would be inside a Modal
        // For now, I'll just add a dummy task to demonstrate flow if button is clicked
        if (!id) return;
        try {
            await projectsAPI.createTask(Number(id), {
                title: "New Task via Quick Add",
                priority: "Medium",
                status: "To Do"
            });
            fetchData(); // Refresh board
        } catch {
            alert("Failed to create task");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    if (!project) {
        return <div className="p-8 text-center">Project not found</div>;
    }

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b px-6 py-4 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${
                                project.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                project.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                'bg-gray-100 text-gray-700 border-gray-200'
                            }`}>
                                {project.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{project.description || "No description provided."}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                         <button 
                            onClick={handleCreateTask}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Plus size={16} />
                            New Task
                        </button>
                    </div>
                </div>

                {/* Sub-header Stats (Simple) */}
                <div className="flex gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <span>Deadline: {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'Ongoing'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: `${project.progress}%` }} />
                        </div>
                        <span>{project.progress}% Complete</span>
                    </div>
                </div>
            </header>

            {/* Content - Kanban */}
            <main className="flex-1 overflow-x-auto overflow-y-hidden p-6">
                <KanbanBoard
                    tasks={tasks}
                    onTaskUpdate={fetchData}
                />
            </main>
        </div>
    );
}
