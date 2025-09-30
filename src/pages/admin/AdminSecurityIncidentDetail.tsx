import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIncidentDetails, IncidentSeverity, IncidentStatus } from '@/lib/security';
import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Shield, TriangleAlert, Clock, User, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSecurityIncidentDetail = () => {
  const { incidentId } = useParams<{ incidentId: string }>();
  const navigate = useNavigate();

  const incident = useMemo(() => 
    incidentId ? getIncidentDetails(incidentId) : null
  , [incidentId]);

  useEffect(() => {
    if (!incident) {
      // Optional: Redirect if incident not found
      // navigate('/dashboard/admin/security');
    }
  }, [incident, navigate]);

  if (!incident) {
    return <div>Loading incident details or incident not found...</div>;
  }

  const severityVariant: Record<IncidentSeverity, 'default' | 'secondary' | 'destructive'> = {
    'Low': 'secondary',
    'Medium': 'default',
    'High': 'destructive',
    'Critical': 'destructive',
  };

  const affectedUser = incident.details.user || incident.details.target_user || 'N/A';

  const kpiData = [
    { title: 'Severity', value: incident.severity, icon: TriangleAlert, variant: severityVariant[incident.severity] },
    { title: 'Status', value: incident.status, icon: Shield },
    { title: 'Detection Time', value: new Date(incident.timestamp).toLocaleTimeString(), icon: Clock },
    { title: 'Affected User', value: affectedUser, icon: User },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/admin/security')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{incident.title}</h1>
            <p className="text-muted-foreground">Incident ID: {incident.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Change Status</Button>
          <Button>Generate Report</Button>
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
              {kpi.variant ? (
                <Badge variant={kpi.variant} className="text-2xl font-bold">{kpi.value}</Badge>
              ) : (
                <div className="text-2xl font-bold">{kpi.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Incident Details</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p><strong className="font-semibold">Description:</strong> {incident.description}</p>
              <p><strong className="font-semibold">Type:</strong> {incident.type}</p>
              <p><strong className="font-semibold">Source IP:</strong> {incident.details.source_ip || 'N/A'}</p>
              <p><strong className="font-semibold">Date:</strong> {new Date(incident.timestamp).toLocaleString()}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Event Timeline</CardTitle><CardDescription>Chronological order of events related to the incident.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Timestamp</TableHead><TableHead>Event</TableHead></TableRow></TableHeader>
                <TableBody>
                  {incident.activity.map(event => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{new Date(event.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{event.comment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Response Actions</CardTitle><CardDescription>Actions taken to mitigate and resolve the incident.</CardDescription></CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Response plan and actions will be detailed here.</p>
              {/* Placeholder for response actions */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSecurityIncidentDetail;