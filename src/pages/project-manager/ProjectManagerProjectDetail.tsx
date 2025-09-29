import { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects, tasks, teamMembers, timeEntries, expenses } from '@/lib/mock-data';
import { getFinancialsForProject } from '@/lib/profitability';
import { getChangeRequestsForProject, ChangeRequest } from '@/lib/change-requests';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, DollarSign, Target, Clock, Hourglass, PlusCircle } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const LogChangeRequestDialog = ({ onSave }: { onSave: (newRequest: Omit<ChangeRequest, 'id' | 'projectId'>) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);
  const [timeDays, setTimeDays] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onSave({ 
      title, 
      description, 
      status: 'Pending', 
      impact: { cost, timeDays }, 
      requester: 'Client', 
      dateRequested: new Date().toISOString().split('T')[0] 
    });
    setIsOpen(false);
    setTitle('');
    setDescription('');
    setCost(0);
    setTimeDays(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button><PlusCircle className="h-4 w-4 mr-2"/>Log New Request</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Log New Change Request</DialogTitle><DialogDescription>Document a new request for a change in scope.</DialogDescription></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2"><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Add new payment gateway" /></div>
          <div className="space-y-2"><Label>Description</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Detailed description of the change..." /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Cost Impact (IDR)</Label><Input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} /></div>
            <div className="space-y-2"><Label>Time Impact (Days)</Label><Input type="number" value={timeDays} onChange={e => setTimeDays(Number(e.target.value))} /></div>
          </div>
        </div>
        <DialogFooter><Button onClick={handleSave}>Save Request</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ProjectManagerProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = useMemo(() => projects.find(p => p.id === id), [id]);
  const financials = useMemo(() => id ? getFinancialsForProject(id) : null, [id]);
  
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);

  useEffect(() => {
    if (!project) {
      // navigate('/dashboard/project-manager/projects');
    } else {
      setChangeRequests(getChangeRequestsForProject(project.id));
    }
  }, [project, navigate]);

  if (!project || !financials) {
    return <div>Loading project details...</div>;
  }

  const handleLogRequest = (newRequest: Omit<ChangeRequest, 'id' | 'projectId'>) => {
    const fullRequest: ChangeRequest = {
      ...newRequest,
      id: `CR-${Math.floor(Math.random() * 1000)}`,
      projectId: project.id,
    };
    setChangeRequests(prev => [fullRequest, ...prev]);
  };

  const projectTasks = tasks.filter(t => t.projectId === project.id);
  const projectTeam = teamMembers.filter(m => project.team.includes(m.name));
  const projectTimeEntries = timeEntries.filter(t => t.projectId === project.id);
  const projectExpenses = expenses.filter(e => e.projectId === project.id);

  const financialKpis = [
    { title: 'Total Budget', value: formatCurrency(financials.budget), icon: DollarSign },
    { title: 'Budget Spent', value: formatCurrency(financials.totalCosts), icon: Hourglass },
    { title: 'Budget Remaining', value: formatCurrency(financials.budget - financials.totalCosts), icon: Target },
    { title: 'Total Billable Hours', value: `${projectTimeEntries.reduce((sum, t) => sum + t.hours, 0)}h`, icon: Clock },
  ];

  const burndownData = [
    { week: 'W1', remaining: financials.budget, spent: 0 },
    { week: 'W2', remaining: financials.budget * 0.9, spent: financials.budget * 0.1 },
    { week: 'W3', remaining: financials.budget * 0.75, spent: financials.budget * 0.25 },
    { week: 'W4', remaining: financials.budget * 0.6, spent: financials.budget * 0.4 },
    { week: 'W5', remaining: financials.totalCosts, spent: financials.totalCosts },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/project-manager/projects')}><ArrowLeft className="h-4 w-4" /></Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground">Client: {project.client}</p>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="changes">Change Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card><CardHeader><CardTitle>Description</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">{project.description}</p></CardContent></Card>
          <Card>
            <CardHeader><CardTitle>Project Status</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between"><span>Status</span><Badge>{project.status}</Badge></div>
              <div className="flex justify-between"><span>Priority</span><Badge variant="secondary">{project.priority}</Badge></div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm"><span>Progress</span><span>{project.progress}%</span></div>
                <Progress value={project.progress} />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Start: {project.startDate}</span>
                <span>End: {project.endDate}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Tasks</CardTitle><CardDescription>All tasks within this project.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Assigned To</TableHead><TableHead>Due Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>{projectTasks.map(t => <TableRow key={t.id}><TableCell>{t.title}</TableCell><TableCell>{t.assignedTo}</TableCell><TableCell>{t.dueDate}</TableCell><TableCell><Badge variant="outline">{t.status}</Badge></TableCell></TableRow>)}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Assigned Team</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projectTeam.map(m => (
                <div key={m.id} className="flex items-center gap-3">
                  <Avatar><AvatarImage src={m.avatar}/><AvatarFallback>{m.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback></Avatar>
                  <div><p className="font-medium text-sm">{m.name}</p><p className="text-xs text-muted-foreground">{m.role}</p></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {financialKpis.map(kpi => (
              <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">{kpi.title}</CardTitle><kpi.icon className="h-4 w-4 text-muted-foreground" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">{kpi.value}</div></CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader><CardTitle>Budget Burn-down</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={burndownData}><CartesianGrid /><XAxis dataKey="week" /><YAxis tickFormatter={(v) => formatCurrency(v)}/><Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))' }} formatter={(v:number) => formatCurrency(v)}/><Legend /><Line type="monotone" dataKey="remaining" stroke="hsl(var(--primary))" name="Budget Remaining" /><Line type="monotone" dataKey="spent" stroke="hsl(var(--destructive))" name="Budget Spent" /></LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Time Log</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Member</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Hours</TableHead></TableRow></TableHeader>
                  <TableBody>{projectTimeEntries.map(t => <TableRow key={t.id}><TableCell>{t.employeName}</TableCell><TableCell>{t.date}</TableCell><TableCell className="text-right">{t.hours}h</TableCell></TableRow>)}</TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Direct Expenses</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Description</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                  <TableBody>{projectExpenses.map(e => <TableRow key={e.id}><TableCell>{e.description}</TableCell><TableCell className="text-right">{formatCurrency(e.amount)}</TableCell></TableRow>)}</TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="changes" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Change Requests</CardTitle>
                <CardDescription>All scope changes requested for this project.</CardDescription>
              </div>
              <LogChangeRequestDialog onSave={handleLogRequest} />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Request</TableHead><TableHead>Status</TableHead><TableHead>Cost Impact</TableHead><TableHead>Time Impact</TableHead></TableRow></TableHeader>
                <TableBody>
                  {changeRequests.map(cr => (
                    <TableRow key={cr.id}>
                      <TableCell className="font-medium">{cr.title}</TableCell>
                      <TableCell><Badge variant={cr.status === 'Approved' ? 'default' : cr.status === 'Rejected' ? 'destructive' : 'secondary'}>{cr.status}</Badge></TableCell>
                      <TableCell>{formatCurrency(cr.impact.cost)}</TableCell>
                      <TableCell>{cr.impact.timeDays} days</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default ProjectManagerProjectDetail;