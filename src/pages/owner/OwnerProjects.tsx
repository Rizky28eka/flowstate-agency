import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderKanban, Search, Plus, Calendar, DollarSign, Users, MoreHorizontal, GanttChartSquare, LayoutGrid, List, Trello, Clock } from "lucide-react";
import { projects as initialProjects, teamMembers, clients } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { DndContext } from '@dnd-kit/core';
import { DraggableProjectCard, DroppableProjectColumn } from '@/components/ProjectKanban';

const getStatusColor = (status) => {
  if (status === "Planning") return "bg-blue-100 text-blue-800";
  if (status === "In Progress") return "bg-amber-100 text-amber-800";
  if (status === "Review") return "bg-purple-100 text-purple-800";
  if (status === "Completed") return "bg-green-100 text-green-800";
  return "bg-gray-100 text-gray-800";
};
const getPriorityColor = (priority) => {
  if (priority === "High") return "bg-red-100 text-red-800";
  if (priority === "Medium") return "bg-amber-100 text-amber-800";
  return "bg-green-100 text-green-800";
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
                <CardDescription className="truncate">{project.client}</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 sm:mb-4">{project.description}</p>
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2"><div className="flex justify-between text-sm"><span>Progress</span><span>{project.progress}%</span></div><Progress value={project.progress} /></div>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div><p className="text-muted-foreground">Budget</p><p className="font-medium truncate">{project.budget}</p></div>
                <div><p className="text-muted-foreground">Spent</p><p className="font-medium truncate">{project.spent}</p></div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{project.team.length} members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="truncate">{new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              </div>
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
          <thead className="bg-muted/50"><tr className="border-b"><th className="text-left p-3 font-medium">Project</th><th className="text-left p-3 font-medium">Status</th><th className="text-left p-3 font-medium">Progress</th><th className="text-left p-3 font-medium">Manager</th><th className="text-left p-3 font-medium">Due Date</th><th className="text-right p-3 font-medium">Actions</th></tr></thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-muted/50">
                <td className="p-3"><Link to={`/dashboard/owner/projects/${project.id}`} className="font-medium hover:underline">{project.name}</Link><div className="text-sm text-muted-foreground">{project.client}</div></td>
                <td className="p-3"><Badge className={getStatusColor(project.status)}>{project.status}</Badge></td>
                <td className="p-3"><div className="flex items-center space-x-2"><Progress value={project.progress} className="w-24" /><span className="text-sm text-muted-foreground">{project.progress}%</span></div></td>
                <td className="p-3"><div className="flex items-center space-x-2"><Avatar className="w-6 h-6"><AvatarFallback>{project.manager.charAt(0)}</AvatarFallback></Avatar><span>{project.manager}</span></div></td>
                <td className="p-3">{new Date(project.endDate).toLocaleDateString()}</td>
                <td className="p-3 text-right"><Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const statuses = ["Planning", "In Progress", "Review", "Completed"];

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

const CreateProjectForm = ({ onAddProject }) => {
    const [name, setName] = useState('');
    const [clientId, setClientId] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState(50000);

    const handleSubmit = () => {
        if(!name || !clientId) return;
        const newProject = {
            id: `PRJ-${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
            name,
            client: clients.find(c => c.id === clientId)?.name || 'N/A',
            clientId,
            description,
            status: 'Planning',
            priority: 'Medium',
            progress: 0,
            budget: `$${budget.toLocaleString()}`,
            spent: '$0',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
            manager: teamMembers[0].name,
            team: [teamMembers[0].name],
            tags: ['New'],
            lastUpdate: new Date().toISOString().split('T')[0],
        };
        onAddProject(newProject);
    };

    return (
        <div className="grid gap-4 py-4">
            <Input placeholder="Project Name" value={name} onChange={e => setName(e.target.value)} />
            <Select onValueChange={setClientId}><SelectTrigger><SelectValue placeholder="Select a client" /></SelectTrigger><SelectContent>{clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select>
            <Textarea placeholder="Project Description" value={description} onChange={e => setDescription(e.target.value)} />
            <div><Label>Budget</Label><Input type="number" placeholder="Budget" value={budget} onChange={e => setBudget(Number(e.target.value))} /></div>
            <DialogFooter><DialogClose asChild><Button onClick={handleSubmit}>Create Project</Button></DialogClose></DialogFooter>
        </div>
    );
};

const OwnerProjects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = term === "" || project.name.toLowerCase().includes(term) || project.client.toLowerCase().includes(term) || project.manager.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const handleAddProject = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const handleKanbanDragEnd = (event) => {
    const { over, active } = event;
    if (over && over.id) {
      const newStatus = over.id;
      setProjects(prev => prev.map(p => p.id === active.id ? { ...p, status: newStatus } : p));
    }
  };

  const renderView = () => {
    switch (viewMode) {
      case 'list': return <ProjectListView projects={filteredProjects} />;
      case 'kanban': return <ProjectKanbanView projects={filteredProjects} onDragEnd={handleKanbanDragEnd} />;
      case 'timeline': return <Card><CardHeader><CardTitle>Timeline</CardTitle></CardHeader><CardContent><p>Timeline view is under construction.</p></CardContent></Card>;
      default: return <ProjectGridView projects={filteredProjects} />;
    }
  };

  return (
    <main className="flex-1 px-4 sm:px-6 py-4 sm:py-8 bg-background">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium">Total Projects</CardTitle>
                <FolderKanban className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-lg sm:text-2xl font-bold">{filteredProjects.length}</div>
                <p className="text-xs text-muted-foreground">matching filters</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium">Active</CardTitle>
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-lg sm:text-2xl font-bold">{projects.filter(p => p.status === "In Progress").length}</div>
                <p className="text-xs text-muted-foreground">In progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-lg sm:text-2xl font-bold">${projects.reduce((sum, p) => sum + parseFloat(p.budget.replace(/[^0-9.-]+/g,"")), 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Combined value</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium">Utilization</CardTitle>
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-lg sm:text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">Team average</p>
              </CardContent>
            </Card>
        </div>

      <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder={isMobile ? "Search projects..." : "Search by name, client, manager..."} 
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
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Fill in the details below to create a new project.</DialogDescription>
            </DialogHeader>
            <CreateProjectForm onAddProject={handleAddProject} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="grid" className="text-xs sm:text-sm">
            <LayoutGrid className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"/>
            <span className="hidden sm:inline">Grid</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="text-xs sm:text-sm">
            <List className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"/>
            <span className="hidden sm:inline">List</span>
          </TabsTrigger>
          <TabsTrigger value="kanban" className="text-xs sm:text-sm">
            <Trello className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"/>
            <span className="hidden sm:inline">Kanban</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="text-xs sm:text-sm">
            <GanttChartSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"/>
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={viewMode} className="mt-6">{renderView()}</TabsContent>
      </Tabs>
    </main>
  );
};

export default OwnerProjects;