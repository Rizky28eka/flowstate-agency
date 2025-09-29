import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_SECURITY_INCIDENTS, IncidentSeverity, IncidentStatus } from '@/lib/security';
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
import { Shield, AlertTriangle, Search, Siren } from 'lucide-react';
import { cn } from '@/lib/utils';

const IncidentRow = ({ incident }: { incident: (typeof MOCK_SECURITY_INCIDENTS)[0] }) => {
  const navigate = useNavigate();
  
  const severityVariant: Record<IncidentSeverity, 'default' | 'secondary' | 'destructive'> = {
    'Low': 'secondary',
    'Medium': 'default',
    'High': 'destructive',
    'Critical': 'destructive',
  };

  return (
    <TableRow 
      className="cursor-pointer"
      onClick={() => navigate(`/dashboard/admin/security/${incident.id}`)}
    >
      <TableCell>
        <Badge variant={severityVariant[incident.severity]}>{incident.severity}</Badge>
      </TableCell>
      <TableCell>
        <div className="font-medium">{incident.title}</div>
        <div className="text-xs text-muted-foreground hidden sm:table-cell">{incident.description}</div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline">{incident.status}</Badge>
      </TableCell>
      <TableCell className="hidden lg:table-cell">{incident.type}</TableCell>
      <TableCell className="hidden sm:table-cell text-right">{new Date(incident.timestamp).toLocaleString()}</TableCell>
    </TableRow>
  );
};

const AdminSecurity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredIncidents = useMemo(() => {
    return MOCK_SECURITY_INCIDENTS.filter(i => {
      const searchMatch = i.title.toLowerCase().includes(searchTerm.toLowerCase()) || i.description.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'all' || i.status === statusFilter;
      const severityMatch = severityFilter === 'all' || i.severity === severityFilter;
      return searchMatch && statusMatch && severityMatch;
    });
  }, [searchTerm, statusFilter, severityFilter]);

  const stats = useMemo(() => {
    const newIncidents = MOCK_SECURITY_INCIDENTS.filter(i => i.status === 'New').length;
    const investigating = MOCK_SECURITY_INCIDENTS.filter(i => i.status === 'Investigating').length;
    const highPrio = MOCK_SECURITY_INCIDENTS.filter(i => i.severity === 'High' || i.severity === 'Critical').length;
    return { newIncidents, investigating, highPrio };
  }, []);

  const kpiData = [
    { title: 'New Incidents', value: stats.newIncidents, icon: Siren },
    { title: 'Currently Investigating', value: stats.investigating, icon: Search },
    { title: 'High & Critical Alerts', value: stats.highPrio, icon: AlertTriangle },
  ];

  const statuses: IncidentStatus[] = ['New', 'Investigating', 'Resolved', 'Ignored'];
  const severities: IncidentSeverity[] = ['Low', 'Medium', 'High', 'Critical'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Security Center</h1>
          <p className="text-muted-foreground">Monitor and respond to security incidents.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={cn("h-4 w-4 text-muted-foreground", kpi.value > 0 && "text-destructive")} />
            </CardHeader>
            <CardContent>
              <div className={cn("text-2xl font-bold", kpi.value > 0 && "text-destructive")}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>All Incidents</CardTitle>
            <CardDescription>A log of all detected security events. Click a row to investigate.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Input 
              placeholder="Search incidents..." 
              className="w-full md:w-auto flex-grow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                {severities.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severity</TableHead>
                <TableHead>Incident</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Type</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.map(i => <IncidentRow key={i.id} incident={i} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSecurity;
