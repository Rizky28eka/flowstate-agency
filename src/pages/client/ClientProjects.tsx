import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '@/lib/mock-data';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, List } from 'lucide-react';

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
  const navigate = useNavigate();
  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/dashboard/client/projects/${project.id}`)}
    >
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>Status: <Badge variant={project.status === 'Completed' ? 'outline' : 'default'}>{project.status}</Badge></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} />
          <div className="flex justify-between text-xs text-muted-foreground pt-2">
            <span>End Date: {project.endDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectRow = ({ project }: { project: (typeof projects)[0] }) => {
  const navigate = useNavigate();
  return (
    <TableRow 
      className="cursor-pointer"
      onClick={() => navigate(`/dashboard/client/projects/${project.id}`)}
    >
      <TableCell className="font-medium">{project.name}</TableCell>
      <TableCell><Badge variant={project.status === 'Completed' ? 'outline' : 'default'}>{project.status}</Badge></TableCell>
      <TableCell><Progress value={project.progress} className="h-2" /></TableCell>
      <TableCell className="text-right">{project.endDate}</TableCell>
    </TableRow>
  );
};

const ClientProjects = () => {
  const [viewMode, setViewMode] = useState('grid');

  // Assume logged-in client is 'TechCorp Inc.' (CLI-001) for demo
  const currentClientId = 'CLI-001';
  const clientProjects = useMemo(() => 
    projects.filter(p => p.clientId === currentClientId)
  , [currentClientId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Projects</h1>
          <p className="text-muted-foreground">An overview of all your projects with us.</p>
        </div>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)}>
          <ToggleGroupItem value="grid" aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view"><List className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientProjects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientProjects.map(project => <ProjectRow key={project.id} project={project} />)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientProjects;
