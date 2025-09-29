import { useState, useMemo } from 'react';
import { 
  MOCK_RETENTION_POLICIES, 
  MOCK_DATA_SUBJECT_REQUESTS,
  DataRetentionPolicy,
  DataSubjectRequest,
  RequestStatus,
  REQUEST_STATUSES
} from '@/lib/compliance';
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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreHorizontal, PlusCircle, ShieldCheck } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const RetentionPolicyRow = ({ policy, onToggle }: { policy: DataRetentionPolicy, onToggle: (id: string, isActive: boolean) => void }) => {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{policy.dataType}</div>
        <div className="text-xs text-muted-foreground hidden sm:table-cell">{policy.description}</div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{policy.retentionPeriodDays} days</TableCell>
      <TableCell className="hidden md:table-cell"><Badge variant="secondary">{policy.action}</Badge></TableCell>
      <TableCell><Switch checked={policy.isActive} onCheckedChange={(checked) => onToggle(policy.id, checked)} /></TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button></DropdownMenuTrigger>
          <DropdownMenuContent><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem></DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

const DataSubjectRequestRow = ({ request, onStatusChange }: { request: DataSubjectRequest, onStatusChange: (id: string, status: RequestStatus) => void }) => {
  const statusVariant: Record<RequestStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Pending': 'default',
    'In Progress': 'secondary',
    'Completed': 'outline',
    'Rejected': 'destructive',
  };
  return (
    <TableRow>
      <TableCell className="font-medium">{request.requestType}</TableCell>
      <TableCell>{request.userEmail}</TableCell>
      <TableCell className="hidden md:table-cell">{request.requestDate}</TableCell>
      <TableCell>
        <Select value={request.status} onValueChange={(value) => onStatusChange(request.id, value as RequestStatus)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {REQUEST_STATUSES.map(s => <SelectItem key={s} value={s}><Badge variant={statusVariant[s]} className="w-full text-center">{s}</Badge></SelectItem>)}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="outline" size="sm">Process</Button>
      </TableCell>
    </TableRow>
  );
};

const AdminComplianceCenter = () => {
  const [policies, setPolicies] = useState(MOCK_RETENTION_POLICIES);
  const [requests, setRequests] = useState(MOCK_DATA_SUBJECT_REQUESTS);

  const handlePolicyToggle = (id: string, isActive: boolean) => {
    setPolicies(prev => prev.map(p => p.id === id ? { ...p, isActive } : p));
  };

  const handleRequestStatusChange = (id: string, status: RequestStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Compliance & Data Governance</h1>
        <p className="text-muted-foreground">Manage data retention policies and data subject requests (GDPR, CCPA).</p>
      </div>

      <Tabs defaultValue="overview">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 min-w-max">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="retention" className="text-xs sm:text-sm">Data Retention</TabsTrigger>
            <TabsTrigger value="requests" className="text-xs sm:text-sm">Subject Requests</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-4 sm:mt-6">
          <Card>
            <CardHeader><CardTitle className="text-lg sm:text-xl">Compliance Overview</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 border rounded-lg">
                <p className="font-medium text-sm sm:text-base">GDPR Status</p>
                <Badge className="bg-green-500 text-white">Compliant</Badge>
              </div>
              <div className="flex items-center justify-between p-3 sm:p-4 border rounded-lg">
                <p className="font-medium text-sm sm:text-base">CCPA Status</p>
                <Badge className="bg-green-500 text-white">Compliant</Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground pt-4">This overview provides a summary of the platform's compliance status. Manage specific policies and requests in their respective tabs.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="mt-4 sm:mt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Data Retention Policies</CardTitle>
                <CardDescription>Automated rules for data anonymization and deletion.</CardDescription>
              </div>
              <Button className="w-full sm:w-auto"><PlusCircle className="h-4 w-4 mr-2"/>New Policy</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader><TableRow><TableHead className="text-xs sm:text-sm">Data Type</TableHead><TableHead className="hidden md:table-cell text-xs sm:text-sm">Period</TableHead><TableHead className="hidden md:table-cell text-xs sm:text-sm">Action</TableHead><TableHead className="text-xs sm:text-sm">Is Active</TableHead><TableHead className="text-xs sm:text-sm"><span className="sr-only">Actions</span></TableHead></TableRow></TableHeader>
                  <TableBody>{policies.map(p => <RetentionPolicyRow key={p.id} policy={p} onToggle={handlePolicyToggle} />)}</TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="mt-4 sm:mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Data Subject Requests</CardTitle>
              <CardDescription>Manage data export and deletion requests from your users.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader><TableRow><TableHead className="text-xs sm:text-sm">Request</TableHead><TableHead className="text-xs sm:text-sm">User</TableHead><TableHead className="hidden md:table-cell text-xs sm:text-sm">Date</TableHead><TableHead className="text-xs sm:text-sm">Status</TableHead><TableHead className="text-right text-xs sm:text-sm">Actions</TableHead></TableRow></TableHeader>
                  <TableBody>{requests.map(r => <DataSubjectRequestRow key={r.id} request={r} onStatusChange={handleRequestStatusChange} />)}</TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminComplianceCenter;
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
          <TabsTrigger value="requests">Subject Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Compliance Overview</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <p className="font-medium">GDPR Status</p>
                <Badge className="bg-green-500 text-white">Compliant</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <p className="font-medium">CCPA Status</p>
                <Badge className="bg-green-500 text-white">Compliant</Badge>
              </div>
              <p className="text-sm text-muted-foreground pt-4">This overview provides a summary of the platform's compliance status. Manage specific policies and requests in their respective tabs.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="mt-6">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div>
                <CardTitle>Data Retention Policies</CardTitle>
                <CardDescription>Automated rules for data anonymization and deletion.</CardDescription>
              </div>
              <Button><PlusCircle className="h-4 w-4 mr-2"/>New Policy</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Data Type</TableHead><TableHead className="hidden md:table-cell">Period</TableHead><TableHead className="hidden md:table-cell">Action</TableHead><TableHead>Is Active</TableHead><TableHead><span className="sr-only">Actions</span></TableHead></TableRow></TableHeader>
                <TableBody>{policies.map(p => <RetentionPolicyRow key={p.id} policy={p} onToggle={handlePolicyToggle} />)}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Subject Requests</CardTitle>
              <CardDescription>Manage data export and deletion requests from your users.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Request</TableHead><TableHead>User</TableHead><TableHead className="hidden md:table-cell">Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>{requests.map(r => <DataSubjectRequestRow key={r.id} request={r} onStatusChange={handleRequestStatusChange} />)}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminComplianceCenter;
