import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContractDetails, ContractDetails } from '@/lib/contracts';
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
import { ArrowLeft, FileText, DollarSign, CalendarOff, BellRing, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

// Helper to calculate days between dates
const daysBetween = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d2.getTime() - d1.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

const OwnerContractDetail = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();

  const contract = useMemo(() => 
    contractId ? getContractDetails(contractId) : null
  , [contractId]);

  useEffect(() => {
    if (!contract) {
      // navigate('/dashboard/owner/contract-management');
    }
  }, [contract, navigate]);

  if (!contract) {
    return <div>Loading contract details...</div>;
  }

  const today = new Date().toISOString().split('T')[0];
  const daysToRenewal = contract.renewalDate ? daysBetween(today, contract.renewalDate) : null;
  
  const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Active': 'default',
    'Expiring Soon': 'secondary',
    'Expired': 'destructive',
    'Draft': 'outline',
  };

  const kpiData = [
    { title: 'Status', value: contract.status, icon: FileText, isBadge: true },
    { title: 'Contract Value', value: formatCurrency(contract.value), icon: DollarSign },
    { title: 'End Date', value: contract.endDate || 'N/A', icon: CalendarOff },
    { title: 'Days to Renewal', value: daysToRenewal !== null ? `${daysToRenewal} days` : 'N/A', icon: BellRing },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/owner/contract-management')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{contract.title}</h1>
            <p className="text-muted-foreground">Contract details for {contract.clientName}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Request Amendment</Button>
          <Button onClick={() => alert('Downloading PDF...')}>Download Document</Button>
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
              {kpi.isBadge ? (
                <Badge variant={statusVariant[contract.status] || 'outline'} className="text-lg">{kpi.value}</Badge>
              ) : (
                <div className="text-2xl font-bold">{kpi.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Key Terms & Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"> <span className="text-muted-foreground">Client</span> <span className="font-medium">{contract.clientName}</span> </div>
              <div className="flex justify-between"> <span className="text-muted-foreground">Start Date</span> <span className="font-medium">{contract.startDate}</span> </div>
              <div className="flex justify-between"> <span className="text-muted-foreground">End Date</span> <span className="font-medium">{contract.endDate || 'N/A'}</span> </div>
              <div className="flex justify-between"> <span className="text-muted-foreground">Renewal Date</span> <span className="font-medium">{contract.renewalDate || 'N/A'}</span> </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Key Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contract.keyTerms.map((term, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckSquare className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <p className="text-sm text-muted-foreground">{term}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Associated Projects */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Associated Projects</CardTitle>
              <CardDescription>Projects running under this contract.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">End Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contract.associatedProjects.length > 0 ? contract.associatedProjects.map(p => (
                    <TableRow key={p.id} className="cursor-pointer" onClick={() => navigate(`/dashboard/owner/projects/${p.id}`)}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell><Badge variant={p.status === 'Completed' ? 'secondary' : 'default'}>{p.status}</Badge></TableCell>
                      <TableCell className="text-right">{p.endDate}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">No projects associated with this contract.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OwnerContractDetail;
