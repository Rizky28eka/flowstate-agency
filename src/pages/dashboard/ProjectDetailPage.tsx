import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    ChevronLeft,
    Calendar,
    MoreHorizontal,
    Plus,
    MessageSquare,
    Paperclip,
    Clock,
    CheckCircle2,
    Settings,
    UserPlus,
    Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import ProjectDialog from "@/components/dashboard/ProjectDialog";
import TaskDialog from "@/components/dashboard/TaskDialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority: string;
    assigneeId?: string;
    dueDate?: string;
    assignee?: {
        name: string;
        avatarUrl?: string;
    };
}

interface Project {
    id: string;
    name: string;
    status: string;
    description?: string;
    budget?: number;
    startDate?: string;
    endDate?: string;
    clientId: string;
    client?: { name: string };
    tasks?: Task[];
}


const ProjectDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const { data: response, isLoading } = useQuery({
        queryKey: ["project", id],
        queryFn: () => api.get(`/projects/${id}`),
    });

    const project = response?.data;

    // Project Mutation
    const updateProjectMutation = useMutation({
        mutationFn: (data: Partial<Project>) => api.patch(`/projects/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project", id] });
            toast.success("Project updated");
            setIsProjectModalOpen(false);
        }
    });

    // Task Mutations
    const createTaskMutation = useMutation({
        mutationFn: (data: Partial<Task>) => api.post("/tasks", { ...data, projectId: id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project", id] });
            toast.success("Task added");
            setIsTaskModalOpen(false);
        }
    });

    const updateTaskMutation = useMutation({
        mutationFn: ({ taskId, data }: { taskId: string, data: Partial<Task> }) =>
            api.patch(`/tasks/${taskId}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project", id] });
            toast.success("Task updated");
            setIsEditTaskModalOpen(false);
            setSelectedTask(null);
        }
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (taskId: string) => api.delete(`/tasks/${taskId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project", id] });
            toast.success("Task deleted");
        }
    });

    const toggleTaskMutation = useMutation({
        mutationFn: ({ taskId, status }: { taskId: string, status: string }) =>
            api.patch(`/tasks/${taskId}`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project", id] });
        }
    });

    if (isLoading) return (
        <DashboardLayout>
            <div className="space-y-8">
                <Skeleton className="h-10 w-48" />
                <div className="grid gap-6 md:grid-cols-3">
                    <Skeleton className="h-40 md:col-span-2" />
                    <Skeleton className="h-40" />
                </div>
                <Skeleton className="h-96 w-full" />
            </div>
        </DashboardLayout>
    );

    if (!project) return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-2xl font-bold">Project not found</h2>
                <Button variant="link" onClick={() => navigate("/dashboard/projects")}>Back to Projects</Button>
            </div>
        </DashboardLayout>
    );

    const openEditTaskModal = (task: Task) => {
        setSelectedTask(task);
        setIsEditTaskModalOpen(true);
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-fit -ml-2 gap-2 text-muted-foreground hover:text-primary"
                        onClick={() => navigate("/dashboard/projects")}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Projects
                    </Button>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-black tracking-tight">{project.name}</h1>
                                <Badge variant="secondary" className="px-3 py-1 font-bold">{project.status}</Badge>
                            </div>
                            <p className="text-muted-foreground text-lg">{project.client?.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="icon" onClick={() => setIsProjectModalOpen(true)}>
                                <Settings className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon"><UserPlus className="w-4 h-4" /></Button>
                            <Button className="gap-2" onClick={() => setIsTaskModalOpen(true)}>
                                <Plus className="w-4 h-4" /> Add Task
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Project Info Overview */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2 border-border/50 bg-background/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {project.description || "No description provided for this project."}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Project Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Budget</span>
                                <span className="font-bold">${project.budget?.toLocaleString() || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Timeline</span>
                                <span className="font-bold flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                            <div className="pt-2">
                                <div className="flex justify-between items-center text-xs mb-2">
                                    <span className="font-bold">Progress</span>
                                    <span>
                                        {project.tasks?.length ? Math.round((project.tasks.filter(t => t.status === 'DONE').length / project.tasks.length) * 100) : 0}%
                                    </span>
                                </div>
                                <Progress
                                    value={project.tasks?.length ? (project.tasks.filter(t => t.status === 'DONE').length / project.tasks.length) * 100 : 0}
                                    className="h-2"
                                />
                            </div>

                        </CardContent>
                    </Card>
                </div>

                {/* Project Content - Tabs */}
                <Tabs defaultValue="tasks" className="w-full">
                    <TabsList className="bg-background/50 border border-border/50 mb-6 p-1">
                        <TabsTrigger value="tasks" className="px-8 font-bold">Tasks</TabsTrigger>
                        <TabsTrigger value="milestones" className="px-8 font-bold">Milestones</TabsTrigger>
                        <TabsTrigger value="documents" className="px-8 font-bold">Files & Docs</TabsTrigger>
                        <TabsTrigger value="discussions" className="px-8 font-bold">Discussions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="tasks">
                        <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl">
                            <CardContent className="p-0">
                                <div className="divide-y divide-border/50">
                                    {project.tasks?.map((task: Task) => (
                                        <div key={task.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors group">
                                            <button
                                                onClick={() => toggleTaskMutation.mutate({
                                                    taskId: task.id,
                                                    status: task.status === 'DONE' ? 'TODO' : 'DONE'
                                                })}
                                                className={cn(
                                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                                    task.status === 'DONE' ? "bg-primary border-primary" : "border-muted-foreground/30 hover:border-primary"
                                                )}
                                            >
                                                {task.status === 'DONE' && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                                            </button>
                                            <div className="flex-1">
                                                <h4
                                                    className={cn("font-bold text-sm cursor-pointer hover:text-primary transition-colors", task.status === 'DONE' && "line-through text-muted-foreground")}
                                                    onClick={() => openEditTaskModal(task)}
                                                >
                                                    {task.title}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
                                                    <span>•</span>
                                                    <Badge variant="outline" className="text-[8px] px-1 py-0 h-4 border-muted-foreground/30">{task.priority}</Badge>
                                                    <span>•</span>
                                                    <span>{task.status}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <MessageSquare className="w-3 h-3" />
                                                    <span className="text-[10px] font-bold">0</span>
                                                </div>
                                                <Avatar className="w-7 h-7 border-2 border-background">
                                                    <AvatarImage src={task.assignee?.avatarUrl} />
                                                    <AvatarFallback className="text-[10px] bg-secondary">{task.assignee?.name?.substring(0, 2).toUpperCase() || 'UN'}</AvatarFallback>
                                                </Avatar>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openEditTaskModal(task)}>Edit Task</DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-destructive focus:text-destructive"
                                                            onClick={() => {
                                                                if (confirm("Delete this task?")) deleteTaskMutation.mutate(task.id);
                                                            }}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" /> Delete Task
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    ))}
                                    {(!project.tasks || project.tasks.length === 0) && (
                                        <div className="py-20 text-center">
                                            <p className="text-muted-foreground font-medium">No tasks found for this project.</p>
                                            <Button variant="link" className="mt-2" onClick={() => setIsTaskModalOpen(true)}>Create your first task</Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="milestones">
                        <Card className="border-border/50 bg-background/50 backdrop-blur-sm p-20 text-center">
                            <p className="text-muted-foreground">Milestones view is coming soon.</p>
                        </Card>
                    </TabsContent>

                    <TabsContent value="documents">
                        <div className="grid gap-6 md:grid-cols-4">
                            {[1].map(i => (
                                <Card key={i} className="group border-border/50 hover:border-primary/50 transition-all cursor-pointer">
                                    <CardContent className="p-4 flex flex-col items-center justify-center gap-3 py-10">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <Paperclip className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-sm">Specification.pdf</p>
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold">2.4 MB • PDF</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <Card className="border-dashed border-2 border-muted hover:border-primary/50 transition-all cursor-pointer">
                                <CardContent className="p-4 flex flex-col items-center justify-center gap-3 py-10 text-muted-foreground hover:text-primary">
                                    <Plus className="w-8 h-8" />
                                    <p className="font-bold text-sm uppercase tracking-wider">Upload File</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Modals */}
            <ProjectDialog
                open={isProjectModalOpen}
                onOpenChange={setIsProjectModalOpen}
                onSubmit={(values) => updateProjectMutation.mutate(values)}
                initialData={project}
                title="Edit Project Details"
            />

            <TaskDialog
                open={isTaskModalOpen}
                onOpenChange={setIsTaskModalOpen}
                onSubmit={(values) => createTaskMutation.mutate(values)}
                title="Add New Task"
            />

            <TaskDialog
                open={isEditTaskModalOpen}
                onOpenChange={setIsEditTaskModalOpen}
                onSubmit={(values) => updateTaskMutation.mutate({ taskId: selectedTask!.id, data: values })}
                initialData={selectedTask}
                title="Edit Task"
            />
        </DashboardLayout>
    );
};

export default ProjectDetailPage;

