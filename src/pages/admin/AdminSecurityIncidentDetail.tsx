import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIncidentDetails, SecurityIncident, IncidentStatus, INCIDENT_STATUSES } from '@/lib/security';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowLeft, User, Hash, Clock, MessageSquare, ShieldAlert, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from 'recharts';

const IncidentActivityItem = ({ item }: { item: SecurityIncident['activity'][0] }) => {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 space-y-1 border-b pb-4">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">{item.author}</p>
          <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</p>
        </div>
        {item.action && <p className='text-xs font-medium text-primary'>{item.action}</p>}
        <p className="text-sm text-muted-foreground">{item.comment}</p>
      </div>
    </div>
  );
};

const AdminSecurityIncidentDetail = () => {
  const { incidentId } = useParams<{ incidentId: string }>();
  const navigate = useNavigate();

  const incident = useMemo(() => 
    incidentId ? getIncidentDetails(incidentId) : null
  , [incidentId]);

  const [currentStatus, setCurrentStatus] = useState<IncidentStatus | undefined>(incident?.status);

  useEffect(() => {
    if (!incident) {
      // navigate('/dashboard/admin/security');
    }
  }, [incident, navigate]);

  if (!incident) {
    return <div>Loading incident details...</div>;
  }

  const severityVariant: Record<typeof incident.severity, 'default' | 'secondary' | 'destructive'> = {
    'Low': 'secondary',
    'Medium': 'default',
    'High': 'destructive',
    'Critical': 'destructive',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/admin/security')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{incident.title}</h1>
            <Badge variant={severityVariant[incident.severity]} className="text-base">{incident.severity}</Badge>
          </div>
          <p className="text-muted-foreground">{incident.description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Investigation Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investigation Feed</CardTitle>
              <CardDescription>Log updates, add notes, and track the investigation process.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Add a note or update..." className="mb-2" />
              <div className="flex justify-end">
                <Button>Post Update</Button>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            {incident.activity.map(item => <IncidentActivityItem key={item.id} item={item} />)}
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status & Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Change Incident Status</Label>
                <Select value={currentStatus} onValueChange={(value) => setCurrentStatus(value as IncidentStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Set status" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCIDENT_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Save Status</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Incident Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"> <span className="text-muted-foreground flex items-center"><ShieldAlert className="h-4 w-4 mr-2"/>Type</span> <span className="font-medium">{incident.type}</span> </div>
              <div className="flex justify-between"> <span className="text-muted-foreground flex items-center"><Clock className="h-4 w-4 mr-2"/>Detected</span> <span className="font-medium">{new Date(incident.timestamp).toLocaleString()}</span> </div>
              {Object.entries(incident.details).map(([key, value]) => (
                <div key={key} className="flex justify-between"> 
                  <span className="text-muted-foreground capitalize flex items-center"><User className="h-4 w-4 mr-2"/>{key.replace('_', ' ')}</span> 
                  <span className="font-mono text-xs">{value}</span> 
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {incident.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3">
                  <ListChecks className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <p className="text-sm text-muted-foreground">{rec}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurityIncidentDetail;
