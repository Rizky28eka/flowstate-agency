import { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClientProjectDetails, ClientProjectDetails } from '@/lib/client-project-detail';
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle2, Circle, File as FileIcon, Download } from 'lucide-react';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const ClientProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = useMemo(() => 
    id ? getClientProjectDetails(id) : null
  , [id]);

  useEffect(() => {
    if (!project) {
      // navigate('/dashboard/client/projects');
    }
  }, [project, navigate]);

  if (!project) {
    return <div>Loading project details...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/client/projects')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground">Project Details & Progress</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 grid-cols-3 text-sm">
            <div><span className="font-medium">Status:</span> <Badge>{project.status}</Badge></div>
            <div><span className="font-medium">Start Date:</span> {project.startDate}</div>
            <div><span className="font-medium">End Date:</span> {project.endDate}</div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm"><span>Overall Progress</span><span>{project.progress}%</span></div>
            <Progress value={project.progress} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tasks">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tasks">Tasks & Progress</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Tasks & Milestones</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.tasks.map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-3 border rounded-md">
                    {task.isCompleted ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5 text-muted-foreground"/>}
                    <span className="flex-1 font-medium text-sm">{task.title}</span>
                    <Badge variant="outline">{task.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Shared Files</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Type</TableHead><TableHead>Size</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
                <TableBody>
                  {project.files.map(file => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium flex items-center gap-2"><FileIcon className="h-4 w-4"/>{file.name}</TableCell>
                      <TableCell>{file.type}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>{file.uploadDate}</TableCell>
                      <TableCell className="text-right"><Button variant="ghost" size="icon"><Download className="h-4 w-4"/></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Project Invoices</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Invoice #</TableHead><TableHead>Status</TableHead><TableHead>Due Date</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                <TableBody>
                  {project.invoices.map(inv => (
                    <TableRow key={inv.id} className="cursor-pointer" onClick={() => navigate('/dashboard/client/invoices')}>
                      <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                      <TableCell><Badge variant={inv.status === 'Paid' ? 'default' : 'destructive'}>{inv.status}</Badge></TableCell>
                      <TableCell>{inv.dueDate}</TableCell>
                      <TableCell className="text-right">{formatCurrency(inv.amount)}</TableCell>
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

export default ClientProjectDetail;
