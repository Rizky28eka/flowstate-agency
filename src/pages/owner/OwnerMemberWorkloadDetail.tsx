import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_TEAM_ALLOCATION, getTasksForMember, MemberTask } from '@/lib/resource-allocation';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowLeft, Clock, FolderKanban, AlertCircle, Search, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const OwnerMemberWorkloadDetail = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();

  const [taskSearchTerm, setTaskSearchTerm] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState('all');

  const member = useMemo(() => 
    MOCK_TEAM_ALLOCATION.find(m => m.id.toString() === memberId)
  , [memberId]);

  const tasks = useMemo(() => 
    member ? getTasksForMember(member.id) : []
  , [member]);

  useEffect(() => {
    if (!member) {
      navigate('/dashboard/owner/resource-allocation');
    }
  }, [member, navigate]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const searchMatch = task.taskName.toLowerCase().includes(taskSearchTerm.toLowerCase());
      const statusMatch = taskStatusFilter === 'all' || task.status === taskStatusFilter;
      return searchMatch && statusMatch;
    });
  }, [tasks, taskSearchTerm, taskStatusFilter]);

  if (!member) {
    return <div>Loading member data...</div>; // Or a skeleton loader
  }

  const utilization = member.capacity > 0 ? (member.currentAllocation / member.capacity) * 100 : 0;
  const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length;

  const kpiData = [
    { title: 'Weekly Capacity', value: `${member.capacity}h`, icon: Clock },
    { title: 'Current Allocation', value: `${member.currentAllocation}h`, icon: Briefcase },
    { title: 'Active Projects', value: member.projects.length, icon: FolderKanban },
    { title: 'Overdue Tasks', value: overdueTasks, icon: AlertCircle, critical: overdueTasks > 0 },
  ];

  const taskStasuses = ['In Progress', 'To Do', 'In Review', 'Completed'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/owner/resource-allocation')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Avatar className="h-12 w-12">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{member.name}</h1>
          <p className="text-muted-foreground">{member.role}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={cn("h-4 w-4 text-muted-foreground", kpi.critical && "text-destructive")} />
            </CardHeader>
            <CardContent>
              <div className={cn("text-2xl font-bold", kpi.critical && overdueTasks > 0 && "text-destructive")}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Project Allocations */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Project Allocations</CardTitle>
            <CardDescription>Weekly hours allocated per project.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {member.projects.length > 0 ? member.projects.map(p => (
                <div key={p.projectId} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{p.projectName}</span>
                  <Badge variant="secondary">{p.allocatedHours.toFixed(1)}h</Badge>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">No projects allocated this week.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Assigned Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Assigned Tasks</CardTitle>
            <CardDescription>All tasks assigned to {member.name}.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tasks..." 
                  className="pl-8 w-full"
                  value={taskSearchTerm}
                  onChange={(e) => setTaskSearchTerm(e.target.value)}
                />
              </div>
              <Select value={taskStatusFilter} onValueChange={setTaskStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {taskStasuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map(task => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.taskName}</TableCell>
                    <TableCell>{task.projectName}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell><Badge variant="outline">{task.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerMemberWorkloadDetail;
