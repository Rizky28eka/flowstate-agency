import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderKanban, Search, Plus, Calendar, DollarSign, Users, MoveHorizontal as MoreHorizontal, SquareChartGantt as GanttChartSquare, LayoutGrid, List, Trello, Clock, AlertCircle } from "lucide-react";
import { getProjects, createProject, getClients } from "@/lib/api"; // Assuming createProject and getClients exist
import { useRealtimeUpdates } from "@/hooks/useRealtimeUpdates";
import { Skeleton } from "@/components/ui/skeleton";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { DndContext } from '@dnd-kit/core';
import { DraggableProjectCard, DroppableProjectColumn } from '@/components/ProjectKanban';

import { useOrganization } from '@/hooks/useOrganization';
import { canCreate } from "@/lib/SubscriptionManager";

// NOTE: These functions and components are simplified based on the provided file.
// Some props might be missing from the backend data initially.

const getStatusColor = (status) => {
  if (status === "planning") return "bg-blue-100 text-blue-800";
  if (status === "active") return "bg-amber-100 text-amber-800";
  if (status === "review") return "bg-purple-100 text-purple-800";
  if (status === "completed") return "bg-green-100 text-green-800";
  return "bg-gray-100 text-gray-800";
};

const ProjectGridView = ({ projects }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {projects.map((project) => (
      <Link to={`/dashboard/owner/projects/${project.id}`} key={project.id}>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1 min-w-0">
                <CardTitle className="text-base sm:text-lg truncate">{project.name}</CardTitle>
                <CardDescription className="truncate">{project.client?.name || 'N/A'}</CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 sm:mb-4">{project.description}</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div><p className="text-muted-foreground">Budget</p><p className="font-medium truncate">{project.budget?.toLocaleString()}</p></div>
            </div>
          </CardContent>
        </Card>
      </Link>
    ))}
  </div>
);

const ProjectListView = ({ projects }) => (
  <Card>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b"><th className="text-left p-3 font-medium">Project</th><th className="text-left p-3 font-medium">Status</th><th className="text-left p-3 font-medium">Client</th><th className="text-left p-3 font-medium">Due Date</th></tr></thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-muted/50">
                <td className="p-3"><Link to={`/dashboard/owner/projects/${project.id}`} className="font-medium hover:underline">{project.name}</Link></td>
                <td className="p-3"><Badge className={getStatusColor(project.status)}>{project.status}</Badge></td>
                <td className="p-3">{project.client?.name || 'N/A'}</td>
                <td className="p-3">{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const statuses = ["planning", "active", "review", "completed"];

const ProjectKanbanView = ({ projects, onDragEnd }) => {
  const projectsByStatus = useMemo(() => statuses.reduce((acc, status) => {
    acc[status] = projects.filter(p => p.status === status);
    return acc;
  }, {}), [projects]);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {statuses.map(status => (
          <DroppableProjectColumn key={status} status={status} projects={projectsByStatus[status]} />
        ))}
      </div>
    </DndContext>
  );
};

const CreateProjectForm = ({ setOpen }) => {
    const queryClient = useQueryClient();
    const { data: clients = [] } = useQuery({ queryKey: ['clients'], queryFn: getClients });

    const [name, setName] = useState('');
    const [clientId, setClientId] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState(50000);

    const mutation = useMutation({
      mutationFn: createProject,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        setOpen(false);
      },
    });

    const handleSubmit = () => {
        if(!name || !clientId) return;
        mutation.mutate({ name, clientId, description, budget, status: 'planning' });
    };

    return (
        <div className="grid gap-4 py-4">
            <Input placeholder="Project Name" value={name} onChange={e => setName(e.target.value)} />
            <Select onValueChange={setClientId}><SelectTrigger><SelectValue placeholder="Select a client" /></SelectTrigger><SelectContent>{clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select>
            <Textarea placeholder="Project Description" value={description} onChange={e => setDescription(e.target.value)} />
            <div><Label>Budget</Label><Input type="number" placeholder="Budget" value={budget} onChange={e => setBudget(Number(e.target.value))} /></div>
            <DialogFooter>
              <Button onClick={handleSubmit} disabled={mutation.isPending}>
                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create Project
              </Button>
            </DialogFooter>
        </div>
    );
};

const OwnerProjects = () => {
  useRealtimeUpdates(); // Activate real-time updates
  const queryClient = useQueryClient();
  const { plan } = useOrganization();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [isMobile, setIsMobile] = useState(false);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

  const { data: projects = [], isLoading, isError, error } = useQuery({ 
    queryKey: ['projects'], 
    queryFn: getProjects 
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ projectId, status }) => {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update project status');
      return response.json();
    },
    onSuccess: () => {
      // The websocket event will handle the invalidation, so we don't strictly need it here,
      // but it provides a good fallback and immediate feedback.
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const canCreateProject = canCreate(plan, 'projects', projects.length);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = term === "" || project.name.toLowerCase().includes(term) || project.client?.name.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const handleKanbanDragEnd = (event) => {
    const { over, active } = event;
    if (over && over.id && active.id !== over.id) {
      const projectId = active.id;
      const newStatus = over.id;
      updateStatusMutation.mutate({ projectId, status: newStatus });
    }
  };

  const renderView = () => {
    if (isLoading) return <Skeleton className="h-96 w-full" />;
    if (isError) return <div className="text-red-500 text-center p-8"><AlertCircle className="mx-auto h-8 w-8"/><p>Error loading projects: {error.message}</p></div>;

    switch (viewMode) {
      case 'list': return <ProjectListView projects={filteredProjects} />;
      case 'kanban': return <ProjectKanbanView projects={filteredProjects} onDragEnd={handleKanbanDragEnd} />;
      case 'timeline': return <Card><CardHeader><CardTitle>Timeline</CardTitle></CardHeader><CardContent><p>Timeline view is under construction.</p></CardContent></Card>;
      default: return <ProjectGridView projects={filteredProjects} />;
    }
  };

  return (
    <main className="flex-1 px-4 sm:px-6 py-4 sm:py-8 bg-background">
        {/* KPI Cards could also be powered by real data via separate queries */}

      <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder={isMobile ? "Search projects..." : "Search by name, client..."} 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto" disabled={!canCreateProject}>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </DialogTrigger>
          {!canCreateProject && (
            <div className="text-sm text-red-500 mt-2">
              You have reached the maximum number of projects for the {plan} plan. 
              <Link to="/dashboard/owner/settings" className="underline">Upgrade your plan</Link> to create more projects.
            </div>
          )}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Fill in the details below to create a new project.</DialogDescription>
            </DialogHeader>
            <CreateProjectForm setOpen={setCreateDialogOpen} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="grid"><LayoutGrid className="w-4 h-4 mr-2"/>Grid</TabsTrigger>
          <TabsTrigger value="list"><List className="w-4 h-4 mr-2"/>List</TabsTrigger>
          <TabsTrigger value="kanban"><Trello className="w-4 h-4 mr-2"/>Kanban</TabsTrigger>
          <TabsTrigger value="timeline"><GanttChartSquare className="w-4 h-4 mr-2"/>Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value={viewMode} className="mt-6">{renderView()}</TabsContent>
      </Tabs>
    </main>
  );
};

export default OwnerProjects;
