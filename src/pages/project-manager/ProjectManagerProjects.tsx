import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '@/lib/mock-data';
import { getFinancialsForProject } from '@/lib/profitability';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Search, PlusCircle } from 'lucide-react';

const ProjectRow = ({ project, financials }: { project: (typeof projects)[0], financials: ProjectFinancials | null }) => {
  const navigate = useNavigate();
  const budgetUsage = financials?.budgetUsage || 0;

  const priorityVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
    'High': 'destructive',
    'Medium': 'secondary',
    'Low': 'default',
  };

  return (
    <TableRow 
      className="cursor-pointer"
      onClick={() => navigate(`/dashboard/project-manager/projects/${project.id}`)}
    >
      <TableCell>
        <div className="font-medium">{project.name}</div>
        <div className="text-xs text-muted-foreground hidden sm:table-cell">{project.client}</div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={project.status === 'Completed' ? 'outline' : 'default'}>{project.status}</Badge>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <div className="flex items-center gap-2">
          <Progress value={budgetUsage} className="h-2 w-24" />
          <span className="text-muted-foreground text-xs">{budgetUsage.toFixed(0)}%</span>
        </div>
      </TableCell>
      <TableCell className="hidden lg:table-cell text-right">{project.endDate}</TableCell>
      <TableCell className="text-right">
        <Badge variant={priorityVariant[project.priority] || 'default'}>{project.priority}</Badge>
      </TableCell>
    </TableRow>
  );
};

const ProjectManagerProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Assume the logged-in PM is 'Sarah Wilson' for this demo
  const currentPmName = 'Sarah Wilson';

  const pmProjects = useMemo(() => {
    return projects
      .filter(p => p.manager === currentPmName)
      .map(p => ({ ...p, financials: getFinancialsForProject(p.id) }));
  }, [currentPmName]);

  const filteredProjects = useMemo(() => {
    return pmProjects.filter(p => {
      const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'all' || p.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [pmProjects, searchTerm, statusFilter]);

  const projectStatuses = ['In Progress', 'Planning', 'Review', 'Completed'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Projects</h1>
          <p className="text-muted-foreground">An overview of all projects you are managing.</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New Project
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Projects List</CardTitle>
            <CardDescription>Click a project to view its details.</CardDescription>
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
                <TableHead>Project</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">Budget Usage</TableHead>
                <TableHead className="hidden lg:table-cell text-right">End Date</TableHead>
                <TableHead className="text-right">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map(p => <ProjectRow key={p.id} project={p} financials={p.financials} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectManagerProjects;
