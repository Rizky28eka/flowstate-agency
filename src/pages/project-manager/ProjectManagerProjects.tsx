import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects, createProject, NewProjectData } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, PlusCircle } from 'lucide-react';
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import { useOrganization } from '@/hooks/useOrganization';
import { canCreate } from "@/lib/SubscriptionManager";

const CreateProjectForm = ({ onSave, isSaving, closeDialog }) => {
  const [name, setName] = useState('');
  const [clientName, setClientName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
        toast.error("Project name is required.");
        return;
    }
    onSave({ name, clientName, status: 'Planning' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., New Website Design" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="clientName">Client Name</Label>
        <Input id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g., Acme Inc." />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};


const ProjectManagerProjects = () => {
  const { plan } = useOrganization();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const canCreateProject = canCreate(plan, 'projects', projects ? projects.length : 0);

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Project created successfully!");
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to create project: ${error.message}`);
    }
  });

  const handleSaveProject = (projectData: NewProjectData) => {
    createProjectMutation.mutate(projectData);
  };

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter(p => {
      const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (p.clientName && p.clientName.toLowerCase().includes(searchTerm.toLowerCase()));
      const statusMatch = statusFilter === 'all' || p.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [projects, searchTerm, statusFilter]);

  const projectStatuses = useMemo(() => {
    if (!projects) return [];
    return [...new Set(projects.map(p => p.status).filter(Boolean))];
  }, [projects]);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">My Projects</h1>
            <p className="text-muted-foreground">An overview of all projects from the database.</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} disabled={!canCreateProject}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Project
        </Button>
      </div>

      {!canCreateProject && (
        <div className="text-sm text-red-500">
          You have reached the maximum number of projects for the {plan} plan. 
          <Link to="/dashboard/owner/settings" className="underline">Upgrade your plan</Link> to create more projects.
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Projects List</CardTitle>
            <CardDescription>This is a list of projects fetched from the backend.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search project or client..."
                className="pl-8 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {projectStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-red-500">
                    Error: {error instanceof Error ? error.message : 'An unknown error occurred'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map(project => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.clientName}</TableCell>
                    <TableCell>{project.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Fill in the details to start a new project.</DialogDescription>
          </DialogHeader>
          <CreateProjectForm
            onSave={handleSaveProject}
            isSaving={createProjectMutation.isPending}
            closeDialog={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManagerProjects;