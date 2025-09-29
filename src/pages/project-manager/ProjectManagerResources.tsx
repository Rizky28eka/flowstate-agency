import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPmResourceAllocation, TeamMemberAllocation } from '@/lib/resource-allocation';
import { projects, tasks } from '@/lib/mock-data';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FolderKanban } from 'lucide-react';

const TeamViewRow = ({ member }: { member: TeamMemberAllocation }) => {
  const utilization = member.capacity > 0 ? (member.currentAllocation / member.capacity) * 100 : 0;
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{member.name}</div>
            <div className="text-xs text-muted-foreground">{member.role}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Progress value={utilization} className="h-2 w-24" />
          <span className="text-muted-foreground text-xs">{utilization.toFixed(0)}%</span>
        </div>
      </TableCell>
      <TableCell className="text-right">{member.currentAllocation}h / {member.capacity}h</TableCell>
    </TableRow>
  );
};

const ProjectViewRow = ({ project, allocation }: { project: (typeof projects)[0], allocation: number }) => {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{project.name}</div>
        <div className="text-xs text-muted-foreground">{project.client}</div>
      </TableCell>
      <TableCell className="text-right font-medium">{allocation}h / week</TableCell>
    </TableRow>
  );
};

const ProjectManagerResources = () => {
  // Assume the logged-in PM is 'Sarah Wilson' for this demo
  const currentPmName = 'Sarah Wilson';

  const pmResourceData = useMemo(() => getPmResourceAllocation(currentPmName), [currentPmName]);

  const pmProjectsData = useMemo(() => {
    const pmProjects = projects.filter(p => p.manager === currentPmName);
    return pmProjects.map(project => {
      const projectTasks = tasks.filter(t => t.projectId === project.id && t.status !== 'Completed');
      const weeklyAllocation = projectTasks.reduce((sum, task) => sum + (task.estimatedHours || 0) / 4, 0);
      return { ...project, weeklyAllocation: Math.round(weeklyAllocation) };
    });
  }, [currentPmName]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resource Management</h1>
        <p className="text-muted-foreground">View team and project allocations for projects you manage.</p>
      </div>

      <Tabs defaultValue="team">
        <TabsList>
          <TabsTrigger value="team"><Users className="h-4 w-4 mr-2"/>Team View</TabsTrigger>
          <TabsTrigger value="project"><FolderKanban className="h-4 w-4 mr-2"/>Project View</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Allocation</CardTitle>
              <CardDescription>Weekly workload of team members on your projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Utilization on Your Projects</TableHead>
                    <TableHead className="text-right">Allocation (vs. Total Capacity)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pmResourceData.map(member => <TeamViewRow key={member.id} member={member} />)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="project" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Allocation</CardTitle>
              <CardDescription>Total weekly hours allocated per project.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Total Weekly Allocation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pmProjectsData.map(p => <ProjectViewRow key={p.id} project={p} allocation={p.weeklyAllocation} />)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagerResources;
