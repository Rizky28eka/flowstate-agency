import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeProfile, EmployeeProfile } from '@/lib/employee-detail';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart, CheckCircle2, DollarSign, Star, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const OwnerTeamDetail = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();

  const employee = useMemo(() => 
    teamId ? getEmployeeProfile(parseInt(teamId, 10)) : null
  , [teamId]);

  useEffect(() => {
    if (!employee) {
      // navigate('/dashboard/owner/teams');
    }
  }, [employee, navigate]);

  if (!employee) {
    return <div>Loading employee profile...</div>;
  }

  const kpiData = [
    { title: 'Avg. Utilization', value: `${employee.kpis.avgUtilization}%`, icon: BarChart },
    { title: 'Completed Tasks', value: employee.kpis.completedTasks, icon: CheckCircle2 },
    { title: 'Financial Contribution', value: formatCurrency(employee.kpis.financialContribution), icon: DollarSign },
    { title: 'Avg. Project Rating', value: `${employee.kpis.avgProjectRating}/5.0`, icon: Star },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/owner/teams')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-16 w-16">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{employee.name}</h1>
            <p className="text-muted-foreground">{employee.role} | {employee.department}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Schedule Review</Button>
          <Button>Edit Profile</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="projects">Project History</TabsTrigger>
          <TabsTrigger value="tasks">Assigned Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader><CardTitle>Contact & Info</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center"><Mail className="h-4 w-4 mr-3 text-muted-foreground"/><span>{employee.email}</span></div>
              <div className="flex items-center"><Phone className="h-4 w-4 mr-3 text-muted-foreground"/><span>{employee.phone}</span></div>
              <div className="flex items-center"><MapPin className="h-4 w-4 mr-3 text-muted-foreground"/><span>{employee.location}</span></div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {employee.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Performance Reviews</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {employee.performanceReviews.map(review => (
                <div key={review.id} className="flex gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{review.reviewer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{review.reviewer} <span className="text-muted-foreground font-normal">on {review.date}</span></p>
                      <Badge>{review.rating}/5.0</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{review.summary}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Project History</CardTitle><CardDescription>All projects {employee.name} has contributed to.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Status</TableHead><TableHead className="text-right">End Date</TableHead></TableRow></TableHeader>
                <TableBody>
                  {employee.projectHistory.map(p => (
                    <TableRow key={p.projectId} className="cursor-pointer" onClick={() => navigate(`/dashboard/owner/projects/${p.projectId}`)}>
                      <TableCell className="font-medium">{p.projectName}</TableCell>
                      <TableCell><Badge variant={p.status === 'Completed' ? 'secondary' : 'default'}>{p.status}</Badge></TableCell>
                      <TableCell className="text-right">{p.endDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Assigned Tasks</CardTitle><CardDescription>All tasks assigned to {employee.name}.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Task</TableHead><TableHead>Project</TableHead><TableHead>Due Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {employee.assignedTasks.map(task => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.projectId}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell><Badge variant="outline">{task.status}</Badge></TableCell>
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

export default OwnerTeamDetail;