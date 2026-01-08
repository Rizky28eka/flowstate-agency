import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import api from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    ArrowUpRight,
    Calendar,
    CheckCircle2,
    Clock,
    AlertCircle,
    Search,
    Filter
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ProjectDialog from "@/components/dashboard/ProjectDialog";

interface Task {
    id: string;
    title: string;
    status: string;
}

interface Project {
    id: string;
    name: string;
    status: string;
    clientId: string;
    client: { name: string };
    startDate?: string;
    endDate?: string;
    budget?: number;
    tasks: Task[];
    description?: string;
}


const ProjectsPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);


    const { data: response, isLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: () => api.get("/projects"),
    });

    const projects = response?.data || [];

    const createMutation = useMutation({
        mutationFn: (data: Partial<Project>) => api.post("/projects", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project created successfuly");
            setIsCreateModalOpen(false);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Failed to create project");
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => api.patch(`/projects/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project updated successfuly");
            setIsEditModalOpen(false);
            setSelectedProject(null);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Failed to update project");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/projects/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project deleted successfully");
        }
    });

    const handleCreateProject = (values: Partial<Project>) => {
        createMutation.mutate(values);
    };

    const handleUpdateProject = (values: Partial<Project>) => {
        if (selectedProject) {
            updateMutation.mutate({ id: selectedProject.id, data: values });
        }
    };

    const openEditModal = (project: Project) => {
        setSelectedProject(project);
        setIsEditModalOpen(true);
    };

    const filteredProjects = projects.filter((p: Project) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.client?.name.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusIcon = (status: string) => {
        switch (status.toUpperCase()) {
            case 'COMPLETED': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
            case 'PLANNING': return <Calendar className="w-4 h-4 text-blue-500" />;
            case 'ACTIVE': return <Clock className="w-4 h-4 text-indigo-500" />;
            case 'ON_HOLD': return <AlertCircle className="w-4 h-4 text-amber-500" />;
            default: return <Clock className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <DashboardLayout>
            <DashboardPageHeader
                title="Projects"
                description="Manage and track your agency projects."
                actionLabel="Create Project"
                onAction={() => setIsCreateModalOpen(true)}
            />

            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects or clients..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                </div>

                {isLoading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Card key={i} className="border-border/50">
                                <CardContent className="p-6 space-y-4">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <div className="pt-4 space-y-2">
                                        <Skeleton className="h-2 w-full" />
                                        <Skeleton className="h-2 w-full" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project: Project) => (
                            <Card key={project.id} className="group border-border/50 hover:border-primary/50 transition-all hover:shadow-lg bg-background/50 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <Badge variant="secondary" className="gap-1.5 px-2 py-0.5 font-bold text-[10px] uppercase">
                                            {getStatusIcon(project.status)}
                                            {project.status}
                                        </Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => openEditModal(project)}>Edit Project</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigate(`/dashboard/projects/${project.id}`)}>View Details</DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() => {
                                                        if (confirm("Are you sure you want to delete this project?")) {
                                                            deleteMutation.mutate(project.id);
                                                        }
                                                    }}
                                                >
                                                    Delete Project
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <h3
                                        className="text-xl font-bold mb-1 group-hover:text-primary transition-colors cursor-pointer"
                                        onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                                    >
                                        {project.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-6">{project.client?.name}</p>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground font-medium">Progress</span>
                                            <span className="font-bold">
                                                {project.tasks?.length ? Math.round((project.tasks.filter(t => t.status === 'DONE').length / project.tasks.length) * 100) : 0}%
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-1000"
                                                style={{ width: `${project.tasks?.length ? (project.tasks.filter(t => t.status === 'DONE').length / project.tasks.length) * 100 : 0}%` }}
                                            />
                                        </div>


                                        <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map((i) => (
                                                    <div key={i} className="w-7 h-7 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                                                        {i === 3 ? "+2" : "U"}
                                                    </div>
                                                ))}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="gap-1 px-0 hover:bg-transparent hover:text-primary"
                                                onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                                            >
                                                Go to project
                                                <ArrowUpRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            <ProjectDialog
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onSubmit={handleCreateProject}
                title="Create New Project"
            />

            <ProjectDialog
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                onSubmit={handleUpdateProject}
                initialData={selectedProject}
                title="Edit Project"
            />
        </DashboardLayout>
    );
};

export default ProjectsPage;

